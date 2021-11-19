"use strict";

(function _callee() {
  var local, idLocal, articleLocal, prixPorduit, quantiteprixProduit, prixTotalProduit, prixTotalPanier;
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
          _context.next = 21;
          break;

        case 6:
          y = 0;

        case 7:
          if (!(y < local.length)) {
            _context.next = 21;
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
          document.getElementById("cart__items").innerHTML += "<article class=\"cart__item\" data-id=\"".concat(idLocal, "\">\n        <div class=\"cart__item__img\">\n          <img src=\"").concat(articleLocal.imageUrl, "\" alt=\"").concat(articleLocal.altTxt, "\">\n        </div>\n        <div class=\"cart__item__content\">\n          <div class=\"cart__item__content__titlePrice\">\n            <h2>").concat(articleLocal.name, "</h2>\n            <p>").concat(articleLocal.price, "\u20AC</p>\n          </div>\n          <div class=\"cart__item__content__settings\">\n            <div class=\"cart__item__content__settings__quantity\">\n              <p>Qt\xE9 :").concat(local[y].quantityUser, " </p>\n              <input type=\"number\" class=\"itemQuantity\" onClick=\"modifQuantitePanier ()\" \"name=\"itemQuantity\" min=\"1\" max=\"100\" value=\"").concat(local[y].quantityUser, "\">\n            </div>\n            <div class=\"cart__item__content__settings__delete\">\n              <p class=\"deleteItem\" onClick=\"supprimerProduit('").concat(idLocal, "')\">Supprimer</p>\n            </div>\n          </div>\n        </div>\n      </article>"); //afficher prix total par produit 

          /*recuperer le prix du produit
          ????ATTENTION VOIR AVEC TERRENCE 
           ??Probleme celà ne m'affiche plus qu'un produit dans le panier???*/

          prixPorduit = articleLocal.price;
          console.log(prixPorduit); //boucle pour parcourir le tableau des quantites produits dans le panier  

          for (y = 0; y < quantiteProduitTotal.length; y++) {
            //stoquer la quantite du produit 
            quantiteprixProduit = quantiteProduitTotal[y]; //creer une variable prix total par produit 

            prixTotalProduit = prixPorduit * quantiteprixProduit;
            console.log(prixTotalProduit);
            prixTotalPanier = 0;
            prixTotalPanier = prixTotalPanier + prixTotalProduit;
            console.log(prixTotalPanier);
          }

        case 18:
          y++;
          _context.next = 7;
          break;

        case 21:
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
} //creer une fonction pour modifier la quantité de produit dans la page panier 


function modifQuantitePanier() {
  // recuperer les donner dans le local
  var local = JSON.parse(localStorage.getItem("storageUserSelect")); //selectionner les donnees des boutons quantite

  var elmtQuantite = document.querySelectorAll(".itemQuantity");
  console.log(elmtQuantite);
  elmtQuantite.forEach(function (quantiteModif) {
    //recup la donnee du id et de la quantite 
    var produitQuantite = quantiteModif.closest("article");
    var produitQuantiteId = produitQuantite.dataset.id;
    console.log(produitQuantiteId); //utilisation de  l'observation avec addEventListener pour voir le changement de la quantité

    quantiteModif.addEventListener("change", function () {
      //recup de la valeur de la quantite changee 
      var newsQuantiteProduit = Number(quantiteModif.value);
      console.log(newsQuantiteProduit); //utiliser le local cette fois si pour le mettre a jour de la nouvelle quantite 

      local.forEach(function (ElemtNew) {
        if (ElemtNew.idProduit === produitQuantiteId) {
          ElemtNew.quantityUser = newsQuantiteProduit;
        }
      }); //mettre a jour les données renvoyées dans le local       

      localStorage.setItem("storageUserSelect", JSON.stringify(local)); //ajout de l'ojet(clé , valeur) dans le local

      window.location.reload();
    });
  });
} //creer une fonction pour supprimer id dans le local


function supprimerProduit(idArticleSupprimer) {
  console.log(idArticleSupprimer); // recuperer les donner dans le local

  var local = JSON.parse(localStorage.getItem("storageUserSelect")); //selectionner les donnees des boutons supprimer

  var btnSupprimerPanier = document.getElementsByClassName("cart__item");
  console.log(btnSupprimerPanier);

  var _loop = function _loop(i) {
    btnSupprimerPanier[i].addEventListener("click", function (event) {
      event.preventDefault(); //Aller chercher l'id du produit dans le tableau 
      // voir pour rajouter la couleur du produit pour recuperer la couleur du produit ? 

      var produitSelectionne = btnSupprimerPanier[i].closest("article");
      var idProduitSelectione = produitSelectionne.dataset.id;
      console.log(idProduitSelectione); //recuperer les données du local 

      var local = JSON.parse(localStorage.getItem("storageUserSelect")); //appliquer un filtre dans le local (voir pour rajouter la couleur dans le filtre)

      local = local.filter(function (elemt) {
        return elemt.idProduit !== idProduitSelectione;
      }); //mettre a jour les données renvoyées dans le local 

      localStorage.setItem("storageUserSelect", JSON.stringify(local)); //ajout de l'ojet(clé , valeur) dans le local

      console.log(local);
    });
  };

  for (var i = 0; i < btnSupprimerPanier.length; i++) {
    _loop(i);
  }
} //Total calcul du "nombre d'articles" dans le panier
//creer un tableau


var quantiteProduitTotal = []; //recupere les donnees du local 

var local = JSON.parse(localStorage.getItem("storageUserSelect")); //condition ( si , sinon )
//le panier est vide et ou egale à 0 alors tu affiches "Votre panier est vide"

if (local === null || local === 0) {
  alert("Votre panier est vide");
} else {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = local[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var article = _step.value;
      var quantiteArticle = +article.quantityUser; //j'envoie les donnees dans mon tableau

      quantiteProduitTotal.push(quantiteArticle);
      console.log(quantiteProduitTotal); //affiche bien la quantite de chaque produit  
    } //faire une addition des quantitees des produits recuperer dans le total pour avoir le nombre total 
    //Utiliser la methode reduce pour accumuler les donnees du tableau 

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var reducer = function reducer(previousValue, currentValue) {
    return previousValue + currentValue;
  }; //ajouter la donnees dan smon tableau 


  var quantiteTotalCalculePanier = quantiteProduitTotal.reduce(reducer); //utiliser le DOM pour ajouter ma vaviable contenant la quantite calculé des produits  au HTML 

  document.getElementById("totalQuantity").innerHTML = quantiteTotalCalculePanier;
}