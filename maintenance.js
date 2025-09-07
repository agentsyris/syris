// Maintenance Mode Controller
// Set MAINTENANCE_MODE=true in your environment to show coming soon page
// Set MAINTENANCE_MODE=false to show the full site

const MAINTENANCE_MODE =
  process.env.MAINTENANCE_MODE === "true" ||
  process.env.NODE_ENV === "development"
    ? false
    : true;

function getMaintenanceStatus() {
  return {
    isMaintenanceMode: MAINTENANCE_MODE,
    maintenanceMessage: "We're updating our website. Please check back soon.",
    fullSiteUrl: "/index-full-site.html",
    comingSoonUrl: "/coming-soon.html",
  };
}

// For static hosting (like Vercel, Netlify)
function handleRequest(request) {
  const maintenance = getMaintenanceStatus();

  if (maintenance.isMaintenanceMode) {
    return {
      statusCode: 200,
      body: getComingSoonPage(),
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-cache",
      },
    };
  } else {
    return {
      statusCode: 200,
      body: getFullSitePage(),
      headers: {
        "Content-Type": "text/html",
      },
    };
  }
}

function getComingSoonPage() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>syrıs. — calm in the chaos of creative work</title>
    <meta name="description" content="workflow optimization for creative teams. coming soon." />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="background-layer">
      <div class="grid-animation"></div>
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
    <main class="content-wrapper">
      <div class="glass-panel">
        <div class="logo">
          <img src="assets/images/syris.logo.primary.svg" alt="syrıs." class="logo-img" />
        </div>
        <h2 class="tagline">calm in the chaos of creative work</h2>
        <div class="status">coming soon</div>
        <div class="services">
          <div class="service-chip">calm.profile</div>
          <div class="service-chip">calm.stack</div>
          <div class="service-chip">calm.os</div>
        </div>
        <form class="email-form" id="emailForm">
          <input type="email" name="email" class="glass-input" placeholder="your email" required autocomplete="email" />
          <button type="submit" class="glass-button">notify me</button>
        </form>
        <footer class="panel-footer">
          <a href="mailto:agent@syris.studio">agent@syris.studio</a>
        </footer>
      </div>
    </main>
    <script src="script.js"></script>
  </body>
</html>`;
}

function getFullSitePage() {
  // This would serve your index-full-site.html content
  return "Full site content here";
}

module.exports = {
  getMaintenanceStatus,
  handleRequest,
  MAINTENANCE_MODE,
};
