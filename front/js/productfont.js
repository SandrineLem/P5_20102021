
(async function(){
    const articleId = getArticleId()
    console.log(articleId)
    const article = await getArticle(articleId)
    console.log(article)
    hydrateArticle(article)
})()
function getArticleId(){
    return new URL (location.href).searchParams.get("id")
}
function getArticle(articleId){
    return fetch(`http://localhost:3000/api/products/${articleId}`)//recuperation des donnees de l'api avec id de chaque produit
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


function hydrateArticle(article){
    
    document.getElementById("item_img") .innerHTML += `<img src="${article.imageUrl}" alt="Photographie d'un canapé">`
    document.getElementById("title").textContent = `${article.name}`
    document.getElementById("price").textContent =`${article.price}`
    document.getElementById("description").textContent = `${article.description}`
    document.getElementById("colors") .innerHTML += `<option value="${article.colors[0]}">${article.colors[0]}</option> 
    <option value="${article.colors[1]}">${article.colors[1]}</option>`
}

//localStorage.steItem("clé","valeur")
//localStorage.getItem('clé)
//json.stringify(objet)
//json.parse(string)
//convertir les donnee au format json qui sont dans le localstorage 

const id = getArticleId();

const userSelectArray = [];

const local = JSON.parse(localStorage.getItem("userSelect"));

addToCart.onclick = () =>{
    
    console.log(id);
    const userSelect = {   
    idProduit:id,
    colors: colors.value,
    quantityUser: quantity.value
    }
    userSelectArray.push(userSelect);

  localStorage.setItem("storageUserSelect",JSON.stringify(userSelectArray));
  
    console.log(userSelectArray);
    
}






 
