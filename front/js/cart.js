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
// ----recuperer les donner dans le local----
const local = JSON.parse(localStorage.getItem("storageUserSelect"));
//------recuperer les donnees saisies par l'utilisateur dans le formulaire -----
//--Recuperer le bouton envoie des info du formulaire --
let btnFormEnvoie = document.querySelector("#order");
//-- Ecoute du bouton d'envoie du formulaire --
btnFormEnvoie.addEventListener("click", (event) =>{
  event.preventDefault();
})
//--Créer un "objet "formulaire" pour stocker les donnees du formulaire----
 class formulaire {
   constructor(){
     this.prenom = document.querySelector("#firstName").value;
     this.nom = document.querySelector("#lastName").value;
     this.adresse = document.querySelector("#address").value;
     this.ville = document.querySelector("#city").value;
     this.email = document.querySelector("#email").value;
   }  
 }
 //instance pour creer l'objet contact 
 const contact = new formulaire ();
//---Creer une "tableau de produit" à partir du local recup les info avec l'id 

let tabProduitId = [];
for(let i = 0; i < local.length; i++){
  tabProduitId.push(local[i].idProduit);
}
console.log(tabProduitId)

//--------Analyser les donnees saisies par l'utilisateur dans le formulaire ---
//-----utiliser la methode regExp pour creer des expressions regulières ---

//--creation regExp pour ( que du texte ) ( prenom , nom)
/*explication = ok -> minuscule , majuscule , accent speciaux sur lettre 
majuscule et minuscule , ok -> .'- ok -> minumum 2 caractere jusqu'a max 20
*/
const regExPrenomNom  = (value) => {
  return /^[a-zA-ZÀ-ÿ ,.'-]{2,20}$/.test(value)
}

//--creation regExp pour ( text + number ) (adresse)
const regExValidAdresse = (value) => {
  return /^([a-zA-ZÀ-ÿ,-. ]{1,}|[0-9]{1,4})[ ].{1,}$/.test(value)
}

//--creation regExp pour ( que du texte ) ( ville)
/* idem au (nom prenom) mais accetpte minimum 3 caracteres pour les villes ( car il 
  existe pas de ville en France en 2 lettres*/
  const regExValidVille  = (value) => {
    return /^[a-zA-ZÀ-ÿ ,.'-]{3,20}$/.test(value)
  }


//--creation regExp pour email
/*--explication regExp ^ = debut caracteres accepté 1 ere partie => lettre minuscule ou majusclule ou 0 jusqu'a 9
ok pour des . - _ et je peux en ecrire plusieurs fois dans le debut du mail 
retrouver un @ une seul fois puis  2eme partie de l'email ( meme chose que la 1ere)
Ensuite 3eme partie notifie qu'1 seul . 4eme partie minuscule a-z de 2lettres jusqu'a 10 max
$ fin de l'expression   
*/ 
const regExValidEmail  = (value) => {
  return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value)
}


//----Afficher un message "d'erreur" si pas correctement saisie dans les champs demandés---
//--Creer les fonctions (condition true ; false ) de chaque champs du formulaire
//--Prenom-- 
function prenomValidForm(){
  const prenomSaisie = contact.prenom;
  //-condition si c'est true or false
  if(regExPrenomNom(prenomSaisie)){
   firstNameErrorMsg.innerHTML = " ";
    return true ;
  }else{
    firstNameErrorMsg.innerHTML = " Veuillez saisir au minimum 2 caractères ";
    return false ;
    
  }
}
//--Nom--
function nomValidForm(){
  const nomSaisie = contact.nom; 
  //-condition si c'est true or false
  if(regExPrenomNom(nomSaisie)){
    lastNameErrorMsg.innerHTML = " ";
    return true ;
  }else{
    lastNameErrorMsg.innerHTML = " Veuillez saisir au minimum 2 caractères ";
    return false ;
  }
}

//--Adresse--
function adresseValidForm(){
  const adresseSaisie = contact.adresse;
  //-condition si c'est true or false
  if(regExValidAdresse(adresseSaisie)){
    addressErrorMsg.innerHTML = " ";
    return true ;
  }else{
    addressErrorMsg.innerHTML = " Veuillez saisir une adresse postale correcte ";
    return false ;
  }
}
//--Ville--- 
function villeValidForm(){
  const villeSaisie = contact.ville;
  //-condition si c'est true or false 
  if(regExValidVille(villeSaisie)){
    cityErrorMsg.innerHTML = " ";
    return true ;
  }else{
    cityErrorMsg.innerHTML = " Veuillez saisir une ville correcte ";
    return false ;
  }
}
//--Email--- 
function emailValidForm(){
  const emailSaisie = contact.email;
  //-condition si c'est true or false
  if(regExValidEmail(emailSaisie)){
   emailErrorMsg.innerHTML = " ";
    return true ;
  }else{
    emailErrorMsg.innerHTML = " Veuillez saisir un e-mail valide ";
    return false ;
  }
}

   


  
 
