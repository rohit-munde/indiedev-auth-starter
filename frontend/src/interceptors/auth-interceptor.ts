import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  let clonedReq = req.clone({
    setHeaders: {
      Accept: 'application/json'
    }
  });

  if (token) {
    clonedReq = clonedReq.clone({
      setHeaders: {
        Authorization: `Bearer ds${token}`
      }
    })
  }

  return next(clonedReq);
};
