import { Component, Input } from '@angular/core';
import { SpecificService } from '../../../interfaces/SpecificService';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { SpecificServiceService } from '../../../services/specific-service.service';
import { CommonModule } from '@angular/common';
import { INSTALLATIONS } from '../../../js/installations';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-specific-services-general-view',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './specific-services-general-view.component.html',
  styleUrl: './specific-services-general-view.component.css'
})
export class SpecificServicesGeneralViewComponent {

  @Input() slug: string | null = ''


  @Input() specificServicesArray: SpecificService[] = []

  @Input() linkSlug:string = ""

  constructor(private route: ActivatedRoute, public specificServiceService: SpecificServiceService, public loaderService:LoaderService) {

  }

  ngOnInit() {
  }
}
