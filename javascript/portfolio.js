(function () {
    "use strict";

    var navToggle = document.querySelector(".nav-toggle");
    var pageBody = document.body;

    if (navToggle) {
        navToggle.addEventListener("click", function () {
            var isOpen = pageBody.classList.toggle("nav-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        document.querySelectorAll(".primary-nav a").forEach(function (link) {
            link.addEventListener("click", function () {
                pageBody.classList.remove("nav-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    var filterButtons = document.querySelectorAll(".filter-button");
    var projectCards = document.querySelectorAll(".project-card");
    var projectCount = document.querySelector(".project-count");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var filter = button.getAttribute("data-filter");
            var visibleCount = 0;

            filterButtons.forEach(function (item) {
                var active = item === button;
                item.classList.toggle("is-active", active);
                item.setAttribute("aria-pressed", String(active));
            });

            projectCards.forEach(function (card) {
                var visible = filter === "all" || card.getAttribute("data-category") === filter;
                card.hidden = !visible;
                if (visible) visibleCount += 1;
            });

            if (projectCount) {
                projectCount.textContent = String(visibleCount).padStart(2, "0") + " PROJECT" + (visibleCount === 1 ? "" : "S");
            }
        });
    });

    document.querySelectorAll(".walkthrough-step").forEach(function (step) {
        step.setAttribute("tabindex", step.classList.contains("is-active") ? "0" : "-1");
    });

    function activateWalkthroughStep(step) {
        var walkthrough = step.closest(".walkthrough");
        if (!walkthrough) return;

        var steps = walkthrough.querySelectorAll(".walkthrough-step");
        var panels = walkthrough.querySelectorAll(".walkthrough-panel");
        var target = step.getAttribute("data-step");

        steps.forEach(function (item) {
            var active = item === step;
            item.classList.toggle("is-active", active);
            item.setAttribute("aria-selected", String(active));
            item.setAttribute("tabindex", active ? "0" : "-1");
        });
        panels.forEach(function (panel) {
            var active = panel.getAttribute("data-panel") === target;
            panel.classList.toggle("is-active", active);
            panel.hidden = !active;
        });
    }

    document.addEventListener("click", function (event) {
        if (event.target && typeof event.target.closest === "function") {
            var step = event.target.closest(".walkthrough-step");
            if (step) activateWalkthroughStep(step);
        }
    });

    document.addEventListener("keydown", function (event) {
        if (!event.target || typeof event.target.closest !== "function") return;
        var step = event.target.closest(".walkthrough-step");
        if (!step) return;

        var walkthrough = step.closest(".walkthrough");
        var steps = walkthrough ? walkthrough.querySelectorAll(".walkthrough-step") : [];
        var index = Array.prototype.indexOf.call(steps, step);
        var nextIndex = index;

        if (event.key === "ArrowRight") nextIndex = (index + 1) % steps.length;
        else if (event.key === "ArrowLeft") nextIndex = (index - 1 + steps.length) % steps.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = steps.length - 1;
        else return;
        if (nextIndex < 0) return;

        event.preventDefault();
        steps[nextIndex].focus();
        activateWalkthroughStep(steps[nextIndex]);
    });

    var currentYear = document.getElementById("current-year");
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
}());
