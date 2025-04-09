import { Component, NgModule} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpecificServiceService } from '../../../services/specific-service.service';

@Component({
  selector: 'app-specific-service',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './specific-service.component.html',
  styleUrl: './specific-service.component.css'
})
export class SpecificServiceComponent {

   INSTALLATIONS = [
    {slug: 'instalacion-split-pared', name: 'Instalación Básica Split de Pared', subname: 'AIRE ACONDICIONADO SPLIT PARED'},
    {slug: 'instalacion-multisplit-pared', name: 'Instalación Básica Multisplit de Pared', subname: 'AIRE ACONDICIONADO MULTISPLIT PARED'},
    {slug: 'instalacion-conductos', name: 'Instalación Básica Equipo de Conductos', subname: 'AIRE ACONDICIONADO POR CONDUCTOS'},
    {slug: 'instalacion-equipo-casette', name: 'Instalación Básica Equipo de Cassette', subname: 'AIRE ACONDICIONADO CASSETTE'},
    {slug: 'instalacion-equipo-suelo-techo', name: 'Instalación Básica Equipo Suelo Techo', subname: 'AIRE ACONDICIONADO SUELO TECHO'},
    {slug: 'instalacion-paneles-placas-solares', name: 'Instalación Básica de Placas y Paneles Solares', subname: 'PLACA SOLAR'},
    {slug: 'instalacion-termos-electricos', name: 'Instalación Básica de Termos Eléctricos', subname: 'TERMO ELÉCTRICO'},
    {slug: 'instalacion-acumulador-aerotermia', name: 'Instalación Básica Acumulador por Aerotermia', subname: 'ACUMULADOR POR AEROTERMIA'},
  ]

    slug:string | null = ''

    installationName:string = ''
    installationPhrase:string | undefined = ''
    readonly repeatCount = Array.from({ length: 5 });

  constructor(private route:ActivatedRoute, public specificServiceService:SpecificServiceService){

  }

  ngOnInit(){
     this.findSlug()
  }

  findSlug(){
    this.slug = this.route.snapshot.paramMap.get('slug')
    const match = this.INSTALLATIONS.find(i => i.slug === this.slug)
    this.installationPhrase = this.INSTALLATIONS.find(i => i.slug === this.slug)?.subname
    this.installationName = match ? match.name : 'La instalación no se ha encontrado o no existe'
  }
}
