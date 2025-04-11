import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthUserService } from '../../../services/auth-user.service';
import { NgClass, NgOptimizedImage } from '@angular/common'
import { FooterComponent } from '../../../components/footer/footer/footer.component';
import {availableContact} from '../../../js/disponibilityHour'

@Component({
  selector: 'app-navbar-view',
  standalone: true,
  imports: [RouterModule, FooterComponent, NgClass],
  templateUrl: './navbar-view.component.html',
  styleUrl: './navbar-view.component.css'
})
export class NavbarViewComponent {

  @ViewChild('triggerSection') triggerSection!: ElementRef;

  daysOfWeek = ['1', '2', '3', '4', '5', '6', '7']

  constructor(public authService: AuthUserService, public router: Router) { }

  ngOnInit() {
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
    availableContact("whatsapp-icon", "disabled")
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
