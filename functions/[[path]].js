export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Let static files load normally
  if (/\.(css|js|png|jpg|jpeg|gif|svg|webp|ico|json|txt|xml)$/i.test(pathname)) {
    return context.next();
  }

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getImageFromPost(post) {
    const rawContent = post?.content?.$t || "";
    const match = rawContent.match(/<img[^>]*src="([^"]+)"[^>]*>/i);

    return (
      match?.[1] ||
      post?.media$thumbnail?.url?.replace("/s72-c/", "/s1200/") ||
      "https://via.placeholder.com/500x750?text=No+Image"
    );
  }

  function createCard(post) {
    const postTitle = post?.title?.$t || "No Title";
    const postSlug = slugify(postTitle);
    const postImage = getImageFromPost(post);

    return `
      <a class="card" href="/${escapeHtml(postSlug)}">
        <div class="poster-wrap">
          <img class="poster" src="${escapeHtml(postImage)}" alt="${escapeHtml(postTitle)}" loading="lazy">
        </div>

        <div class="content">
          <div class="title">${escapeHtml(postTitle)}</div>
        </div>
      </a>
    `;
  }

  let posts = [];
  try {
    const res = await fetch(new URL("/json/posts1.json", request.url));
    if (res.ok) {
      const data = await res.json();
      posts = data?.feed?.entry || [];
    }
  } catch (err) {
    posts = [];
  }

  const cardsHtml = posts.map(createCard).join("");

  const pageTitle = "Jio Rockers (2026) Download Movies in Telugu Tamil Kannada Malayalam Hindi";
  const pageDescription =
    "Jio Rockers 2026 download latest movies in Telugu, Hindi & English. Jio Rockers Telugu movies 2025, Jio Rockers.com, trending new releases online.";

  const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">

  <title>${escapeHtml(pageTitle)}</title>

  <meta content="${escapeHtml(pageDescription)}" name="description"/>
  <meta content="admin" name="author"/>
  <meta content="https://www.jiorockers.online/" name="url"/>
  <meta content="Worldwide" name="coverage"/>
  <meta content="Global" name="distribution"/>
  <meta content="no-referrer" name="referrer"/>
  <meta content="https://hashgen.website" data-id="d1" name="video-domain"/>

  <link rel="stylesheet" href="/style.css">
  <link rel="preload" as="fetch" href="/json/posts1.json" type="application/json">
  <script src="/script.js" defer></script>

  <link rel="icon" type="image/png" href="/favicon32.png">

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-BWP4HMDWY8"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-BWP4HMDWY8');
  </script>

  <meta name="google-site-verification" content="x_AH203GWo3hEB2cq8n0dhMsh1AngNjmYcWTRF7gbbw" />
</head>

<body>

  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-profile">
        <div class="sidebar-avatar">J</div>

        <div>
          <h2>Jio Rockers</h2>
          <p>Watch & Download</p>
        </div>
      </div>

      <button class="sidebar-close" id="sidebarClose" aria-label="Close menu">
        ×
      </button>
    </div>

    <div class="sidebar-content">

      <div class="sidebar-section">
        <div class="sidebar-section-title">Navigation</div>

        <a class="sidebar-link" href="#top">
          <span class="icon">⌂</span>
          <span>Home</span>
        </a>

        <a class="sidebar-link" href="#latestSection">
          <span class="icon">★</span>
          <span>Latest Movies</span>
        </a>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-section-title">About</div>

        <p class="sidebar-note">
          Browse the newest movie posts, search instantly,
          and move through pages.
        </p>
      </div>

    </div>
  </aside>

  <header class="topbar" id="top">

    <a class="brand" href="/" aria-label="Home">

      <div class="brand-logo">J</div>

      <div class="brand-text">
        <h1>Jio Rockers</h1>
        <p>Watch & Download</p>
      </div>

    </a>

    <div class="topbar-center">

      <div class="search-wrap">

        <svg class="search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 21l-4.35-4.35"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"/>
          <circle cx="11"
                  cy="11"
                  r="7"
                  stroke="white"
                  stroke-width="2"/>
        </svg>

        <input
          id="searchInput"
          class="search-input"
          type="search"
          placeholder="Search movies, labels, titles..."
        >

        <button
          id="searchClear"
          class="search-clear"
          aria-label="Clear search"
        >
          ×
        </button>

      </div>

    </div>

    <div class="topbar-actions">

      <button
        class="menu-btn search-btn"
        id="searchBtn"
        aria-label="Focus search"
      >

        <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
          <path d="M21 21l-4.35-4.35"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"/>
          <circle cx="11"
                  cy="11"
                  r="7"
                  stroke="white"
                  stroke-width="2"/>
        </svg>

      </button>

      <button
        class="menu-btn"
        id="menuBtn"
        aria-label="Open menu"
      >

        <div class="menu-lines" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </button>

    </div>

  </header>

  <div class="language-cloud" id="languageCloud">
    <a href="/?label=Telugu" class="lang-chip">Telugu</a>
    <a href="/?label=Tamil" class="lang-chip">Tamil</a>
    <a href="/?label=Hindi" class="lang-chip">Hindi</a>
    <a href="/?label=Kannada" class="lang-chip">Kannada</a>
    <a href="/?label=Malayalam" class="lang-chip">Malayalam</a>
    <a href="/?label=English" class="lang-chip">English</a>
  </div>

  <div class="app">

    <div id="pageBadge" class="page-badge"></div>

    <div id="searchStatus" class="search-status"></div>

    <div class="page-title">Latest Movies</div>

    <div id="latestSection"></div>

    <div id="posts" class="grid">
      ${cardsHtml}
    </div>

    <div class="pagination" id="pagination">

      <a id="prevBtn" class="nav-btn" href="/">
        Prev
      </a>

      <span id="pageNum">1</span>

      <a id="nextBtn" class="nav-btn" href="?page=2">
        Next
      </a>

    </div>

  </div>

</body>
</html>
`;

  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
      "cache-control": "public, max-age=0, s-maxage=86400",
    },
  });
}
