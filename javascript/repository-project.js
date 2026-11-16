(function () {
    "use strict";

    var root = document.getElementById("repository-detail");
    if (!root) return;

    var typeLabels = {
        profile: "Profile",
        tool: "Developer tool",
        backend: "Backend / API",
        web: "Web application",
        mobile: "Mobile application",
        wearable: "Wearable application",
        desktop: "Desktop application",
        concept: "Product concept",
        learning: "Learning project",
        library: "Library",
        site: "Static site"
    };

    function escapeHtml(value) {
        return String(value || "").replace(/[&<>"']/g, function (char) {
            return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[char];
        });
    }

    function typeLabel(project) {
        return typeLabels[project.type] || "Project";
    }

    function previewMarkup(project) {
        var type = escapeHtml(project.type);
        var name = escapeHtml(project.name);
        var summary = escapeHtml(project.summary);

        if (project.type === "mobile") {
            return '<div class="repo-device-scene" data-type="' + type + '">' +
                '<div class="repo-phone"><div class="repo-phone-notch"></div><div class="repo-phone-content">' +
                '<span class="repo-phone-eyebrow">MOBILE EXPERIENCE</span><strong>' + name + '</strong><p>' + summary + '</p>' +
                '<span class="repo-phone-action">Explore <i>↗</i></span><i class="phone-line"></i><i class="phone-line short"></i></div></div>' +
                '<div class="repo-scene-label">DEVICE-FIRST PRODUCT PREVIEW <span>Illustrative interface · not a captured screen</span></div></div>';
        }

        if (project.type === "wearable") {
            return '<div class="repo-device-scene repo-wearable-scene" data-type="' + type + '">' +
                '<div class="repo-watch"><div class="repo-watch-face"><small>MONDAY · 19</small><strong>09:41</strong><span>HIJRI DATE</span><b>Next prayer · 12:30</b><i class="watch-countdown">28:42</i></div></div>' +
                '<div class="repo-scene-label">ROUND-WATCH INTERFACE PREVIEW <span>Illustrative face · values are not live</span></div></div>';
        }

        if (project.type === "desktop") {
            return '<div class="repo-device-scene repo-desktop-scene" data-type="' + type + '">' +
                '<div class="repo-desktop"><div class="repo-desktop-titlebar"><i></i><i></i><i></i><span>' + name + '</span></div>' +
                '<div class="repo-desktop-body"><aside><i></i><i></i><i></i><i></i></aside><div class="repo-desktop-canvas"><small>DESKTOP WORKSPACE</small><strong>' + name + '</strong><span></span><span></span><span></span></div></div></div>' +
                '<div class="repo-scene-label">DESKTOP PRODUCT PREVIEW <span>Illustrative window · not a captured screen</span></div></div>';
        }

        if (project.type === "backend") {
            return '<div class="repo-device-scene repo-api-scene" data-type="' + type + '">' +
                '<div class="repo-api-flow"><div><small>CLIENT</small><b>Request</b></div><i>→</i><div><small>BOUNDARY</small><b>' + name + '</b></div><i>→</i><div><small>RESULT</small><b>Response</b></div></div>' +
                '<div class="repo-api-console"><span>HTTP / API SURFACE</span><code>GET /health <i>→</i> ready</code><code>POST /api/... <i>→</i> result</code></div>' +
                '<div class="repo-scene-label">SERVICE MAP <span>Concept based on repository documentation</span></div></div>';
        }

        if (project.type === "tool") {
            return '<div class="repo-device-scene repo-tool-scene" data-type="' + type + '">' +
                '<div class="repo-tool-window"><div><i></i><i></i><i></i><span>' + name + ' / workspace</span></div><p><em>›</em> inspect project context</p><p><em>✓</em> prepare next step <small>READY</small></p><p class="tool-output">Purpose-built developer workflow</p></div>' +
                '<div class="repo-scene-label">DEVELOPER TOOL PREVIEW <span>Illustrative command surface · not live output</span></div></div>';
        }

        if (project.type === "learning" || project.type === "library") {
            return '<div class="repo-device-scene repo-learning-scene" data-type="' + type + '">' +
                '<div class="repo-learning-notes"><span>NOTES / EXERCISE</span><strong>' + name + '</strong><p>' + summary + '</p><i>Read → experiment → test</i></div>' +
                '<div class="repo-code-window"><div><i></i><i></i><i></i><span>examples / tests</span></div><code><b>01</b> define a small idea</code><code><b>02</b> make it observable</code><code><b>03</b> verify behavior</code></div>' +
                '<div class="repo-scene-label">CODE & LEARNING PREVIEW <span>Illustrative composition · not a source screenshot</span></div></div>';
        }

        if (project.type === "concept") {
            return '<div class="repo-device-scene repo-concept-scene" data-type="' + type + '">' +
                '<div class="repo-concept-canvas"><span>PROBLEM SPACE</span><i>→</i><b>' + name + '</b><i>→</i><span>PRODUCT DIRECTION</span><small>Proposal / proof of concept</small></div>' +
                '<div class="repo-scene-label">PRODUCT DIRECTION <span>Concept preview · implementation may vary</span></div></div>';
        }

        return '<div class="repo-device-scene repo-web-scene" data-type="' + type + '">' +
            '<div class="repo-browser"><div class="repo-browser-bar"><i></i><i></i><i></i><span>' + name + '</span></div>' +
            '<div class="repo-browser-content"><span>PRODUCT OVERVIEW</span><strong>' + name + '</strong><p>' + summary + '</p><i></i></div></div>' +
            '<div class="repo-scene-label">WEB EXPERIENCE PREVIEW <span>Illustrative interface · not a captured screen</span></div></div>';
    }

    function mediaMarkup(project) {
        if (!project.media || !project.media.length) {
            return '<div class="repo-media-note"><span class="repo-media-note-mark">↳</span><div><strong>No public project screenshots are linked in this repository README.</strong><p>The preview above is an original illustration of the documented project type and purpose.</p></div></div>';
        }

        return '<div class="repo-media-gallery">' + project.media.map(function (item) {
            var kind = item.kind === "diagram" ? "Architecture diagram from the repository" : "Screenshot from the repository";
            return '<figure><a href="' + escapeHtml(item.src) + '" target="_blank" rel="noopener noreferrer"><img src="' +
                escapeHtml(item.src) + '" alt="' + escapeHtml(item.alt) + '" loading="lazy"></a><figcaption><span>' +
                escapeHtml(item.label || kind) + '</span><small>' + kind + '</small></figcaption></figure>';
        }).join("") + '</div>';
    }

    function factCards(project) {
        var highlights = (project.highlights || []).slice(0, 3);
        if (!highlights.length) highlights = ["Project overview", "Product shape", "Technology"];
        return '<div class="repo-facts">' + highlights.map(function (highlight, index) {
            return '<article class="repo-fact"><span>0' + (index + 1) + ' / ' + escapeHtml(typeLabel(project).toUpperCase()) +
                '</span><h3>' + escapeHtml(highlight) + '</h3><p>' + (index === 0 ? escapeHtml(project.summary) :
                index === 1 ? 'A focused view of the project’s documented product and implementation boundaries.' :
                'Explore the source repository for implementation detail and current status.') + '</p></article>';
        }).join("") + '</div>';
    }

    function walkthrough(project) {
        var highlights = (project.highlights || []).slice(0, 3);
        var stack = (project.stack || []).join(" · ") || "See the repository for implementation details.";
        var steps = [
            {id: "overview", label: "Overview", title: "Start with the problem", body: project.summary},
            {id: "product", label: "Product", title: highlights[0] || "Explore the product shape", body: highlights.slice(0, 2).join(". ") || project.summary},
            {id: "implementation", label: "Implementation", title: highlights[2] || "Follow the implementation", body: stack + "."}
        ];

        return '<div class="walkthrough repo-walkthrough"><div class="walkthrough-steps repo-walkthrough-tabs" role="tablist" aria-label="' +
            escapeHtml(project.name) + ' walkthrough">' + steps.map(function (step, index) {
                var active = index === 0;
                return '<button class="walkthrough-step' + (active ? ' is-active' : '') + '" id="' + project.slug + '-' + step.id +
                    '-tab" type="button" role="tab" aria-controls="' + project.slug + '-' + step.id + '-panel" aria-selected="' +
                    String(active) + '" tabindex="' + (active ? "0" : "-1") + '" data-step="' + step.id + '"><span>0' + (index + 1) + '</span>' + escapeHtml(step.label) + '</button>';
            }).join("") + '</div><div class="walkthrough-content" aria-live="polite">' + steps.map(function (step, index) {
                var active = index === 0;
                return '<article class="walkthrough-panel' + (active ? ' is-active' : '') + '" id="' + project.slug + '-' +
                    step.id + '-panel" role="tabpanel" aria-labelledby="' + project.slug + '-' + step.id + '-tab" data-panel="' +
                    step.id + '"' + (active ? "" : " hidden") + '><h3>' + escapeHtml(step.title) + '</h3><p>' +
                    escapeHtml(step.body) + '</p></article>';
            }).join("") + '</div></div>';
    }

    function videoPanel(project) {
        var demoLink = project.demoUrl ? '<a class="repo-live-demo" href="' + escapeHtml(project.demoUrl) +
            '" target="_blank" rel="noopener noreferrer">Open the live demo <span>↗</span></a>' : "";

        return '<div class="repo-video-panel"><div class="video-placeholder" role="img" aria-label="Video recording not yet published">' +
            '<div><span class="play-icon">▶</span><strong>No public video recording</strong><small>There is no recorded demo linked from this repository README.</small></div></div>' +
            '<div class="video-copy"><p class="eyebrow">DEMO & RECORDING</p><h3>' +
            (project.demoUrl ? "Try the live project" : "Video walkthrough to come") +
            '</h3><p>' + (project.demoUrl ? "A live demo is linked from the repository. No video recording is published yet." :
            "The repository does not link to a recorded walkthrough. The project source remains the best place to see its current state.") +
            '</p>' + demoLink + '</div></div>';
    }

    function render(project) {
        var type = escapeHtml(project.type);
        var typeName = typeLabel(project);
        var stack = (project.stack || []).map(function (item) {
            return '<span>' + escapeHtml(item) + '</span>';
        }).join("");
        var repoUrl = "https://github.com/hamzajg/" + encodeURIComponent(project.repository);
        var demo = project.demoUrl ? '<a class="button" href="' + escapeHtml(project.demoUrl) +
            '" target="_blank" rel="noopener noreferrer">Open live demo <span>↗</span></a>' : "";

        document.title = project.name + " — Hamza Jguerim";
        document.body.dataset.projectType = type;
        root.dataset.projectType = type;
        root.innerHTML = '<section class="repo-hero"><div class="repo-hero-inner"><div><p class="repo-type-label">' +
            escapeHtml(typeName.toUpperCase()) + ' / REPOSITORY CASE STUDY</p><h1>' + escapeHtml(project.name) +
            '</h1><p class="repo-description">' + escapeHtml(project.summary) + '</p><div class="repo-stack">' + stack +
            '</div></div><div class="repo-hero-links"><a class="button repo-source-button" href="' + escapeHtml(repoUrl) +
            '" target="_blank" rel="noopener noreferrer">View repository <span>↗</span></a>' + demo +
            '</div></div></section><section class="repo-preview-section"><div class="repo-preview-heading"><span>PRODUCT-SHAPED PREVIEW</span>' +
            '<span>' + escapeHtml(typeName) + '</span></div>' + previewMarkup(project) + '</section>' +
            '<section class="case-section repo-case-section"><div class="case-section-heading"><div><p class="eyebrow">AT A GLANCE</p>' +
            '<h2>One repo.<br>A specific problem.</h2></div><p>' + escapeHtml(project.summary) +
            '</p></div>' + factCards(project) + '</section><section class="case-section repo-case-section"><div class="case-section-heading">' +
            '<div><p class="eyebrow">SCREENSHOTS & VISUALS</p><h2>From the<br>repository.</h2></div><p>Real repository media is shown when it is linked in the project README. Otherwise, the page uses a clearly labeled interface illustration.</p></div>' +
            mediaMarkup(project) + '</section><section class="case-section repo-case-section"><div class="case-section-heading">' +
            '<div><p class="eyebrow">INTERACTIVE WALKTHROUGH</p><h2>Explore the<br>project shape.</h2></div><p>Use the steps to move from the project’s purpose to its main focus and implementation stack.</p></div>' +
            walkthrough(project) + '</section><section class="case-section repo-case-section"><div class="case-section-heading">' +
            '<div><p class="eyebrow">VIDEO WALKTHROUGH</p><h2>See it in<br>motion.</h2></div><p>Recorded demos are only included when a public video is available; none is linked from this repository README.</p></div>' +
            videoPanel(project) + '</section><div class="repo-back-link"><a href="../index.html">← Back to all repositories</a><a href="' +
            escapeHtml(repoUrl) + '" target="_blank" rel="noopener noreferrer">Open source on GitHub ↗</a></div>';
        root.removeAttribute("aria-busy");
    }

    fetch("../../projects/catalog.json")
        .then(function (response) {
            if (!response.ok) throw new Error("Project catalog request failed: " + response.status);
            return response.json();
        })
        .then(function (data) {
            var project = data.find(function (item) { return item.slug === root.getAttribute("data-project-slug"); });
            if (!project) throw new Error("Project not found in catalog: " + root.getAttribute("data-project-slug"));
            if (project.customPage) throw new Error("This project uses its own case-study page.");
            render(project);
        })
        .catch(function (error) {
            console.error(error);
            root.removeAttribute("aria-busy");
            root.innerHTML = '<section class="repo-load-error"><p class="eyebrow">PROJECT PAGE UNAVAILABLE</p><h1>Could not load this case study.</h1><p>Please try again or browse the <a href="../index.html">project directory</a>.</p></section>';
        });
}());
