# syris.systems — deploy bundle (vercel)

**date:** aug 29, 2025

## what's included
- `index.html` — updated landing (calendly 30min links; og/twitter to syris.systems; nav services link; #thanks anchor)
- `services/calm-ops.html` — program page (no public prices)
- `vercel.json` — rewrite so `/services/calm-ops` resolves to the html file

## how to deploy (vercel)
1. create a repo (or use your existing) and copy these files into the root.
2. push to your default branch.
3. in vercel, add/connect the repo (or re-deploy). vercel will serve static files as-is.
4. verify:
   - home nav shows **services.** and links to `/services/calm-ops`
   - all **book** buttons point to `https://calendly.com/syris/30min`
   - social previews use `https://syris.systems` and your svg
   - forms redirect to `/#thanks` and show the confirmation section.

## optional analytics
if you want to track CTA clicks, add this snippet before `</body>` in both files:

```html
<script>
  const track = (sel, label) => {
    document.querySelectorAll(sel).forEach(a => {
      a.addEventListener('click', () => window.gtag && gtag('event','click',{event_category:'cta',event_label:label}));
    });
  };
  track('a[href*="calendly.com/syris/30min"]','calendly_30min');
  track('a[href="/services/calm-ops"]','services_page');
</script>
```
