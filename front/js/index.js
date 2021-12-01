 
/* -------------------Fonction global "sans nom"  utilisant les fonctions pour afficher chaque article sur la page d'accueil -----------
---------------------------cette fonction recupere les données , creer une boucle pour chaque article en utilisant------------
----------------------------la fonction "Afficher les articles (displayArticle)" qui egalement les ajoutes au DOM ------*/ 


// Fonction "getArticles pour Recup des articles 
(async function () {// ajout du "async pour que fonction "await"
    const articles = await getArticles() // ajout du await pour attendre les donnees pour le return fetch 
    // boucle pour chaque article 
    for (article of articles) {
    // afficher tout les article(s)      
        displayArticle(article) 
        console.log(articles)
    }
})()// on appelle la fonction grace au ()

/*--------------------------Les Fonctions à utiliser dans la fonction "Globale " pour afficher les articles sur la page d'accueil -----------*/

//Fonction pour recuperer les donnees de l API des articles avec la methode fetch
function getArticles(){
    return fetch("http://localhost:3000/api/products")
    .then (function(httpBodyResponse){ // fonction quand il recupere les donnees en httpBody
        return httpBodyResponse.json() // transfromation de httpBody  en json 
    })
    .then(function(articles){ // recuperer le json renommé en "articles"
        return articles        // reponse return le contenu json "articles"
    })
    .catch(function(error){    // si erreur fonction d'afficher une alert 'error' 
        alert(error)
    })
}

// utiliser notre fonction afficher les articles avec les donnees article (Json) qui modifie le  dom avec innerHtml avec id item
// utiliser "${}" pour inclure les donnees du fichier article (json)
function displayArticle(article){
    document.getElementById("items") .innerHTML += `<a href="product.html?id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article></a>`
}
