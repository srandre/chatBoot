import { Component } from '@angular/core';
import { User } from './models/User';
import { AuthService } from './services/auth.service';
declare let alertify: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'chatBoot';
    user: User = new User();
    submitted = false;
    password = "";
    passwordConfirm = "";

    constructor(private auth: AuthService) { }

    login() {
        this.submitted = true;
        if (!this.isValidEmail(this.user.email) || this.password.length == 0) {
            alertify.error('Por favor insira um email e senha válidos')
            return;
        }
        this.auth.login({
            email: this.user.email,
            password: this.password
        }).subscribe(result => {
            console.log(result)
            this.user = new User(result);
            this.user.signed = true;
            alertify.success('Sucesso!')
        }, error => {
            alertify.error(error.error.error)
        })
    }

    isValidEmail(email: string) {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return RegExp(pattern).test(email);
    }

    signup() {
        this.submitted = true;
        let failed = false;
        if (!this.isValidEmail(this.user.email)) {
            alertify.error('Por favor insira um email válido')
            failed = true;
        }
        if (this.password.length == 0) {
            alertify.error('Por favor escolha uma senha')
            failed = true;
        } else
            if (this.passwordConfirm.length == 0) {
                alertify.error('Por favor confirme sua senha')
                failed = true;
            } else
                if (this.password != this.passwordConfirm) {
                    alertify.error('As senhas não coincidem')
                    failed = true;
                }
        if (failed)
            return;

        this.auth.signup({
            email: this.user.email,
            password: this.password
        }).subscribe(result => {
            alertify.success(result.message)
        }, error => {
            alertify.error(error.error.error)
        })
    }

}
