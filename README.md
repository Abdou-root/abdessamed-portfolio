# Abdessamad Grine - Portfolio Website

Personal portfolio website built with HTML, CSS, and JavaScript. Features a responsive design, theme customization, project showcase, blog system, and contact form.

## Features

- **Responsive Design**: Mobile-first approach with smooth animations
- **Theme Customization**: Customizable colors, font sizes, and background themes (persisted in localStorage)
- **Project Portfolio**: Filterable project showcase with video demos
- **Blog System**: Dynamic blog with rich content support (images, galleries, YouTube embeds)
- **Contact Form**: EmailJS integration for contact form submissions
- **Accessibility**: ARIA labels, keyboard navigation, skip-to-content link
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, structured data

## Setup

### EmailJS Configuration

1. Create a `config.js` file in the root directory:
```javascript
const EMAILJS_CONFIG = {
    publicKey: "YOUR_PUBLIC_KEY",
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID"
};
```

2. The `config.js` file is already in `.gitignore` to prevent committing sensitive keys.

3. If `config.js` is not found, the site will fall back to hardcoded values (not recommended for production).

### Blog System

- Blog posts are stored in `assets/data/blog.json`
- Use the blog editor at `admin/blog-editor.html` to create and manage posts
- The editor allows you to:
  - Write HTML content with a simple toolbar
  - Add image galleries
  - Embed YouTube videos
  - Export posts as JSON

### Local Development

Simply open `index.html` in a web browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

## File Structure

```
abdessamed-portfolio/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── data/
│   │   └── blog.json
│   ├── img/
│   ├── js/
│   │   ├── blog.js
│   │   └── script.js
│   └── videos/
├── admin/
│   ├── blog-editor.html
│   └── js/
│       └── editor.js
├── config.js (create this file)
├── index.html
└── README.md
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Personal portfolio project - All rights reserved.
