import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService {

    public url: string;
    public identity;
    public token;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public signUp(userToLogin, getHash = null) {

        if (getHash != null) {
            userToLogin.getHash = getHash;
        }

        let json = JSON.stringify(userToLogin);
        let params = json;

        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http.post(this.url + 'login', params, { headers: headers })
            .pipe(
                map(res => res.json())
            );
    }

    /**
     * register
     */
    public register(userToRegister) {

        let json = JSON.stringify(userToRegister);
        let params = json;

        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http.post(this.url + 'register', params, { headers: headers })
            .pipe(
                map(res => res.json())
            );

    }

    /**
     * getIdentity
     */
    public getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    /**
     * getToken
     */
    public getToken() {
        let token = localStorage.getItem('token');

        if (token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }
}
