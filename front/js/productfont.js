
(async function(){
    const articleId = getArticleId()
    console.log(articleId)
    const article = await getArticle(articleId)
    console.log(article)
    hydrateArticle(article)
    verifLacoalStorage();// Ajout de la fonction verification du localStorage
})()
function getArticleId(){
    return new URL (location.href).searchParams.get("id")
}
function verifLacoalStorage(){ // Ajouter les instruction pour la fonction verifLocalStorage
    const local = JSON.parse(localStorage.getItem("storageUserSelect"))
    if (local == null){ // si il renvoie null 
        localStorage.setItem("storageUserSelect", JSON.stringify([]));
        /* alors tu recup les donner du storage
         et converti en json dans un tableau*/
    }
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
    });
}


function hydrateArticle(article){
    
    document.getElementById("item_img")
     .innerHTML += `<img src="${article.imageUrl}" alt="Photographie d'un canapé">`;
    document.getElementById("title").textContent = `${article.name}`;
    document.getElementById("price").textContent =`${article.price}`;
    document.getElementById("description").textContent = `${article.description}`;
    document.getElementById("colors").innerHTML += `<option value="${article.colors[0]}">${article.colors[0]}</option> 
    <option value="${article.colors[1]}">${article.colors[1]}</option>`;
}


const id = getArticleId();

addToCart.onclick = () =>{
    const local = JSON.parse(localStorage.getItem("storageUserSelect"));// recuperer les donner dans le local
      
    if  (local.findIndex((x) => (x).idProduit === id) === -1) {   //si le produit existe pas 
        let userSelect = {   // ajouter l'objet userSelect avec id , colors , quantityUser
        idProduit: id,
        colors: colors.value,
        quantityUser: quantity.value,
        };
        local.push(userSelect); // envoyer les info "userSelect" dans le local 
        localStorage.setItem("storageUserSelect",JSON.stringify(local));//ajout de l'ojet(clé , valeur) dans le local 
           
    }else{// si le produit existe
        let index = local.findIndex((x) => (x).idProduit === id);//chercher la valeur
   
        if (local[index].colors === colors.value){ 
           local[index].quantityUser = 
           parseInt(local[index].quantityUser) + parseInt(quantity.value);//"parseInt" => convertir la chaine de caractere en number 
    }else{
        let userSelect = {
            // ajout de l'objet userSelect avec l id, colors , quantityUser
            idProduit: id,
            colors: colors.value,
            quantityUser: quantity.value,
        };
        local.push(userSelect);
    }
    localStorage.setItem("storageUserSelect", JSON.stringify(local)); 
}    
};

 /*if (userSelectArray.findIndex(x=> x.idProduit === id ) === -1){
    let userSelect = {   
    idProduit: id,
    colors: colors.value,
    quantityUser: quantity.value
    } 
    userSelectArray.push(userSelect);

  localStorage.setItem("storageUserSelect",JSON.stringify(userSelectArray));
  
    console.log(userSelectArray);
}else if (userSelectArray.findIndex(x=>x.colors), userSelectArray.findIndex(x=>x.idProduit) > -1) {
    //si meme couleur et meme id alors ..
    //nommer la nouvelle valeur 
    let newUserSelect = userSelectArray.splice(x=>x.quantityUser)
    console.log(newUserSelect);
 }else {
    console.log(id); 
 } 
 local.findIndex (x=>x.idProduit === id)
*/   



    
      




