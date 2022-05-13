import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message';

@Component({
    selector: 'app-chat-miniature',
    templateUrl: './chat-miniature.component.html',
    styleUrls: ['./chat-miniature.component.scss']
})

export class ChatMiniatureComponent implements OnInit {
    @Input() lastMessage: Message = new Message();
    @Input() even: boolean = false;

    loremIpsum: string = 'Lorem ipsum dolor sit amet consectetur adipiscing elit Aenean pharetra magna et dapibus venenatis'

    constructor() { }

    ngOnInit(): void {

    }

}
