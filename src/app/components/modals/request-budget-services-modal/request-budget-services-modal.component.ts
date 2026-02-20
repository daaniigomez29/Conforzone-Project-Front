import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INSTALLATIONS } from '../../../js/installations';
import { SpecificService } from '../../../interfaces/SpecificService';
import { SpecificServiceService } from '../../../services/specific-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LinksMobilePcService } from '../../../services/links-mobile-pc.service';

@Component({
  selector: 'app-request-budget-services-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './request-budget-services-modal.component.html',
  styleUrl: './request-budget-services-modal.component.css'
})
export class RequestBudgetServicesModalComponent {

  @Input() step = 1
  @Output() stepChange = new EventEmitter<number>();

  errorString: string = ''

  //Step 2 (Services)
  installationsType = INSTALLATIONS;
  installationServiceSlug = '';

  //Step 2 (Offers)

  //Step 3 (Services)
  specificServicesArray: SpecificService[] = []
  specificServiceChoosed: SpecificService = {
    id: -1,
    name: "",
    description: "",
    slug: "",
    firstPrice: 0,
    pricePerMeter: 0,
    available: false,
    offer: false,
    image:""
  }

  specificServiceChoosedId: number = -1

  //Step 4 (Services)
  quantity: number = 1
  totalPrice: number = 0


  //Step 5 (Services)
  totalPriceWithAdditionalMeter = 0

  quantityAdditionalMeter: number = 0

  //Step 6 (Services)
  installationPlace = ''

  //Step 7 (Services)
  whatsappRequestBudgetMessage = ''
  emailRequestBudgetMessage = ''

  constructor(private specificServiceService: SpecificServiceService, private linksMobilePcService:LinksMobilePcService) { }

  goBack() {
    this.stepChange.emit(1);
  }

  getAllSpecificServicesBySlug() {
    if (this.continueStep(3, this.installationServiceSlug)) {
      this.specificServiceChoosedId = -1
      this.errorString = ""
      if (this.specificServicesArray.length === 0 || this.specificServicesArray[0].slug != this.installationServiceSlug) {
        this.specificServiceService.getAllSpecificServicesBySlug(this.installationServiceSlug).subscribe({
          next: data => {
            this.specificServicesArray = data
          }
        })
      }
    } else {
      this.errorString = "Por favor, seleccione un tipo de instalación para continuar"
    }
  }

  getSpecificServiceChoosed() {
    if (this.continueStep(4, this.specificServiceChoosedId.toString())) {
      this.errorString = ""
      this.quantity = 1
      if (this.specificServiceChoosedId === -1 || this.specificServiceChoosedId != this.specificServiceChoosed.id) {
        this.specificServiceService.getSpecificServiceBySlugAndId(this.installationServiceSlug, this.specificServiceChoosedId).subscribe({
          next: data => {
            this.specificServiceChoosed.id = data.id
            this.specificServiceChoosed.name = data.name;
            this.specificServiceChoosed.firstPrice = data.firstPrice;
            this.specificServiceChoosed.pricePerMeter = data.pricePerMeter;
            this.specificServiceChoosed.image = data.image;

            this.totalPrice = data.firstPrice
          }
        })
      }
    } else {
      this.errorString = "Por favor, seleccione una instalación para continuar"
    }
  }

  increment() {
    this.quantity++;
    //this.totalPrice += this.specificServiceChoosed.firstPrice
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      //this.totalPrice -= this.specificServiceChoosed.firstPrice
    }
  }

  goStep3() {
    this.step = 3
    //this.totalPrice = this.specificServiceChoosed.firstPrice
  }

  goStep5() {
    this.step = 5
    this.quantityAdditionalMeter = 0
    //this.totalPriceWithAdditionalMeter = this.totalPrice
  }

  selectCityStep() {
    if(this.continueStep(7, this.installationPlace)) {
      this.errorString = ""
      this.whatsappRequestBudgetMessage = this.linksMobilePcService.whatsappRequestBudgetMessage(this.specificServiceChoosed.name, this.quantity, this.quantityAdditionalMeter, this.installationPlace, false)
      this.emailRequestBudgetMessage = this.linksMobilePcService.emailRequestBudgetMessage(this.specificServiceChoosed.name, this.quantity, this.quantityAdditionalMeter, this.installationPlace, false)
    } else {
      this.errorString = "Por favor, seleccione una ciudad para continuar"
    }
  }

  incrementAdditionalMeter() {
    this.quantityAdditionalMeter++;
    //this.totalPriceWithAdditionalMeter += this.specificServiceChoosed.pricePerMeter
  }

  decrementAdditionalMeter() {
    if (this.quantityAdditionalMeter > 0) {
      this.quantityAdditionalMeter--;
      //this.totalPriceWithAdditionalMeter -= this.specificServiceChoosed.pricePerMeter
    }
  }

  noValid(field: string): boolean {
    return field === "" || Number.parseInt(field) === -1;
  }

  continueStep(stepNumber: number, field: string): boolean {
    if (!this.noValid(field)) {
      this.step = stepNumber;
      return true;
    } else {
      return false;
    }
  }

  closeModal(){
    if(this.totalPrice > 0){
      //this.totalPrice = this.specificServiceChoosed.firstPrice
    }
  }
}
