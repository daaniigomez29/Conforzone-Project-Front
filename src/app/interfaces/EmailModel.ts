import { SubjectEnums } from "./SubjectEnums";

export interface EmailModel {
    fromEmail:string,
    subject:SubjectEnums,
    body:string
}