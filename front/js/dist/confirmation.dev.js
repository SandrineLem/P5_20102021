"use strict";

var pageConfirm = new URL(location.href).searchParams.get("id"); // Récupération de l'id de la commande présent dans l'url spécifique

var getResponseId = orderConfirm.searchParams.get("id"); // Injection de l'id dans le DOM

document.querySelector("#orderId").innerText = getResponseId; // Vidage des données du local storage

localStorage.removeItem("local");