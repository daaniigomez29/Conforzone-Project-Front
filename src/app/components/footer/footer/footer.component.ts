import { Component } from '@angular/core';
import { LinksMobilePcService } from '../../../services/links-mobile-pc.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  emailContactLink:string = ''

  constructor(private linksMobilePcService:LinksMobilePcService){}

  ngOnInit(){
    this.emailContactLink = this.linksMobilePcService.getEmailContactLink()
  }

}
