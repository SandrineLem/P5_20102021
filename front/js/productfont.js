

/* -------------------Fonction global "sans nom"  pour recuperer l'id du produit dans l'url (fonction: getArticleId) -----------
---------------------------Recupere les données de l'api de chaque article grace à l'ajout de l'id du produit fonction(getArticle)------------
--------------------------------Affiche les produits + ajoute les information au DOMgrace à la fonction (hydrateArticle)"------ 
---------------------------------- Verififie si les données sont bien presentes dans le localStorage sinon les ajouter ----------*/

(async function(){
    const articleId = getArticleId()
    console.log(articleId)
    const article = await getArticle(articleId);
    console.log(article)
    hydrateArticle(article)
    verifLocalStorage();
})()

/*-------------------------------------Les Fonctions à utiliser dans la fonction "Globale " pour --------------------
-----------------------------------------inserer un produit et ses details dans la page Produit------------------------*/

// Fonction pour recuperer l'id dans l'url créé avec l'id de l'article  
function getArticleId(){
    return new URL (location.href).searchParams.get("id")
}


// Fonction verifLocalStorage si le localStorage est vide

function verifLocalStorage(){ 
    //transformation d'une chaine JSON en objet JAVASCRIPT (methode parse)
    const local = JSON.parse(localStorage.getItem("storageUserSelect"))
    if (local == null){ // --si il renvoie null-- 
        //--recuperer les données du local et les convertir en json dans un tableau--
        localStorage.setItem("storageUserSelect", JSON.stringify([]));
        
    }
}

// Fonction recuperation des donnees de l'api pour chaque article  à l'aide de la methode "fetch" et de l'id du produit

function getArticle(articleId){
    return fetch(`http://localhost:3000/api/products/${articleId}`)
    .then (function(httpBodyResponse){ // fonction qui recupere les donnees en httpBody
        return httpBodyResponse.json() // transfromation de reponse httpBody en json 
    })
    .then(function(articles){ // recuperer le json renommé en "articles"
        return articles;        // reponse return le contenu json "articles"
    })
    .catch(function(error){    // si erreur fonction d'afficher une alert 'error' 
        alert(error)
    });
}


// Fonction pour ajouter les infos du produit  dans le dom 

 function hydrateArticle(article){
    document.getElementById("item_img")
     .innerHTML += `<img src="${article.imageUrl}" alt="${article.altTxt}">`;
    document.getElementById("title").textContent = `${article.name}`;
    document.getElementById("price").textContent =`${article.price}`;
    document.getElementById("description").textContent = `${article.description}`;
    //Ajout de la boucle for recuperer la couleur 
    for(let i = 0; i < article.colors.length; i++){
        document.getElementById("colors").innerHTML += `<option value="${article.colors[i]}">${article.colors[i]}</option>`; 
    }    
}

/*-----------------------Ajouter des produits dans la page panier depuis la page Produit---------
-------------------Grace à l'écoute au click du bouton (Ajouter au panier)-------------------------
-----------Utilisation du LocalStorage pour stocker les données du ou des produits ajouté(s) au panier---------
------------------Creation de l'objet "UserSelect" pour stoker id ; colors ; quantiteUser----------
-----------------------convertir la quantité en nombre grace a (parseInt) ---------------
----------------------------------Envoyé l'objet dans le local --------------
--------------------Ajouter les instructions des conditions d'affichage du produit-----------
------------------------(même couleur + meme id alors addictioner seulement la quantité)---------
    -----------------------------------mise a jours du localStorage-----------*/


// Recupérer et stocker l'id du produit dans une const
const id = getArticleId();
console.log(id)

addToCart.onclick = () =>{
    // recuperer les donner dans le local
    const local = JSON.parse(localStorage.getItem("storageUserSelect"));
    console.log(id);
    //si le produit existe pas  
    if  (local.findIndex((x) => (x).idProduit === id) === -1) {
    // ajouter l'objet userSelect avec id , colors , quantityUser  
        let userSelect = {   
        idProduit: id,
        colors: colors.value,
        quantityUser: parseInt(quantity.value),
        };
        // envoyer les info "userSelect" dans le local
        local.push(userSelect);
        //mettre a jour le local (ajouter l'objet)  
        localStorage.setItem("storageUserSelect", JSON.stringify(local));
        //afficher le local
        console.log(local);
       
    }else{//sinon si le produit existe
        //chercher la valeur  (si même couleur et même id prodruit)
        let index = local.findIndex((x) => x.idProduit === id && x.colors === colors.value);
        if (index === -1){
            let userSelect = {
                idProduit:id,
                colors:colors.value,
                quantityUser: parseInt(quantity.value),
            };
            //envoyer les info 'userSelect" dans le local (id colors quantity)
            local.push(userSelect); 
    }else{//sinon si le produit à la même couleur et le même id alors tu ajoutes la quantité de (index) à la donnée presente déjà  dans le local
    local[index].quantityUser =
     parseInt(local[index].quantityUser + parseInt(quantity.value)); 
    }// puis mettre a jours dans le localStorage 
    localStorage.setItem("storageUserSelect", JSON.stringify(local));
}    
};


