import { Component, NgModule} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpecificServiceService } from '../../../services/specific-service.service';
import {INSTALLATIONS} from '../../../js/installations'
import { SpecificService } from '../../../interfaces/SpecificService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specific-service',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './specific-service.component.html',
  styleUrl: './specific-service.component.css'
})
export class SpecificServiceComponent {

    slug:string | null = ''

    installationName:string = ''
    installationPhrase:string | undefined = ''
    readonly repeatCount = Array.from({ length: 5 });

    specificServicesArray:SpecificService[] = []

  constructor(private route:ActivatedRoute, public specificServiceService:SpecificServiceService){

  }

  ngOnInit(){
     this.findSlug()

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
}
