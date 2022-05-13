export class User {
    name: string = "";
    email: string = "";

    constructor(user?: any) {
        if (user) {
            this.name = user.name;
            this.email = user.email;
        }
    }
}