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
              <input type="number" class="itemQuantity" onClick="modifQuantitePanier ()" "name="itemQuantity" min="1" max="100" value="${local[y].quantityUser}">
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

//creer une fonction pour modifier la quantité de produit dans la page panier 
function modifQuantitePanier (){
 // recuperer les donner dans le local
  const local = JSON.parse(localStorage.getItem("storageUserSelect"));

//selectionner les donnees des boutons quantite
  let elmtQuantite = document.querySelectorAll(".itemQuantity");
  console.log(elmtQuantite)
  elmtQuantite.forEach((quantiteModif)=> {
//recup la donnee du id et de la quantite 
   let produitQuantite = quantiteModif.closest("article");
   let produitQuantiteId = produitQuantite.dataset.id;
   console.log(produitQuantiteId);
//utilisation de  l'observation avec addEventListener pour voir le changement de la quantité
  quantiteModif.addEventListener("change", () => {
//recup de la valeur de la quantite changee 
    let newsQuantiteProduit = Number(quantiteModif.value);
    console.log(newsQuantiteProduit)
//utiliser le local cette fois si pour le mettre a jour de la nouvelle quantite 
      local.forEach((ElemtNew)=> { 
         if (ElemtNew.idProduit === produitQuantiteId){
          ElemtNew.quantityUser = newsQuantiteProduit;
          } 
        });
//mettre a jour les données renvoyées dans le local       
  localStorage.setItem("storageUserSelect", JSON.stringify(local));//ajout de l'ojet(clé , valeur) dans le local
  window.location.reload();
    })

  })
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
      // voir pour rajouter la couleur du produit pour recuperer la couleur du produit ? 
      let produitSelectionne = btnSupprimerPanier[i].closest("article");
      let idProduitSelectione = produitSelectionne.dataset.id;
      console.log(idProduitSelectione)
      //recuperer les données du local 
      let local = JSON.parse(localStorage.getItem("storageUserSelect"));
    
      //appliquer un filtre dans le local (voir pour rajouter la couleur dans le filtre)
      local = local.filter(elemt => elemt.idProduit !== idProduitSelectione );
      
      //mettre a jour les données renvoyées dans le local 
      localStorage.setItem("storageUserSelect", JSON.stringify(local));//ajout de l'ojet(clé , valeur) dans le local
      console.log(local);
    }) 
  } 
}
//Total calcul du "nombre d'articles" dans le panier

//creer un tableau
let quantiteProduitTotal = [];
//recupere les donnees du local 
const local = JSON.parse(localStorage.getItem("storageUserSelect"));
//condition ( si , sinon )
//le panier est vide ou egale à 0 alors tu affiches "Votre panier est vide"
if (local=== null || local === 0){
  alert("Votre panier est vide");
}else{
for (let article of local){
  let quantiteArticle =+ article.quantityUser;
  //j'envoie les donnees dans mon tableau
  quantiteProduitTotal.push(quantiteArticle);
  console.log(quantiteProduitTotal);//affiche bien la quantite de chaque produit  
}
//faire une addition des quantitees des produits recuperer dans le total pour avoir le nombre total 
//Utiliser la methode reduce pour accumuler les donnees du tableau 
const reducer = (previousValue, currentValue) => previousValue + currentValue;
//ajouter la donnees dan smon tableau 
let quantiteTotalCalculePanier = quantiteProduitTotal.reduce(reducer);
//utiliser le DOM pour ajouter ma vaviable contenant la quantite calculé des produits  au HTML 
document.getElementById("totalQuantity").innerHTML = quantiteTotalCalculePanier;
} 










