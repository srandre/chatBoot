import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { map, Observable, startWith, Subscription, timer } from 'rxjs';
import { interval, switchMap } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewChecked {
    @Input() user: User = new User();
    @ViewChild('scroller') scroller!: ElementRef;
    @ViewChild('messageInput') messageInput!: ElementRef;

    allUsers: User[] = [];
    users: User[] = [];
    public messages: Message[] = [];
    public chats: any[] = [];
    isSearching: boolean = false;
    timerSubscription: Subscription;
    scroll: boolean = true;

    openChat = null;

    constructor(private http: HttpClient, private messageService: MessageService, private auth: AuthService) {
        this.auth.getAll().subscribe(result => {
            this.allUsers = result;
        }, error => { })

        this.messageService.messages.subscribe(msg => {
            this.messages.push(new Message(msg))
        });
    }

    ngOnInit(): void {
        interval(1000)
            .pipe(
                startWith(0),
                switchMap(() => {
                    if (this.openChat == null) return new Observable();
                    return this.http.post('http://localhost:8080/message/getMessages', { receiverEmail: this.user.email, senderEmail: this.openChat.email })
                })
            )
            .subscribe((res: any) => {
                if (res != null && res.length > 0) {
                    if (this.messages.length == res.length) return
                    this.messages = res.map(x => new Message(x))
                    this.scrollDown()
                }
            })
        interval(1000)
            .pipe(
                startWith(500),
                switchMap(() => {
                    return this.http.post('http://localhost:8080/message/getUnread', { receiverEmail: this.user.email })
                })
            )
            .subscribe((res: any) => {
                if (res != null && res.length > 0) {
                    this.chats = res.map(x => {
                        x.lastMessage = new Message(x.lastMessage)
                        return x
                    })
                }
            })
    }

    ngAfterViewChecked() {
        if (this.scroll) {
            this.scrollBottom()
            this.setFocus()
            this.scroll = false;
        }
    }

    scrollBottom() {
        try {
            this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
        } catch (error) {

        }
    }

    setFocus() {
        try {
            this.scroller.nativeElement.focus();
        } catch (error) {

        }
    }

    checkConsecutive(message1: Message, message2: Message) {
        if (message2.sender.email != message1.sender.email) return false;
        return moment(message2.timestamp).diff(moment(message1.timestamp), 'minutes') < 5;
    }

    sendMessage(message: any) {
        if (message == null || message.value == "") return
        let msg = new Message({
            senderEmail: this.user.email,
            receiverEmail: this.openChat.email,
            text: message.value,
            wasRead: false
        })

        this.scrollDown()
        message.value = ''
        this.messageService.sendMessage(msg).subscribe(result => {
            msg.timestamp = moment(result);
            this.messages.push(new Message(msg))
        })
    }

    scrollDown() {
        setTimeout(() => this.scroll = true, 100)
    }

    findUser(txt: any) {
        if (txt.value == "" || txt.value == null) {
            this.isSearching = false;
            this.users = [];
            return
        }
        this.isSearching = true;
        this.users = this.allUsers.filter(x => x.email != this.user.email && this.notActiveChat(x) && (x.email.toLowerCase().match(txt.value.toLowerCase()) || x.name.toLowerCase().match(txt.value.toLowerCase())))
    }

    notActiveChat(x: any) {
        if (this.chats == null || this.chats.length == 0)
            return true
        if (this.chats.some(y => y.lastMessage.senderEmail == x.email))
            return false
        return true
    }

    _newChat(row: any, input: any) {
        input.value = '';
        this.openChat = new User(row);
        this.users = [];
        this.isSearching = false;
        this.messageService.getMessages({ receiverEmail: this.user.email, senderEmail: this.openChat.email }).subscribe(x => {
            this.messages = x.map(msg => new Message(msg));
        })
        this.scrollDown()
    }

    _openChat(row: any) {
        this.openChat = new User(row);
        this.messageService.getMessages({ receiverEmail: this.user.email, senderEmail: this.openChat.email }).subscribe(x => {
            this.messages = x.map(msg => new Message(msg));
        })
        this.scrollDown()
    }
}
