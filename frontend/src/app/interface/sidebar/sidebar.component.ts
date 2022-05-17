import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Input() user: User = new User();

    loremIpsum: string = 'Lorem ipsum dolor sit amet consectetur adipiscing elit Aenean pharetra magna et dapibus venenatis'
    public chatList: Message[] = []
    constructor() { }

    ngOnInit(): void {
        this.loremIpsum.split(' ').forEach((x, index) => {
            this.chatList.push(new Message())
            this.chatList[index].sender.name = x;
        })
        console.log(this.chatList)
    }

}
