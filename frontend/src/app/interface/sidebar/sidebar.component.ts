import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
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
