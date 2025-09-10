# syris. Website Deployment Guide

## What's New in This Update

### 🆕 New Pages Added
- **calm-profile.html** - Interactive productivity assessment tool
- **about.html** - About/story page with personal narrative
- **blog.html** - Blog index page with newsletter signup
- **blog/posts/** - Directory for future blog posts

### 🔄 Updated Files
- **index.html** - Enhanced navigation with new page links

### 📁 File Structure
```
syris-website-updated/
├── index.html (updated navigation)
├── calm-profile.html (new assessment tool)
├── about.html (new about page)
├── blog.html (new blog index)
├── blog/
│   └── posts/
│       └── README.md
├── services/
├── favicon.ico
├── syris.logo.primary.svg
├── package.json
├── vercel.json
└── DEPLOYMENT_GUIDE.md (this file)
```

## Deployment Steps

### 1. Backup Current Site
Before deploying, backup your current website files.

### 2. Replace Files
- Replace your current website files with the contents of this directory
- Ensure all new HTML files are in the root directory
- Maintain existing services/ directory structure

### 3. Update Navigation
The navigation has been updated to include:
- about. → /about
- insights. → /blog  
- calm.profile. → /calm-profile
- services. → /services/calm-ops
- start. → calendly link

### 4. Test New Features

#### calm.profile Assessment
- Visit /calm-profile to test the interactive assessment
- Verify email capture works with your Formspree setup
- Test mobile responsiveness

#### About Page
- Visit /about to see your personal story/narrative
- Verify all links and styling work correctly

#### Blog Index
- Visit /blog to see the blog structure
- Newsletter signup should integrate with your email system

### 5. SEO Considerations
- All new pages include proper meta tags and descriptions
- calm.profile page is optimized for "creative productivity assessment" keywords
- About page builds personal authority and trust

## Integration Notes

### Email Capture
- calm.profile uses your existing Formspree endpoint
- Assessment results are sent with detailed user data
- Email nurture sequences can be triggered from assessment completion

### Analytics
- All new pages inherit your existing Google Analytics setup
- Consider adding event tracking for assessment completion
- Monitor conversion rates from assessment to consultation booking

### Content Strategy
- Blog directory is ready for content publication
- calm.profile provides ongoing content opportunities
- About page establishes personal authority and story

## Next Steps After Deployment

1. **Test Everything**
   - Complete the calm.profile assessment yourself
   - Verify all navigation links work
   - Test mobile responsiveness

2. **Content Creation**
   - Write first 3 blog posts using content strategy
   - Create calm.profile promotion content for LinkedIn
   - Develop email sequences for assessment completers

3. **Marketing Activation**
   - Update LinkedIn automation to include calm.profile content
   - Add assessment link to email signatures
   - Share assessment with network for initial feedback

4. **Optimization**
   - Monitor assessment completion rates
   - A/B test assessment questions based on user feedback
   - Optimize conversion from assessment to consultation booking

## Support

If you encounter any issues during deployment:
1. Check that all file paths are correct
2. Verify Formspree integration is working
3. Test on multiple devices and browsers
4. Monitor console for any JavaScript errors

The updated website maintains your existing design system while adding powerful new lead generation and authority-building capabilities through calm.profile and enhanced content structure.

