import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
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

  constructor(private router: Router, private renderer:Renderer2) { }

  ngAfterViewOnInit() {
    this.loadImage()
    const modal = document.getElementById('wizardModal');

    if (modal) {
      (modal as HTMLElement).addEventListener('hidden.bs.modal', () => {
        const active = document.activeElement as HTMLElement;
        active?.blur();
      });
    }
  }

  loadImage() {
    const image = new Image();
    image.src = '../../../assets/background_home.webp';

    image.onload = () => {
      // Usamos el "type cast" para asegurarnos de que heroSection es un HTMLElement
      const heroSection = document.querySelector('.hero-section') as HTMLElement;

      if (heroSection) {
        // Aplicamos el fondo con Renderer2
        this.renderer.setStyle(heroSection, 'backgroundImage', `url('../../../assets/background_home.webp')`);
      }
    };
  }
}
