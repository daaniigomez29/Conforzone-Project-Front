import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { INSTALLATIONS } from '../../js/installations';
import { ModalService } from '../../services/modal.service';
import { SpecificServiceService } from '../../services/specific-service.service';
import { SpecificService } from '../../interfaces/SpecificService';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{

  private routerSubscription:any

  step = 1;
  installationPlace = ''

  //Step 1
  installationType = '';

  //Step 2 (Services)
  installationsType = INSTALLATIONS;
  installationServiceSlug = '';

  //Step 2 (Offers)

  //Step 3 (Services)
  specificServicesArray:SpecificService[] = []
  specificServiceChoosed: SpecificService = {
    id: -1,
    name: "",
    description: "",
    slug: "",
    firstPrice: 0,
    pricePerMeter: 0,
    available: false,
    offer: false
  }

  //Step 4 (Services)
  quantity: number = 1
  totalPrice: number = 0


  //Step 5 (Services)
  totalPriceWithAdditionalMeter = 0

  quantityAdditionalMeter: number = 0

  enviarPresupuesto() {
    this.step = 1
    // Aquí puedes cerrar el modal manualmente si usas ViewChild o servicios
  }

  constructor(private router: Router, private modalService:ModalService, private specificServiceService:SpecificServiceService) { }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart){
        this.modalService.closeModal('wizardModal')
      }
    })
  }

  ngOnDestroy() {
    if (this.routerSubscription && !this.routerSubscription.unsubscribe()) {
      this.routerSubscription.unsubscribe()
    }
  }

  getAllSpecificServicesBySlug() {
    this.specificServicesArray = []
    this.step = 3
    this.specificServiceService.getAllSpecificServicesBySlug(this.installationServiceSlug).subscribe({
      next: data => {
        this.specificServicesArray = data
      }
    })
  }

  getSpecificServiceChoosed() {
    this.step = 4
    this.quantity = 1
    this.totalPrice = 0
    this.specificServiceService.getSpecificServiceBySlugAndId(this.installationServiceSlug, this.specificServiceChoosed.id).subscribe({
      next: data => {
        this.specificServiceChoosed.name = data.name;
        this.specificServiceChoosed.firstPrice = data.firstPrice;
        this.specificServiceChoosed.pricePerMeter = data.pricePerMeter;
        
        this.totalPrice = data.firstPrice
      }
    })
  }

  increment() {
    this.quantity++;
    this.totalPrice += this.specificServiceChoosed.firstPrice
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.totalPrice -= this.specificServiceChoosed.firstPrice
    }
  }

  goStep5(){
    this.step = 5
    this.quantityAdditionalMeter = 0
    this.totalPriceWithAdditionalMeter = this.totalPrice
  }

  incrementAdditionalMeter() {
    this.quantityAdditionalMeter++;
    this.totalPriceWithAdditionalMeter += this.specificServiceChoosed.pricePerMeter
  }

  decrementAdditionalMeter() {
    if (this.quantityAdditionalMeter > 0) {
      this.quantityAdditionalMeter--;
      this.totalPriceWithAdditionalMeter -= this.specificServiceChoosed.pricePerMeter
    }
  }
}
