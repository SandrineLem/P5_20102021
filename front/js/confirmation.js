// Affichage "orderId " dans le dom en utilisant l'id  qui est le numero de commande validé !
(async function() {
    document.getElementById("orderId").innerHTML = new URL(
        location.href
    ).searchParams.get("orderId");
})(); // on appelle la fonction grace au parentaises