import { AfterViewInit, Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.css'
})
export class AboutUsPageComponent implements AfterViewInit{

  constructor(private meta:Meta){}


  ngOnInit() {  
    this.meta.updateTag({
      name: 'description',
      content: 'Nuestra empresa. Cómo trabajamos y que es lo que ofrecemos para que confíe en nosotros.'
    });

    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'aire acondicionado, aire acondicionado barato, aire acondicionado Sevilla, aire acondicionado Málaga, aire acondicionado Córdoba, aire acondicionado Huelva, aire acondicionado Cádiz, instalar aire acondicionado, climatización, mantenimiento, placas solares, Conforzone, servicio, servicios, conductos, cassette, suelo, techo, suelo techo, termos, termos eléctricos, aerotermia'
    });

    this.meta.updateTag({
      property: 'og:title',
      content: 'Sobre nosotros | Conforzone Eficiencias'
    });

    this.meta.updateTag({
      property: 'og:description',
      content: 'Nuestra empresa. Cómo trabajamos y que es lo que ofrecemos para que confíe en nosotros.'
    });
  }

  ngAfterViewInit(): void {
    AOS.init({
     offset: 50,
     duration: 900,
     easing: 'ease-out',
     once: true, // solo una vez al entrar en viewport
     disable: () => typeof window !== 'undefined' && window.innerWidth < 900
   });
   AOS.refresh()
  }
}
