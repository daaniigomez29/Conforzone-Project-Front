import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { INSTALLATIONS } from '../../js/installations';
import { ModalService } from '../../services/modal.service';

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
  installationService = '';

  //Step 2 (Offers)

  //Step 3 ()

  enviarPresupuesto() {
    this.step = 1
    // Aquí puedes cerrar el modal manualmente si usas ViewChild o servicios
  }

  constructor(private router: Router, private modalService:ModalService) { }

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
}
