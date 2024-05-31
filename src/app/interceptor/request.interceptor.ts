import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Interceptor Before token ", request);
    if (!request.url.includes("/auth")) {
      const newRequest = request.clone({
        headers: new HttpHeaders({ token: "289383938299282hjhsjjdk" })
      });
      console.log("Interceptor after token ", newRequest);
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
