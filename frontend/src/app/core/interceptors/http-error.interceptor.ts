import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An error occurred';

                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }

                // Handle specific error codes
                if (error.status === 401) {
                    this.router.navigate(['/home']);
                } else if (error.status === 403) {
                    console.error('Access Forbidden');
                } else if (error.status === 404) {
                    console.error('Resource Not Found');
                } else if (error.status === 500) {
                    console.error('Internal Server Error');
                }

                console.error(errorMessage);
                return throwError(() => new Error(errorMessage));
            })
        );
    }
}
