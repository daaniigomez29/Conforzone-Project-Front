import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-our-job-page',
  standalone: true,
  imports: [],
  templateUrl: './our-job-page.component.html',
  styleUrl: './our-job-page.component.css'
})
export class OurJobPageComponent {
  constructor(private meta:Meta){}

  ngOnInit(){
    this.meta.updateTag({
      name: 'description',
      content: 'Descubre algunos de nuestros trabajos en instalación de aire acondicionado, termos, placas solares y sistemas de climatización. Calidad, profesionalidad y eficiencia en cada proyecto.'
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
      content: 'Nuestro trabajo | Conforzone Eficiencias'
    });

    this.meta.updateTag({
      property: 'og:description',
      content: 'Descubre algunos de nuestros trabajos en instalación de aire acondicionado, termos, placas solares y sistemas de climatización. Calidad, profesionalidad y eficiencia en cada proyecto.'
    });
  }
}
