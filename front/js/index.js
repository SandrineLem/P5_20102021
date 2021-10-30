 
//Fonction global "sans nom" qui fera tout le temps la meme chose
//Fonction pour recuperer les donnees et les mettre dans le dom page accueil des le chargement de la page  
// Fonction "getArticles pour 1 - Recup des articles 
(async function () {// ajout du "async pour que fonction "await"
    const articles = await getArticles() // ajout du await pour attendre les donnees pour le return fetch 
    
    for (article of articles) { // boucle article / article (du total des articles) 
        displayArticle(article) // afficher tout les article(s)
        console.log(articles)
    }
})()// on appelle la fonction grace au parentaises

//Fonction pour recuperer les donnees de l API des articles 
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
// utiliser notre fonction afficher les articles avec les donnees article (Json), Modification du dom avec innerHtml avec id item 
function displayArticle(article){
    document.getElementById("items") .innerHTML += `<a href="product.html?id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article></a>`
}
// "${}" inclure les donnees du fichier article (json)

