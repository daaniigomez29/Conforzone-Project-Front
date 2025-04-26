import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpecificServiceService } from '../../../services/specific-service.service';
import { SpecificService } from '../../../interfaces/SpecificService';
import { INSTALLATIONS } from '../../../js/installations'
import { availableContact } from '../../../js/disponibilityHour'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specific-service-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './specific-service-detail.component.html',
  styleUrl: './specific-service-detail.component.css'
})
export class SpecificServiceDetailComponent implements AfterViewChecked {

  @ViewChild('whatsappLink') whatsappLink?: ElementRef<HTMLAnchorElement>;

  private hasChecked = false; // Evitar bucles infinitos

  isOfferPage: boolean = false

  specificServiceId: number = -1

  slug: string | null = ""

  installationLabel: string | undefined = ""

  specificService: SpecificService = {
    id: this.specificServiceId,
    name: "",
    description: "",
    slug: "",
    firstPrice: 0,
    pricePerMeter: 0,
    available: true,
    offer: false
  }

  quantity: number = 1

  quantityAdditionalMeter: number = 0

  totalPrice: number = 0

  arrayDescription: string[] = []

  step = 1;
  installationPlace = ''
  unidadesInterior = 1;

  public constructor(public route: ActivatedRoute, private router: Router, public specificServiceService: SpecificServiceService) {

  }

  ngAfterViewChecked() {
    if (this.whatsappLink && !this.hasChecked) {
      this.hasChecked = true; // Solo la primera vez
      availableContact('link-with-underline-whatsapp', 'disabled')
    }
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    this.specificServiceId = id ? id : 0

    this.isOfferPage = this.router.url.includes('ofertas') ? true : false


    if (!this.isOfferPage) {
      this.obtainDataFromSpecificService(id)
    } else {
      this.obtainDataFromOfferSpecificService(id)
    }
  }

  findSlug() {
    this.slug = this.route.snapshot.paramMap.get('slug')
    const match = INSTALLATIONS.find(i => i.slug === this.slug)
    this.installationLabel = match ? INSTALLATIONS.find(i => i.slug === this.slug)?.label : ''
  }

  obtainDataFromSpecificService(idSprecificService:number) {
    this.slug = this.route.snapshot.params['slug']

    this.findSlug()

    this.specificServiceService.getSpecificServiceBySlugAndId(this.slug, idSprecificService).subscribe({
      next: data => {
        this.specificServiceId = data.id
        this.specificService.name = data.name
        this.specificService.description = data.description
        this.specificService.firstPrice = data.firstPrice
        this.specificService.pricePerMeter = data.pricePerMeter
        this.specificService.available = data.available

        this.totalPrice = data.firstPrice
        this.arrayDescription = data.description.split(".")
      },
      error: err => {
        console.error(err)
      }
    })
  }

  obtainDataFromOfferSpecificService(idSprecificService:number) {
    this.specificServiceService.getOfferSpecificServicesById(idSprecificService).subscribe({
      next: data => {
        this.specificServiceId = data.id
        this.specificService.name = data.name
        this.specificService.description = data.description
        this.specificService.firstPrice = data.firstPrice
        this.specificService.pricePerMeter = data.pricePerMeter
        this.specificService.available = data.available

        this.totalPrice = data.firstPrice
        this.arrayDescription = data.description.split(".")
      }
    })
  }

  increment() {
    this.quantity++;
    this.totalPrice += this.specificService.firstPrice
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.totalPrice -= this.specificService.firstPrice
    }
  }

  incrementAdditionalMeter() {
    this.quantityAdditionalMeter++;
    this.totalPrice += this.specificService.pricePerMeter
  }

  decrementAdditionalMeter() {
    if (this.quantityAdditionalMeter > 0) {
      this.quantityAdditionalMeter--;
      this.totalPrice -= this.specificService.pricePerMeter
    }
  }

  continueModalSelectCity() {
    if (this.installationPlace) {
      this.step = 2
    } else {
      alert("Por favor, seleccione una ciudad para continuar")
    }

  }

  get whatsappMessage() {
    const base = `https://web.whatsapp.com/send?l=es&phone=34674778285&text=`
    let messageWhatsapp = `Buenas! Me gustaría solicitar la ${this.specificService.name}. necesitaría ${this.quantity} instalación/es. La instalación sería en ${this.installationPlace}.`

    if (this.quantityAdditionalMeter > 0) {
      messageWhatsapp = `¡Hola! Me gustaría solicitar la ${this.specificService.name}. Necesitaría ${this.quantity} instalación/es y ${this.quantityAdditionalMeter} metro/s adicional/es. La instalación sería en ${this.installationPlace}.`
    }

    return base + encodeURIComponent(messageWhatsapp)
  }

  get emailMessage() {
    const base = `https://mail.google.com/mail/?view=cm&fs=1&to=conforzoneeficiencias@gmail.com&su=Solicitud%20de%20presupuesto&body=`
    let messageEmail = `Buenas!%20Me%20gustaría%20solicitar%20la%20${this.specificService.name},%20necesito%20${this.quantity}%20instalación/es.%20Soy%20de%20${this.installationPlace}.`

    if (this.quantityAdditionalMeter > 0) {
      messageEmail = `Buenas!%20Me%20gustaría%20solicitar%20la%20${this.specificService.name},%20necesito%20${this.quantity}%20instalación/es,%20necesitaría%20además%20${this.quantityAdditionalMeter}%20metro/s%20adicional/es.%20Soy%20de%20${this.installationPlace}.`
    }

    return base + messageEmail
  }

}
