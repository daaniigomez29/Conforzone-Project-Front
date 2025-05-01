import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { SpecificServiceService } from '../../../services/specific-service.service';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestBudgetServicesModalComponent } from '../request-budget-services-modal/request-budget-services-modal.component';

@Component({
  selector: 'app-request-budget-modal',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, RequestBudgetServicesModalComponent],
  templateUrl: './request-budget-modal.component.html',
  styleUrl: './request-budget-modal.component.css'
})
export class RequestBudgetModalComponent implements OnInit, OnDestroy{

  private routerSubscription: any

  @Input() step = 1;

  installationPlace = ''

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

  ngOnDestroy() {
    if (this.routerSubscription && !this.routerSubscription.unsubscribe()) {
      this.routerSubscription.unsubscribe()
    }
  }
}
