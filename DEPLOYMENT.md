# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd devfolio-project
vercel

# Follow prompts to link project
```

### Option 2: Using GitHub Integration
1. Push code to GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

### Vercel Configuration
Create `vercel.json` in project root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/Assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Deploy to Netlify

### Using Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd devfolio-project
netlify deploy

# Production deploy
netlify deploy --prod
```

### Using Drag & Drop
1. Visit [netlify.com](https://netlify.com)
2. Drag the `devfolio-project` folder to the deploy zone
3. Done!

### Netlify Configuration
Create `netlify.toml`:
```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/Assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Deploy to GitHub Pages

### Steps
```bash
# 1. Create gh-pages branch
git checkout -b gh-pages

# 2. Push to GitHub
git push origin gh-pages

# 3. Enable GitHub Pages in repository settings
# Settings > Pages > Source: gh-pages branch
```

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./devfolio-project
```

## Pre-Deployment Checklist

### Performance
- [ ] Run Lighthouse audit (score > 90)
- [ ] Test on slow 3G network
- [ ] Verify lazy loading works
- [ ] Check image sizes (< 200KB each)
- [ ] Test on multiple devices

### Functionality
- [ ] All links work correctly
- [ ] Navigation smooth scrolling works
- [ ] Menu toggle functions properly
- [ ] Project hover effects work
- [ ] Mobile menu works
- [ ] No console errors

### SEO
- [ ] Meta tags present and correct
- [ ] Open Graph tags configured
- [ ] Sitemap.xml accessible
- [ ] Robots.txt configured
- [ ] Canonical URL set

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus states visible
- [ ] Alt text on all images
- [ ] ARIA labels present

### Security
- [ ] All external links have rel="noopener noreferrer"
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No sensitive data exposed

## Post-Deployment Tasks

### 1. Submit to Search Engines
```bash
# Google Search Console
https://search.google.com/search-console

# Bing Webmaster Tools
https://www.bing.com/webmasters
```

### 2. Set Up Analytics
```html
<!-- Add to <head> -->
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Monitor Performance
- Set up Vercel Analytics (automatic)
- Monitor Core Web Vitals
- Check error logs regularly
- Review user feedback

### 4. Social Media
- Share on LinkedIn
- Tweet about launch
- Post on relevant communities
- Update GitHub README

## Custom Domain Setup

### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS
4. Enable HTTPS (automatic)

### DNS Configuration Example
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Environment Variables

If you add any API keys or secrets:

### Vercel
```bash
vercel env add API_KEY
```

### Netlify
```bash
netlify env:set API_KEY value
```

## Rollback Strategy

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Netlify
1. Go to Deploys tab
2. Find previous successful deploy
3. Click "Publish deploy"

## Continuous Deployment

### Automatic Deploys
- Push to `main` branch → Auto deploy to production
- Push to `dev` branch → Auto deploy to preview
- Pull requests → Generate preview URLs

### Branch Protection
```bash
# Recommended branch rules
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date
```

## Performance Monitoring

### Tools to Set Up
1. **Google Search Console** - SEO monitoring
2. **Google Analytics** - User behavior
3. **Vercel Analytics** - Performance metrics
4. **Sentry** - Error tracking (optional)

### Regular Checks
- Weekly: Check Core Web Vitals
- Monthly: Run Lighthouse audit
- Quarterly: Review and optimize

## Troubleshooting

### Common Issues

**Issue**: Images not loading
- Check file paths (case-sensitive on Linux servers)
- Verify image files are committed to git
- Check .gitignore doesn't exclude Assets folder

**Issue**: Smooth scroll not working
- Check if LocomotiveScroll CDN is accessible
- Verify script.js is loading
- Check browser console for errors

**Issue**: Mobile menu not working
- Clear browser cache
- Check if JavaScript is enabled
- Verify onclick handler is attached

**Issue**: Slow load times
- Enable GZIP compression
- Optimize images (convert to WebP)
- Enable CDN caching
- Minify CSS/JS files

## Support & Resources

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://docs.github.com/pages)

### Community
- [Vercel Discord](https://vercel.com/discord)
- [Netlify Community](https://community.netlify.com)
- [Stack Overflow](https://stackoverflow.com)

---

**Last Updated**: December 12, 2025
**Version**: 2.0.0
