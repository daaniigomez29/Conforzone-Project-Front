import { ResolveFn, Routes } from '@angular/router';
import { authGuard } from './guardians/auth.guard';
import { adminGuard } from './guardians/admin.guard';
import { NavbarViewComponent } from './layout/navbar-view/navbar-view/navbar-view.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesPageComponent } from './components/services/services-page/services-page.component';
import { AboutUsPageComponent } from './components/about_us/about-us-page/about-us-page.component';
import { OurJobPageComponent } from './components/our_job/our-job-page/our-job-page.component';
import { OffersPageComponent } from './components/offers/offers-page/offers-page.component';
import { ContactPageComponent } from './components/contact/contact-page/contact-page.component';
import { SpecificServiceComponent } from './components/specific_services/specific-service/specific-service.component';
import { SpecificServiceDetailComponent } from './components/specific_services/specific-service-detail/specific-service-detail.component';
import { LoginComponent } from './components/users/login/login.component';
import { PagePrivacityPolicyComponent } from './components/page_policy/page-privacity-policy/page-privacity-policy.component';

export const routes: Routes = [
    {path: '', redirectTo:'inicio', pathMatch:'full'},
    {path: 'login-secret655', component:LoginComponent},
    {path: '', component:NavbarViewComponent,
        children:[
            {path: 'inicio', component:HomeComponent, title: 'Conforzone Eficiencias | Soluciones de climatización'},
            {path: 'sobre-nosotros', component:AboutUsPageComponent, title: 'Sobre nosotros | Conforzone Eficiencias'},
            {path: 'servicios', component:ServicesPageComponent, title: 'Servicios al mejor precio | Conforzone Eficiencias'},
            {path: 'nuestro-trabajo', component:OurJobPageComponent, title: 'Nuestro trabajo | Conforzone Eficiencias'},
            {path: 'ofertas', component:OffersPageComponent, title: 'Ofertas al mejor precio | Conforzone Eficiencias'},
            {path: 'contacto', component:ContactPageComponent, title: 'Contáctanos | Conforzone Eficiencias'},
            {path: 'servicios/:slug', component: SpecificServiceComponent},
            {path: 'servicios/:slug/:id', component: SpecificServiceDetailComponent},
            {path: 'ofertas/:id', component: SpecificServiceDetailComponent},
            {path:'politica-de-privacidad', component: PagePrivacityPolicyComponent, title: 'Política de privacidad | Conforzone Eficiencias'},
            {path: '**', redirectTo:'/inicio'}
        ]
    },
];
