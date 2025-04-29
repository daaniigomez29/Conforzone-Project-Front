import { Injectable } from '@angular/core';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() {}

   closeModal(modalId:string) {
    const modalElement = document.getElementById(modalId)
    if(modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if(modalInstance){
        modalInstance.hide()
      }
    }
   }
}
