(function () {
  "use strict";

  var VALID_FLOWERS = ["girasol", "margarita", "tulipan", "rosa"];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function spawnPetals (layerId, count) {
    if (reduceMotion) return;
    var layer = document.getElementById(layerId);
    if (!layer) return;
    for (var i = 0; i < count; i++) {
      (function () {
        var petal = document.createElement("span");
        petal.className = "petal";
        var left = Math.random() * 90 + 3;
        var duration = 3.5 + Math.random() * 2.5;
        var delay = Math.random() * 1.2;
        var drift = (Math.random() * 60 - 30).toFixed(0) + "px";
        petal.style.left = left + "%";
        petal.style.setProperty("--size", (0.7 + Math.random() * 0.75).toFixed(2));
        petal.style.transform = "rotate(" + Math.round(Math.random() * 360) + "deg)";
        petal.style.setProperty("--drift", drift);
        petal.style.animationDuration = duration + "s";
        petal.style.animationDelay = delay + "s";
        petal.addEventListener("animationend", function () { petal.remove(); });
        layer.appendChild(petal);
      })();
    }
  }

  /* ---------- Leer los datos del enlace ---------- */
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

  /* ---------- Sin animación: mostrar la tarjeta directo ---------- */
  if (reduceMotion) {
    card.classList.remove("card-pending");
    return;
  }

  /* ---------- Campo de flores que crecen, florecen y se abren ---------- */
  var stage = document.getElementById("bloom-stage");

  var layout = [
    { left: "8%",  w: 62, rot: -10, delay: 0,    tx: "-160px" },
    { left: "27%", w: 80, rot: -4,  delay: 130,  tx: "-140px" },
    { left: "50%", w: 100, rot: 0,  delay: 260,  tx: "0" },
    { left: "73%", w: 80, rot: 4,   delay: 130,  tx: "140px" },
    { left: "92%", w: 62, rot: 10,  delay: 0,    tx: "160px" }
  ];

  var flowers = layout.map(function (spot) {
    var anchor = document.createElement("div");
    anchor.className = "stage-anchor";
    anchor.style.left = spot.left;
    anchor.style.setProperty("--w", spot.w + "px");

    var el = document.createElement("div");
    el.className = "stage-flower";
    el.style.setProperty("--rot", spot.rot + "deg");
    el.style.setProperty("--tx", spot.tx);

    var grow = document.createElement("div");
    grow.className = "grow";
    grow.style.animationDelay = spot.delay + "ms";
    grow.innerHTML = '<svg viewBox="0 0 200 320" aria-hidden="true"><use href="#flor-' + flor + '"></use></svg>';

    el.appendChild(grow);
    anchor.appendChild(el);
    stage.appendChild(anchor);
    return el;
  });

  stage.hidden = false;

  var GROW_END = 260 + 900;   // último delay + duración del crecimiento
  var HOLD = 350;             // pausa breve con las flores abiertas
  var LEAVE_DURATION = 700;

  setTimeout(function () {
    flowers.forEach(function (el) { el.classList.add("leaving"); });
  }, GROW_END + HOLD);

  setTimeout(function () {
    stage.hidden = true;
    card.classList.remove("card-pending");
    card.classList.add("card-reveal");
    spawnPetals("petals", 14);
  }, GROW_END + HOLD + LEAVE_DURATION);

})();
