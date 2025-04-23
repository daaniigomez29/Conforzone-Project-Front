import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../../services/email.service';
import { SubjectEnums } from '../../../interfaces/SubjectEnums';
import { EmailModel } from '../../../interfaces/EmailModel';
import { ValidatorService } from '../../../validators/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {

  subjects = Object.keys(SubjectEnums)

  emailModel:EmailModel = {
    fromEmail:'',
    subject: SubjectEnums.CUSTOMER_SERVICE,
    body: ''
  }

  isInputChecked:boolean = false;

  public constructor(private emailService:EmailService, private fb:FormBuilder, private validatorService:ValidatorService){}


  formContactEmail: FormGroup = this.fb.group({
    fromEmail: ["", [Validators.required, Validators.pattern(/^[A-Za-z0-9+_.-]+@(.+)$/), this.validatorService.patternEmail]],
    subject: ["", Validators.required],
    body: ["", Validators.required],
    inputCheck: [false, Validators.requiredTrue]
  })

  noValid(field: string): boolean {
    const control = this.formContactEmail?.controls[field];
    return control?.invalid && (control?.touched || control?.dirty);  }

  get emailError(): string {
    const errors = this.formContactEmail.get('fromEmail')?.errors
    let msg: string = ""
    if (errors) {
      if (errors['required']) {
        msg = "El Email es necesario"
      } else if (errors["noValidEmail"]) {
        msg = "Formato de email necesario (ejemplo@gmail.com)"
      }
    }
    return msg;
  }


  obtainSubjectValue(subjectKey:string) {
    const subjectValue = SubjectEnums[subjectKey as keyof typeof SubjectEnums];
    return subjectValue
  }


  sendEmail(){
    this.formContactEmail.markAllAsTouched();
    if(this.formContactEmail.valid){
      this.emailModel.fromEmail = this.formContactEmail.value.fromEmail;
      this.emailModel.subject = this.formContactEmail.value.subject;
      this.emailModel.body = this.formContactEmail.value.body;

      this.emailService.sendEmailContact(this.emailModel).subscribe({
        next: value => {
          Swal.fire({
            title: "Correo enviado",
            text: "Email enviado correctamente",
            icon: "success",
            showConfirmButton: false
          });
        },
        error: err => {
          Swal.fire({
            title: "Error al enviar el correo",
            text: "El email no se ha podido enviar, inténtelo de nuevo",
            icon: "error",
            showConfirmButton: false
          });
        }
      })
    }
  }
}
