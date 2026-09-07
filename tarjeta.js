(function () {
  "use strict";

  var VALID_FLOWERS = ["girasol", "tulipan", "rosa", "orquidea"];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function spawnPetals (layerId, count) {
    if (reduceMotion) return;
    var layer = document.getElementById(layerId);
    if (!layer) return;

    for (var i = 0; i < count; i++) {
      (function () {
        var petal = document.createElement("span");
        petal.className = "petal";
        petal.style.left = (Math.random() * 94 + 3) + "%";
        petal.style.setProperty("--drift", ((Math.random() * 70) - 35).toFixed(0) + "px");
        petal.style.animationDuration = (3.5 + Math.random() * 2.5) + "s";
        petal.style.animationDelay = (Math.random() * 1.2) + "s";
        layer.appendChild(petal);
        petal.addEventListener("animationend", function () { petal.remove(); });
      })();
    }
  }

  var params = new URLSearchParams(window.location.search);
  var to = params.get("to");
  var msg = params.get("msg");
  var from = params.get("from");
  var flor = params.get("flor");

  if (!flor || VALID_FLOWERS.indexOf(flor) === -1) flor = "girasol";

  document.getElementById("c-to").textContent = to || "ti";
  if (msg) document.getElementById("c-msg").textContent = msg;
  document.getElementById("c-from").textContent = from ? ("— " + from) : "";
  document.getElementById("flower-use").setAttribute("href", "#flor-" + flor);
  document.title = (from ? from + " te envió" : "Alguien te envió") + " una flor amarilla";

  var card = document.getElementById("card");

  /* ---------- Campo de flores ---------- */
  var meadow = document.getElementById("flower-meadow");

  var meadowLayout = [
    [3, 62, -7, 0.1, 0.0],
    [10, 90, -4, 0.8, 0.3],
    [17, 55, 7, 0.55, 0.7],
    [25, 76, -8, 0.35, 0.2],
    [34, 50, 5, 0.9, 0.9],
    [43, 86, -5, 0.45, 0.1],
    [52, 58, 7, 0.75, 0.6],
    [61, 96, -6, 0.25, 0.2],
    [70, 55, 6, 0.65, 0.8],
    [78, 82, -7, 0.15, 0.4],
    [87, 60, 5, 0.9, 0.1],
    [95, 88, -4, 0.35, 0.7],
    [6, 115, -9, 0.15, 0.1],
    [29, 105, 7, 0.75, 0.3],
    [72, 112, -6, 0.55, 0.5],
    [91, 108, 8, 0.85, 0.2]
  ];

  meadowLayout.forEach(function (item, index) {
    var flower = document.createElement("div");
    flower.className = "meadow-flower";
    flower.style.left = item[0] + "%";
    flower.style.setProperty("--flower-w", item[1] + "px");
    flower.style.setProperty("--flower-rot", item[2] + "deg");
    flower.style.setProperty("--wind-delay", item[3] + "s");
    flower.style.setProperty("--rise-delay", (item[4] + index * 0.025).toFixed(2) + "s");
    flower.style.setProperty("--depth", index % 3 === 0 ? "0.42" : (index % 3 === 1 ? "0.65" : "0.85"));

    var chosen = index % 4;
    var flowerName = VALID_FLOWERS[chosen];

    flower.innerHTML =
      '<div class="meadow-flower-inner">' +
        '<svg viewBox="0 0 200 320" aria-hidden="true">' +
          '<use href="#flor-' + flowerName + '"></use>' +
        '</svg>' +
      '</div>';

    meadow.appendChild(flower);
  });

  /* ---------- Tarjeta ---------- */
  if (reduceMotion) {
    card.classList.remove("card-pending");
    return;
  }

  window.setTimeout(function () {
    card.classList.remove("card-pending");
    card.classList.add("card-reveal");
    spawnPetals("petals", 18);
  }, 280);

})();
