"use strict";

//recuperation des articles avec api 
main();

function main() {
  var articles;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getArticles());

        case 2:
          articles = _context.sent;
          console.log(articles);
          displayArticles(articles);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getArticles() {
  // recuperer les données des produits
  return fetch("http://localhost:3000/api/products").then(function (articlesResponse) {
    return articlesResponse.json();
  }).then(function (articles) {
    return articles;
  })["catch"](function (error) {
    alert(error);
  });
}

function displayArticles() {}

var local = JSON.parse(localStorage.getItem("storageUserSelect")); // recuperer les donner dans le local

console.log(local);
var AffichageProduitPanier = document.getElementById("cart__items");
console.log(AffichageProduitPanier); //fonction afficher les produit du localStorage  dans le panier
//si le panier est vide 

if (local === null) {
  console.log("le panier est vide");
} else {
  //si le panier n'est pas vide l'afficher dans le local storage 
  var _AffichageProduitPanier = [];

  for (y = 0; y < local.length; y++) {
    _AffichageProduitPanier = _AffichageProduitPanier + "<article class=\"cart__item\" data-id=\"{product-ID}\">\n        <div class=\"cart__item__img\">\n          <img src=\"\" alt=\"Photographie d'un canap\xE9\">\n        </div>\n        <div class=\"cart__item__content\">\n          <div class=\"cart__item__content__titlePrice\">\n            <h2>Nom du produit</h2>\n            <p>42,00 \u20AC</p>\n          </div>\n          <div class=\"cart__item__content__settings\">\n            <div class=\"cart__item__content__settings__quantity\">\n              <p>Qt\xE9 : </p>\n              <input type=\"number\" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value=\"42\">\n            </div>\n            <div class=\"cart__item__content__settings__delete\">\n              <p class=\"deleteItem\">Supprimer</p>\n            </div>\n          </div>\n        </div>\n      </article>";
  }
}