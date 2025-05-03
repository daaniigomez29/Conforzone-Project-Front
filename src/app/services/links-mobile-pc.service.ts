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
     let link = `https://web.whatsapp.com/send?l=es&phone=34674867824&text=`;

     if(this.isInMobile()){
      link = `https://wa.me/34674867824?text=`
     }

     return link;
  }

  getEmailContactLink(){
    let link = `https://mail.google.com/mail/?view=cm&fs=1&to=conforzoneeficiencias@gmail.com&su=Contacto&body=`;
  
    if(this.isInMobile()) {
      link = `mailto:conforzoneeficiencias@gmail.com?subject=Contacto&body=`
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

  whatsappRequestBudgetMessage(specificServiceName:string, quantity:number, quantityAdditionalMeter:number, installationPlace:string, offer:boolean) {
    const base = this.getWhatsappRequestBudgetLink()
    let messageWhatsapp = `¡Hola! Me gustaría solicitar la ${specificServiceName}. ${offer ? '' : `Necesitaría ${quantity} instalación/es.`} La instalación sería en ${installationPlace}.`

    if (quantityAdditionalMeter > 0) {
      messageWhatsapp = `¡Hola! Me gustaría solicitar la ${specificServiceName}. ${offer ? '' : `Necesitaría ${quantity} instalación/es y ${quantityAdditionalMeter} metro/s adicional/es.`} La instalación sería en ${installationPlace}.`
    }

    return base + encodeURIComponent(messageWhatsapp)
  }

  emailRequestBudgetMessage(specificServiceName:string, quantity:number, quantityAdditionalMeter:number, installationPlace:string, offer:boolean) {
    const base = this.getEmailRequestBudgetLink()
    let messageEmail

    if(!base.includes('mailto')){
        messageEmail = `Hola!%20Me%20gustaría%20solicitar%20la%20${specificServiceName}.${offer ? '' : `%20Necesitaría%20${quantity}%20instalación/es.`}%20La%20instalación%20sería%20en%20${installationPlace}.`
  
      if (quantityAdditionalMeter > 0) {
        messageEmail = `Hola!%20Me%20gustaría%20solicitar%20la%20${specificServiceName}.${offer ? '' : `%20Necesitaría%20${quantity}%20instalación/es%20y%20${quantityAdditionalMeter}%20metro/s%20adicional/es.`}%20La%20instalación%20sería%20en%20${installationPlace}.`
      }
    } else {
      messageEmail = `Hola! Me gustaría solicitar la ${specificServiceName}. ${offer ? '' : `Necesitaría ${quantity} instalación/es.Necesitaría ${quantity} instalación/es.`} La instalación sería en ${installationPlace}.`

      if(quantityAdditionalMeter > 0) {
        messageEmail = `Hola! Me gustaría solicitar la ${specificServiceName}. ${offer ? '' : `Necesitaría ${quantity} instalación/es.Necesitaría ${quantity} instalación/es y ${quantityAdditionalMeter} metro/s adicional/es.`} La instalación sería en ${installationPlace}.`
      }
    }

    return base + messageEmail
  }
}
