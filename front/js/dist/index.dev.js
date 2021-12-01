"use strict";

/* -------------------Fonction global "sans nom"  utilisant les fonctions pour afficher chaque article sur la page d'accueil -----------
---------------------------cette fonction recupere les données , creer une boucle pour chaque article en utilisant------------
----------------------------la fonction "Afficher les articles (displayArticle)" qui egalement les ajoutes au DOM ------*/
// Fonction "getArticles pour Recup des articles 
(function _callee() {
  var articles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getArticles());

        case 2:
          articles = _context.sent;
          // ajout du await pour attendre les donnees pour le return fetch 
          // boucle pour chaque article 
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 6;

          for (_iterator = articles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            article = _step.value;
            // afficher tout les article(s)      
            displayArticle(article);
            console.log(articles);
          }

          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](6);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 14:
          _context.prev = 14;
          _context.prev = 15;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 17:
          _context.prev = 17;

          if (!_didIteratorError) {
            _context.next = 20;
            break;
          }

          throw _iteratorError;

        case 20:
          return _context.finish(17);

        case 21:
          return _context.finish(14);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 10, 14, 22], [15,, 17, 21]]);
})(); // on appelle la fonction grace au ()

/*--------------------------Les Fonctions à utiliser dans la fonction "Globale " pour afficher les articles sur la page d'accueil -----------*/
//Fonction pour recuperer les donnees de l API des articles avec la methode fetch


function getArticles() {
  return fetch("http://localhost:3000/api/products").then(function (httpBodyResponse) {
    // fonction quand il recupere les donnees en httpBody
    return httpBodyResponse.json(); // transfromation de httpBody  en json 
  }).then(function (articles) {
    // recuperer le json renommé en "articles"
    return articles; // reponse return le contenu json "articles"
  })["catch"](function (error) {
    // si erreur fonction d'afficher une alert 'error' 
    alert(error);
  });
} // utiliser notre fonction afficher les articles avec les donnees article (Json) qui modifie le  dom avec innerHtml avec id item
// utiliser "${}" pour inclure les donnees du fichier article (json)


function displayArticle(article) {
  document.getElementById("items").innerHTML += "<a href=\"product.html?id=".concat(article._id, "\">\n    <article>\n      <img src=\"").concat(article.imageUrl, "\" alt=\"").concat(article.altTxt, "\">\n      <h3 class=\"productName\">").concat(article.name, "</h3>\n      <p class=\"productDescription\">").concat(article.description, "</p>\n    </article></a>");
}