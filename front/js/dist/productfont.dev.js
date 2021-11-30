"use strict";

(function _callee() {
  var articleId, article;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          articleId = getArticleId();
          console.log(articleId);
          _context.next = 4;
          return regeneratorRuntime.awrap(getArticle(articleId));

        case 4:
          article = _context.sent;
          console.log(article);
          hydrateArticle(article);
          verifLocalStorage(); // Ajout de la fonction verification du localStorage

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
})(); //fonction pour creer l'url correspondant avec l'id du produit 


function getArticleId() {
  return new URL(location.href).searchParams.get("id");
} // ------Ajouter les instruction pour la fonction verifLocalStorage------


function verifLocalStorage() {
  //transformation d'une chaine JSON en objet JAVASCRIPT (methode parse)
  var local = JSON.parse(localStorage.getItem("storageUserSelect"));

  if (local == null) {
    // --si il renvoie null-- 
    localStorage.setItem("storageUserSelect", JSON.stringify([]));
    /* alors recup des donnees du storage
     et convertir en json dans un tableau*/
  }
} //recuperation des donnees de l'api avec id de chaque produit


function getArticle(articleId) {
  return fetch("http://localhost:3000/api/products/".concat(articleId)).then(function (httpBodyResponse) {
    // fonction quand il recupere les donnees en httpBody
    return httpBodyResponse.json(); // transfromation de httpBody  en json 
  }).then(function (articles) {
    // recuperer le json renommé en "articles"
    return articles; // reponse return le contenu json "articles"
  })["catch"](function (error) {
    // si erreur fonction d'afficher une alert 'error' 
    alert(error);
  });
} // ------fonction pour ajouter dans le dom les infos produits-----


function hydrateArticle(article) {
  document.getElementById("item_img").innerHTML += "<img src=\"".concat(article.imageUrl, "\" alt=\"").concat(article.altTxt, "\">");
  document.getElementById("title").textContent = "".concat(article.name);
  document.getElementById("price").textContent = "".concat(article.price);
  document.getElementById("description").textContent = "".concat(article.description); //Ajout de la boucle for recuperer la couleur 

  for (var i = 0; i < article.colors.length; i++) {
    document.getElementById("colors").innerHTML += "<option value=\"".concat(article.colors[i], "\">").concat(article.colors[i], "</option>");
  }
}

var id = getArticleId();
console.log(id);

addToCart.onclick = function () {
  // recuperer les donner dans le local
  var local = JSON.parse(localStorage.getItem("storageUserSelect"));
  console.log(id); //si le produit existe pas  

  if (local.findIndex(function (x) {
    return x.idProduit === id;
  }) === -1) {
    // ajouter l'objet userSelect avec id , colors , quantityUser  
    var userSelect = {
      idProduit: id,
      colors: colors.value,
      quantityUser: parseInt(quantity.value)
    }; // envoyer les info "userSelect" dans le local

    local.push(userSelect); //mettre a jour le local   

    localStorage.setItem("storageUserSelect", JSON.stringify(local)); //afficher le local

    console.log(local); // si le produit existe   
  } else {
    //si le produit existe  
    var index = local.findIndex(function (x) {
      return x.idProduit === id && x.colors === colors.value;
    }); //chercher la valeur

    if (index === -1) {
      var _userSelect = {
        idProduit: id,
        colors: colors.value,
        quantityUser: parseInt(quantity.value)
      }; //envoyer les info 'userSelect" dans le local (id colors quantity)

      local.push(_userSelect);
    } else {
      local[index].quantityUser = parseInt(local[index].quantityUser + parseInt(quantity.value));
    } //ajout de l'ojet(clé , valeur) dans le local


    localStorage.setItem("storageUserSelect", JSON.stringify(local));
  }
};