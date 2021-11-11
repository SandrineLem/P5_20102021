//recuperer les info des articles

main()
async function  main(){ // recuperer les infos des articles et afficher les articles
    const article = await getArticle()
    //console.log(article)
    displayArticles(article)
}     

function getArticle(){ // recuperer les données des produits
    return fetch(`http://localhost:3000/api/products`)
    .then(function(articlesResponse){
    return articlesResponse.json()
    })
    .then(function (article){
    return article  
    })
    .catch(function(error){
    alert (error)
    })
    }



// recuperer les donner dans le local
const local = JSON.parse(localStorage.getItem("storageUserSelect"));
//Ajouter les donner de fetch dans le local 
function displayArticles(article){
    local.push(article)   
}

//recuperer l'id du local + ajouter les info de l'id selectionné 



// const pour ajouter les element html sur l'element id 
const AffichageProduitPanier = document.getElementById("cart__items");

//fonction afficher les produit du localStorage  dans le panier
//si le panier est vide 
if (local === null){
console.log("le panier est vide")
}else{//si le panier n'est pas vide l'afficher dans le local storage 
    let localProduitId =[];
    
    {
        //boucle for pour afficher chaque index dans l'element id
        for (x = 0; x< local.length;x++){
        console.log("le panier n'est pas vide");
        //console.log(local); // affichage du local 
        
        localProduitId = localProduitId + `<article class="cart__item" data-id="${local[x].idProduit}">
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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${local[x].quantityUser}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
        }
        if (x === local.length){
            AffichageProduitPanier.innerHTML = localProduitId;
        }     
    }    
}


