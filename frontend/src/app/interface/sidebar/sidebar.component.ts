import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    loremIpsum: string = 'Lorem ipsum dolor sit amet consectetur adipiscing elit Aenean pharetra magna et dapibus venenatis'
    chatList: string[] = []

    constructor() { }

    ngOnInit(): void {
        this.chatList = this.loremIpsum.split(' ')
    }

}
