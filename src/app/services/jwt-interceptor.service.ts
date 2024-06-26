import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn : 'root'})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Get the token from local storage

    // Clone the request to add the new header
    let authReq = req;
    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    // Send the cloned request with the header to the next handler.
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle specific errors
        if (error.status === 401) {
          // Redirect to login page or show an error message
          this.router.navigate(['/examples/login']);
        }
        return throwError(error);
      })
    );
  }
}
