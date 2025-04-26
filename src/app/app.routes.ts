import { Routes } from '@angular/router';
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
import { PageNotFoundComponent } from './components/page_not_found/page-not-found/page-not-found.component';
import { PagePrivacityPolicyComponent } from './components/page_policy/page-privacity-policy/page-privacity-policy.component';

export const routes: Routes = [
    {path: '', redirectTo:'inicio', pathMatch:'full'},
    {path: 'login-secret655', component:LoginComponent},
    {path: '', component:NavbarViewComponent,
        children:[
            {path: 'inicio', component:HomeComponent},
            {path: 'sobre-nosotros', component:AboutUsPageComponent},
            {path: 'servicios', component:ServicesPageComponent},
            {path: 'nuestro-trabajo', component:OurJobPageComponent},
            {path: 'ofertas', component:OffersPageComponent},
            {path: 'contacto', component:ContactPageComponent},
            {path: 'servicios/:slug', component: SpecificServiceComponent},
            {path: 'servicios/:slug/:id', component: SpecificServiceDetailComponent},
            {path: 'ofertas/:id', component: SpecificServiceDetailComponent},
            {path:'politica-de-privacidad', component: PagePrivacityPolicyComponent},
            {path: '**', redirectTo:'/inicio'}
        ]
    },
];
