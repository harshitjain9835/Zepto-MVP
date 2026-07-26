# Deploy Guide: Zepto Multi-Page Prototype

## 1) Local Run
From this folder:
- `stitch_zepto_mobile_ui/stitch_zepto_quick_commerce_mobile_ui`

Run:

```powershell
python -m http.server 8080
```

Open:
- http://localhost:8080/

Entry page:
- `index.html`

## 2) Behavior Implemented
- Every click on each screen navigates to the next page in the flow.
- Text input controls are excluded so typing remains possible.

Flow:
1. `home_dashboard/code.html`
2. `search_explore/code.html`
3. `shopping_cart_1/code.html`
4. `checkout_with_ai_cross_sell/code.html`
5. `electronics_trust_overlay/code.html`
6. `final_checkout_confirmation/code.html`
7. loops back to `home_dashboard/code.html`

Shared router file:
- `app-router.js`

## 3) Vercel Deploy (No Build)
1. Push repository to GitHub.
2. Import project in Vercel.
3. Set root directory to:
   - `stitch_zepto_mobile_ui/stitch_zepto_quick_commerce_mobile_ui`
4. Framework preset:
   - `Other`
5. Build command:
   - leave empty
6. Output directory:
   - leave empty
7. Deploy.

## 4) Netlify Deploy — Git-based (Recommended)

### Prerequisites
- Repository pushed to GitHub / GitLab / Bitbucket.
- `netlify.toml` present at the **repo root** (already created).

### Steps
1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
2. Connect to GitHub and select this repository.
3. Netlify auto-reads `netlify.toml` — no manual configuration needed:
   | Setting | Value (auto-detected) |
   |---|---|
   | Build command | *(empty)* |
   | Publish directory | `stitch_zepto_mobile_ui/stitch_zepto_quick_commerce_mobile_ui` |
4. Click **Deploy site**.
5. Once built, Netlify assigns a URL like `https://zepto-prototype.netlify.app`.
   - Rename it under **Site settings → Site details → Change site name**.

### Continuous deployment
Every push to `main` (or the default branch) automatically triggers a new deploy.
To deploy a specific branch as a preview, push to any other branch — Netlify creates a unique preview URL automatically.

---

## 5) Netlify Deploy — Drag and Drop (Quick)
1. In a terminal, from the repo root:
   ```powershell
   Compress-Archive -Path "stitch_zepto_mobile_ui\stitch_zepto_quick_commerce_mobile_ui\*" -DestinationPath zepto-prototype.zip
   ```
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop `zepto-prototype.zip` onto the page.
4. Site is live instantly. Copy the assigned URL.

> Note: Drag-and-drop deploys are not linked to a Git repo and won't auto-update on push.

---

## 6) Custom Domain (Optional)
1. **Site settings → Domain management → Add custom domain**.
2. Add your domain (e.g. `zepto-demo.yourdomain.com`).
3. Update your DNS provider with the CNAME Netlify provides.
4. Netlify auto-provisions a free TLS certificate via Let's Encrypt.

---

## 7) Notes
- This is a static frontend prototype. No backend or build step is required.
- `netlify.toml` at the repo root controls publish directory, caching headers, and security headers.
- If you want specific elements to navigate to custom screens, add `data-next="../path/to/page.html"` and update `app-router.js` to honor per-element routes.
