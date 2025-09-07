# Staging Subdomain Configuration

## Option 1: Vercel Preview Deployments

Create a separate branch for staging:

```bash
# Create staging branch
git checkout -b staging
git push origin staging

# Deploy to staging subdomain
# Vercel will automatically create: staging-syris.vercel.app
```

## Option 2: Custom Staging Subdomain

Configure DNS to point staging.syris.studio to your staging deployment.

## Option 3: Environment-based Routing

Use different environments for different deployments:

- **Production**: syris.studio (coming soon page)
- **Staging**: staging.syris.studio (full site)
- **Development**: dev.syris.studio (full site + debug tools)

## Implementation Files:

### 1. Staging-specific index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>syrıs. - Staging Environment</title>
    <style>
      .staging-banner {
        background: #ff6b6b;
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
      body {
        margin-top: 2rem;
      }
    </style>
  </head>
  <body>
    <div class="staging-banner">
      🚧 STAGING ENVIRONMENT - This is not the live site
    </div>
    <!-- Your full site content here -->
  </body>
</html>
```

### 2. Environment Detection Script

```javascript
// Detect environment and show appropriate banner
const isStaging =
  window.location.hostname.includes("staging") ||
  window.location.hostname.includes("vercel.app");

if (isStaging) {
  document.body.classList.add("staging-mode");
  // Add staging-specific features
}
```

### 3. DNS Configuration

```
# Add to your DNS provider:
staging.syris.studio    CNAME    staging-syris.vercel.app
dev.syris.studio        CNAME    dev-syris.vercel.app
```

## Benefits:

- ✅ Full site accessible without exposing to public
- ✅ Easy to share with clients/stakeholders
- ✅ Can test changes before going live
- ✅ Maintains SEO for main domain
- ✅ Professional staging environment
