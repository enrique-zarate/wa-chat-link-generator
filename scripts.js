// obtener elemento HTML(boton)
const buttonElement = document.querySelector("button");

//crear selector de codigo de region
const phoneInputField = document.querySelector("#contact-number");
const phoneInputFun = async () => {
  window.intlTelInput(phoneInputField, {
    initialCountry: await phoneCountryDisplayCheck(),
    preferredCountries: ["py", "ar", "co", "uy", "br"],
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });
};

const phoneInput = phoneInputFun();

// funcion que verifica si hay algun numero guardado
phoneDisplayCheck();

async function phoneCountryDisplayCheck() {
  if (localStorage.getItem("NumberCountry")) {
    const phoneCountryStored = localStorage.getItem("NumberCountry");
    return phoneCountryStored;
  } else {
    const userCountryCode = async () => {
      let countryCode = await fetch("https://ipapi.co/country_code");
      // traemos
      let countryCodeText = await countryCode.text();
      return countryCodeText;
    };
    return await userCountryCode();
  }
}

function phoneDisplayCheck() {
  if (localStorage.getItem("contactNumber")) {
    const phoneNumberStored = localStorage.getItem("contactNumber");
    console.log("phoneDisplayCheck", phoneNumberStored);

    phoneInputField.value = phoneNumberStored;
  }
}

// definir la funcion que arma el enlace
function onButtonClick() {
  // tomar numero
  // const contactNumber = document.getElementById("contact-number").value;

  // tomar numero con codigo de zona
  const phoneNumber = document.getElementById("contact-number").value;
  console.log("phoneNumber", phoneNumber);
  // const phoneNumber = phoneInput.getNumber();

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

  // guardar la info del pais
  const phoneCountry = phoneInput.s.iso2;
  localStorage.setItem("NumberCountry", phoneCountry);
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
