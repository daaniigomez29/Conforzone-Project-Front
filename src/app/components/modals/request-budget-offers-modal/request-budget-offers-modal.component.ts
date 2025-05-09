import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpecificService, SpecificServiceName } from '../../../interfaces/SpecificService';
import { INSTALLATIONS } from '../../../js/installations';
import { LinksMobilePcService } from '../../../services/links-mobile-pc.service';
import { SpecificServiceService } from '../../../services/specific-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-budget-offers-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './request-budget-offers-modal.component.html',
  styleUrl: './request-budget-offers-modal.component.css'
})
export class RequestBudgetOffersModalComponent {

  @Input() step = 1
  @Output() stepChange = new EventEmitter<number>();

  errorString: string = ''

  //Step 2 (Offers)

  //Step 3 (Offers)
  specificServicesOffersArray: SpecificServiceName[] = []
  specificServiceOfferChoosed: SpecificService = {
    id: -1,
    name: "",
    description: "",
    slug: "",
    firstPrice: 0,
    pricePerMeter: 0,
    available: false,
    offer: false,
    image: ""
  }

  specificServiceOfferChoosedId: number = -1

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

  constructor(private specificServiceService: SpecificServiceService, private linksMobilePcService: LinksMobilePcService) { }

  goBack() {
    this.stepChange.emit(1);
  }

  getAllSpecificServicesOffers() {
    this.errorString = ""
    if (this.specificServicesOffersArray.length === 0) {
      this.specificServiceService.getSpecificServicesOffers().subscribe({
        next: data => {
          this.specificServicesOffersArray = data;
        }
      })
    }
  }

  getSpecificServiceOfferChoosed() {
    if (this.continueStep(3, this.specificServiceOfferChoosedId.toString())) {
      this.errorString = ""
      this.quantity = 1
      this.totalPrice = 0
      if (this.specificServiceOfferChoosedId === -1 || this.specificServiceOfferChoosedId != this.specificServiceOfferChoosed.id) {
        this.specificServiceService.getOfferSpecificServicesById(this.specificServiceOfferChoosedId).subscribe({
          next: data => {
            this.specificServiceOfferChoosed.id = data.id
            this.specificServiceOfferChoosed.name = data.name;
            this.specificServiceOfferChoosed.firstPrice = data.firstPrice;
            this.specificServiceOfferChoosed.pricePerMeter = data.pricePerMeter;
            this.specificServiceOfferChoosed.image = data.image;

            this.totalPrice = data.firstPrice
          }
        })
      }
    } else {
      this.errorString = "Por favor, seleccione una oferta para continuar"
    }
  }

  selectCityStep() {
    if (this.continueStep(4, this.installationPlace)) {
      this.errorString = ""
      this.whatsappRequestBudgetMessage = this.linksMobilePcService.whatsappRequestBudgetMessage(this.specificServiceOfferChoosed.name, this.quantity, this.quantityAdditionalMeter, this.installationPlace, true)
      this.emailRequestBudgetMessage = this.linksMobilePcService.emailRequestBudgetMessage(this.specificServiceOfferChoosed.name, this.quantity, this.quantityAdditionalMeter, this.installationPlace, true)
    } else {
      this.errorString = "Por favor, seleccione una ciudad para continuar"
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
}
