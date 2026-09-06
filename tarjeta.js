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
        petal.style.setProperty("--drift", drift);
        petal.style.animationDuration = duration + "s";
        petal.style.animationDelay = delay + "s";
        petal.addEventListener("animationend", function () { petal.remove(); });
        layer.appendChild(petal);
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

  spawnPetals("petals", 16);
})();
