import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpecificServiceService } from '../../../services/specific-service.service';
import { SpecificService } from '../../../interfaces/SpecificService';
import { SpecificServicesGeneralViewComponent } from '../../specific_services/specific-services-general-view/specific-services-general-view.component';

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [RouterModule, CommonModule, SpecificServicesGeneralViewComponent],
  templateUrl: './offers-page.component.html',
  styleUrl: './offers-page.component.css'
})
export class OffersPageComponent {

  offersArray:SpecificService[] = []

  public constructor(public specificServiceService:SpecificServiceService){}

  ngOnInit(){
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
