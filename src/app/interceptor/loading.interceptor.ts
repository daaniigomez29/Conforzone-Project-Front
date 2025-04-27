import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private loadingService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        console.log(this.loadingService.getLoading())
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
          console.log(this.loadingService.getLoading())
        }
      })
    );
  }
}
