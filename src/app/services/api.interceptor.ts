import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {
  API_URL = 'https://admin.tirgo.io/api'
   constructor(private authService: AuthService, private router: Router) { }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token = '';
      if (req.url === 'https://admin.tirgo.io/api/admin/getTypeCargo' || req.url == 'https://admin.tirgo.io/api/users/createOrderClientTypes'|| req.url === 'https://admin.tirgo.io/api/users/getTypeTruck' ) {
        token = localStorage.getItem('adminJWT');
      } else {
        token = AuthService.jwt;
      }
  
      const authReq = req.clone({
        setHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      return next.handle(authReq).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {}
          return event;
        })
      );
    }
  }
  
