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




