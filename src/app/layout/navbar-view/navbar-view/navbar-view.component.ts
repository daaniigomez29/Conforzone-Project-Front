import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../../components/footer/footer/footer.component';
import { PopoverService } from '../../../services/popover.service';
import { LinksMobilePcService } from '../../../services/links-mobile-pc.service';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(public router: Router, public popoverService: PopoverService, private linksMobilePcService: LinksMobilePcService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      let navbar = document.querySelector(".navbar");
      let navbarMobile = document.querySelector(".navbar-mobile");
      this.router.url.includes("/inicio") ? navbar?.classList.toggle("is-home") : ''
      this.router.url.includes("/inicio") ? navbarMobile?.classList.toggle("is-home") : ''

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          event.urlAfterRedirects == "/inicio" ? navbar?.classList.toggle("is-home") : navbar?.classList.remove("is-home");
          event.urlAfterRedirects == "/inicio" ? navbarMobile?.classList.toggle("is-home") : navbarMobile?.classList.remove("is-home"); //Al recargar la página el navbar se queda blanco

        }
      });

      this.whatsappContactLink = this.linksMobilePcService.getWhatsappContactLink()
      this.emailContactLink = this.linksMobilePcService.getEmailContactLink()
    }
  }

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Cambia cuando bajas 50px
  }

  ngAfterViewInit() {
    this.popoverService.initPopovers()
  }
}
