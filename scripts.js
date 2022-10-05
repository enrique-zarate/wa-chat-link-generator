// obtener elemento HTML(boton)
const buttonElement = document.querySelector("button");

//crear selector de codigo de region
const phoneInputField = document.querySelector("#contact-number");
const phoneInput = window.intlTelInput(phoneInputField, {
  // TO-DO: Initial country based on user location
  initialCountry: "py",
  preferredCountries: ["py", "ar", "co", "uy"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

const info = document.querySelector("#alert-info");

// function process(event) {
//   event.preventDefault();

//   const phoneNumber = phoneInput.getNumber();

//   info.style.display = "";
//   info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
// }

// definir la funcion que armar el enlace
function onButtonClick() {
  // tomar numero
  // const contactNumber = document.getElementById("contact-number").value;

  // tomar numero con codigo de zona
  const phoneNumber = phoneInput.getNumber();
  console.log(phoneNumber);

  // tomar mensaje
  const message = document.getElementById("message").value;

  //reemplazar saltos de linea por cod para brk line en la URL
  const res = message.split("\n").join("%0a");
  // console.log(res);

  // armar enlace
  const link = `https://wa.me/${phoneNumber}?text=${res}`;

  // abrir enlace en nueva pestanha
  window.open(link, "_blank");

  // guardar el numero en local storage
  localStorage.setItem("contactNumber", phoneNumber);
}

// agregar Event Listener al boton
buttonElement.addEventListener("click", onButtonClick);

buttonElement.addEventListener("keypress", function (event) {
  console.log(event.key);
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Trigger the button element with a click
    onButtonClick;
  }
});
