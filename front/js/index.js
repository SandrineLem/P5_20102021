

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
var canapeProduct = xhr;
console.log(canapeProduct);

let aProduct = 
document.getElementById("items").innerHTML = 
` <a href="..."><article><img src="http://localhost:3000/images/kanap01.jpeg" alt="Photo d'un canapé bleu, deux places">
<h3 class="productName">Kanap Sinopé</h3>
<p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a>`;
console.log("aProduct");







