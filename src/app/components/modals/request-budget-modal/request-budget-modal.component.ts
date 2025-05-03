import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { SpecificServiceService } from '../../../services/specific-service.service';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestBudgetServicesModalComponent } from '../request-budget-services-modal/request-budget-services-modal.component';
import { RequestBudgetOffersModalComponent } from '../request-budget-offers-modal/request-budget-offers-modal.component';

@Component({
  selector: 'app-request-budget-modal',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, RequestBudgetServicesModalComponent, RequestBudgetOffersModalComponent],
  templateUrl: './request-budget-modal.component.html',
  styleUrl: './request-budget-modal.component.css'
})
export class RequestBudgetModalComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('offersComponent') offersComponent!: RequestBudgetOffersModalComponent;
  @ViewChild('servicesComponent') servicesComponent!: RequestBudgetServicesModalComponent;

  private routerSubscription: any

  errorString: string = ''

  @Input() step = 1;
  private modalElement:any

  //Step 1
  installationType = '';


  constructor(private router: Router, private modalService: ModalService, private specificServiceService: SpecificServiceService) { }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.modalService.closeModal('wizardModal')
      }
    })
  }

  ngAfterViewInit() {
    this.modalElement = document.getElementById('wizardModal');

    if(this.modalElement) {
      this.modalElement.addEventListener('hidden.bs.modal', this.onModalHidden)
    }
  }

  onModalHidden = () => {
    this.step = 1
    if(this.servicesComponent && this.servicesComponent.totalPrice > this.servicesComponent.specificServiceChoosed.firstPrice){
      console.log('1')
      this.servicesComponent.closeModal()
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription && !this.routerSubscription.unsubscribe()) {
      this.routerSubscription.unsubscribe()
    }

    if(this.modalElement) {
      this.modalElement.removeEventListener('hidden.bs.modal', this.onModalHidden)
    }
  }

  continueToStep2() {
    if(this.continueStep(2, this.installationType)){
      this.errorString = ""
      this.step = 2
      if(this.installationType === 'ofertas'){
        this.offersComponent.getAllSpecificServicesOffers()
      }
    } else {
      this.errorString = "Por favor, seleccione un tipo de solicitud"
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
