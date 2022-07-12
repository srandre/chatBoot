import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from './websocket.service';
import { environment } from 'src/environments/environment';
import { Message } from '../models/Message';
import * as Rx from 'rxjs';
import { map } from 'rxjs/operators'

const baseUrl = 'http://localhost:8080/message';
@Injectable({
    providedIn: 'root'
})
export class MessageService {

    public messages: Rx.Subject<Message>;

    constructor(private http: HttpClient, private wsService: WebsocketService) {
        this.messages = <Rx.Subject<Message>>this.wsService.connect(wsService.baseUrl)
            .pipe(map((response: MessageEvent): Message => {
                console.log(response)
                let data = JSON.parse(response.data);
                return new Message(data)
            }))
    }


    //message
    sendMessage(msg: any): any {
        return this.http.post(`${baseUrl}/sendMessage`, msg)
    }

    //receiverEmail
    getUnread(body: any): Rx.Observable<any> {
        return this.http.post(`${baseUrl}/login`, body);
    }

    //receiverEmail, senderEmail
    getMessages(body: any): any {
        if (body == null) return new Rx.Observable()
        //const subject = webSocket(baseUrl);
        return this.http.post(`${baseUrl}/getMessages`, body);
    }

    //receiverEmail, senderEmail
    markAsRead(body): any {
        return this.http.post(`${baseUrl}/markAsRead`, body)
    }
}