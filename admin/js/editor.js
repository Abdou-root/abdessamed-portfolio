// Blog Editor JavaScript

let galleryCount = 1;

// Format text in content editor
function formatText(command) {
    const editor = document.getElementById('post-content');
    document.execCommand(command, false, null);
    editor.focus();
    updatePreview();
}

// Insert YouTube video
function insertYouTube() {
    const url = prompt('Enter YouTube URL:');
    if (!url) return;
    
    // Extract video ID from various YouTube URL formats
    let videoId = '';
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            videoId = match[1];
            break;
        }
    }
    
    if (!videoId) {
        alert('Invalid YouTube URL');
        return;
    }
    
    const editor = document.getElementById('post-content');
    const iframe = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    document.execCommand('insertHTML', false, iframe);
    editor.focus();
    updatePreview();
}

// Add gallery image
function addGalleryImage(galleryIndex) {
    const container = document.getElementById(`gallery-${galleryIndex}-images`);
    const imageItem = document.createElement('div');
    imageItem.className = 'gallery-image-item';
    imageItem.innerHTML = `
        <input type="text" placeholder="Image URL" class="gallery-image-src">
        <input type="text" placeholder="Alt text" class="gallery-image-alt">
        <input type="text" placeholder="Caption (optional)" class="gallery-image-caption">
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()">Remove</button>
    `;
    container.appendChild(imageItem);
}

// Add new gallery
function addGallery() {
    const container = document.getElementById('galleries-container');
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item-editor';
    galleryItem.setAttribute('data-gallery-index', galleryCount);
    galleryItem.innerHTML = `
        <h4>Gallery ${galleryCount + 1}</h4>
        <div id="gallery-${galleryCount}-images">
            <div class="gallery-image-item">
                <input type="text" placeholder="Image URL" class="gallery-image-src">
                <input type="text" placeholder="Alt text" class="gallery-image-alt">
                <input type="text" placeholder="Caption (optional)" class="gallery-image-caption">
            </div>
        </div>
        <button type="button" class="btn-add" onclick="addGalleryImage(${galleryCount})">Add Image</button>
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()">Remove Gallery</button>
    `;
    container.appendChild(galleryItem);
    galleryCount++;
}

// Update preview
function updatePreview() {
    const content = document.getElementById('post-content').innerHTML;
    document.getElementById('preview-content').innerHTML = content;
}

// Listen for content changes
document.getElementById('post-content').addEventListener('input', updatePreview);

// Build galleries data
function buildGalleriesData() {
    const galleries = [];
    const galleryEditors = document.querySelectorAll('.gallery-item-editor');
    
    galleryEditors.forEach((editor, index) => {
        const images = [];
        const imageInputs = editor.querySelectorAll('.gallery-image-item');
        
        imageInputs.forEach(item => {
            const src = item.querySelector('.gallery-image-src').value.trim();
            const alt = item.querySelector('.gallery-image-alt').value.trim();
            const caption = item.querySelector('.gallery-image-caption').value.trim();
            
            if (src) {
                images.push({
                    src: src,
                    alt: alt || '',
                    caption: caption || ''
                });
            }
        });
        
        if (images.length > 0) {
            galleries.push({
                id: `gallery-${index}`,
                images: images
            });
        }
    });
    
    return galleries;
}

// Build post data
function buildPostData() {
    const title = document.getElementById('post-title').value.trim();
    const category = document.getElementById('post-category').value;
    const date = document.getElementById('post-date').value;
    const thumbnail = document.getElementById('post-thumbnail').value.trim() || 'assets/img/5.svg';
    const excerpt = document.getElementById('post-excerpt').value.trim();
    const content = document.getElementById('post-content').innerHTML;
    const galleries = buildGalleriesData();
    
    // Extract YouTube videos from content
    const videos = [];
    const iframes = document.getElementById('post-content').querySelectorAll('iframe');
    iframes.forEach(iframe => {
        const src = iframe.src;
        const match = src.match(/youtube\.com\/embed\/([^?]+)/);
        if (match) {
            videos.push({
                type: 'youtube',
                id: match[1],
                title: title
            });
        }
    });
    
    // Get next ID (simple increment from existing posts)
    const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const nextId = existingPosts.length > 0 
        ? Math.max(...existingPosts.map(p => p.id)) + 1 
        : 1;
    
    return {
        id: nextId,
        title: title,
        category: category,
        date: date,
        author: 'Abdessamad',
        thumbnail: thumbnail,
        excerpt: excerpt,
        content: {
            type: 'html',
            body: content
        },
        galleries: galleries,
        videos: videos
    };
}

// Save post to local storage
function savePost() {
    const postData = buildPostData();
    
    if (!postData.title || !postData.date || !postData.excerpt) {
        alert('Please fill in all required fields');
        return;
    }
    
    let posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    posts.push(postData);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    
    alert('Post saved to local storage!');
}

// Export as JSON
function exportJSON() {
    const postData = buildPostData();
    
    if (!postData.title || !postData.date || !postData.excerpt) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Load existing posts from JSON file structure
    const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    existingPosts.push(postData);
    
    const jsonData = {
        posts: existingPosts
    };
    
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blog.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Load existing posts on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('post-date').value = today;
    
    // Load posts from localStorage if available
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
        console.log('Saved posts available in localStorage');
    }
});

