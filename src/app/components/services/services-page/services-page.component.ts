import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestBudgetModalComponent } from '../../modals/request-budget-modal/request-budget-modal.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [RouterModule, RequestBudgetModalComponent],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.css'
})
export class ServicesPageComponent {
    step = 0

    ngOnInit(){
      
    }
}
