import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { SpecificServiceService } from '../../../services/specific-service.service';
import { SpecificService } from '../../../interfaces/SpecificService';
import {INSTALLATIONS} from '../../../js/installations'
import {availableContact} from '../../../js/disponibilityHour'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specific-service-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './specific-service-detail.component.html',
  styleUrl: './specific-service-detail.component.css'
})
export class SpecificServiceDetailComponent {

  specificServiceId:number = -1

  slug:string | null = ""

  installationLabel:string | undefined = ""

  specificService:SpecificService = {
    id:this.specificServiceId,
    name: "",
    description: ""
  }

  quantity:number = 1

  servicePrice:number = 150.00

  additionalMeterPrice:number = 33.00

  quantityAdditionalMeter:number = 1

  totalPrice:number = this.servicePrice

  descriptionService:string = "Hasta 3 metros de recorrido frigorífico entre unidad interior y exterior con tubería de cobre de 1/4 y 3/8 con aislamiento térmico para exterior, incluyendo también hasta 3 metros de canaleta de PVC blanca de protección tanto en instalación interior como exterior para la parte vista del circuito frigorífico. Apertura de un calo pasamuros en cerramiento de obra de hasta 40 cm de espesor y posterior sellado del mismo con masilla acrílica blanca (No incluye apertura de huecos en hormigón). Soportes y silentblock en caso de que la unidad exterior vaya colgada en cerramiento, o bien, soportes antivibratorios de suelo en caso de que la unidad exterior esté ubicada en suelo. Hasta 3 metros de cableado de interconexión de maniobra entre unidad interior y exterior. Hasta 3 metros de manguera blanca de alimentación eléctrica entre punto de corriente más cercano y equipo (sin canaleta, fijada con grapas a pared), nuestros técnicos siempre intentarán de que la manguera esté lo menos visible posible. Hasta 3 metros de tubería de desagüe. Accesorios y pequeño material necesario para la instalación";
  arrayDescription = this.descriptionService.split(".")

public constructor(public route:ActivatedRoute, public specificServiceService:SpecificServiceService){

}

ngOnInit(){
  let id = this.route.snapshot.params['id']
  this.slug = this.route.snapshot.params['slug']
  this.specificServiceId = id ? id : 0

  this.findSlug()

  this.specificServiceService.getSpecificServiceById(this.specificServiceId).subscribe({
    next: data => {
      this.specificServiceId = data.id
      this.specificService.name = data.name
      this.specificService.description = data.description
    },
    error : err => {
      console.error(err)
    }
  })

  availableContact("link-with-underline-whatsapp", "disabled")
}

findSlug(){
    this.slug = this.route.snapshot.paramMap.get('slug')
    const match = INSTALLATIONS.find(i => i.slug === this.slug)
    this.installationLabel = match ? INSTALLATIONS.find(i => i.slug === this.slug)?.label : ''
  }

  increment() {
    this.quantity++;
    this.totalPrice = this.totalPrice + this.servicePrice
  }

  incrementAdditionalMeter() {
    this.quantityAdditionalMeter++;
    this.totalPrice = this.totalPrice + this.additionalMeterPrice
  }

  decrement() {
    if(this.quantity > 1) {
      this.quantity--;
      this.totalPrice = this.totalPrice - this.servicePrice
    }
  }

  decrementAdditionalMeter() {
    if(this.quantityAdditionalMeter > 1) {
      this.quantityAdditionalMeter--;
      this.totalPrice = this.totalPrice - this.additionalMeterPrice
    }
  }

}
