import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  step = 1;
  installationType = '';
  installationPlace = ''
  unidadesInterior = 1;

  enviarPresupuesto() {
    this.step = 1
    console.log('Enviado:', this.installationType, this.unidadesInterior);
    // Aquí puedes cerrar el modal manualmente si usas ViewChild o servicios
  }

  constructor(private router:Router){}
}
