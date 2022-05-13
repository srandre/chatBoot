import { Component } from '@angular/core';
import { User } from './models/User';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'chatBoot';
    user: User = new User({
        name: 'foo',
        email: 'foo@foo.com'
    });
}
