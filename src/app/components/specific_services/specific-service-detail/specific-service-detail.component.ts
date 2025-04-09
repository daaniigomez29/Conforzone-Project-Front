import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { SpecificServiceService } from '../../../services/specific-service.service';
import { SpecificService } from '../../../interfaces/SpecificService';

@Component({
  selector: 'app-specific-service-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './specific-service-detail.component.html',
  styleUrl: './specific-service-detail.component.css'
})
export class SpecificServiceDetailComponent {

  specificServiceId:number = -1

  specificService:SpecificService = {
    id:this.specificServiceId,
    name: "",
    description: ""
  }

  slug:string = ""

public constructor(public route:ActivatedRoute, public specificServiceService:SpecificServiceService){

}

ngOnInit(){
  let id = this.route.snapshot.params['id']
  this.slug = this.route.snapshot.params['slug']
  this.specificServiceId = id ? id : 0

  this.specificServiceService.getSpecificServiceById(this.specificServiceId).subscribe({
    next: data => {
      this.specificServiceId = data.id
      this.specificService.name = data.name
      this.specificService.description = data.description
    },
    error : err => {
      console.error(err)
    }
  })
}

}
