import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestBudgetModalComponent } from '../modals/request-budget-modal/request-budget-modal.component';
import { RouterModule } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, RequestBudgetModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  step = 0

  constructor(private meta:Meta){}

  ngOnInit(){
    this.meta.updateTag({
      name: 'description',
      content: 'Conforzone Eficiencias es una empresa especializada en la instalación, venta y mantenimiento de sistemas de climatización como aire acondicionado, termos y placas solares. Operamos en varias ciudades ofreciendo eficiencia, calidad y servicio profesional.'
    });

    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'aire acondicionado, aire acondicionado barato, aire acondicionado Sevilla, aire acondicionado Málaga, aire acondicionado Córdoba, aire acondicionado Huelva, aire acondicionado Cádiz, instalar aire acondicionado, climatización, mantenimiento, placas solares, Conforzone, servicio, servicios, conductos, cassette, suelo, techo, suelo techo, termos, termos eléctricos, aerotermia'
    });

    this.meta.updateTag({
      property: 'og:title',
      content: 'Conforzone Eficiencias | Soluciones de climatización'
    });

    this.meta.updateTag({
      property: 'og:description',
      content: 'Conforzone Eficiencias es una empresa especializada en la instalación, venta y mantenimiento de sistemas de climatización como aire acondicionado, termos y placas solares. Operamos en varias ciudades ofreciendo eficiencia, calidad y servicio profesional.'
    });
  }
}
