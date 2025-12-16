/*=============== BLOG FUNCTIONALITY ===============*/

let blogPosts = [];

// Load blog posts from JSON
async function loadBlogPosts() {
    try {
        const response = await fetch('assets/data/blog.json');
        const data = await response.json();
        blogPosts = data.posts;
        renderBlogPosts();
    } catch (error) {
        console.error('Error loading blog posts:', error);
        document.getElementById('blog-container').innerHTML = 
            '<p style="text-align: center; color: var(--color-gray);">Unable to load blog posts.</p>';
    }
}

// Render blog posts
function renderBlogPosts() {
    const container = document.getElementById('blog-container');
    container.innerHTML = '';
    
    blogPosts.forEach(post => {
        const blogItem = createBlogCard(post);
        container.appendChild(blogItem);
    });
}

// Create blog card element
function createBlogCard(post) {
    const blogItem = document.createElement('div');
    blogItem.className = 'blog-item padd-15';
    
    const date = new Date(post.date);
    const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    
    blogItem.innerHTML = `
        <div class="inner">
            <div class="thumb">
                <span class="category">${post.category}</span>
                <img src="${post.thumbnail}" alt="${post.title}">
            </div>
            <div class="details">
                <h3 class="title">
                    <a href="#" class="blog-post-link" data-post-id="${post.id}">${post.title}</a>
                </h3>
                <ul class="meta">
                    <li>${formattedDate}</li>
                    <li>${post.author}</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add click handler
    const link = blogItem.querySelector('.blog-post-link');
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openBlogPost(post.id);
    });
    
    return blogItem;
}

// Open blog post in modal
function openBlogPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    const modal = document.getElementById('blog-modal');
    const modalBody = document.getElementById('blog-modal-body');
    
    // Format date
    const date = new Date(post.date);
    const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    
    // Calculate reading time (average 200 words per minute)
    const wordCount = post.content.body.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    // Build content HTML
    let contentHTML = `
        <article class="blog-post">
            <header class="blog-post-header">
                <span class="blog-post-category">${post.category}</span>
                <h1 class="blog-post-title">${post.title}</h1>
                <div class="blog-post-meta">
                    <span><i class="lni lni-calendar"></i> ${formattedDate}</span>
                    <span><i class="lni lni-user"></i> ${post.author}</span>
                    <span><i class="lni lni-timer"></i> ${readingTime} min read</span>
                </div>
            </header>
            <div class="blog-post-content">
                ${post.content.body}
            </div>
    `;
    
    // Add galleries
    if (post.galleries && post.galleries.length > 0) {
        post.galleries.forEach((gallery, galleryIndex) => {
            contentHTML += `<div class="blog-gallery" data-gallery-id="${gallery.id || galleryIndex}">`;
            gallery.images.forEach((image, imageIndex) => {
                contentHTML += `
                    <div class="gallery-item" data-image-index="${imageIndex}">
                        <img src="${image.src}" alt="${image.alt || ''}" loading="lazy">
                        ${image.caption ? `<p class="gallery-caption">${image.caption}</p>` : ''}
                    </div>
                `;
            });
            contentHTML += `
                <div class="gallery-controls">
                    <button class="gallery-prev" aria-label="Previous image">‹</button>
                    <div class="gallery-counter"><span class="current">1</span> / <span class="total">${gallery.images.length}</span></div>
                    <button class="gallery-next" aria-label="Next image">›</button>
                </div>
            </div>`;
        });
    }
    
    // Add videos
    if (post.videos && post.videos.length > 0) {
        post.videos.forEach(video => {
            if (video.type === 'youtube') {
                contentHTML += `
                    <div class="blog-video">
                        <div class="video-wrapper">
                            <iframe 
                                src="https://www.youtube.com/embed/${video.id}" 
                                title="${video.title || 'Video'}"
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                loading="lazy">
                            </iframe>
                        </div>
                    </div>
                `;
            }
        });
    }
    
    contentHTML += `</article>`;
    
    modalBody.innerHTML = contentHTML;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Initialize gallery functionality
    initializeGalleries();
    
    // Scroll to top of modal
    modalBody.scrollTop = 0;
}

// Initialize gallery carousels
function initializeGalleries() {
    document.querySelectorAll('.blog-gallery').forEach(gallery => {
        const items = gallery.querySelectorAll('.gallery-item');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        const currentSpan = gallery.querySelector('.gallery-counter .current');
        const totalSpan = gallery.querySelector('.gallery-counter .total');
        let currentIndex = 0;
        
        if (items.length <= 1) {
            gallery.querySelector('.gallery-controls').style.display = 'none';
            return;
        }
        
        totalSpan.textContent = items.length;
        
        function showImage(index) {
            items.forEach((item, i) => {
                item.style.display = i === index ? 'block' : 'none';
            });
            currentSpan.textContent = index + 1;
            currentIndex = index;
        }
        
        prevBtn.addEventListener('click', () => {
            const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
            showImage(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
            showImage(newIndex);
        });
        
        // Show first image
        showImage(0);
    });
}

// Close blog modal
function closeBlogModal() {
    const modal = document.getElementById('blog-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Event listeners for modal
function initializeBlogModal() {
    const modal = document.getElementById('blog-modal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.blog-modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeBlogModal);
    }
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBlogModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeBlogModal();
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeBlogModal();
        loadBlogPosts();
    });
} else {
    initializeBlogModal();
    loadBlogPosts();
}

