const productsSelect = document.getElementById("products");
const quantityInput = document.getElementById("quantity");
const totalPriceDisplay = document.getElementById("total-price");

// Mettre à jour le prix total lorsqu'une entrée est modifiée
productsSelect.addEventListener("input", updateTotalPrice);
// On applique un écouteur d'évenement sur la constante QI qui contient tout les élements qui ont pour ID products.
// Lorsque l'on y insert du texte, la fonction update total price sera appeller.
quantityInput.addEventListener("input", updateTotalPrice);

function updateTotalPrice() {
  // chaine de caractere dhanger en nombre décimal.
  const productPrice = parseFloat(productsSelect.value); 
  const quantity = parseFloat(quantityInput.value);
  const totalPrice = productPrice * quantity;
  // On remplace le contenu de total price display par total price, qui aura toujours 2 chiffres apres la virgule.
  totalPriceDisplay.textContent = totalPrice.toFixed(2);
}

const form = document.getElementById("payment-form");

// Envoyer une demande POST au serveur lors de la soumission du formulaire
form.addEventListener("submit", submitPaymentForm);

async function submitPaymentForm(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const response = await fetch("/process-payment", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  if (result.success) {
    alert("Paiement réussi !");
  } else {
    alert("Erreur lors du paiement : " + result.error);
  }
}

