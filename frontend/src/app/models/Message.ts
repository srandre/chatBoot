import * as moment from "moment";
import { User } from "./User";

export class Message {
    id: any;
    sender: User = new User();
    senderEmail: string = "";
    receiver: User = new User();
    receiverEmail: string = "";
    text: string = "";
    timestamp: moment.Moment = moment();
    wasRead: boolean = false;

    constructor(message?: any) {
        if (message) {
            this.id = message.id;
            this.sender = new User(message.sender);
            this.senderEmail = message.senderEmail;
            this.receiver = new User(message.receiver);
            this.receiverEmail = message.receiverEmail;
            this.text = message.text;
            this.timestamp = message.timestamp;
            this.wasRead = message.wasRead;
        }
    }

    public getTimestamp(format: string = 'ddd HH:mm') {
        return moment(this.timestamp).format(format)
    }

    public getDate(format: string = 'dd/MM/YYYY') {
        return moment(this.timestamp).format(format)
    }
}