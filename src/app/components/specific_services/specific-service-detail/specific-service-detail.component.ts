import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterModule } from '@angular/router';
import { SpecificServiceService } from '../../../services/specific-service.service';
import { SpecificService } from '../../../interfaces/SpecificService';
import { INSTALLATIONS } from '../../../js/installations'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderService } from '../../../services/loader.service';
import { LinksMobilePcService } from '../../../services/links-mobile-pc.service';
import { ModalService } from '../../../services/modal.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-specific-service-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './specific-service-detail.component.html',
  styleUrl: './specific-service-detail.component.css'
})
export class SpecificServiceDetailComponent implements OnInit, OnDestroy {

  private routerSubscription:any

  emailContactLink:string = ''

  whatsappContactLink:string = ''

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
    offer: false,
    image:""
  }

  quantity: number = 1

  quantityAdditionalMeter: number = 0

  totalPrice: number = 0

  arrayDescription: string[] = []

  step = 1;
  installationPlace = ''

  whatsappRequestBudgetMessage = ''
  emailRequestBudgetMessage = ''

  public constructor(public route: ActivatedRoute, private router: Router, public specificServiceService: SpecificServiceService, public loaderService:LoaderService, private linksMobilePcService:LinksMobilePcService, private modalService:ModalService, private title:Title) {

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

    this.emailContactLink = this.linksMobilePcService.getEmailContactLink()
    this.whatsappContactLink = this.linksMobilePcService.getWhatsappContactLink();

    this.routerSubscription = this.router.events.subscribe(event => {
          if (event instanceof NavigationStart){
            this.modalService.closeModal('wizardModal')
          }
        })
  }

  ngOnDestroy(): void {
    if (this.routerSubscription && !this.routerSubscription.unsubscribe()) {
      this.routerSubscription.unsubscribe()
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
        this.specificService.image = data.image;

        this.totalPrice = data.firstPrice
        this.arrayDescription = data.description.split(".")

        this.title.setTitle(this.specificService.name)
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

        this.title.setTitle(this.specificService.name)
      },
      error: err => {
        console.error(err)
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
      this.whatsappRequestBudgetMessage = this.linksMobilePcService.whatsappRequestBudgetMessage(this.specificService.name, this.quantity, this.quantityAdditionalMeter, this.installationPlace, false)
      this.emailRequestBudgetMessage = this.linksMobilePcService.emailRequestBudgetMessage(this.specificService.name, this.quantity, this.quantityAdditionalMeter, this.installationPlace, false)
    } else {
      alert("Por favor, seleccione una ciudad para continuar")
    }

  }
}
