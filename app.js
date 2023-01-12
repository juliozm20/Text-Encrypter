const input = document.querySelector("#text_input");
const encryptBtn = document.querySelector("#btn_encrypt");
const decryptBtn = document.querySelector("#btn_decrypt");
const copyBtn = document.querySelector("#copy");
const result = document.querySelector("#result");
const msgCard = document.querySelector(".msg_card");
const resultCard = document.querySelector(".msg_result");
let concatText = "";
let message = "";

input.addEventListener("keydown", (e) => {
  let regex = /[!'^+%&*"/()=?_\-~`;#$½{[\]}\\\u00C0-\u00FF|<>@]/gi;
  if (regex.test(e.key)) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "No se permiten characteres especiales",
      showConfirmButton: false,
      timer: 2500,
    });
    e.preventDefault();
    return false;
  }
});

input.addEventListener("paste", (e) => {
  let paste = (e.clipboardData || window.clipboardData).getData("text");
  let regex = /[!'^+%&*"/()=?_\-~`;#$½{[\]}\\\u00C0-\u00FF|<>@]/gi;
  if (regex.test(paste)) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "No se permiten characteres especiales",
      showConfirmButton: false,
      timer: 2500,
    });
    e.preventDefault();
    return false;
  }
});

const encrypt = () => {
  concatText = "";
  for (let i = 0; i < input.value.length; i++) {
    switch (input.value[i]) {
      case "a":
        message = "ai";
        break;
      case "e":
        message = "enter";
        break;
      case "i":
        message = "imes";
        break;
      case "o":
        message = "ober";
        break;
      case "u":
        message = "ufat";
        break;
      default:
        message = input.value[i];
    }
    concatText += message;
  }
  if (concatText.length) {
    msgCard.style.display = "none";
    result.innerText = concatText.toLowerCase();
    resultCard.style.display = "flex";
    input.value = "";
  }
};

const decrypt = () => {
  let res = input.value;
  let decrypted = res
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ai", "a")
    .replaceAll("ober", "o")
    .replaceAll("ufat", "u");
  if (decrypted) {
    msgCard.style.display = "none";
    result.innerText = decrypted.toLowerCase();
    resultCard.style.display = "flex";
    input.value = "";
  }
};

const copy = () => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Texto Copiado a portapapeles",
    showConfirmButton: false,
    timer: 2500,
  });
  navigator.clipboard.writeText(result.innerText);
};

encryptBtn.addEventListener("click", encrypt);
decryptBtn.addEventListener("click", decrypt);
copyBtn.addEventListener("click", copy);
