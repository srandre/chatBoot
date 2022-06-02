import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/auth';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    signup(user: any): Observable<any> {
        return this.http.post(`${baseUrl}/signup`, user);
    }

    login(user: any): Observable<any> {
        return this.http.post(`${baseUrl}/login`, user);
    }
}