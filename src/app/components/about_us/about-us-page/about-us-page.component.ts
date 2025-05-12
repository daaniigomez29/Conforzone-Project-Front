import { AfterViewInit, Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

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
    if(window.innerWidth > 1250) {
    const textsLeft = document.querySelectorAll('.animatedLeft');
    const textsRight = document.querySelectorAll('.animatedRight');

    document.querySelectorAll('.col-md-6').forEach(el => el.classList.add('invisible'))

    const loadTextLeft = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('invisible');
          entry.target.classList.add('fade-in-left');
          observer.unobserve(entry.target);
        }
      });
    };

    const loadTextRight = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('invisible');
          entry.target.classList.add('fade-in-right');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerLeft = new IntersectionObserver(loadTextLeft, {
      root: null, 
      rootMargin: '0px',
      threshold: 0.5
    });

    const observerRight = new IntersectionObserver(loadTextRight, {
      root: null, 
      rootMargin: '0px',
      threshold: 0.5,
    });

    textsLeft.forEach(el => observerLeft.observe(el));
    textsRight.forEach(el => observerRight.observe(el));
    }
  }
}
