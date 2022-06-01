import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
    @Input() user: User = new User();

    public messages: Message[] = [];
    public user1: User = new User({
        name: 'foo',
        email: 'foo@foo.com'
    });
    public user2: User = new User({
        name: 'bar',
        email: 'bar@bar.com'
    });
    constructor() { }

    ngOnInit(): void {
        this.messages = [
            new Message({
                sender: this.user1,
                receiver: this.user2,
                text: 'Oi',
                timestamp: moment(),
                wasRead: false
            }),
            new Message({
                sender: this.user2,
                receiver: this.user1,
                text: 'Olá',
                timestamp: moment(),
                wasRead: false
            }),
            new Message({
                sender: this.user1,
                receiver: this.user2,
                text: 'Tudo bem?',
                timestamp: moment(),
                wasRead: false
            })]
    }

    sendMessage(message: any) {
        if (message.value == '' || message.value == null) return;
        this.messages.push(new Message({
            sender: this.user1,
            receiver: this.user2,
            text: message.value,
            timestamp: moment(),
            wasRead: false
        }))
        message.value = ''
    }

}
