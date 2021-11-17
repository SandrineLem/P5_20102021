(async function(){
  // recuperer les donner dans le local
    const local = JSON.parse(localStorage.getItem("storageUserSelect"));
    console.log(local);
  //fonction afficher les produit du localStorage  dans le panier
  //si le panier est vide 
  if (local === null){
  console.log("le panier est vide")
}else{//si le panier n'est pas vide l'afficher dans le local storage 

    for (y = 0; y < local.length; y++){//faire une boucle sur le local storage
        const idLocal = local[y].idProduit;//recup l'id dans local  
        console.log(idLocal)
        const articleLocal = await getArticle(idLocal)//puis recuperer la function get article pour api id en lien avec l'id dans le local 
        console.log(articleLocal);
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
              <p class="deleteItem" onClick="supprimerProduit('${idLocal}')">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }
}
  
  
})()


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





//creer une fonction pour supprimer id dans le local
function supprimerProduit (idArticleSupprimer){
console.log (idArticleSupprimer)
// recuperer les donner dans le local
  const local = JSON.parse(localStorage.getItem("storageUserSelect"));
//selectionner les donnees des boutons supprimer
  let btnSupprimerPanier = document.getElementsByClassName("cart__item"); 
console.log(btnSupprimerPanier);
  for (let i = 0; i < btnSupprimerPanier.length;i ++){
    btnSupprimerPanier[i].addEventListener("click", (event) =>{
      event.preventDefault();

      //Aller chercher l'id du produit dans le tableau 
      let produitSelectionne = btnSupprimerPanier[i].closest("article");
      let idProduitSelectione = produitSelectionne.dataset.id;
      console.log(idProduitSelectione)
      //recuperer les données du local 
      let local = JSON.parse(localStorage.getItem("storageUserSelect"));
    
      //appliquer un filtre dans le local
      local = local.filter(elemt => elemt.idProduit !== idProduitSelectione);
      
      //mettre a jour les données renvoyées dans le local 
      localStorage.setItem("storageUserSelect", JSON.stringify(local));//ajout de l'ojet(clé , valeur) dans le local
      console.log(local);
    }) 
  } 
}
  