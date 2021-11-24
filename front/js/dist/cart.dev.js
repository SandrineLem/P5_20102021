"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//------------------------------Fonction du panier---------------------
//--------Afficher les produits dans le panier -------------------
(function _callee() {
  var local, prixTotalPanier, quantiteTotalCalculePanier, idLocal, articleLocal;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // ---recuperer les donner dans le local----
          local = JSON.parse(localStorage.getItem("storageUserSelect"));
          console.log(local); //------fonction afficher les produit du localStorage  dans le panier---
          //----si le panier est vide----

          if (!(local === null)) {
            _context.next = 6;
            break;
          }

          console.log("le panier est vide");
          _context.next = 24;
          break;

        case 6:
          //---si le panier n'est pas vide l'afficher dans le local storage---
          //--initialiser le total du prix du Panier--
          prixTotalPanier = 0; //--initialiser le total de la quantite de produit calcule dans le Panier--

          quantiteTotalCalculePanier = 0; //--faire une boucle sur le local storage--

          y = 0;

        case 9:
          if (!(y < local.length)) {
            _context.next = 22;
            break;
          }

          idLocal = local[y].idProduit; //recup l'id dans local

          console.log(idLocal); //--puis recuperer la function get article pour api id en lien avec l'id dans le local--

          _context.next = 14;
          return regeneratorRuntime.awrap(getArticle(idLocal));

        case 14:
          articleLocal = _context.sent;
          console.log(articleLocal); //---calcul du prix Total dans le panier (recup prix dans le local * quantite dans le local )---

          prixTotalPanier = prixTotalPanier + parseInt(articleLocal.price) * parseInt(local[y].quantityUser); //---calcul de la quantite total de produit dans le panier(addition de la quantite Total de produit + quantite du local)---

          quantiteTotalCalculePanier = quantiteTotalCalculePanier + parseInt(local[y].quantityUser); //------insertion dans le dom des infos produit------ 

          document.getElementById("cart__items").innerHTML += "<article class=\"cart__item\" data-id=\"".concat(idLocal, "\">\n      <div class=\"cart__item__img\">\n        <img src=\"").concat(articleLocal.imageUrl, "\" alt=\"").concat(articleLocal.altTxt, "\">\n      </div>\n      <div class=\"cart__item__content\">\n        <div class=\"cart__item__content__titlePrice\">\n          <h2>").concat(articleLocal.name, "</h2>\n        <div class=\"item__content__settings__color\">\n            <h2>'").concat(local[y].colors, "'<h2>\n          <p>").concat(articleLocal.price, "\u20AC</p>\n        </div>\n        <div class=\"cart__item__content__settings\">\n          <div class=\"cart__item__content__settings__quantity\">\n            <p>Qt\xE9 :").concat(local[y].quantityUser, " </p>\n            <input type=\"number\" class=\"itemQuantity\" onChange=\"modifQuantitePanier()\" \"name=\"itemQuantity\" min=\"1\" max=\"100\" value=\"").concat(local[y].quantityUser, "\">\n          </div>\n          <div class=\"cart__item__content__settings__delete\">\n            <p class=\"deleteItem\" onClick=\"supprimerProduit('").concat(idLocal, "','").concat(local[y].colors, "')\">Supprimer</p>\n          </div>\n        </div>\n      </div>\n    </article>");

        case 19:
          y++;
          _context.next = 9;
          break;

        case 22:
          //------insertion dans le dom du prix total du panier------ 
          document.getElementById("totalPrice").innerHTML = prixTotalPanier + " €"; //------insertion dans le dom de la quantite total calculee du panier------ 

          document.getElementById("totalQuantity").innerHTML = quantiteTotalCalculePanier;

        case 24:
        case "end":
          return _context.stop();
      }
    }
  });
})(); //-----------recuperation des articles avec id article----------


function getArticle(articleId) {
  return fetch("http://localhost:3000/api/products/".concat(articleId)) //recuperation des donnees de l'api avec id de chaque produit
  .then(function (httpBodyResponse) {
    // -----fonction quand il recupere les donnees en httpBody-----
    return httpBodyResponse.json(); // ---transfromation de httpBody  en json-----
  }).then(function (articles) {
    // ---recuperer le json renommé en "articles"---
    return articles; // ---reponse return le contenu json "articles"---
  })["catch"](function (error) {
    //-- si erreur fonction d'afficher une alert 'error'---
    alert(error);
  });
} //--------------creer une fonction pour modifier la quantité de produit dans la page panier-----------


function modifQuantitePanier() {
  // ----recuperer les donner dans le local----
  var local = JSON.parse(localStorage.getItem("storageUserSelect")); //----selectionner les donnees des boutons quantite----

  var elmtQuantite = document.querySelectorAll(".itemQuantity");
  console.log(elmtQuantite);
  elmtQuantite.forEach(function (quantiteModif) {
    //----recup la donnee du id et de la quantite----
    var produitQuantite = quantiteModif.closest("article");
    var produitQuantiteId = produitQuantite.dataset.id;
    console.log(produitQuantiteId); //----utilisation de  l'observation avec addEventListener pour voir le changement de la quantité----

    quantiteModif.addEventListener("change", function () {
      //---recup de la valeur de la quantite changee---
      var newsQuantiteProduit = Number(quantiteModif.value);
      console.log(newsQuantiteProduit); //---utiliser le local cette fois si pour le mettre a jour de la nouvelle quantite---

      local.forEach(function (ElemtNew) {
        if (ElemtNew.idProduit === produitQuantiteId) {
          ElemtNew.quantityUser = newsQuantiteProduit;
        }
      }); //---mettre a jour les données renvoyées dans le local---

      localStorage.setItem("storageUserSelect", JSON.stringify(local)); //--rechargement de la page-- 

      window.location.reload();
    });
  });
} //--------creer une fonction pour supprimer id en fonction de sa couleur dans le local-------


function supprimerProduit(idArticleSupprimer, colors) {
  console.log(colors); //----recup donnees local---- 
  // ---Attention changer const en let pour pouvoir modifier les valeur dans la variable--- 

  var local = JSON.parse(localStorage.getItem("storageUserSelect")); //--boucle pour parcourir le local-- 

  for (var i = 0; i < local.length; i++) {
    //---condition ( si id = id à supprimer et couleur du produit = couleur à supprimer)---
    var index = local.findIndex(function (elmt) {
      return elmt.idProduit === idArticleSupprimer && elmt.colors === colors;
    });

    if (index !== -1) {
      local.splice(index, 1);
      localStorage.setItem("storageUserSelect", JSON.stringify(local));
    }
  } //--rechargement de la page-- 


  window.location.reload();
}
/*------------------------------Fonction du formulaire------------------------------*/
// ----recuperer les donner dans le local----


var local = JSON.parse(localStorage.getItem("storageUserSelect")); //------recuperer les donnees saisies par l'utilisateur dans le formulaire -----
//--Recuperer le bouton envoie des info du formulaire --

var btnFormEnvoie = document.querySelector("#order"); //-- Ecoute du bouton d'envoie du formulaire --

btnFormEnvoie.addEventListener("click", function (event) {
  event.preventDefault(); //--Créer un "class "formulaire" pour stocker les donnees du formulaire----

  var formulaire = function formulaire() {
    _classCallCheck(this, formulaire);

    this.prenom = document.getElementById("firstName").value;
    this.nom = document.getElementById("lastName").value;
    this.adresse = document.getElementById("address").value;
    this.ville = document.getElementById("city").value;
    this.email = document.getElementById("email").value;
  }; //appel de l'instance de la class "formulaire"


  var contact = new formulaire();
  console.log(contact);
  /*----------------------------------------------Controle du Formulaire------------------------------- */
  //--affichage des message d'alerte--

  var affichageMsgAlert = function affichageMsgAlert(value) {
    return "".concat(value, " : Minimum 3 \xE0 20 caract\xE8res Maximum autoris\xE9s.\nAttention les chiffres et les symboles sont non autoris\xE9s.");
  };

  var affichageMsgAdressAlert = function affichageMsgAdressAlert(value) {
    return "".concat(value, " : Veuillez commencer par renseigner le n\xB0 de la voie.\nPuis le type et le nom de la voie.\nMinimum de 3 \xE0 30 caract\xE8res Maximum autoris\xE9s.\nAttention les symboles sont non autoris\xE9s.");
  };

  var affichageMsgEmailAlert = function affichageMsgEmailAlert(value) {
    return "".concat(value, " : Veuillez saisir une adresse mail valide \nAttention le symbole \"@\" et \".\" sont obligatoire et autoris\xE9s qu'une seule fois.\n L'Email doit se terminer minimum par 2 ou 3 caract\xE8res \nExemple : Abc@example.com ou 1b2c3@example.fr");
  }; //--Prenom-Nom-Ville Regex Controle--


  var prenomNomVilleRegex = function prenomNomVilleRegex(value) {
    return /^[A-Za-zÀ-ÿ  -]{3,20}$/.test(value);
  }; //--Prenom --


  function prenomRegex() {
    //--recuperer les donnees des champs du formulaire---
    var lePrenom = contact.prenom; //--Controle de la validation du champ Prenom avec la methode Regex --

    if (prenomNomVilleRegex(lePrenom)) {
      return true;
    } else {
      alert(affichageMsgAlert("Prénom"));
      document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez renseigner ce champ";
      return false;
    }
  } //--Nom --


  function nomRegex() {
    //--recuperer les donnees des champs du formulaire---
    var leNom = contact.nom; //--Controle de la validation du champ Nom avec la methode Regex --

    if (prenomNomVilleRegex(leNom)) {
      return true;
    } else {
      document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez renseigner ce champ";
      alert(affichageMsgAlert("Nom"));
      return false;
    }
  } //--Adresse-- + --controle via Regex --
  //--Regex directement dans la fonction adresse 


  function adresseRegex() {
    //--recuperer les donnees des champs du formulaire---
    var laAdresse = contact.adresse; //--Controle de la validation du champ Adresse avec la methode Regex --

    if (/^[0-9 ]{1,4}[A-Za-zÀ-ÿ  -]{2,30}$/.test(laAdresse)) {
      return true;
    } else {
      document.getElementById("addressErrorMsg").innerHTML = "Veuillez renseigner ce champ";
      alert(affichageMsgAdressAlert("Adresse"));
      return false;
    }
  } //--Ville--


  function villeRegex() {
    //--recuperer les donnees des champs du formulaire---
    var laVille = contact.ville; //--Controle de la validation du champ Ville avec la methode Regex --

    if (prenomNomVilleRegex(laVille)) {
      return true;
    } else {
      document.getElementById("cityErrorMsg").innerHTML = "Veuillez renseigner ce champ";
      alert(affichageMsgAlert("Ville"));
      return false;
    }
  } //--Email-- + --controle via Regex --
  //--Regex directement dans la fonction Email-- 


  function emailRegex() {
    //--recuperer les donnees des champs du formulaire---
    var laemail = contact.email; //--Controle de la validation du champ Email avec la methode Regex --

    if (/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(laemail)) {
      return true;
    } else {
      document.getElementById("emailErrorMsg").innerHTML = "Veuillez renseigner ce champ";
      alert(affichageMsgEmailAlert("Email"));
      return false;
    }
  }
  /*---------------------------------Gestion du Local avec le Formulaire -----------------------------*/

  /*--------mettre l'objet "contact" dans le localStorage--- 
   ---attention mettre l'objet en chaine de caractere "JSON STRINGIFY"--------*/
  //--Ajout de la condition si le formulaire est bien rempli j'envoie l'objet sinon (non)---


  if (prenomRegex() && nomRegex() && adresseRegex() && villeRegex() && emailRegex()) {
    localStorage.setItem("formulaire", JSON.stringify(contact));
  } else {
    alert("Veuillez bien remplir les champs du formulaire avant de commander.");
  } //---creer une variable avec les produits du local et le formulaire---


  var produitPanierFormulaire = {
    local: local,
    contact: contact
  };
  console.log(produitPanierFormulaire); //--Envoyer la variable avec les produits du local et le formulaire ??? probleme avec la methode post 

  var envoyerFetch = fetch("http://localhost:3000/api/product/order", {
    method: "POST",
    body: JSON.stringify(produitPanierFormulaire),
    headers: {
      "Content-type": "application/json"
    }
  });
});
/* ---------Afficher le contenu du local dans le formulaire-----*/
//--Recuperer la key du local puis la stocqué dans une variable--

var localDonnees = localStorage.getItem("formulaire"); //--Attention convertir la chaine de caractere en objet Javascript--

var localDonneesObjet = JSON.parse(localDonnees);
console.log("localDonneesObjet");
console.log(localDonneesObjet);
/* -------Mettre les donnees du formulaire du local 
directement dans les champs du formulaire----- */

document.getElementById("lastName").value = localDonneesObjet.nom;
document.getElementById("firstName").value = localDonneesObjet.prenom;
document.getElementById("address").value = localDonneesObjet.adresse;
document.getElementById("city").value = localDonneesObjet.ville;
document.getElementById("email").value = localDonneesObjet.email;