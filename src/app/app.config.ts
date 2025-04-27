import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoadingInterceptor } from './interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: LOCALE_ID, useValue: 'es-ES'},
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
};
