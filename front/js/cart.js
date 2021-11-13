


//recuperation des articles avec id article 
function getArticle(articleId){
  return fetch(`http://localhost:3000/api/products/${articleId}`)//recuperation des donnees de l'api avec id de chaque produit
  .then (function(httpBodyResponse){ // fonction quand il recupere les donnees en httpBody
      return httpBodyResponse.json() // transfromation de httpBody  en json 
  })
  .then(function(articles){ // recuperer le json renommé en "articles"
      return articles;        // reponse return le contenu json "articles"
  })
  .catch(function(error){    // si erreur fonction d'afficher une alert 'error' 
      alert(error)
  });
}

// recuperer les donner dans le local
const local = JSON.parse(localStorage.getItem("storageUserSelect"));
console.log(local);

//recup l'id dans local general 
//faire une boucle sur le local storage 
//recuperer la ligne 
//puis recuperer la function get article pour api id en lien avec l'id dans le local  





    

//fonction afficher les produit du localStorage  dans le panier
//si le panier est vide 
if (local === null){
console.log("le panier est vide")
}else{//si le panier n'est pas vide l'afficher dans le local storage 

    for (y = 0; y < local.length; y++){
        const idLocal = local[y].idProduit;
        console.log(idLocal)
        const articleLocal = getArticle(idLocal)
        document.getElementById("cart__items").innerHTML +=  
        `<article class="cart__item" data-id="${idLocal}">
        <div class="cart__item__img">
          <img src="${articleLocal.imageUrl}" alt="${articleLocal.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>${articleLocal.name}</h2>
            <p>${articleLocal.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :${local[y].quantityUser} </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${local[y].quantityUser}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }
}