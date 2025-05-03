import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

const bootstrap = () => bootstrapApplication(AppComponent, config);

registerLocaleData(localeEs, 'es-ES');

export default bootstrap;
