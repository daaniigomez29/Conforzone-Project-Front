import { Component, NgModule} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpecificServiceService } from '../../../services/specific-service.service';
import {INSTALLATIONS} from '../../../js/installations'
import { SpecificService } from '../../../interfaces/SpecificService';
import { CommonModule } from '@angular/common';
import { SpecificServicesGeneralViewComponent } from '../specific-services-general-view/specific-services-general-view.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-specific-service',
  standalone: true,
  imports: [RouterModule, CommonModule, SpecificServicesGeneralViewComponent],
  templateUrl: './specific-service.component.html',
  styleUrl: './specific-service.component.css'
})
export class SpecificServiceComponent {

    slug:string | null = ''

    installationName:string = ''
    installationPhrase:string | undefined = ''

    specificServicesArray:SpecificService[] = []

  constructor(private route:ActivatedRoute, public specificServiceService:SpecificServiceService, private title:Title){

  }

  ngOnInit(){
     this.findSlug()
     this.title.setTitle(this.installationName + " barato | Conforzone Eficiencias")
     

     this.specificServiceService.getAllSpecificServicesBySlug(this.slug).subscribe({
      next: data => {
       this.specificServicesArray = data
      },
      error: err => {

      }
     })
  }

  findSlug(){
    this.slug = this.route.snapshot.paramMap.get('slug')
    const match = INSTALLATIONS.find(i => i.slug === this.slug)
    this.installationPhrase = INSTALLATIONS.find(i => i.slug === this.slug)?.subname
    this.installationName = match ? match.name : 'La instalación no se ha encontrado o no existe'
  }

  getLink(slug:string) {
    return `/servicios/${slug}`
  }
}
