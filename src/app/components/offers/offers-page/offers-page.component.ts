import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpecificServiceService } from '../../../services/specific-service.service';
import { SpecificService } from '../../../interfaces/SpecificService';
import { SpecificServicesGeneralViewComponent } from '../../specific_services/specific-services-general-view/specific-services-general-view.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [RouterModule, CommonModule, SpecificServicesGeneralViewComponent],
  templateUrl: './offers-page.component.html',
  styleUrl: './offers-page.component.css'
})
export class OffersPageComponent {

  offersArray:SpecificService[] = []

  public constructor(public specificServiceService:SpecificServiceService, private meta:Meta){}

  ngOnInit(){
    this.meta.updateTag({
      name: 'description',
      content: 'Ofertas al mejor precio en Sevilla, Huelva, Cádiz, Córdoba y Málaga. Su instalación y/o equipo de climatización en unos instantes con la mejor seguridad.'
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
      content: 'Ofertas al mejor precio | Conforzone Eficiencias'
    });

    this.meta.updateTag({
      property: 'og:description',
      content: 'Ofertas al mejor precio en Sevilla, Huelva, Cádiz, Córdoba y Málaga. Su instalación y/o equipo de climatización en unos instantes con la mejor seguridad.'
    });


    this.specificServiceService.getSpecificServicesOffers().subscribe({
      next: value => {
        this.offersArray = value
      }
    })
  }

  getLink(slug:string) {
    return `/${slug}`
  }
}
