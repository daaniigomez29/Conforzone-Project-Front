import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinksMobilePcService {

  constructor() { }


  private isInMobile(){
    return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }


  getWhatsappContactLink() {
     let link = `https://web.whatsapp.com/send?l=es&phone=34674867824&text=Has contactado con Conforzone Eficiencias y estamos para atenderte en lo que necesites. Muchas gracias`;

     if(this.isInMobile()){
      link = `https://wa.me/34674867824?text=Has contactado con Conforzone Eficiencias y estamos para atenderte en lo que necesites. Muchas gracias`
     }

     return link;
  }

  getEmailContactLink(){
    let link = `https://mail.google.com/mail/?view=cm&fs=1&to=conforzoneeficiencias@gmail.com&su=Contacto&body=Has%20contactado%20con%20Conforzone%20Eficiencias%20y%20estamos%20para%20atenderte%20en%20lo%20que%20necesites.%20Muchas%20gracias`;
  
    if(this.isInMobile()) {
      link = `mailto:conforzoneeficiencias@gmail.com?subject=Contacto&body=Has contactado con Conforzone Eficiencias y estamos para atenderte en lo que necesites. Muchas gracias`
    }

    return link;
  }

  getWhatsappRequestBudgetLink(){
    let link = `https://web.whatsapp.com/send?l=es&phone=34674867824&text=`;

    if(this.isInMobile()) {
      link = `https://wa.me/34674867824?text=`;
    }

    return link;
  }

  getEmailRequestBudgetLink() {
    let link = `https://mail.google.com/mail/?view=cm&fs=1&to=conforzoneeficiencias@gmail.com&su=Solicitud%20de%20presupuesto&body=`

    if(this.isInMobile()) {
      link = `mailto:conforzoneeficiencias@gmail.com?subject=Solicitud de presupuesto&body=`
    }

    return link;
  }
}
