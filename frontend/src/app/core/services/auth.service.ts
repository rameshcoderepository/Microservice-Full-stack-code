import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

    private userTokenSubject = new BehaviorSubject<string | null>(null);
    public userToken$: Observable<string | null> = this.userTokenSubject.asObservable();

    private currentUserSubject = new BehaviorSubject<any>(null);
    public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

    constructor() {
        this.loadFromLocalStorage();
    }

    checkAuthentication(): void {
        const token = localStorage.getItem('auth_token');
        const user = localStorage.getItem('current_user');

        if (token && user) {
            this.userTokenSubject.next(token);
            this.currentUserSubject.next(JSON.parse(user));
            this.isAuthenticatedSubject.next(true);
        }
    }

    login(credentials: { username: string; password: string }): Observable<any> {
        return new Observable(observer => {
            // Simulate API call
            setTimeout(() => {
                const token = 'token_' + Math.random().toString(36).substr(2, 9);
                const user = {
                    id: 1,
                    username: credentials.username,
                    email: credentials.username + '@example.com',
                    role: 'USER'
                };

                localStorage.setItem('auth_token', token);
                localStorage.setItem('current_user', JSON.stringify(user));

                this.userTokenSubject.next(token);
                this.currentUserSubject.next(user);
                this.isAuthenticatedSubject.next(true);

                observer.next({ token, user });
                observer.complete();
            }, 500);
        });
    }

    logout(): void {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');
        this.userTokenSubject.next(null);
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
    }

    getToken(): string | null {
        return this.userTokenSubject.getValue();
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.getValue();
    }

    private loadFromLocalStorage(): void {
        const token = localStorage.getItem('auth_token');
        const user = localStorage.getItem('current_user');

        if (token) {
            this.userTokenSubject.next(token);
            this.isAuthenticatedSubject.next(true);
        }
        if (user) {
            this.currentUserSubject.next(JSON.parse(user));
        }
    }
}
