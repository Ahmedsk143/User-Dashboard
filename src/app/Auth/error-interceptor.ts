import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        if (err.status == 401) {
          this.authService.removeAuthData();
        }
        return throwError(() => new Error(this.setErrors(err)));
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
