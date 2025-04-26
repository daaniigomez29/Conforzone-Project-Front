import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { INSTALLATIONS } from '../../js/installations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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

  constructor(private router:Router){}

  ngAfterViewOnInit(){
    const modal = document.getElementById('wizardModal');

    if(modal){
      (modal as HTMLElement).addEventListener('hidden.bs.modal', () => {
        const active = document.activeElement as HTMLElement;
        active?.blur();
      });
    }
  }
}
