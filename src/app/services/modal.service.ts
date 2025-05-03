import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  closeModal(modalId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById(modalId)
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide()
        }
      }
    }
  }
}
