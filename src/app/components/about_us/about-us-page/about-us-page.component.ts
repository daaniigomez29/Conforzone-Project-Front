import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.css'
})
export class AboutUsPageComponent implements AfterViewInit{


  ngOnInit() {  
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
      threshold: 0.5
    });

    const observerRight = new IntersectionObserver(loadTextRight, {
      threshold: 0.5,
    });

    textsLeft.forEach(el => observerLeft.observe(el));
    textsRight.forEach(el => observerRight.observe(el));
    }
  }
}
