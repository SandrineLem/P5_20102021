const userSelectArray = [];
const local = JSON.parse(localStorage.getItem("userSelect"));
localStorage.setItem("storageUserSelect",JSON.stringify(userSelectArray));
console.log(userSelectArray);
    
