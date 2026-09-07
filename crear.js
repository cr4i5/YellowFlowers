(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Contador hasta el 21 de septiembre ---------- */
  function updateCountdown () {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var target = new Date(now.getFullYear(), 8, 21); // septiembre = mes 8

    var numberEl = document.getElementById("countdown-number");
    var wordEl = document.getElementById("countdown-word");
    var pill = document.getElementById("countdown-pill");

    if (today.getTime() === target.getTime()) {
      pill.innerHTML = "<strong>Hoy es el día</strong>";
      return;
    }
    if (today.getTime() > target.getTime()) {
      target = new Date(now.getFullYear() + 1, 8, 21);
    }
    var diffDays = Math.round((target - today) / 86400000);
    numberEl.textContent = diffDays;
    wordEl.textContent = diffDays === 1 ? "día" : "días";
  }
  updateCountdown();

  /* ---------- Pétalos cayendo (celebración al copiar el enlace) ---------- */
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

  /* ---------- Vista previa en vivo ---------- */
  var toInput = document.getElementById("to");
  var fromInput = document.getElementById("from");
  var msgInput = document.getElementById("msg");
  var flowerInputs = document.querySelectorAll('input[name="flor"]');

  var pTo = document.getElementById("p-to");
  var pFrom = document.getElementById("p-from");
  var pMsg = document.getElementById("p-msg");
  var pFlowerUse = document.getElementById("preview-flower-use");

  function selectedFlower () {
    var checked = document.querySelector('input[name="flor"]:checked');
    return checked ? checked.value : "girasol";
  }

  function refreshPreview () {
    pTo.textContent = toInput.value.trim() || "alguien especial";
    pFrom.textContent = fromInput.value.trim() ? ("— " + fromInput.value.trim()) : "— Tú";
    pMsg.textContent = msgInput.value.trim() || "Escribe algo bonito a la izquierda y va a aparecer aquí, como si ya estuviera escrito en papel.";
    pFlowerUse.setAttribute("href", "#flor-" + selectedFlower());
  }
  [toInput, fromInput, msgInput].forEach(function (el) {
    el.addEventListener("input", refreshPreview);
  });
  flowerInputs.forEach(function (el) {
    el.addEventListener("change", refreshPreview);
  });

  /* ---------- Construir enlace hacia tarjeta.html ---------- */
  function buildShareUrl () {
    var params = new URLSearchParams();
    if (toInput.value.trim()) params.set("to", toInput.value.trim());
    if (fromInput.value.trim()) params.set("from", fromInput.value.trim());
    if (msgInput.value.trim()) params.set("msg", msgInput.value.trim());
    params.set("flor", selectedFlower());

    var target = new URL("tarjeta.html", window.location.href);
    target.search = params.toString();
    return target.toString();
  }

  var feedback = document.getElementById("copy-feedback");

  document.getElementById("copy-link").addEventListener("click", function () {
    var url = buildShareUrl();
    var done = function () {
      feedback.textContent = "Enlace copiado. Ya lo puedes pegar donde quieras.";
      spawnPetals("preview-petals", 10);
      setTimeout(function () { feedback.textContent = ""; }, 4000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(function () { fallbackCopy(url, done); });
    } else {
      fallbackCopy(url, done);
    }
  });

  function fallbackCopy (text, done) {
    var temp = document.createElement("textarea");
    temp.value = text;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();
    try { document.execCommand("copy"); } catch (e) { /* noop */ }
    document.body.removeChild(temp);
    done();
  }

  document.getElementById("share-wsp").addEventListener("click", function () {
    var url = buildShareUrl();
    var fromName = fromInput.value.trim();
    var text = (fromName ? fromName + " te " : "Te ") + "manda una flor amarilla \uD83C\uDF3C " + url;
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank", "noopener");
  });

})();
