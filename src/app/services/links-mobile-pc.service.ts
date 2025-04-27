import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinksMobilePcService {

  constructor() { }


  isInMobile(){
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }


  getWhatsappInfoLink() {
     let link = `https://web.whatsapp.com/send?l=es&phone=34674867824&text=Has contactado con Conforzone Eficiencias y estamos para atenderte en lo que necesites. Muchas gracias`;

     if(this.isInMobile()){
      link = `https://wa.me/34674867824?text=Has contactado con Conforzone Eficiencias y estamos para atenderte en lo que necesites. Muchas gracias`
     }

     return link;
  }

  getEmailInfoLink(){
    
  }
}
