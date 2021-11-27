(async function() {
    document.getElementById("orderId").innerHTML = new URL(
        location.href
    ).searchParams.get("orderId");
})(); // on appelle la fonction grace au parentaises