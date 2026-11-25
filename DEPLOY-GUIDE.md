# Put your portfolio online (GitHub + Vercel)

It takes about 15 minutes and costs nothing. When you're done you get a link like
`https://karthickraja-portfolio.vercel.app`.

---

## Part A: Test it on your computer (optional but recommended)

1. Install **Node.js LTS** from https://nodejs.org (click the big green "LTS" button, then install with the default options).
2. Unzip `karthickraja-portfolio.zip`, e.g. to your Desktop.
3. Open the folder in **VS Code**, then go to **Terminal → New Terminal**.
4. Run these two commands:
   ```bash
   npm install
   npm run dev
   ```
5. Open http://localhost:5173 in Chrome. You'll see your site. Press `Ctrl + C` in the terminal to stop it.

---

## Part B: Upload to GitHub

### Option 1: Website upload (easiest, no commands)

1. Go to https://github.com and sign in (or create a free account).
2. Click the **+** at the top right → **New repository**.
3. Repository name: `karthickraja-portfolio`. Keep it **Public**. **Don't** tick "Add a README". Click **Create repository**.
4. On the next page, click the link **"uploading an existing file"**.
5. Open your unzipped folder, select **everything inside it** (`src`, `public`, `package.json`, `index.html` and the rest) and drag it all into the browser.
   - Drag the *contents*, not the outer folder itself.
   - Don't upload `node_modules` or `dist` if they exist (they're created on your computer by Part A).
6. Wait until all files are listed, then click **Commit changes**.
7. Check your repo page: you should see `package.json`, `index.html`, `src` and `public` at the top level.

### Option 2: With Git commands (if you already use Git)

```bash
cd karthickraja-portfolio
git init
git add .
git commit -m "My portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/karthickraja-portfolio.git
git push -u origin main
```

---

## Part C: Deploy on Vercel

1. Go to https://vercel.com → **Sign Up** → **Continue with GitHub** (this connects the two accounts).
2. On your dashboard click **Add New… → Project**.
3. Find `karthickraja-portfolio` in the list and click **Import**.
   - If it isn't listed, click **Adjust GitHub App Permissions** and allow access to the repo.
4. Vercel detects everything automatically. Just check:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**. Wait about 1 minute for the confetti 🎉
6. Click **Continue to Dashboard** → you'll see your link under **Domains**, e.g. `karthickraja-portfolio.vercel.app`.

### Get a nicer link name

Go to **Project → Settings → Domains**, click **Edit** on the `.vercel.app` domain and type
something like `karthickraja-design.vercel.app` (if it's free). Click **Save**.

---

## Part D: Updating the site later

Every time you change files on GitHub, Vercel republishes automatically within a minute.

- **Quick text change:** on GitHub open `src/data.js` → click the ✏️ pencil → edit → **Commit changes**.
- **Replace your photo or résumé:** open `public/img` (or `public`) on GitHub → **Add file → Upload files** → upload a file with the **same name** → **Commit changes**.

---

## Part E: Share it

- Add the link to your **LinkedIn** (Contact info → Website, and the Featured section).
- Add it to your **résumé header** and your Naukri / LinkedIn Jobs profiles.
- When you share the link on WhatsApp or LinkedIn, it shows a preview image (`public/og.jpg`).

## Troubleshooting

| Problem | Fix |
|---|---|
| Vercel says "No package.json found" | Your files are inside an extra folder on GitHub. Upload the folder's **contents** to the repo root (Part B, step 5). |
| Build failed | Open the build log on Vercel, check the last red line. Usually a typo in `src/data.js` (a missing comma or quote). |
| Photo doesn't show | File names are case-sensitive. It must be exactly `public/img/karthick.webp`. |
| `npm` is not recognised | Install Node.js (Part A, step 1), then close and reopen VS Code. |
