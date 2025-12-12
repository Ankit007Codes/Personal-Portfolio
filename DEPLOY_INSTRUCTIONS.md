# 🚀 Deployment Instructions

## Git Repository Updated

The remote origin has been changed to:
```
https://github.com/Ankit007Codes/Personal-Portfolio.git
```

---

## Quick Deploy Steps

### 1. Commit All Changes
```bash
git add .
git commit -m "Complete portfolio optimization with mobile responsiveness"
```

### 2. Push to GitHub
```bash
# First push (if new repository)
git push -u origin main

# Or if branch is named differently
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

#### Option A: Using Vercel Website
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select "Import Git Repository"
4. Choose: `Ankit007Codes/Personal-Portfolio`
5. Click "Deploy"
6. Wait for deployment to complete
7. Copy your new Vercel URL

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Deploy
vercel

# Follow prompts and link to your GitHub repository
```

---

## After Deployment

### Update URLs in Files

Once you have your Vercel URL (e.g., `https://personal-portfolio-xyz.vercel.app`), update these files:

#### 1. index.html
Replace `https://your-portfolio-url.vercel.app/` with your actual URL in:
- Line 18: `og:url`
- Line 19: `og:image`
- Line 27: `twitter:image`
- Line 30: `canonical` link

#### 2. sitemap.xml
Replace all instances of `https://your-portfolio-url.vercel.app/` with your actual URL

#### 3. robots.txt
Replace `https://your-portfolio-url.vercel.app/sitemap.xml` with your actual URL

#### 4. package.json
Replace `https://your-portfolio-url.vercel.app/` in:
- `lighthouse` script
- `test:performance` script

#### 5. PERFORMANCE.md
Replace the example URL with your actual URL

---

## Verify Deployment

### Check These:
- [ ] Site loads correctly
- [ ] All images display
- [ ] Navigation works
- [ ] Mobile menu functions
- [ ] All links work
- [ ] Projects load
- [ ] No console errors

### Test Performance:
```bash
# Run Lighthouse
npm run lighthouse

# Or visit
https://pagespeed.web.dev/
```

---

## Custom Domain (Optional)

### If you want a custom domain:

1. **Buy a domain** (e.g., from Namecheap, GoDaddy)

2. **In Vercel:**
   - Go to Project Settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

3. **Update DNS records:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Update all URLs** in the files mentioned above with your custom domain

---

## Submit to Search Engines

### Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property (your URL)
3. Verify ownership
4. Submit sitemap: `https://your-url.com/sitemap.xml`

### Bing Webmaster Tools
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap

---

## Environment Variables (If Needed)

If you add any API keys or secrets later:

```bash
# Using Vercel CLI
vercel env add API_KEY_NAME

# Or in Vercel Dashboard
# Settings > Environment Variables
```

---

## Continuous Deployment

Now that your repository is connected:
- Every push to `main` branch will auto-deploy
- Pull requests will generate preview URLs
- Rollback is available in Vercel dashboard

---

## Troubleshooting

### Issue: Push rejected
```bash
# If repository already has content
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Issue: Images not loading
- Check file paths are correct
- Verify images are committed to git
- Check .gitignore doesn't exclude Assets folder

### Issue: Vercel build fails
- Check package.json is valid
- Ensure all dependencies are listed
- Check for syntax errors in files

---

## Quick Commands Reference

```bash
# Check current remote
git remote -v

# Stage all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push origin main

# Deploy to Vercel
vercel

# Check git status
git status

# View commit history
git log --oneline
```

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy to Vercel
3. ✅ Update URLs in files
4. ✅ Test deployment
5. ✅ Submit to search engines
6. ✅ Share your portfolio!

---

## Support

If you encounter issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [GitHub Documentation](https://docs.github.com)
- Review error messages in Vercel dashboard
- Check browser console for errors

---

**Repository:** https://github.com/Ankit007Codes/Personal-Portfolio
**Status:** ✅ Ready to Deploy

Good luck with your portfolio! 🚀
