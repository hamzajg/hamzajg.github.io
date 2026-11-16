(function () {
    "use strict";

    var root = document.getElementById("repository-detail");
    if (!root) return;

    var typeLabels = {
        profile:  "Profile",
        tool:     "Developer tool",
        backend:  "Backend / API",
        web:      "Web application",
        mobile:   "Mobile application",
        wearable: "Wearable application",
        desktop:  "Desktop application",
        concept:  "Product concept",
        learning: "Learning project",
        library:  "Library",
        site:     "Static site"
    };

    /* ─────────────────────────────────────────────
       Utilities
    ───────────────────────────────────────────── */
    function esc(v) {
        return String(v || "").replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    function label(project) { return typeLabels[project.type] || "Project"; }

    function stackBadges(project) {
        return (project.stack || []).map(function (s) {
            return "<span>" + esc(s) + "</span>";
        }).join("");
    }

    /* ─────────────────────────────────────────────
       TYPE-SPECIFIC HERO PREVIEWS
       Each returns a full `.rp-scene` div that sits
       in the hero band above the fold.
    ───────────────────────────────────────────── */

    function sceneMobile(project) {
        var name  = esc(project.name);
        var sum   = esc(project.summary);
        var tech  = esc((project.stack || [])[0] || "Mobile");
        var hi    = project.highlights || [];
        var rows  = hi.slice(0, 3).map(function (h) {
            return '<div class="rp-phone-row"><i class="rp-phone-dot"></i><span>' + esc(h) + '</span></div>';
        }).join("");

        return (
            '<div class="rp-scene rp-scene-mobile">' +
              '<div class="rp-phone-wrap">' +
                '<div class="rp-phone">' +
                  '<div class="rp-phone-island"></div>' +
                  '<div class="rp-phone-screen">' +
                    '<header class="rp-phone-topbar"><span class="rp-phone-time">9:41</span><span class="rp-phone-icons">▲ ◈</span></header>' +
                    '<div class="rp-phone-hero-band"><span class="rp-phone-eyebrow">' + tech + '</span><strong>' + name + '</strong></div>' +
                    '<div class="rp-phone-body">' + rows + '</div>' +
                    '<div class="rp-phone-cta">Open app <i>↗</i></div>' +
                    '<div class="rp-phone-nav"><i></i><i class="active"></i><i></i></div>' +
                  '</div>' +
                '</div>' +
                '<div class="rp-phone-shadow"></div>' +
              '</div>' +
              '<div class="rp-scene-aside">' +
                '<p class="rp-scene-type">MOBILE APPLICATION</p>' +
                '<h3 class="rp-scene-title">' + name + '</h3>' +
                '<p class="rp-scene-body">' + sum + '</p>' +
                '<div class="rp-scene-tags">' + stackBadges(project) + '</div>' +
              '</div>' +
              '<span class="rp-scene-label">DEVICE-FIRST PREVIEW <i>·</i> Illustrative interface, not a captured screen</span>' +
            '</div>'
        );
    }

    function sceneWearable(project) {
        var name = esc(project.name);
        var sum  = esc(project.summary);

        return (
            '<div class="rp-scene rp-scene-wearable">' +
              '<div class="rp-watch-wrap">' +
                '<div class="rp-watch-band rp-band-top"></div>' +
                '<div class="rp-watch">' +
                  '<div class="rp-watch-crown"></div>' +
                  '<div class="rp-watch-face">' +
                    '<small class="rp-watch-dow">MON · 19</small>' +
                    '<strong class="rp-watch-time">09:41</strong>' +
                    '<span class="rp-watch-hijri">HIJRI DATE</span>' +
                    '<b class="rp-watch-prayer">Next prayer · 12:30</b>' +
                    '<div class="rp-watch-ring"><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="35" class="rp-ring-track"/><circle cx="40" cy="40" r="35" class="rp-ring-fill"/></svg></div>' +
                    '<i class="rp-watch-countdown">28:42</i>' +
                  '</div>' +
                '</div>' +
                '<div class="rp-watch-band rp-band-bottom"></div>' +
              '</div>' +
              '<div class="rp-scene-aside">' +
                '<p class="rp-scene-type">WEARABLE APPLICATION</p>' +
                '<h3 class="rp-scene-title">' + name + '</h3>' +
                '<p class="rp-scene-body">' + sum + '</p>' +
                '<div class="rp-scene-tags">' + stackBadges(project) + '</div>' +
              '</div>' +
              '<span class="rp-scene-label">ROUND-WATCH PREVIEW <i>·</i> Illustrative face · values are not live</span>' +
            '</div>'
        );
    }

    function sceneDesktop(project) {
        var name = esc(project.name);
        var sum  = esc(project.summary);
        var hi   = project.highlights || [];

        var sidebarItems = ["File", "Edit", "View", "Build", "Run", "Tools"].map(function (item) {
            return '<li>' + item + '</li>';
        }).join("");

        var bodyRows = hi.slice(0, 3).map(function (h, i) {
            return '<div class="rp-window-row' + (i === 0 ? " active" : "") + '"><i class="rp-row-icon"></i><span>' + esc(h) + '</span></div>';
        }).join("");

        return (
            '<div class="rp-scene rp-scene-desktop">' +
              '<div class="rp-window-wrap">' +
                '<div class="rp-window">' +
                  '<div class="rp-window-titlebar">' +
                    '<span class="rp-wt-dots"><i class="dot-red"></i><i class="dot-yellow"></i><i class="dot-green"></i></span>' +
                    '<span class="rp-wt-title">' + name + '</span>' +
                    '<span class="rp-wt-menu">File  Edit  View  Help</span>' +
                  '</div>' +
                  '<div class="rp-window-menubar"><ul>' + sidebarItems + '</ul></div>' +
                  '<div class="rp-window-body">' +
                    '<aside class="rp-window-sidebar"><p>Project</p><i></i><i></i><i></i><i></i><i></i></aside>' +
                    '<div class="rp-window-canvas">' +
                      '<div class="rp-canvas-header"><span class="rp-canvas-eyebrow">DESKTOP WORKSPACE</span><strong>' + name + '</strong></div>' +
                      '<div class="rp-canvas-rows">' + bodyRows + '</div>' +
                      '<div class="rp-canvas-statusbar"><span>' + esc((project.stack || [])[0] || "Desktop") + '</span><span>UTF-8</span></div>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="rp-scene-aside rp-scene-aside-below">' +
                '<p class="rp-scene-type">DESKTOP APPLICATION</p>' +
                '<p class="rp-scene-body">' + sum + '</p>' +
                '<div class="rp-scene-tags">' + stackBadges(project) + '</div>' +
              '</div>' +
              '<span class="rp-scene-label">DESKTOP PREVIEW <i>·</i> Illustrative window · not a captured screen</span>' +
            '</div>'
        );
    }

    function sceneWeb(project) {
        var name    = esc(project.name);
        var sum     = esc(project.summary);
        var urlSlug = project.repository.toLowerCase().replace(/[^a-z0-9]/g, "-");
        var techColor = "web";

        var navItems = ["Home", "Dashboard", "Projects", "Settings"].map(function (item, i) {
            return '<a' + (i === 0 ? ' class="active"' : '') + '>' + item + '</a>';
        }).join("");

        var hi = project.highlights || [];
        var cards = hi.slice(0, 3).map(function (h) {
            return '<div class="rp-webapp-card"><span>' + esc(h) + '</span></div>';
        }).join("");

        return (
            '<div class="rp-scene rp-scene-web">' +
              '<div class="rp-browser-wrap">' +
                '<div class="rp-browser">' +
                  '<div class="rp-browser-chrome">' +
                    '<span class="rp-bc-dots"><i class="dot-red"></i><i class="dot-yellow"></i><i class="dot-green"></i></span>' +
                    '<div class="rp-bc-urlbar"><span class="rp-bc-lock">🔒</span><span class="rp-bc-url">app.github.io/' + urlSlug + '</span></div>' +
                    '<span class="rp-bc-actions">⟳ ⋯</span>' +
                  '</div>' +
                  '<div class="rp-browser-tabbar">' +
                    '<span class="rp-tab active">' + name + '</span>' +
                    '<span class="rp-tab">Settings</span>' +
                    '<span class="rp-tab-add">+</span>' +
                  '</div>' +
                  '<div class="rp-webapp">' +
                    '<nav class="rp-webapp-nav"><span class="rp-webapp-brand">' + name.charAt(0).toUpperCase() + '</span>' + navItems + '</nav>' +
                    '<main class="rp-webapp-main">' +
                      '<div class="rp-webapp-heading"><h4>' + name + '</h4><span class="rp-webapp-badge">Live</span></div>' +
                      '<p class="rp-webapp-desc">' + sum + '</p>' +
                      '<div class="rp-webapp-cards">' + cards + '</div>' +
                    '</main>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<span class="rp-scene-label">WEB APPLICATION PREVIEW <i>·</i> Illustrative interface · not a captured screen</span>' +
            '</div>'
        );
    }

    function sceneBackend(project) {
        var name  = esc(project.name);
        var sum   = esc(project.summary);
        var stack = project.stack || [];
        var tech  = esc(stack[0] || "HTTP");
        var tech2 = esc(stack[1] || "API");

        var routes = [
            { method: "GET",  path: "/health",    status: "200 OK",    color: "green" },
            { method: "POST", path: "/api/create", status: "201 OK",    color: "green" },
            { method: "GET",  path: "/api/list",   status: "200 OK",    color: "green" },
            { method: "DELETE", path: "/api/:id",  status: "204",       color: "red"   }
        ];

        var routeRows = routes.map(function (r) {
            return '<div class="rp-api-route"><span class="rp-method rp-method-' + r.color + '">' + r.method + '</span><code>' + r.path + '</code><span class="rp-status">' + r.status + '</span></div>';
        }).join("");

        return (
            '<div class="rp-scene rp-scene-backend">' +
              '<div class="rp-api-wrap">' +
                '<div class="rp-service-diagram">' +
                  '<div class="rp-svc-node rp-svc-client"><small>CLIENT</small><b>Request</b></div>' +
                  '<div class="rp-svc-arrow">→</div>' +
                  '<div class="rp-svc-node rp-svc-gateway"><small>GATEWAY</small><b>' + tech + '</b></div>' +
                  '<div class="rp-svc-arrow">→</div>' +
                  '<div class="rp-svc-node rp-svc-service"><small>SERVICE</small><b>' + name + '</b></div>' +
                  '<div class="rp-svc-arrow">→</div>' +
                  '<div class="rp-svc-node rp-svc-db"><small>STORAGE</small><b>' + tech2 + '</b></div>' +
                '</div>' +
                '<div class="rp-api-console">' +
                  '<div class="rp-api-console-bar"><i></i><i></i><i></i><span>' + name + ' · API surface</span></div>' +
                  '<div class="rp-api-routes">' + routeRows + '</div>' +
                  '<div class="rp-api-footer"><span>BASE URL · /api/v1</span><span>JSON · REST</span></div>' +
                '</div>' +
              '</div>' +
              '<div class="rp-scene-aside rp-scene-aside-below">' +
                '<p class="rp-scene-type">BACKEND / API SERVICE</p>' +
                '<p class="rp-scene-body">' + sum + '</p>' +
                '<div class="rp-scene-tags">' + stackBadges(project) + '</div>' +
              '</div>' +
              '<span class="rp-scene-label">SERVICE BOUNDARY MAP <i>·</i> Concept based on repository documentation</span>' +
            '</div>'
        );
    }

    function sceneTool(project) {
        var name  = esc(project.name);
        var sum   = esc(project.summary);
        var tech  = esc((project.stack || [])[0] || "CLI");
        var hi    = project.highlights || [];

        var lines = [
            { type: "prompt", text: name.toLowerCase().replace(/\s+/g, "-") + " --help" },
            { type: "muted",  text: "Initializing workspace…" },
            { type: "ok",     text: "✓ Context loaded       3 files" },
            { type: "ok",     text: "✓ Dependencies checked  " + tech },
            { type: "live",   text: "● Running next step     READY" },
        ].concat(hi.slice(0, 2).map(function (h) {
            return { type: "info", text: "→ " + h };
        }));

        var termLines = lines.map(function (l) {
            return '<p class="rp-term-' + l.type + '"><em></em>' + esc(l.text) + '</p>';
        }).join("");

        return (
            '<div class="rp-scene rp-scene-tool">' +
              '<div class="rp-terminal-wrap">' +
                '<div class="rp-terminal">' +
                  '<div class="rp-terminal-bar"><i class="dot-red"></i><i class="dot-yellow"></i><i class="dot-green"></i><span>' + name + ' / workspace</span></div>' +
                  '<div class="rp-terminal-body">' + termLines + '<div class="rp-term-cursor"></div></div>' +
                '</div>' +
              '</div>' +
              '<div class="rp-scene-aside">' +
                '<p class="rp-scene-type">DEVELOPER TOOL</p>' +
                '<h3 class="rp-scene-title">' + name + '</h3>' +
                '<p class="rp-scene-body">' + sum + '</p>' +
                '<div class="rp-scene-tags">' + stackBadges(project) + '</div>' +
              '</div>' +
              '<span class="rp-scene-label">DEVELOPER TOOL PREVIEW <i>·</i> Illustrative command surface · not live output</span>' +
            '</div>'
        );
    }

    function sceneLearning(project) {
        var name  = esc(project.name);
        var sum   = esc(project.summary);
        var hi    = project.highlights || [];
        var stack = project.stack || [];

        var noteItems = hi.map(function (h, i) {
            return '<li class="rp-note-item"><span class="rp-note-num">0' + (i + 1) + '</span>' + esc(h) + '</li>';
        }).join("");

        var codeLines = [
            "// " + name,
            "// " + esc(stack[0] || "Code"),
            "",
            "describe('" + name + "', () => {",
            "  it('should work', () => {",
            "    // step 01 · understand the problem",
            "    // step 02 · try a small idea",
            "    // step 03 · verify the result",
            "  });",
            "});"
        ];

        var codeMarkup = codeLines.map(function (l, i) {
            return '<p><em>' + String(i + 1).padStart(2, "0") + '</em>' + esc(l) + '</p>';
        }).join("");

        return (
            '<div class="rp-scene rp-scene-learning">' +
              '<div class="rp-notebook-wrap">' +
                '<div class="rp-notebook">' +
                  '<div class="rp-notebook-spine"></div>' +
                  '<div class="rp-notebook-page">' +
                    '<p class="rp-nb-label">' + esc(stack[0] || "Code") + ' · LEARNING NOTES</p>' +
                    '<strong class="rp-nb-title">' + name + '</strong>' +
                    '<p class="rp-nb-summary">' + sum + '</p>' +
                    '<ul class="rp-nb-items">' + noteItems + '</ul>' +
                  '</div>' +
                '</div>' +
                '<div class="rp-code-pane">' +
                  '<div class="rp-code-pane-bar"><i class="dot-red"></i><i class="dot-yellow"></i><i class="dot-green"></i><span>src / examples</span></div>' +
                  '<div class="rp-code-pane-body">' + codeMarkup + '</div>' +
                '</div>' +
              '</div>' +
              '<span class="rp-scene-label">CODE & LEARNING PREVIEW <i>·</i> Illustrative composition · not a source screenshot</span>' +
            '</div>'
        );
    }

    function sceneConcept(project) {
        var name  = esc(project.name);
        var sum   = esc(project.summary);
        var hi    = project.highlights || [];

        var stickies = hi.slice(0, 3).map(function (h, i) {
            var angles = ["-3deg", "1.5deg", "-1deg"];
            return '<div class="rp-sticky" style="--rot:' + angles[i] + '"><span>' + esc(h) + '</span></div>';
        }).join("");

        var stages = ["Problem space", name, "Product direction"].map(function (s, i) {
            return '<div class="rp-stage' + (i === 1 ? " rp-stage-center" : "") + '"><span>' + esc(s) + '</span></div>' +
                   (i < 2 ? '<div class="rp-stage-arrow">→</div>' : '');
        }).join("");

        return (
            '<div class="rp-scene rp-scene-concept">' +
              '<div class="rp-canvas-board">' +
                '<div class="rp-board-header"><span>CONCEPT BOARD</span><span>' + name + '</span></div>' +
                '<div class="rp-board-stages">' + stages + '</div>' +
                '<div class="rp-board-stickies">' + stickies + '</div>' +
                '<div class="rp-board-footer">' + sum + '</div>' +
              '</div>' +
              '<span class="rp-scene-label">PRODUCT DIRECTION <i>·</i> Concept preview · implementation may vary</span>' +
            '</div>'
        );
    }

    function sceneProfile(project) {
        var name = esc(project.name);
        var sum  = esc(project.summary);

        return (
            '<div class="rp-scene rp-scene-profile">' +
              '<div class="rp-profile-card">' +
                '<div class="rp-profile-avatar"><span>h.</span></div>' +
                '<strong>' + name + '</strong>' +
                '<p>' + sum + '</p>' +
                '<div class="rp-profile-links"><span>GitHub</span><span>Portfolio</span></div>' +
              '</div>' +
              '<span class="rp-scene-label">PROFILE OVERVIEW <i>·</i> Static representation</span>' +
            '</div>'
        );
    }

    function sceneFor(project) {
        switch (project.type) {
            case "mobile":   return sceneMobile(project);
            case "wearable": return sceneWearable(project);
            case "desktop":  return sceneDesktop(project);
            case "web":      return sceneWeb(project);
            case "backend":  return sceneBackend(project);
            case "tool":     return sceneTool(project);
            case "learning":
            case "library":  return sceneLearning(project);
            case "concept":  return sceneConcept(project);
            default:         return sceneProfile(project);
        }
    }

    /* ─────────────────────────────────────────────
       FACT CARDS
    ───────────────────────────────────────────── */
    function factCards(project) {
        var hi = (project.highlights || []).slice(0, 3);
        if (!hi.length) hi = ["Overview", "Product shape", "Technology"];
        return (
            '<div class="rp-facts">' +
            hi.map(function (h, i) {
                var body = i === 0 ? esc(project.summary) :
                           i === 1 ? "A focused view of the project\u2019s documented product and implementation boundaries." :
                           "Explore the source repository for implementation detail and current status.";
                return (
                    '<article class="rp-fact">' +
                      '<span>0' + (i + 1) + ' \u2014 ' + esc(label(project).toUpperCase()) + '</span>' +
                      '<h3>' + esc(h) + '</h3>' +
                      '<p>' + body + '</p>' +
                    '</article>'
                );
            }).join("") +
            '</div>'
        );
    }

    /* ─────────────────────────────────────────────
       WALKTHROUGH
    ───────────────────────────────────────────── */
    function walkthrough(project) {
        var hi    = (project.highlights || []).slice(0, 3);
        var stack = (project.stack || []).join(" \u00b7 ") || "See the repository.";
        var steps = [
            { id: "overview",        label: "Overview",        title: "Start with the problem",        body: project.summary },
            { id: "product",         label: "Product",         title: hi[0] || "Explore the product",  body: (hi.slice(0, 2).join(". ") || project.summary) },
            { id: "implementation",  label: "Implementation",  title: hi[2] || "Follow the code",      body: stack + "." }
        ];

        var tabMarkup = steps.map(function (s, i) {
            var active = i === 0;
            return (
                '<button class="walkthrough-step' + (active ? " is-active" : "") + '" ' +
                'id="' + esc(project.slug) + '-' + s.id + '-tab" type="button" role="tab" ' +
                'aria-controls="' + esc(project.slug) + '-' + s.id + '-panel" ' +
                'aria-selected="' + String(active) + '" tabindex="' + (active ? "0" : "-1") + '" ' +
                'data-step="' + s.id + '">' +
                '<span>0' + (i + 1) + '</span>' + esc(s.label) +
                '</button>'
            );
        }).join("");

        var panelMarkup = steps.map(function (s, i) {
            var active = i === 0;
            return (
                '<article class="walkthrough-panel' + (active ? " is-active" : "") + '" ' +
                'id="' + esc(project.slug) + '-' + s.id + '-panel" role="tabpanel" ' +
                'aria-labelledby="' + esc(project.slug) + '-' + s.id + '-tab" ' +
                'data-panel="' + s.id + '"' + (active ? "" : " hidden") + '>' +
                '<h3>' + esc(s.title) + '</h3>' +
                '<p>' + esc(s.body) + '</p>' +
                '</article>'
            );
        }).join("");

        return (
            '<div class="walkthrough rp-walkthrough">' +
              '<div class="walkthrough-steps" role="tablist" aria-label="' + esc(project.name) + ' walkthrough">' +
              tabMarkup +
              '</div>' +
              '<div class="walkthrough-content" aria-live="polite">' +
              panelMarkup +
              '</div>' +
            '</div>'
        );
    }

    /* ─────────────────────────────────────────────
       MEDIA GALLERY
    ───────────────────────────────────────────── */
    function mediaSection(project) {
        if (!project.media || !project.media.length) {
            return (
                '<div class="rp-media-note">' +
                  '<span class="rp-media-note-mark">\u21b3</span>' +
                  '<div><strong>No public screenshots are linked in this repository README.</strong>' +
                  '<p>The preview above is an original illustration of the documented project type and purpose.</p></div>' +
                '</div>'
            );
        }
        return (
            '<div class="rp-media-gallery">' +
            project.media.map(function (item) {
                var kind = item.kind === "diagram" ? "Architecture diagram from the repository" : "Screenshot from the repository";
                return (
                    '<figure>' +
                      '<a href="' + esc(item.src) + '" target="_blank" rel="noopener noreferrer">' +
                        '<img src="' + esc(item.src) + '" alt="' + esc(item.alt) + '" loading="lazy">' +
                      '</a>' +
                      '<figcaption><span>' + esc(item.label || kind) + '</span><small>' + kind + '</small></figcaption>' +
                    '</figure>'
                );
            }).join("") +
            '</div>'
        );
    }

    /* ─────────────────────────────────────────────
       VIDEO / DEMO PANEL
    ───────────────────────────────────────────── */
    function videoPanel(project) {
        var demoLink = project.demoUrl
            ? '<a class="rp-live-demo" href="' + esc(project.demoUrl) + '" target="_blank" rel="noopener noreferrer">Open the live demo <span>\u2197</span></a>'
            : "";
        return (
            '<div class="rp-video-panel">' +
              '<div class="video-placeholder" role="img" aria-label="No video recording published">' +
                '<div><span class="play-icon">&#9654;</span>' +
                '<strong>' + (project.demoUrl ? "Live demo available" : "No public video recording") + '</strong>' +
                '<small>' + (project.demoUrl ? "A live demo is linked. No recorded walkthrough is published yet." : "No recorded demo is linked from this repository README.") + '</small>' +
                '</div>' +
              '</div>' +
              '<div class="video-copy">' +
                '<p class="eyebrow">DEMO &amp; RECORDING</p>' +
                '<h3>' + (project.demoUrl ? "Try the live project" : "Video walkthrough to come") + '</h3>' +
                '<p>' + (project.demoUrl ? "A live version is available. The repository has further setup and documentation." : "The repository does not link to a recorded walkthrough. The source is the best place to see its current state.") + '</p>' +
                demoLink +
              '</div>' +
            '</div>'
        );
    }

    /* ─────────────────────────────────────────────
       SECTION WRAPPER HELPERS
    ───────────────────────────────────────────── */
    function section(eyebrow, h2line1, h2line2, desc, body) {
        return (
            '<section class="rp-section">' +
              '<div class="rp-section-heading">' +
                '<div><p class="eyebrow">' + eyebrow + '</p><h2>' + h2line1 + (h2line2 ? '<br>' + h2line2 : '') + '</h2></div>' +
                '<p>' + desc + '</p>' +
              '</div>' +
              body +
            '</section>'
        );
    }

    /* ─────────────────────────────────────────────
       MAIN RENDER
    ───────────────────────────────────────────── */
    function render(project) {
        var type     = esc(project.type);
        var typeName = label(project);
        var repoUrl  = "https://github.com/hamzajg/" + encodeURIComponent(project.repository);
        var demoBtn  = project.demoUrl
            ? '<a class="button rp-demo-button" href="' + esc(project.demoUrl) + '" target="_blank" rel="noopener noreferrer">Open live demo <span>\u2197</span></a>'
            : "";

        document.title = project.name + " \u2014 Hamza Jguerim";
        document.body.dataset.projectType = project.type;
        root.dataset.projectType = project.type;

        root.innerHTML =
            /* ── HERO ───────────────────────────────── */
            '<section class="rp-hero">' +
              '<div class="rp-hero-inner">' +
                '<div class="rp-hero-copy">' +
                  '<p class="rp-type-label">' + esc(typeName.toUpperCase()) + ' \u00b7 REPOSITORY CASE STUDY</p>' +
                  '<h1>' + esc(project.name) + '</h1>' +
                  '<p class="rp-desc">' + esc(project.summary) + '</p>' +
                  '<div class="rp-stack">' + stackBadges(project) + '</div>' +
                  '<div class="rp-hero-actions">' +
                    '<a class="button rp-source-button" href="' + esc(repoUrl) + '" target="_blank" rel="noopener noreferrer">View on GitHub <span>\u2197</span></a>' +
                    demoBtn +
                  '</div>' +
                '</div>' +
              '</div>' +
              sceneFor(project) +
            '</section>' +

            /* ── AT A GLANCE ─────────────────────────── */
            section(
                "AT A GLANCE",
                "One repo.", "A specific problem.",
                esc(project.summary),
                factCards(project)
            ) +

            /* ── SCREENSHOTS ─────────────────────────── */
            section(
                "SCREENSHOTS &amp; VISUALS",
                "From the", "repository.",
                "Real repository media is shown when it is linked in the project README. Otherwise, the page uses a clearly labeled illustration.",
                mediaSection(project)
            ) +

            /* ── WALKTHROUGH ─────────────────────────── */
            section(
                "INTERACTIVE WALKTHROUGH",
                "Explore the", "project shape.",
                "Use the steps to move from the project\u2019s purpose to its main focus and implementation stack.",
                walkthrough(project)
            ) +

            /* ── VIDEO ───────────────────────────────── */
            section(
                "VIDEO WALKTHROUGH",
                "See it in", "motion.",
                "Recorded demos are only included when a public video is available.",
                videoPanel(project)
            ) +

            /* ── FOOTER LINKS ────────────────────────── */
            '<div class="rp-back-link">' +
              '<a href="../index.html">\u2190 Back to all repositories</a>' +
              '<a href="' + esc(repoUrl) + '" target="_blank" rel="noopener noreferrer">Open source on GitHub \u2197</a>' +
            '</div>';

        root.removeAttribute("aria-busy");
    }

    /* ─────────────────────────────────────────────
       BOOTSTRAP: fetch catalog and render
    ───────────────────────────────────────────── */
    fetch("../../projects/catalog.json")
        .then(function (response) {
            if (!response.ok) throw new Error("Catalog request failed: " + response.status);
            return response.json();
        })
        .then(function (data) {
            var slug    = root.getAttribute("data-project-slug");
            var project = null;
            for (var i = 0; i < data.length; i++) {
                if (data[i].slug === slug) { project = data[i]; break; }
            }
            if (!project) throw new Error("Project not found in catalog: " + slug);
            if (project.customPage) throw new Error("This project uses its own case-study page.");
            render(project);
        })
        .catch(function (error) {
            console.error(error);
            root.removeAttribute("aria-busy");
            root.innerHTML =
                '<section class="rp-load-error">' +
                '<p class="eyebrow">PROJECT PAGE UNAVAILABLE</p>' +
                '<h1>Could not load this case study.</h1>' +
                '<p>Please try again or browse the <a href="../index.html">project directory</a>.</p>' +
                '</section>';
        });
}());
