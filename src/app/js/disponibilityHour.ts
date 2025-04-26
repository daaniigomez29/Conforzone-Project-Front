export function availableContact(className:string, classNameDelete:string) {
    let classSelected = document.querySelector("." + className);
    let date = new Date()

    if (date.getDay() > 0 && date.getDay() <= 5 && date.getHours() >= 8 && date.getHours() < 20) {
      classSelected?.classList.remove(classNameDelete)
      return true;
    } else if (date.getDay() === 6 && date.getHours() >= 9 && date.getHours() < 14) {
      classSelected?.classList.remove(classNameDelete)
      return true;
    } else {
      classSelected?.classList.remove(classNameDelete)
      return false
    }
  }