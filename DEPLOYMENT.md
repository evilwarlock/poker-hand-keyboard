# GitHub Pages Deployment Guide

This guide will help you deploy your Poker Hand History Editor to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- The poker hand history editor files

## Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `poker-hand-history-editor`)
5. Make it public (required for free GitHub Pages)
6. Don't initialize with README (since we already have one)
7. Click "Create repository"

### 2. Upload Your Files

#### Option A: Using Git (Recommended)

1. Open your terminal/command prompt
2. Navigate to your project folder:
   ```bash
   cd path/to/pokerKeyboard
   ```

3. Initialize Git and add your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. Connect to your GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

#### Option B: Using GitHub Web Interface

1. Go to your repository on GitHub
2. Click "Add file" → "Upload files"
3. Drag and drop all your files (`index.html`, `style.css`, `script.js`, `README.md`)
4. Add a commit message and click "Commit changes"

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (in the left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch
6. Select "/ (root)" folder
7. Click "Save"

### 4. Access Your Application

1. Wait a few minutes for GitHub Pages to build and deploy
2. Your application will be available at:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME
   ```

## Custom Domain (Optional)

If you want to use a custom domain:

1. In your repository Settings → Pages
2. Enter your custom domain in the "Custom domain" field
3. Click "Save"
4. Add a CNAME file to your repository with your domain name
5. Configure your DNS settings to point to GitHub Pages

## Troubleshooting

### Common Issues

1. **Page not loading**: Check that all files are in the root directory of your repository
2. **Styling not working**: Ensure `style.css` is properly linked in `index.html`
3. **JavaScript not working**: Check browser console for errors
4. **404 errors**: Make sure your repository is public

### Checking Deployment Status

1. Go to your repository on GitHub
2. Click "Actions" tab
3. Look for GitHub Pages deployment status
4. Green checkmark means successful deployment

## Updating Your Application

To update your application:

1. Make your changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. GitHub Pages will automatically rebuild and deploy

## File Structure for GitHub Pages

Your repository should look like this:
```
your-repo/
├── index.html
├── style.css
├── script.js
├── README.md
└── DEPLOYMENT.md
```

## Security Considerations

- GitHub Pages only serves static files
- No server-side processing is available
- All data is stored in the browser's local storage
- No sensitive data is transmitted to GitHub

## Performance Tips

- Keep file sizes small for faster loading
- Use CDN links (like Tailwind CSS) to reduce repository size
- Optimize images if you add any
- Consider using GitHub's built-in compression

---

Your poker hand history editor should now be live and accessible to anyone with the URL! 