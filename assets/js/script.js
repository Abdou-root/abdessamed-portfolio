
/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close")

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add("show-menu")
    })
}
/*============== MENU HIDDEN ===============*/
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove("show-menu")
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll(".nav-link")

function linkAction() {
    const navMenu = document.getElementById("nav-menu")
    // when you click on a link, we hide the sidebar
    navMenu.classList.remove("show-menu")
}

navLinks.forEach(n => n.addEventListener('click', linkAction))
/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById("header")
    if (this.scrollY >= 80) header.classList.add("scroll-header"); else header.classList.remove("scroll-header")
}

window.addEventListener("scroll", scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    let scrollY = window.pageYOffset;
    const headerHeight = document.getElementById("header").offsetHeight;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - headerHeight - 50;
        const sectionId = current.getAttribute("id");
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active from all links first
            document.querySelectorAll(".nav-link").forEach(link => {
                link.classList.remove("active-link");
            });
            // Add active to current section's link
            const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add("active-link");
            }
        }
    });
}

/*=============== PORTFOLIO ITEM FILTER ===============*/
const filterContainer = document.querySelector(".portfolio-filter-inner"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    totalPortfolioItem = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
    filterBtns[i].addEventListener("click", function () {
        filterContainer.querySelector(".active").classList.remove("active");
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");
        for (let k = 0; k < totalPortfolioItem; k++) {
            if (filterValue === portfolioItems[k].getAttribute("data-category")) {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
            else {
                portfolioItems[k].classList.add("hide");
                portfolioItems[k].classList.remove("show");
            }
            if (filterValue === "all") {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
        }
    })
}


/*=============== THEME/DISPLAY CUSTOMIZATION ===============*/
const theme = document.querySelector("#theme-button");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll(".choose-size span");
const colorPalette = document.querySelectorAll(".choose-color span");
var root = document.querySelector(":root");
const bg1 = document.querySelector(".bg-1");
const bg2 = document.querySelector(".bg-2");
const bg3 = document.querySelector(".bg-3");




// open palette
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}
// close palette
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
}
theme.addEventListener("click", openThemeModal);
themeModal.addEventListener("click", closeThemeModal);

/*===== FONTS =====*/

// Load saved font size
function loadFontSize() {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.querySelector('html').style.fontSize = savedFontSize;
        // Set active state
        fontSizes.forEach(size => {
            size.classList.remove('active');
            if ((savedFontSize === '12px' && size.classList.contains('font-size-1')) ||
                (savedFontSize === '14px' && size.classList.contains('font-size-2')) ||
                (savedFontSize === '16px' && size.classList.contains('font-size-3')) ||
                (savedFontSize === '18px' && size.classList.contains('font-size-4'))) {
                size.classList.add('active');
            }
        });
    }
}

// remove active from the font size class
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove("active");
    })
}
fontSizes.forEach(size => {
    size.addEventListener('click', () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');
        if (size.classList.contains('font-size-1')) {
            fontSize = '12px';
        }
        else if (size.classList.contains('font-size-2')) {
            fontSize = '14px';
        }
        else if (size.classList.contains('font-size-3')) {
            fontSize = '16px';
        }
        else if (size.classList.contains('font-size-4')) {
            fontSize = '18px';
        }
        document.querySelector('html').style.fontSize = fontSize;
        localStorage.setItem('fontSize', fontSize);
    })
})

// Load font size on page load
loadFontSize();

/*===== PRIMARY COLORS =====*/
// Load saved color
function loadColor() {
    const savedHue = localStorage.getItem('primaryColorHue');
    if (savedHue) {
        root.style.setProperty('--primary-color-hue', savedHue);
        // Set active state
        colorPalette.forEach(color => {
            color.classList.remove('active');
            const hue = getHueFromColorClass(color);
            if (hue && parseInt(hue) === parseInt(savedHue)) {
                color.classList.add('active');
            }
        });
    }
}

function getHueFromColorClass(color) {
    if (color.classList.contains("color-1")) return 252;
    if (color.classList.contains("color-2")) return 52;
    if (color.classList.contains("color-3")) return 352;
    if (color.classList.contains("color-4")) return 152;
    if (color.classList.contains("color-5")) return 202;
    return null;
}

// remove active class from colors
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primaryHue;
        changeActiveColorClass();

        if (color.classList.contains("color-1")) {
            primaryHue = 252;
        }
        else if (color.classList.contains("color-2")) {
            primaryHue = 52;
        }
        else if (color.classList.contains("color-3")) {
            primaryHue = 352;
        }
        else if (color.classList.contains("color-4")) {
            primaryHue = 152;
        }
        else if (color.classList.contains("color-5")) {
            primaryHue = 202;
        }
        color.classList.add("active");
        root.style.setProperty('--primary-color-hue', primaryHue);
        localStorage.setItem('primaryColorHue', primaryHue);
    })
})

// Load color on page load
loadColor();
/*===== THEME BACKGROUNDS =====*/
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// change background level
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);

}
// Load saved background
function loadBackground() {
    const savedBg = localStorage.getItem('backgroundTheme');
    if (savedBg === 'bg-1') {
        lightColorLightness = '92%';
        whiteColorLightness = '100%';
        darkColorLightness = '17%';
        bg1.classList.add('active');
        bg2.classList.remove('active');
        bg3.classList.remove('active');
        changeBG();
    } else if (savedBg === 'bg-2') {
        darkColorLightness = '95%';
        whiteColorLightness = '20%';
        lightColorLightness = '15%';
        bg2.classList.add('active');
        bg1.classList.remove('active');
        bg3.classList.remove('active');
        changeBG();
    } else if (savedBg === 'bg-3') {
        darkColorLightness = '95%';
        whiteColorLightness = '10%';
        lightColorLightness = '0%';
        bg3.classList.add('active');
        bg1.classList.remove('active');
        bg2.classList.remove('active');
        changeBG();
    }
}

bg1.addEventListener('click', () => {
    lightColorLightness = '92%';
    whiteColorLightness = '100%';
    darkColorLightness = '17%';
    
    // add active
    bg1.classList.add('active');
    bg2.classList.remove('active');
    bg3.classList.remove('active');
    changeBG();
    localStorage.setItem('backgroundTheme', 'bg-1');
})
bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // add active
    bg2.classList.add('active');
    bg1.classList.remove('active');
    bg3.classList.remove('active');
    changeBG();
    localStorage.setItem('backgroundTheme', 'bg-2');
})

bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // add active
    bg3.classList.add('active');
    bg1.classList.remove('active');
    bg2.classList.remove('active');
    changeBG();
    localStorage.setItem('backgroundTheme', 'bg-3');
})

// Load background on page load
loadBackground();

/*===== Project Modal & Gallery =====*/
const projectData = {
    chessai: {
        title: "ChessAI",
        description: "A fully functional chess game with an AI opponent powered by the Minimax algorithm with alpha-beta pruning. Features include move validation, check/checkmate detection, and adjustable AI difficulty levels.",
        tags: ["Python", "Pygame", "AI", "Minimax"],
        github: "https://github.com/Abdou-root/Chess-AI",
        images: [
            "assets/img/projects/chessai/1.png",
            "assets/img/projects/chessai/2.png",
            "assets/img/projects/chessai/3.png",
            "assets/img/projects/chessai/4.png"
        ]
    },
    reconai: {
        title: "ReconAI",
        description: "An AI-powered facial recognition system using deep learning and computer vision techniques. Implements face detection, feature extraction, and real-time identification with high accuracy.",
        tags: ["Python", "OpenCV", "Deep Learning", "TensorFlow"],
        github: "https://github.com/Abdou-root/ReconAI",
        images: [
            "assets/img/projects/reconai/1.png",
            "assets/img/projects/reconai/2.png",
            "assets/img/projects/reconai/3.png",
            "assets/img/projects/reconai/4.png"
        ]
    },
    tastify: {
        title: "Tastify",
        description: "A recipe discovery web application that helps users find recipes based on available ingredients. Features include search functionality, recipe filtering, nutritional information, and a clean, responsive UI.",
        tags: ["JavaScript", "HTML/CSS", "API Integration", "Responsive Design"],
        github: "https://github.com/Abdou-root/Tastify",
        images: [
            "assets/img/projects/tastify/1.png",
            "assets/img/projects/tastify/2.png",
            "assets/img/projects/tastify/3.png",
            "assets/img/projects/tastify/4.png"
        ]
    },
    dzbrothers: {
        title: "DzBrothers",
        description: "A full-stack web application connecting the Algerian community. Features user authentication, real-time messaging, event management, and a modern responsive interface.",
        tags: ["React", "Node.js", "MongoDB", "Express"],
        github: "https://github.com/Abdou-root/DzBrothers",
        images: [
            "assets/img/projects/dzbrothers/1.png",
            "assets/img/projects/dzbrothers/2.png",
            "assets/img/projects/dzbrothers/3.png",
            "assets/img/projects/dzbrothers/4.png"
        ]
    },
    repolens: {
        title: "RepoLens",
        description: "An AI-powered GitHub repository analyzer that uses LLMs to provide intelligent insights about codebases. Analyzes code structure, documentation quality, and suggests improvements.",
        tags: ["Python", "LLM", "GitHub API", "NLP"],
        github: "https://github.com/Abdou-root/RepoLens",
        images: [
            "assets/img/projects/repolens/1.png",
            "assets/img/projects/repolens/2.png",
            "assets/img/projects/repolens/3.png",
            "assets/img/projects/repolens/4.png"
        ]
    }
};

const projectModal = document.getElementById('project-modal');
const modalTitle = projectModal.querySelector('.project-modal-title');
const modalDescription = projectModal.querySelector('.project-modal-description');
const modalTags = projectModal.querySelector('.project-modal-tags');
const modalGithub = projectModal.querySelector('.project-modal-github');
const galleryImage = projectModal.querySelector('.gallery-image');
const galleryDots = projectModal.querySelector('.gallery-dots');
const galleryPrev = projectModal.querySelector('.gallery-prev');
const galleryNext = projectModal.querySelector('.gallery-next');
const modalClose = projectModal.querySelector('.project-modal-close');

let currentProject = null;
let currentImageIndex = 0;

// Open modal
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const project = projectData[projectId];

        if (project) {
            currentProject = project;
            currentImageIndex = 0;

            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalGithub.href = project.github;

            // Set tags
            modalTags.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');

            // Set gallery
            updateGallery();

            // Create dots
            galleryDots.innerHTML = project.images.map((_, i) =>
                `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
            ).join('');

            // Add dot click listeners
            galleryDots.querySelectorAll('.dot').forEach(dot => {
                dot.addEventListener('click', function() {
                    currentImageIndex = parseInt(this.getAttribute('data-index'));
                    updateGallery();
                });
            });

            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Update gallery image and dots
function updateGallery() {
    if (currentProject && currentProject.images.length > 0) {
        galleryImage.src = currentProject.images[currentImageIndex];
        galleryImage.alt = `${currentProject.title} screenshot ${currentImageIndex + 1}`;

        galleryDots.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentImageIndex);
        });
    }
}

// Gallery navigation
galleryPrev.addEventListener('click', function() {
    if (currentProject) {
        currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
        updateGallery();
    }
});

galleryNext.addEventListener('click', function() {
    if (currentProject) {
        currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
        updateGallery();
    }
});

// Close modal
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    currentProject = null;
}

modalClose.addEventListener('click', closeProjectModal);

projectModal.addEventListener('click', function(e) {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (!projectModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeProjectModal();
    } else if (e.key === 'ArrowLeft') {
        galleryPrev.click();
    } else if (e.key === 'ArrowRight') {
        galleryNext.click();
    }
});
