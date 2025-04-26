import { Injectable } from '@angular/core';

declare var bootstrap:any;

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor() { }

  initPopovers() {
    const popoverTriggerList = Array.from(document.querySelectorAll<HTMLElement>('[data-bs-toggle="popover"]'))
    popoverTriggerList.map(
      (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
    )
  }
}
