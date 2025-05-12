import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestBudgetModalComponent } from '../../modals/request-budget-modal/request-budget-modal.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [RouterModule, RequestBudgetModalComponent],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.css'
})
export class ServicesPageComponent {
  step = 0

  constructor(private meta: Meta) { }

  ngOnInit() {
    this.meta.updateTag({
      name: 'description',
      content: 'Servicios al mejor precio en Sevilla, Huelva, Cádiz, Córdoba y Málaga. Su instalación de cualquier equipo de climatización en unos instantes con la mejor seguridad.'
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
      content: 'Servicios al mejor precio | Conforzone Eficiencias'
    });

    this.meta.updateTag({
      property: 'og:description',
      content: 'Servicios al mejor precio en Sevilla, Huelva, Cádiz, Córdoba y Málaga. Su instalación de cualquier equipo de climatización en unos instantes con la mejor seguridad.'
    });
  }
}
