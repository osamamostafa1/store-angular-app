import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('store-token') || '';
    let requestWithAuth: any;
    if (token != '') {
      requestWithAuth = request.clone({
        headers: request.headers
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', '*/*'),
      });
    } else {
      requestWithAuth = request.clone({
        headers: request.headers.set('Authorization', ``).set('Accept', '*/*'),
      });
    }

    return next.handle(requestWithAuth);
  }
}

export const ApiInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiInterceptor,
  multi: true,
};
