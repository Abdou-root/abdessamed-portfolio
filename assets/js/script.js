
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

/*===== Video Pop Up =====*/
// Generalized event listener for showing video popup
document.querySelectorAll('.player').forEach(button => {
    button.addEventListener('click', function() {
        const videoId = this.getAttribute('data-video-button');
        const videoPopup = document.getElementById(`video-popup-${videoId}`);
        const video = videoPopup.querySelector('video');
        
        // Show loading state
        videoPopup.style.display = 'flex';
        
        // Load video when popup opens
        if (video) {
            video.load();
        }
    });
});

// Generalized event listener for closing video popup
document.querySelectorAll('.close-video-popup').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
        const videoId = this.getAttribute('data-close-button');
        const videoPopup = document.getElementById(`video-popup-${videoId}`);
        const video = videoPopup.querySelector('video');
        videoPopup.style.display = 'none';
        video.pause();
        video.currentTime = 0;
    });
});

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('video-popup')) {
        event.target.style.display = "none";
    }
});
