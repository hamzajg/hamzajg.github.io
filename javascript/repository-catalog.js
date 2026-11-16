(function () {
    "use strict";

    var grid = document.getElementById("repository-grid");
    var search = document.getElementById("project-search");
    var resultCount = document.getElementById("directory-result-count");
    var emptyState = document.getElementById("directory-empty");
    var activeFilter = "all";
    var projects = [];

    if (!grid || !search || !resultCount || !emptyState) return;

    var typeLabels = {
        profile: "Profile",
        tool: "Developer tool",
        backend: "Backend / API",
        web: "Web app",
        mobile: "Mobile app",
        wearable: "Wearable app",
        desktop: "Desktop app",
        concept: "Product concept",
        learning: "Learning project",
        library: "Library",
        site: "Static site"
    };

    function categoryFor(project) {
        if (project.type === "wearable") return "mobile";
        if (project.type === "library") return "learning";
        if (project.type === "profile" || project.type === "concept" || project.type === "site") return "other";
        return project.type;
    }

    function escapeHtml(value) {
        return String(value || "").replace(/[&<>"']/g, function (char) {
            return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[char];
        });
    }

    function previewMarkup(project) {
        var type = escapeHtml(project.type);
        var name = escapeHtml(project.name);
        var label = escapeHtml(typeLabels[project.type] || "Project");
        var detail = escapeHtml(project.stack[0] || "Repository");

        if (project.media && project.media.length) {
            return '<div class="repo-card-visual repo-card-visual-media" data-type="' + type + '">' +
                '<img src="' + escapeHtml(project.media[0].src) + '" alt="" loading="lazy">' +
                '<span class="repo-visual-label">' + label + ' <i>·</i> Repository media</span></div>';
        }

        if (project.type === "mobile" || project.type === "wearable") {
            if (project.type === "wearable") {
                return '<div class="repo-card-visual repo-card-visual-wearable" data-type="' + type + '">' +
                    '<div class="watch-face"><small>MON</small><b>09:41</b><i>Next up · 12:30</i><span class="watch-ring">↻</span></div>' +
                    '<span class="repo-visual-label">' + label + ' <i>·</i> ' + detail + '</span></div>';
            }
            return '<div class="repo-card-visual repo-card-visual-mobile" data-type="' + type + '">' +
                '<div class="phone-preview"><div class="phone-speaker"></div><div class="phone-ui"><small>' + label + '</small><b>' + name + '</b><span></span><span></span><i></i></div></div>' +
                '<span class="repo-visual-label">' + label + ' <i>·</i> Device-first</span></div>';
        }

        if (project.type === "desktop") {
            return '<div class="repo-card-visual repo-card-visual-desktop" data-type="' + type + '">' +
                '<div class="desktop-preview"><div class="desktop-bar"><i></i><i></i><i></i><span>' + name + '</span></div><div class="desktop-work"><aside></aside><div><b>' + label + '</b><span></span><span></span><span></span></div></div></div>' +
                '<span class="repo-visual-label">' + label + ' <i>·</i> Workspace</span></div>';
        }

        if (project.type === "backend") {
            return '<div class="repo-card-visual repo-card-visual-backend" data-type="' + type + '">' +
                '<div class="service-map"><span>' + detail + '</span><i>↔</i><b>' + name + '</b><i>↔</i><span>API</span></div>' +
                '<span class="repo-visual-label">' + label + ' <i>·</i> Service boundary</span></div>';
        }

        if (project.type === "tool") {
            return '<div class="repo-card-visual repo-card-visual-tool" data-type="' + type + '">' +
                '<div class="repo-terminal"><div><i></i><i></i><i></i><small>' + name + '</small></div><p><em>›</em> ' + detail + ' <span>●</span></p><p class="terminal-result">READY FOR THE NEXT STEP</p></div>' +
                '<span class="repo-visual-label">' + label + ' <i>·</i> Local workflow</span></div>';
        }

        if (project.type === "learning" || project.type === "library") {
            return '<div class="repo-card-visual repo-card-visual-learning" data-type="' + type + '">' +
                '<div class="code-preview"><div><i></i><i></i><i></i><small>' + detail + '</small></div><p><em>01</em> understand the problem</p><p><em>02</em> try a small idea</p><p><em>03</em> verify the result</p></div>' +
                '<span class="repo-visual-label">' + label + ' <i>·</i> Explore the code</span></div>';
        }

        if (project.type === "concept") {
            return '<div class="repo-card-visual repo-card-visual-concept" data-type="' + type + '">' +
                '<div class="concept-board"><span>' + name + '</span><i>↗</i><b>IDEA → PROTOTYPE</b></div>' +
                '<span class="repo-visual-label">' + label + ' <i>·</i> Early direction</span></div>';
        }

        return '<div class="repo-card-visual repo-card-visual-web" data-type="' + type + '">' +
            '<div class="browser-preview"><div><i></i><i></i><i></i><small>' + name + '</small></div><span class="browser-mark">' + name.charAt(0) + '</span><b>' + label + '</b><i></i></div>' +
            '<span class="repo-visual-label">' + label + ' <i>·</i> Project overview</span></div>';
    }

    function matches(project, query) {
        var category = categoryFor(project);
        var searchText = [
            project.name,
            project.repository,
            project.summary,
            typeLabels[project.type],
            (project.stack || []).join(" ")
        ].join(" ").toLowerCase();
        return (activeFilter === "all" || activeFilter === category) && (!query || searchText.indexOf(query) !== -1);
    }

    function render() {
        var query = search.value.trim().toLowerCase();
        var visible = projects.filter(function (project) { return matches(project, query); });

        grid.innerHTML = visible.map(function (project) {
            var category = categoryFor(project);
            var typeLabel = typeLabels[project.type] || "Project";
            var tags = (project.stack || []).slice(0, 3).map(function (tag) {
                return "<span>" + escapeHtml(tag) + "</span>";
            }).join("");

            return '<article class="repo-card" data-type="' + escapeHtml(project.type) + '">' +
                '<a class="repo-card-link" href="' + escapeHtml(project.slug) + '/index.html" aria-label="Explore ' + escapeHtml(project.name) + '"></a>' +
                previewMarkup(project) +
                '<div class="repo-card-copy"><div class="repo-card-meta"><span>' + escapeHtml(typeLabel) + '</span><span class="repo-card-number">' + escapeHtml(project.repository) + '</span></div>' +
                '<h2>' + escapeHtml(project.name) + '</h2><p>' + escapeHtml(project.summary) + '</p>' +
                '<div class="repo-card-tags">' + tags + '</div><span class="repo-card-open">Open case study <i>↗</i></span></div></article>';
        }).join("");

        emptyState.hidden = visible.length !== 0;
        resultCount.textContent = visible.length + (visible.length === 1 ? " PROJECT" : " PROJECTS");
    }

    function setCounts() {
        var counts = {all: projects.length, web: 0, mobile: 0, desktop: 0, backend: 0, tool: 0, learning: 0, other: 0};
        projects.forEach(function (project) { counts[categoryFor(project)] += 1; });
        Object.keys(counts).forEach(function (key) {
            var target = document.querySelector('[data-count="' + key + '"]');
            if (target) target.textContent = String(counts[key]).padStart(2, "0");
        });
        var total = document.getElementById("directory-total");
        if (total) total.textContent = String(projects.length).padStart(2, "0");
    }

    document.querySelectorAll(".directory-filter").forEach(function (button) {
        button.addEventListener("click", function () {
            activeFilter = button.getAttribute("data-filter");
            document.querySelectorAll(".directory-filter").forEach(function (item) {
                var active = item === button;
                item.classList.toggle("is-active", active);
                item.setAttribute("aria-pressed", String(active));
            });
            render();
        });
    });

    search.addEventListener("input", render);

    fetch("../projects/catalog.json")
        .then(function (response) {
            if (!response.ok) throw new Error("Project catalog request failed: " + response.status);
            return response.json();
        })
        .then(function (data) {
            if (!Array.isArray(data)) throw new Error("Project catalog must be a list.");
            projects = data.slice().sort(function (a, b) {
                if (a.customPage !== b.customPage) return a.customPage ? -1 : 1;
                return a.name.localeCompare(b.name);
            });
            setCounts();
            render();
        })
        .catch(function (error) {
            console.error(error);
            grid.innerHTML = '<p class="directory-error">The project catalog could not be loaded. Please reload or visit <a href="https://github.com/hamzajg?tab=repositories">GitHub repositories ↗</a>.</p>';
            resultCount.textContent = "CATALOG ERROR";
        });
}());
