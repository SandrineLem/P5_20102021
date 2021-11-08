//recuperation des articles avec api 

main()
async function  main(){ // recuperer les infos des articles et afficher les articles
    const articles = await getArticles()
    console.log(articles)
    displayArticles(articles)
}

function getArticles(){ // recuperer les données des produits
   return fetch("http://localhost:3000/api/products")
    .then(function(articlesResponse){
        return articlesResponse.json()
    })
    .then(function (articles){
     return articles  
    })
    .catch(function(error){
        alert (error)
    })
}


function displayArticles(){

}




const local = JSON.parse(localStorage.getItem("storageUserSelect"));// recuperer les donner dans le local
console.log(local);

const AffichageProduitPanier = document.getElementById("cart__items");
console.log(AffichageProduitPanier);

    

//fonction afficher les produit du localStorage  dans le panier
//si le panier est vide 
if (local === null){
console.log("le panier est vide")
}else{//si le panier n'est pas vide l'afficher dans le local storage 
    let AffichageProduitPanier =[];
   
    for (y = 0; y < local.length; y++)
    
    {
        AffichageProduitPanier = AffichageProduitPanier + 
        `<article class="cart__item" data-id="{product-ID}">
        <div class="cart__item__img">
          <img src="" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>Nom du produit</h2>
            <p>42,00 €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }
}