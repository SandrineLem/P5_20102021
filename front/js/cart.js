//------------------------------Fonction du panier---------------------

//--------Afficher les produits dans le panier -------------------

(async function() {
  // ---recuperer les donner dans le local----
  const local = JSON.parse(localStorage.getItem("storageUserSelect"));
  
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
          
      //--puis recuperer la function get article pour api id en lien avec l'id dans le local--
          const articleLocal = await getArticle(idLocal); 
          
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

/*------------------------------Fonction du formulaire------------------------------*/
// ----recuperer les donner dans le local----
const local = JSON.parse(localStorage.getItem("storageUserSelect"));
//------recuperer les donnees saisies par l'utilisateur dans le formulaire -----
//--Recuperer le bouton envoie des info du formulaire --
let btnFormEnvoie = document.querySelector("#order");
//-- Ecoute du bouton d'envoie du formulaire --
btnFormEnvoie.addEventListener("click", (event) =>{
  event.preventDefault();
  //--Créer un "class "formulaire" pour stocker les donnees du formulaire----
 class formulaire {
   constructor(){
     this.prenom = document.getElementById("firstName").value;
     this.nom = document.getElementById("lastName").value;
     this.adresse = document.getElementById("address").value;
     this.ville = document.getElementById("city").value;
     this.email = document.getElementById("email").value;
   }   
 }
 //appel de l'instance de la class "formulaire"
 const contact = new formulaire();
 console.log(contact)

/*----------------------------------------------Controle du Formulaire------------------------------- */
//--affichage des message d'alerte--
const affichageMsgAlert = (value) =>{
  return `${value} : Minimum 3 à 20 caractères Maximum autorisés.\nAttention les chiffres et les symboles sont non autorisés.`
}
const affichageMsgAdressAlert = (value) => {
  return `${value} : Veuillez commencer par renseigner le n° de la voie.\nPuis le type et le nom de la voie.\nMinimum de 3 à 30 caractères Maximum autorisés.\nAttention les symboles sont non autorisés.`
}

const affichageMsgEmailAlert = (value) => {
  return `${value} : Veuillez saisir une adresse mail valide \nAttention le symbole "@" et "." sont obligatoire et autorisés qu'une seule fois.\n L'Email doit se terminer minimum par 2 ou 3 caractères \nExemple : Abc@example.com ou 1b2c3@example.fr`
}

//--Prenom-Nom-Ville Regex Controle--
const prenomNomVilleRegex = (value) => {
return /^[A-Za-zÀ-ÿ  -]{3,20}$/.test(value);
}

//--Prenom --
function prenomRegex() {
  //--recuperer les donnees des champs du formulaire---
  const lePrenom = contact.prenom;
  //--Controle de la validation du champ Prenom avec la methode Regex --
  if(prenomNomVilleRegex(lePrenom)){
  return true;
  }else{
    alert(affichageMsgAlert("Prénom"));
    document.getElementById("firstNameErrorMsg").innerHTML = `Veuillez renseigner ce champ`;
    
    return false;
  }
}

//--Nom --
function nomRegex() {
  //--recuperer les donnees des champs du formulaire---
  const leNom = contact.nom;
  //--Controle de la validation du champ Nom avec la methode Regex --
  if(prenomNomVilleRegex(leNom)){
  return true;
  }else{
  document.getElementById("lastNameErrorMsg").innerHTML = `Veuillez renseigner ce champ`;  
  alert(affichageMsgAlert("Nom"));
  return false;
  }
}

//--Adresse-- + --controle via Regex --
//--Regex directement dans la fonction adresse 
function adresseRegex(){
  //--recuperer les donnees des champs du formulaire---
  const laAdresse = contact.adresse;
  //--Controle de la validation du champ Adresse avec la methode Regex --
  if(/^[0-9 ]{1,4}[A-Za-zÀ-ÿ  -]{2,30}$/.test(laAdresse)){
  return true;
  }else{
  document.getElementById("addressErrorMsg").innerHTML = `Veuillez renseigner ce champ`;
  alert(affichageMsgAdressAlert("Adresse"));
  return false;
  }
}

//--Ville--
function villeRegex(){
  //--recuperer les donnees des champs du formulaire---
  const laVille = contact.ville;
  //--Controle de la validation du champ Ville avec la methode Regex --
  if(prenomNomVilleRegex(laVille)){
  return true;
  }else{
  document.getElementById("cityErrorMsg").innerHTML = `Veuillez renseigner ce champ`;
  alert(affichageMsgAlert("Ville"));
  return false;
  }
}

//--Email-- + --controle via Regex --
//--Regex directement dans la fonction Email-- 
function emailRegex(){
  //--recuperer les donnees des champs du formulaire---
  const laemail = contact.email;
  //--Controle de la validation du champ Email avec la methode Regex --
  if(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(laemail)){
  return true;
  }else{
  document.getElementById("emailErrorMsg").innerHTML = `Veuillez renseigner ce champ`;
  alert(affichageMsgEmailAlert("Email"));
  return false;
  }
}
/*---------------------------------Gestion du Local avec le Formulaire -----------------------------*/


/*--------mettre l'objet "contact" dans le localStorage--- 
 ---attention mettre l'objet en chaine de caractere "JSON STRINGIFY"--------*/
 //creer un tableau de produits pour recuperer l'id 
 
 //--Ajout de la condition si le formulaire est bien rempli j'envoie l'objet sinon (non)---
 if(prenomRegex() && nomRegex() && adresseRegex() && villeRegex()   && emailRegex()){
  localStorage.setItem("formulaire", JSON.stringify (contact));
  //--faire une boucle sur le local storage--
  for (y = 0; y < local.length; y++) {
    let produitsId = local[y].idProduit; //recup l'id dans local
    console.log("produitsId");
    console.log(produitsId );
  
    //---creer une variable avec les produits du local et le formulaire---
   let produitPanierFormulaire = { 
     contact,
     produitsId
    }
    console.log(produitPanierFormulaire);
   } 
   /* ---------Afficher le contenu du local dans le formulaire-----*/
   //--Recuperer la key du local puis la stocqué dans une variable--
  const localDonnees = localStorage.getItem("formulaire")
  
  //--Attention convertir la chaine de caractere en objet Javascript--
  const localDonneesObjet = JSON.parse(localDonnees);
  console.log("localDonneesObjet")
  console.log(localDonneesObjet);

 }else{
  alert("Veuillez bien remplir les champs du formulaire avant de commander.");
 }
  
})



