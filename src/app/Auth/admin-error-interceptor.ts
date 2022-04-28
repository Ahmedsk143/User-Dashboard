import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private adminAuthService: AdminAuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.adminAuthService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken),
    });
    return next.handle(authRequest).pipe(
      catchError((err: HttpErrorResponse, caught) => {
        console.log(err);
        if (err.status == 401) {
          this.adminAuthService.removeAuthData();
          return throwError(() => new Error(this.setErrors(err)));
        }
        return caught;
      })
    );
  }
  setErrors(err: HttpErrorResponse): string {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = err.error.message;
    } else {
      if (err.status != 0) {
        errorMessage = err.error.message;
      }
    }
    return errorMessage;
  }
}
