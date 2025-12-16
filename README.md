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

The EmailJS configuration is already included in the code. EmailJS public keys are **safe to expose** in client-side code - they're designed to be public. Security is handled server-side by EmailJS through:

- Rate limiting
- Domain restrictions (configured in EmailJS dashboard)
- Template validation

If you need to change the EmailJS keys, update them in:
- `index.html` (line ~765): `publicKey` in `emailjs.init()`
- `assets/js/script.js` (line ~373): `serviceId` and `templateId` in `sendMail()` function

### Blog System

- Blog posts are stored in `assets/data/blog.json`
- Use the blog editor at `admin/blog-editor.html` to create and manage posts
  - **Password Protected**: The editor requires a password (default: `admin123`)
  - **Change Password**: Edit `admin/js/editor.js` and change the `EDITOR_PASSWORD` constant
  - **Security Note**: For production, consider excluding the `admin/` folder from deployment or implementing server-side authentication
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
