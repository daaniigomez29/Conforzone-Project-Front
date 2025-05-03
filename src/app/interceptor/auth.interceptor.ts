import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      //  const token = localStorage.getItem('token'); // O donde sea que almacenes tu token
        const token = ''
         const urlsToExclude = [
            'https://api.cloudinary.com',
            'app',
            'topic',
            'login',
            'register',
            'confirmRegister',
            'existsEmail',
            'existsNameuserRegister',
            'existsNameuser'
        ];

        const shouldExclude = urlsToExclude.some(url => req.url.includes(url));

        if (shouldExclude) {
            return next.handle(req);
        }

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}