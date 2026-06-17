import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessaoExpirada } from './sessao-expirada/sessao-expirada';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const dialog = inject(MatDialog);
  const router = inject(Router);

  const reqComToken = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(reqComToken).pipe(
    catchError((err) => {
      if ((err.status === 401 || err.status === 403) && !req.url.includes('/auth/login')) {
        if (dialog.openDialogs.length === 0) {
          const ref = dialog.open(SessaoExpirada, { disableClose: true });
          ref.afterClosed().subscribe(() => {
            localStorage.removeItem('token');
            router.navigate(['/login']);
          });
        }
      }
      return throwError(() => err);
    })
  );
};