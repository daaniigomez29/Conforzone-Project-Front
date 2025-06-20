import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthUserService } from '../../../services/auth-user.service';
import { FooterComponent } from '../../../components/footer/footer/footer.component';
import { PopoverService } from '../../../services/popover.service';
import { LinksMobilePcService } from '../../../services/links-mobile-pc.service';
import * as AOS from 'aos';
import { CanonicalURLService } from '../../../services/canonical-url.service';
import { isPlatformBrowser, PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-navbar-view',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './navbar-view.component.html',
  styleUrl: './navbar-view.component.css'
})
export class NavbarViewComponent {

  @ViewChild('triggerSection') triggerSection!: ElementRef;

  whatsappContactLink: string = '';

  emailContactLink: string = '';

  constructor(public authService: AuthUserService, public router: Router, public popoverService: PopoverService, private linksMobilePcService: LinksMobilePcService, private canonicalService: CanonicalURLService, private platformLocation: PlatformLocation, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    let origin = 'https://www.conforzoneeficiencias.es';
    let navbar = document.querySelector(".navbar");
    let navbarMobile = document.querySelector(".navbar-mobile");
    this.router.url.includes("/inicio") ? navbar?.classList.toggle("is-home") : ''
    this.router.url.includes("/inicio") ? navbarMobile?.classList.toggle("is-home") : ''

    const canonicalURLOnInit = origin + this.router.url;
    this.canonicalService.setCanonicalURL(canonicalURLOnInit); //Añado canonicalURL a la ruta que carga el usuario directamente

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        event.urlAfterRedirects == "/inicio" ? navbar?.classList.toggle("is-home") : navbar?.classList.remove("is-home");
        event.urlAfterRedirects == "/inicio" ? navbarMobile?.classList.toggle("is-home") : navbarMobile?.classList.remove("is-home"); //Al recargar la página el navbar se queda blanco


        const canonicalUrl = origin + event.urlAfterRedirects;
        this.canonicalService.setCanonicalURL(canonicalUrl); //Añado canonicalURL a la ruta que carga el usuario viajando a través del navbar
      }
    });

    this.whatsappContactLink = this.linksMobilePcService.getWhatsappContactLink()
    this.emailContactLink = this.linksMobilePcService.getEmailContactLink()
  }

  ngAfterViewInit() {
    this.popoverService.initPopovers()

    AOS.init({
      duration: '600',
      easing: 'ease-out',
      once: true, // solo una vez al entrar en viewport
      disable: () => typeof window !== 'undefined' && window.innerWidth < 900
    });
  }

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Cambia cuando bajas 50px
  }

  goToUserView() {
    this.router.navigateByUrl('/inicio', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/inicio/usuarios/", this.authService.getUserData().id])
    })
  }

  logout() {
    this.authService.logout()
  }
}
