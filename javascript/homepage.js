(function () {
    "use strict";

    /* ─────────────────────────────────────────────
       HERO ART ROTATOR
       Cycles through the 4 type slides every 4s.
       Also responds to dot clicks and keyboard.
    ───────────────────────────────────────────── */
    var slides  = document.querySelectorAll(".ham-slide");
    var dots    = document.querySelectorAll(".ham-dot");
    var label   = document.getElementById("ham-art-label");
    var counter = document.getElementById("ham-art-counter");
    var nextBtn = document.getElementById("ham-art-next");

    if (!slides.length || !dots.length) return;

    var current  = 0;
    var total    = slides.length;
    var timer    = null;

    var colorMap = {
        "web":     "#78ebc0",
        "mobile":  "#b5a5f4",
        "tool":    "#c88dff",
        "backend": "#85d0e0"
    };

    function goTo(index) {
        // hide current
        slides[current].hidden = true;
        slides[current].classList.remove("is-active");
        dots[current].classList.remove("is-active");
        dots[current].setAttribute("aria-selected", "false");

        current = (index + total) % total;

        // show next
        slides[current].hidden = false;
        slides[current].classList.add("is-active");
        dots[current].classList.add("is-active");
        dots[current].setAttribute("aria-selected", "true");

        // update label + counter
        var slideLabel = slides[current].getAttribute("data-label") || "";
        var slideColor = slides[current].getAttribute("data-color") || "web";
        if (label)   label.textContent = slideLabel;
        if (counter) counter.textContent = String(current + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");

        // tint the art panel accent
        var art = document.querySelector(".hero-art-multi");
        if (art) {
            art.style.setProperty("--ham-accent", colorMap[slideColor] || colorMap["web"]);
        }
    }

    function advance() { goTo(current + 1); }

    function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(advance, 4000);
    }

    // Dot clicks
    dots.forEach(function (dot) {
        dot.addEventListener("click", function () {
            var idx = parseInt(dot.getAttribute("data-slide"), 10);
            goTo(idx);
            startTimer(); // restart timer on manual interaction
        });
    });

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener("click", function () { advance(); startTimer(); });
        nextBtn.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); advance(); startTimer(); }
        });
    }

    // Pause on hover
    var artEl = document.querySelector(".hero-art-multi");
    if (artEl) {
        artEl.addEventListener("mouseenter", function () { clearInterval(timer); timer = null; });
        artEl.addEventListener("mouseleave", startTimer);
        artEl.addEventListener("focusin",    function () { clearInterval(timer); timer = null; });
        artEl.addEventListener("focusout",   startTimer);
    }

    // Set initial tint + start
    var initialColor = slides[0].getAttribute("data-color") || "web";
    if (artEl) artEl.style.setProperty("--ham-accent", colorMap[initialColor]);
    startTimer();

}());
