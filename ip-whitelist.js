// IP Whitelist for Development Access
// This script checks if the visitor's IP is in the whitelist
// If not, it shows the coming soon page

const WHITELISTED_IPS = [
  "127.0.0.1", // localhost
  "::1", // localhost IPv6
  "192.168.1.0/24", // local network
  "10.0.0.0/8", // private network
  // Add your specific IPs here
  // '203.0.113.1',       // your office IP
  // '198.51.100.1',     // your home IP
];

const MAINTENANCE_MODE = true; // Set to false to disable IP checking

function getClientIP(request) {
  // Try different headers for IP detection
  return (
    request.headers["x-forwarded-for"] ||
    request.headers["x-real-ip"] ||
    request.headers["x-client-ip"] ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress ||
    (request.connection.socket
      ? request.connection.socket.remoteAddress
      : null) ||
    "127.0.0.1"
  );
}

function isIPWhitelisted(ip) {
  if (!MAINTENANCE_MODE) return true;

  // Handle IPv6 localhost
  if (ip === "::1" || ip === "::ffff:127.0.0.1") return true;

  // Check exact matches
  if (WHITELISTED_IPS.includes(ip)) return true;

  // Check CIDR ranges
  for (const range of WHITELISTED_IPS) {
    if (range.includes("/")) {
      if (isIPInRange(ip, range)) return true;
    }
  }

  return false;
}

function isIPInRange(ip, range) {
  const [rangeIP, prefixLength] = range.split("/");
  const ipNum = ipToNumber(ip);
  const rangeNum = ipToNumber(rangeIP);
  const mask = (0xffffffff << (32 - parseInt(prefixLength))) >>> 0;

  return (ipNum & mask) === (rangeNum & mask);
}

function ipToNumber(ip) {
  return (
    ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0
  );
}

function handleRequest(request) {
  const clientIP = getClientIP(request);
  const isWhitelisted = isIPWhitelisted(clientIP);

  if (isWhitelisted) {
    // Show full site for whitelisted IPs
    return {
      statusCode: 200,
      body: getFullSiteHTML(),
      headers: {
        "Content-Type": "text/html",
        "X-Debug-IP": clientIP,
      },
    };
  } else {
    // Show coming soon page for non-whitelisted IPs
    return {
      statusCode: 200,
      body: getComingSoonHTML(),
      headers: {
        "Content-Type": "text/html",
        "X-Debug-IP": clientIP,
      },
    };
  }
}

function getFullSiteHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>syrıs. - Development Access</title>
    <style>
        .dev-banner {
            background: #00c9a7;
            color: white;
            text-align: center;
            padding: 0.5rem;
            font-size: 0.9rem;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
        }
        body { margin-top: 2rem; }
    </style>
</head>
<body>
    <div class="dev-banner">
        🔓 DEVELOPMENT ACCESS - IP Whitelisted
    </div>
    <!-- Include your full site content here -->
    <iframe src="/index-full-site.html" width="100%" height="100vh" frameborder="0"></iframe>
</body>
</html>`;
}

function getComingSoonHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

// For Vercel/Netlify functions
if (typeof module !== "undefined" && module.exports) {
  module.exports = { handleRequest, isIPWhitelisted, getClientIP };
}

// For browser usage
if (typeof window !== "undefined") {
  window.IPWhitelist = { isIPWhitelisted, getClientIP };
}
