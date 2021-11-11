"use strict";

//recuperer les info des articles
main();

function main() {
  var article;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getArticle());

        case 2:
          article = _context.sent;
          //console.log(article)
          displayArticles(article);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getArticle() {
  // recuperer les données des produits
  return fetch("http://localhost:3000/api/products").then(function (articlesResponse) {
    return articlesResponse.json();
  }).then(function (article) {
    return article;
  })["catch"](function (error) {
    alert(error);
  });
} // recuperer les donner dans le local


var local = JSON.parse(localStorage.getItem("storageUserSelect")); //Ajouter les donner de fetch dans le local 

function displayArticles(article) {
  local.push(article);
} //recuperer l'id du local + ajouter les info de l'id selectionné 
// const pour ajouter les element html sur l'element id 


var AffichageProduitPanier = document.getElementById("cart__items"); //fonction afficher les produit du localStorage  dans le panier
//si le panier est vide 

if (local === null) {
  console.log("le panier est vide");
} else {
  //si le panier n'est pas vide l'afficher dans le local storage 
  var localProduitId = [];
  {
    //boucle for pour afficher chaque index dans l'element id
    for (x = 0; x < local.length; x++) {
      console.log("le panier n'est pas vide"); //console.log(local); // affichage du local 

      localProduitId = localProduitId + "<article class=\"cart__item\" data-id=\"".concat(local[x].idProduit, "\">\n                <div class=\"cart__item__img\">\n                  <img src=\"\" alt=\"Photographie d'un canap\xE9\">\n                </div>\n                <div class=\"cart__item__content\">\n                  <div class=\"cart__item__content__titlePrice\">\n                    <h2>Nom du produit</h2>\n                    <p>42,00 \u20AC</p>\n                  </div>\n                  <div class=\"cart__item__content__settings\">\n                    <div class=\"cart__item__content__settings__quantity\">\n                      <p>Qt\xE9 : </p>\n                      <input type=\"number\" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value=\"").concat(local[x].quantityUser, "\">\n                    </div>\n                    <div class=\"cart__item__content__settings__delete\">\n                      <p class=\"deleteItem\">Supprimer</p>\n                    </div>\n                  </div>\n                </div>\n              </article>");
    }

    if (x === local.length) {
      AffichageProduitPanier.innerHTML = localProduitId;
    }
  }
}