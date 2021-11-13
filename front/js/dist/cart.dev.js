"use strict";

//recuperation des articles avec id article 
function getArticle(articleId) {
  return fetch("http://localhost:3000/api/products/".concat(articleId)) //recuperation des donnees de l'api avec id de chaque produit
  .then(function (httpBodyResponse) {
    // fonction quand il recupere les donnees en httpBody
    return httpBodyResponse.json(); // transfromation de httpBody  en json 
  }).then(function (articles) {
    // recuperer le json renommé en "articles"
    return articles; // reponse return le contenu json "articles"
  })["catch"](function (error) {
    // si erreur fonction d'afficher une alert 'error' 
    alert(error);
  });
} // recuperer les donner dans le local


var local = JSON.parse(localStorage.getItem("storageUserSelect"));
console.log(local); //recup l'id dans local general 
//faire une boucle sur le local storage 
//recuperer la ligne 
//puis recuperer la function get article pour api id en lien avec l'id dans le local  
//fonction afficher les produit du localStorage  dans le panier
//si le panier est vide 

if (local === null) {
  console.log("le panier est vide");
} else {
  //si le panier n'est pas vide l'afficher dans le local storage 
  for (y = 0; y < local.length; y++) {
    var idLocal = local[y].idProduit;
    console.log(idLocal);
    var articleLocal = getArticle(idLocal);
    document.getElementById("cart__items").innerHTML += "<article class=\"cart__item\" data-id=\"".concat(idLocal, "\">\n        <div class=\"cart__item__img\">\n          <img src=\"").concat(articleLocal.imageUrl, "\" alt=\"").concat(articleLocal.altTxt, "\">\n        </div>\n        <div class=\"cart__item__content\">\n          <div class=\"cart__item__content__titlePrice\">\n            <h2>").concat(articleLocal.name, "</h2>\n            <p>").concat(articleLocal.price, "\u20AC</p>\n          </div>\n          <div class=\"cart__item__content__settings\">\n            <div class=\"cart__item__content__settings__quantity\">\n              <p>Qt\xE9 :").concat(local[y].quantityUser, " </p>\n              <input type=\"number\" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value=\"").concat(local[y].quantityUser, "\">\n            </div>\n            <div class=\"cart__item__content__settings__delete\">\n              <p class=\"deleteItem\">Supprimer</p>\n            </div>\n          </div>\n        </div>\n      </article>");
  }
}