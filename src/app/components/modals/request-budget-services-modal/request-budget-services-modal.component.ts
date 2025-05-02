import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INSTALLATIONS } from '../../../js/installations';
import { SpecificService } from '../../../interfaces/SpecificService';
import { SpecificServiceService } from '../../../services/specific-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
      offer: false
    }

    specificServiceChoosedId:number = -1
  
    //Step 4 (Services)
    quantity: number = 1
    totalPrice: number = 0
  
  
    //Step 5 (Services)
    totalPriceWithAdditionalMeter = 0
  
    quantityAdditionalMeter: number = 0

    constructor(private specificServiceService: SpecificServiceService) { }

    goBack(){
      this.stepChange.emit(1);
    }
    
    getAllSpecificServicesBySlug() {
      this.step = 3
      if(this.specificServicesArray.length === 0 || this.specificServicesArray[0].slug != this.installationServiceSlug){
        this.specificServiceService.getAllSpecificServicesBySlug(this.installationServiceSlug).subscribe({
          next: data => {
            this.specificServicesArray = data
          }
        })
      }
    }
  
    getSpecificServiceChoosed() {
      this.step = 4
      this.quantity = 1
      this.totalPrice = 0
      if(this.specificServiceChoosedId === -1 || this.specificServiceChoosedId != this.specificServiceChoosed.id){
        this.specificServiceService.getSpecificServiceBySlugAndId(this.installationServiceSlug, this.specificServiceChoosedId).subscribe({
          next: data => {
            this.specificServiceChoosed.id = data.id
            this.specificServiceChoosed.name = data.name;
            this.specificServiceChoosed.firstPrice = data.firstPrice;
            this.specificServiceChoosed.pricePerMeter = data.pricePerMeter;
    
            this.totalPrice = data.firstPrice
          }
        })
      }
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
  
    goStep5() {
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
