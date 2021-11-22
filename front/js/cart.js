//------------------------------Fonction du panier---------------------

//--------Afficher les produits dans le panier -------------------

(async function() {
  // ---recuperer les donner dans le local----
  const local = JSON.parse(localStorage.getItem("storageUserSelect"));
  console.log(local);
  //------fonction afficher les produit du localStorage  dans le panier---
  //----si le panier est vide----
  if (local === null) {
      console.log("le panier est vide");
  } else {
      //---si le panier n'est pas vide l'afficher dans le local storage---
      //--initialiser le total du prix du Panier--
      let prixTotalPanier = 0;
      //--initialiser le total de la quantite de produit calcule dans le Panier--
      let quantiteTotalCalculePanier = 0;

      //--faire une boucle sur le local storage--
      for (y = 0; y < local.length; y++) {
          const idLocal = local[y].idProduit; //recup l'id dans local
          console.log(idLocal);
      //--puis recuperer la function get article pour api id en lien avec l'id dans le local--
          const articleLocal = await getArticle(idLocal); 
          console.log(articleLocal);
      //---calcul du prix Total dans le panier (recup prix dans le local * quantite dans le local )---
          prixTotalPanier =
              prixTotalPanier +
              parseInt(articleLocal.price) * parseInt(local[y].quantityUser);
      //---calcul de la quantite total de produit dans le panier(addition de la quantite Total de produit + quantite du local)---
          quantiteTotalCalculePanier =
              quantiteTotalCalculePanier + parseInt(local[y].quantityUser);
      //------insertion dans le dom des infos produit------ 
          document.getElementById(
              "cart__items"
          ).innerHTML += `<article class="cart__item" data-id="${idLocal}">
      <div class="cart__item__img">
        <img src="${articleLocal.imageUrl}" alt="${articleLocal.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${articleLocal.name}</h2>
        <div class="item__content__settings__color">
            <h2>'${local[y].colors}'<h2>
          <p>${articleLocal.price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté :${local[y].quantityUser} </p>
            <input type="number" class="itemQuantity" onChange="modifQuantitePanier()" "name="itemQuantity" min="1" max="100" value="${local[y].quantityUser}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" onClick="supprimerProduit('${idLocal}','${local[y].colors}')">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
      }
      //------insertion dans le dom du prix total du panier------ 
      document.getElementById("totalPrice").innerHTML = prixTotalPanier + " €";
      //------insertion dans le dom de la quantite total calculee du panier------ 
      document.getElementById(
          "totalQuantity"
      ).innerHTML = quantiteTotalCalculePanier;
  }
})();

//-----------recuperation des articles avec id article----------
function getArticle(articleId) {
  return fetch(`http://localhost:3000/api/products/${articleId}`) //recuperation des donnees de l'api avec id de chaque produit
      .then(function(httpBodyResponse) {
          // -----fonction quand il recupere les donnees en httpBody-----
          return httpBodyResponse.json(); // ---transfromation de httpBody  en json-----
      })
      .then(function(articles) {
          // ---recuperer le json renommé en "articles"---
          return articles; // ---reponse return le contenu json "articles"---
      })
      .catch(function(error) { //-- si erreur fonction d'afficher une alert 'error'---
          
          alert(error);
      });
}

//--------------creer une fonction pour modifier la quantité de produit dans la page panier-----------
function modifQuantitePanier() {
  // ----recuperer les donner dans le local----
  const local = JSON.parse(localStorage.getItem("storageUserSelect"));

  //----selectionner les donnees des boutons quantite----
  let elmtQuantite = document.querySelectorAll(".itemQuantity");
  console.log(elmtQuantite);
  elmtQuantite.forEach((quantiteModif) => {
      //----recup la donnee du id et de la quantite----
      let produitQuantite = quantiteModif.closest("article");
      let produitQuantiteId = produitQuantite.dataset.id;
      console.log(produitQuantiteId);
      //----utilisation de  l'observation avec addEventListener pour voir le changement de la quantité----
      quantiteModif.addEventListener("change", () => {
          //---recup de la valeur de la quantite changee---
          let newsQuantiteProduit = Number(quantiteModif.value);
          console.log(newsQuantiteProduit);
          //---utiliser le local cette fois si pour le mettre a jour de la nouvelle quantite---
          local.forEach((ElemtNew) => {
              if (ElemtNew.idProduit === produitQuantiteId) {
                  ElemtNew.quantityUser = newsQuantiteProduit;
              }
          });
          //---mettre a jour les données renvoyées dans le local---
          localStorage.setItem("storageUserSelect", JSON.stringify(local));
          //--rechargement de la page-- 
          window.location.reload();
      });
  });
}

//--------creer une fonction pour supprimer id en fonction de sa couleur dans le local-------
function supprimerProduit(idArticleSupprimer, colors) {
  console.log(colors);
  //----recup donnees local---- 
  // ---Attention changer const en let pour pouvoir modifier les valeur dans la variable--- 
  let local = JSON.parse(localStorage.getItem("storageUserSelect"));
  //--boucle pour parcourir le local-- 
  for (let i = 0; i < local.length; i++) {
  //---condition ( si id = id à supprimer et couleur du produit = couleur à supprimer)---
       let index = local.findIndex(
         (elmt)=> elmt.idProduit === idArticleSupprimer && elmt.colors === colors);
         
         if (index !== -1){
           local.splice(index, 1);
           localStorage.setItem("storageUserSelect", JSON.stringify(local));
           }
         }
  //--rechargement de la page-- 
  window.location.reload();
}

//------------------------------Fonction du formulaire------------------------------ 

