"use strict";

// Affichage "orderId " dans le dom en utilisant l'id  qui est le numero de commande validé !
(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          document.getElementById("orderId").innerHTML = new URL(location.href).searchParams.get("orderId");

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
})(); // on appelle la fonction grace au parentaises