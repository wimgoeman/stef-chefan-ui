import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("intercepting... " + request.url)
        
        let currentUser = this.authService.user;
        if (currentUser) {
            return new Observable<HttpEvent<any>>(
                (observer) => {
                    currentUser.getIdToken().then((token) => {
                        request = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        next.handle(request).subscribe(observer);
                    }).catch((err) => {
                        console.error(err);
                        observer.error(err);
                    })
                }
            )
        } else {
            return next.handle(request);
        }
    }
}