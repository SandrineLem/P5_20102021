
//Tableau des données des produits
var xhr = new XMLHttpRequest();
xhr.open('GET',"http://localhost:3000/api/products");
xhr.responseType = 'json';

xhr.onload = function () {
    console.log(xhr.response);
};

xhr.onerror = function () {
    console.log('Booo');
};

xhr.send();
//Creation d'une variable Canap
var canapeData = xhr;
console.log(canapeData);


let infoCanap ={

}
console.log(document.querySelector)
//varaible type du produit 1 
let accueilCanap = 
document.getElementById("items").innerHTML = 
` <a href="product.html"><article><img src="http://localhost:3000/images/kanap01.jpeg" alt="Photo d'un canapé bleu, deux places">
<h3 class="productName">Kanap Sinopé</h3>
<p class="productDescription">Dis enim malesuada risus sapien gravida
 nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a>

  <a href="product.html"><article><img src="http://localhost:3000/images/kanap02.jpeg" alt="Photo d'un canapé jaune et noir, quattre places">
<h3 class="productName">Kanap Cyllène</h3>
<p class="productDescription">Morbi nec erat aliquam, sagittis urna non, laoreet justo.
 Etiam sit amet interdum diam, at accumsan lectus.</p></article></a>

 <a href="product.html"><article><img src="http://localhost:3000/images/kanap03.jpeg" alt="Photo d'un canapé d'angle, vert, trois places">
<h3 class="productName">Kanap Calycé</h3>
<p class="productDescription">Pellentesque fermentum arcu venenatis ex sagittis accumsan.
 Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante..
 Etiam sit amet interdum diam, at accumsan lectus.</p></article></a>
 
 <a href="product.html"><article><img src="http://localhost:3000/images/kanap04.jpeg" alt="Photo d'un canapé rose, une à deux place">
 <h3 class="productName">Kanap Autonoé</h3>
 <p class="productDescription">Donec mattis nisl tortor, nec blandit sapien fermentum at.
  Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.</p></article></a>
  
  <a href="product.html"><article><img src="http://localhost:3000/images/kanap05.jpeg" alt="Photo d'un canapé gris, trois places">
 <h3 class="productName">Kanap Eurydomé</h3>
 <p class="productDescription">Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis.
  Donec hendrerit purus at congue aliquam.</p></article></a>
  
  <a href="product.html"><article><img src="http://localhost:3000/images/kanap06.jpeg" alt="Photo d'un canapé gris, deux places">
 <h3 class="productName">Kanap Hélicé</h3>
 <p class="productDescription">Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi.
  Morbi nec vehicula mi, sit amet vestibulum.</p></article></a>
  
  <a href="product.html"><article><img src="http://localhost:3000/images/kanap07.jpeg" alt="Photo d'un canapé rouge, deux places">
  <h3 class="productName">Kanap Thyoné</h3>
  <p class="productDescription">EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu.
   Vestibulum et egestas eros. Vestibulum non lacus orci.</p></article></a>
   
   <a href="product.html"><article><img src="http://localhost:3000/images/kanap08.jpeg" alt="Photo d'un canapé rose, trois places">
   <h3 class="productName">Kanap orthosie</h3>
   <p class="productDescription">Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus.
    Morbi imperdiet enim metus rhoncus.</p></article></a>`;
console.log(typeof accueilCanap);
console.log(accueilCanap);






