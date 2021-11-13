"use strict";

(function _callee() {
  var local, idLocal, articleLocal;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // recuperer les donner dans le local
          local = JSON.parse(localStorage.getItem("storageUserSelect"));
          console.log(local); //fonction afficher les produit du localStorage  dans le panier
          //si le panier est vide 

          if (!(local === null)) {
            _context.next = 6;
            break;
          }

          console.log("le panier est vide");
          _context.next = 18;
          break;

        case 6:
          y = 0;

        case 7:
          if (!(y < local.length)) {
            _context.next = 18;
            break;
          }

          //faire une boucle sur le local storage
          idLocal = local[y].idProduit; //recup l'id dans local  

          console.log(idLocal);
          _context.next = 12;
          return regeneratorRuntime.awrap(getArticle(idLocal));

        case 12:
          articleLocal = _context.sent;
          //puis recuperer la function get article pour api id en lien avec l'id dans le local 
          console.log(articleLocal);
          document.getElementById("cart__items").innerHTML += "<article class=\"cart__item\" data-id=\"".concat(idLocal, "\">\n        <div class=\"cart__item__img\">\n          <img src=\"").concat(articleLocal.imageUrl, "\" alt=\"").concat(articleLocal.altTxt, "\">\n        </div>\n        <div class=\"cart__item__content\">\n          <div class=\"cart__item__content__titlePrice\">\n            <h2>").concat(articleLocal.name, "</h2>\n            <p>").concat(articleLocal.price, "\u20AC</p>\n          </div>\n          <div class=\"cart__item__content__settings\">\n            <div class=\"cart__item__content__settings__quantity\">\n              <p>Qt\xE9 :").concat(local[y].quantityUser, " </p>\n              <input type=\"number\" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value=\"").concat(local[y].quantityUser, "\">\n            </div>\n            <div class=\"cart__item__content__settings__delete\">\n              <p class=\"deleteItem\" onClick=supprimerProduit((idLocal))>Supprimer</p>\n            </div>\n          </div>\n        </div>\n      </article>");

        case 15:
          y++;
          _context.next = 7;
          break;

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
})(); //recuperation des articles avec id article 


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
}

function supprimerProduit(idArticleSupprimer) {
  console.log(idArticleSupprimer);
}