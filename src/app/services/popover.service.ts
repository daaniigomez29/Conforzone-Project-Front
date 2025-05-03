import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  initPopovers() {
    if (isPlatformBrowser(this.platformId)) {
      const popoverTriggerList = Array.from(document.querySelectorAll<HTMLElement>('[data-bs-toggle="popover"]'))
      popoverTriggerList.map(
        (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
      )
    }
  }
}
