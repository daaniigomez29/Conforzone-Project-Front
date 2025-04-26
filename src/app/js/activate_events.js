window.addEventListener("scroll", function() {
  let navbar = document.querySelector(".navbar");
  let navbarMobile = this.document.querySelector(".navbar-mobile");
  let navToggler = this.document.querySelector(".navbar-toggler");
  //let btnLogin = document.getElementById("btnLogin");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  navbarMobile.classList.toggle("scrolled", window.scrollY > 50);
  //btnLogin.classList.toggle("btn-outline-dark", window.scrollY > 50 || !this.window.location.href.includes("inicio"));
});
