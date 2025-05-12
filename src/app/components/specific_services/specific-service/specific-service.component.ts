import { Component} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpecificServiceService } from '../../../services/specific-service.service';
import {INSTALLATIONS} from '../../../js/installations'
import { SpecificService } from '../../../interfaces/SpecificService';
import { CommonModule } from '@angular/common';
import { SpecificServicesGeneralViewComponent } from '../specific-services-general-view/specific-services-general-view.component';
import { Meta, Title } from '@angular/platform-browser';

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

  constructor(private route:ActivatedRoute, public specificServiceService:SpecificServiceService, private title:Title, private meta:Meta){

  }

  ngOnInit(){
    this.meta.updateTag({
      name: 'description',
      content: 'Descubre algunos de nuestros servicios disponibles. Calidad, profesionalidad y eficiencia en cada proyecto.'
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
      property: 'og:description',
      content: 'Descubre algunos de nuestros servicios disponibles. Calidad, profesionalidad y eficiencia en cada proyecto.'
    });

     this.findSlug()

     this.specificServiceService.getAllSpecificServicesBySlug(this.slug).subscribe({
      next: data => {
       this.specificServicesArray = data
      },
      error: err => {
        console.error(err)
      }
     })
  }

  findSlug(){
    this.slug = this.route.snapshot.paramMap.get('slug')
    const match = INSTALLATIONS.find(i => i.slug === this.slug)
    this.installationPhrase = INSTALLATIONS.find(i => i.slug === this.slug)?.subname
    this.installationName = match ? match.name : 'La instalación no se ha encontrado o no existe'
    this.title.setTitle(this.installationName + " barato | Conforzone Eficiencias")

    this.meta.updateTag({
      property: 'og:title',
      content: `${this.installationName} barato | Conforzone Eficiencias`
    });
  }

  getLink(slug:string) {
    return `/servicios/${slug}`
  }
}
