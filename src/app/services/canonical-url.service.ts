import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanonicalURLService {

  constructor(@Inject(DOCUMENT) private doc: Document) { }

  setCanonicalURL(url: string): void {
    const existingLink = this.doc.querySelector("link[rel='canonical']");

  if (existingLink) {
    (existingLink as HTMLLinkElement).setAttribute('href', url);
  } else {
    const link = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.doc.head.appendChild(link);
  }
  }
}
