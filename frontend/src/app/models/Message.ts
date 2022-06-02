import * as moment from "moment";
import { User } from "./User";

export class Message {
    sender: User = new User();
    receiver: User = new User();
    text: string = "";
    timestamp: moment.Moment = moment();
    wasRead: boolean = false;

    constructor(message?: any) {
        if (message) {
            this.sender = new User(message.sender);
            this.receiver = new User(message.receiver);
            this.text = message.text;
            this.timestamp = message.timestamp;
            this.wasRead = message.wasRead;
        }
    }

    public getTimestamp(format: string = 'hh:mm') {
        return this.timestamp.format(format)
    }

    public getDate(format: string = 'dd/MM/YYYY') {
        return this.timestamp.format(format)
    }
}