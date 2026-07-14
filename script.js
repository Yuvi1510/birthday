// ==================== 🎨 CUSTOMIZABLE VARIABLES 🎨 ====================

// Birthday message sequence (appears one by one)
const BIRTHDAY_MESSAGES = ["", "3", "2", "1", "Happy", "Birthday", "To", "You!", "Yuvraj"];

// ==================== IMAGE PATH VARIABLES ====================
// You can change these to different images or keep them the same
const IMAGE_ALBUM_PAGE_1 = 'image.jpg';      // Album page 1 right side
const IMAGE_ALBUM_PAGE_2_LEFT = 'image.jpg'; // Album page 2 left side
const IMAGE_ALBUM_PAGE_2_RIGHT = 'image.jpg';// Album page 2 right side
const IMAGE_ALBUM_PAGE_3_LEFT = 'image.jpg'; // Album page 3 left side
const IMAGE_ALBUM_PAGE_3_RIGHT = 'image.jpg';// Album page 3 right side
const IMAGE_ALBUM_PAGE_4_LEFT = 'image.jpg'; // Album page 4 left side
const IMAGE_ALBUM_PAGE_4_RIGHT = 'image.jpg';// Album page 4 right side
const IMAGE_ALBUM_PAGE_5_LEFT = 'image.jpg'; // Album page 5 left side

const IMAGE_HEART_CARDS = 'image.jpg';       // All heart animation cards

// Alternative: You can also use an array for different heart images
const HEART_IMAGE_ARRAY = [
    'image.jpg',
    'image.jpg',
    'image.jpg'
];

// ==================== ALBUM PAGES CONFIGURATION ====================
const ALBUM_PAGES = [
    { left: { type: 'text', content: { title: '🎉 Happy Birthday!', description: 'Wishing you endless joy and happiness.' } }, 
      right: { type: 'image', src: IMAGE_ALBUM_PAGE_1, caption: '🎂 May your life be filled\nwith love and laughter.' } },
    
    { left: { type: 'image', src: IMAGE_ALBUM_PAGE_2_LEFT, caption: '🌸 May love, peace, and prosperity always\nsurround you.' }, 
      right: { type: 'image', src: IMAGE_ALBUM_PAGE_2_RIGHT, caption: '🌟 May all your dreams come true.' } },
    
    { left: { type: 'image', src: IMAGE_ALBUM_PAGE_3_LEFT, caption: '💖 Wishing you good health and lasting happiness.' }, 
      right: { type: 'image', src: IMAGE_ALBUM_PAGE_3_RIGHT, caption: '🌸 May God bless you every single day.' } },
    
    { left: { type: 'image', src: IMAGE_ALBUM_PAGE_4_LEFT, caption: '✨ Keep smiling and shining wherever you go.' }, 
      right: { type: 'image', src: IMAGE_ALBUM_PAGE_4_RIGHT, caption: '🌈 May success follow you in everything you do.' } },
    
    { left: { type: 'image', src: IMAGE_ALBUM_PAGE_5_LEFT, caption: '🌹 Stay blessed, stay kind, and stay amazing.' }, 
      right: { type: 'text', content: { title: '❤️ Happy Birthday!', description: 'Have a wonderful year ahead. 🎊' } } }
];

// ==================== FINAL CELEBRATION MESSAGES ====================
const FINAL_TITLE = "🎉 Happy Birthday Yuvraj! 🎉";
const FINAL_SUBTITLE = "Wishing you a long, healthy,\nwealthy and happy life🎊💝";

// ==================== HEART ANIMATION SETTINGS ====================
const HEART_SETTINGS = {
    smallPhone: { dotSize: 35, scale: 6, outlinePoints: 80 },     // < 480px - outline only
    mediumPhone: { dotSize: 40, scale: 7, outlinePoints: 100 },   // 480-768px - outline only
    tablet: { dotSize: 50, scale: 9, outlinePoints: 120 },        // 768-1024px - outline only
    desktop: { dotSize: 60, scale: 11, outlinePoints: 140 }       // > 1024px - outline only
};

// Margin between heart and message (in pixels)
const HEART_MESSAGE_MARGIN = 80; // Adjust this value to increase/decrease space

// ==================== ANIMATION TIMING ====================
const TIMING = {
    messageDelay: 1000,           // Delay between messages
    lastPageDelay: 1000,          // Delay before heart animation on last page
    cardAnimationDelay: 4,        // Delay between each card (lower = faster)
    heartFormDelay: 400,          // Delay before heart starts forming
    messageFadeOut: 1000          // Time for message to fade out
};

// ==================== CONFETTI SETTINGS ====================
const CONFETTI_SETTINGS = {
    smallPhone: 80,    // Number of confetti particles on small phones
    default: 150       // Number on larger screens
};

// ==================== END OF CUSTOMIZABLE VARIABLES ====================

const playBtn = document.getElementById("playMusicBtn");
const music = document.getElementById("backgroundMusic");

playBtn.addEventListener("click", () => {
    playBtn.style.display = "none"; // Hide the button after clicking
    startBirthdayMessages();
});

const  startBirthdayMessages = () => {

// ===== BIRTHDAY MESSAGE CODE =====
BIRTHDAY_MESSAGES.forEach((value, index) => {
    setTimeout(() => {
        document.getElementById("message").innerText = value;
        if (index === 4) {
            music.play();
        }
    }, index * TIMING.messageDelay);
});

// ===== FALLING HEARTS CODE =====
let heartInterval;
let isRunning = true;

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    const hearts = ['❤️', '💖', '💗', '💓', '💕', '💝', '💘', '♥️'];
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + 'px';
    
    const leftPosition = Math.random() * 100;
    heart.style.left = leftPosition + '%';
    
    const duration = Math.random() * 5 + 3;
    heart.style.animationDuration = duration + 's';
    
    const delay = Math.random() * 2;
    heart.style.animationDelay = delay + 's';
    
    heart.style.opacity = Math.random() * 0.7 + 0.3;
    heart.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    return heart;
}

function addHeart() {
    const container = document.getElementById('heartsContainer');
    const heart = createHeart();
    container.appendChild(heart);
    
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

function startHearts() {
    if (heartInterval) clearInterval(heartInterval);
    isRunning = true;
    heartInterval = setInterval(() => {
        if (isRunning) {
            const heartsToAdd = Math.random() * 3 + 2;
            for (let i = 0; i < heartsToAdd; i++) {
                addHeart();
            }
        }
    }, 200);
}

startHearts();

// ===== ALBUM CODE =====
let currentPage = 0;
let isAnimating = false;
let albumInitialized = false;
let animationTriggered = false;

function updateAlbum() {
    const leftPage = document.getElementById('leftPage');
    const rightPage = document.getElementById('rightPage');
    const pageNumber = document.getElementById('pageNumber');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    const pageData = ALBUM_PAGES[currentPage];
    
    if (pageData.left.type === 'image') {
        leftPage.querySelector('.page-content').innerHTML = `
            <img src="${pageData.left.src}" alt="Memory" loading="lazy">
            <p>${pageData.left.caption}</p>
        `;
    } else {
        leftPage.querySelector('.page-content').innerHTML = `
            <h2>${pageData.left.content.title}</h2>
            <p style="white-space: pre-line;">${pageData.left.content.description}</p>
        `;
    }
    
    if (pageData.right.type === 'image') {
        rightPage.querySelector('.page-content').innerHTML = `
            <img src="${pageData.right.src}" alt="Memory" loading="lazy">
            <p>${pageData.right.caption}</p>
        `;
    } else {
        rightPage.querySelector('.page-content').innerHTML = `
            <h2>${pageData.right.content.title}</h2>
            <p style="white-space: pre-line;">${pageData.right.content.description}</p>
        `;
    }
    
    pageNumber.textContent = `Page ${currentPage + 1} of ${ALBUM_PAGES.length}`;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === ALBUM_PAGES.length - 1;
}

function nextPage() {
    if (isAnimating || currentPage >= ALBUM_PAGES.length - 1) return;
    
    isAnimating = true;
    const rightPage = document.getElementById('rightPage');
    rightPage.style.transform = 'rotateY(-180deg)';
    
    setTimeout(() => {
        currentPage++;
        updateAlbum();
        
        setTimeout(() => {
            rightPage.style.transform = 'rotateY(0deg)';
            setTimeout(() => {
                isAnimating = false;
                
                if (currentPage === ALBUM_PAGES.length - 1 && !animationTriggered) {
                    setTimeout(() => {
                        if (!animationTriggered) {
                            createGlowingStackedHeart();
                            animationTriggered = true;
                        }
                    }, TIMING.lastPageDelay);
                }
            }, 100);
        }, 50);
    }, 300);
}

function prevPage() {
    if (isAnimating || currentPage <= 0) return;
    
    isAnimating = true;
    const leftPage = document.getElementById('leftPage');
    leftPage.style.transform = 'rotateY(180deg)';
    
    setTimeout(() => {
        currentPage--;
        updateAlbum();
        
        setTimeout(() => {
            leftPage.style.transform = 'rotateY(0deg)';
            setTimeout(() => {
                isAnimating = false;
            }, 100);
        }, 50);
    }, 300);
}

// ===== HEART OUTLINE ONLY ANIMATION WITH MESSAGE ABOVE =====
function createGlowingStackedHeart() {
    const albumContainer = document.querySelector('.album-container');
    albumContainer.style.transition = 'opacity 0.5s ease';
    albumContainer.style.opacity = '0';
    
    setTimeout(() => {
        albumContainer.style.display = 'none';
        
        const overlay = document.createElement('div');
        overlay.id = 'heartShapeOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 100;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);
        
        // Add final message ABOVE the heart with margin
        const finalMessageContainer = document.createElement('div');
        finalMessageContainer.className = 'final-message-container';
        finalMessageContainer.style.marginBottom = `${HEART_MESSAGE_MARGIN}px`;
        finalMessageContainer.innerHTML = `
            <div style="text-align: center; color: white;">
                <h1 style="font-size: clamp(28px, 7vw, 55px); margin-bottom: 15px; animation: pulse 1s ease infinite;">
                    ${FINAL_TITLE}
                </h1>
                <p style="font-size: clamp(16px, 4vw, 28px); animation: fadeInUp 0.8s ease;">
                    ${FINAL_SUBTITLE}
                </p>
            </div>
        `;
        overlay.appendChild(finalMessageContainer);
        
        // Responsive sizing - OUTLINE ONLY (no inner points)
        const updateHeartSize = () => {
            const screenWidth = window.innerWidth;
            
            if (screenWidth < 480) {
                return HEART_SETTINGS.smallPhone;
            } else if (screenWidth < 768) {
                return HEART_SETTINGS.mediumPhone;
            } else if (screenWidth < 1024) {
                return HEART_SETTINGS.tablet;
            } else {
                return HEART_SETTINGS.desktop;
            }
        };
        
        let { dotSize, scale, outlinePoints } = updateHeartSize();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2 + 30; // Slightly lower to make room for message above
        
        // Generate ONLY outline points (no inner points)
        const generateHeartOutline = (centerX, centerY, scale, outlinePoints) => {
            const points = [];
            const step = (2 * Math.PI) / outlinePoints;
            
            // Only the outline of the heart - no inner points
            for (let t = 0; t <= 2 * Math.PI; t += step) {
                const x = 16 * Math.pow(Math.sin(t), 3);
                const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t);
                
                points.push({
                    x: centerX + x * scale,
                    y: centerY - y * scale
                });
            }
            
            return points;
        };
        
        let heartPoints = generateHeartOutline(centerX, centerY, scale, outlinePoints);
        let photoCards = [];
        
        const createCards = () => {
            photoCards.forEach(card => card.element.remove());
            photoCards = [];
            
            heartPoints.forEach((point, index) => {
                const card = document.createElement('div');
                const img = document.createElement('img');
                
                // Use image from array or single image
                if (HEART_IMAGE_ARRAY.length > 1) {
                    img.src = HEART_IMAGE_ARRAY[index % HEART_IMAGE_ARRAY.length];
                } else {
                    img.src = IMAGE_HEART_CARDS;
                }
                
                img.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 10px;
                `;
                
                img.onerror = function() {
                    this.src = 'https://via.placeholder.com/60x60/ff7a9b/ffffff?text=❤️';
                };
                
                card.appendChild(img);
                
                const randomRotate = (Math.random() * 12) - 6;
                const randomZIndex = Math.floor(Math.random() * 50) + 10;
                const randomOffsetX = (Math.random() - 0.5) * 12;
                const randomOffsetY = (Math.random() - 0.5) * 12;
                const randomScale = 0.85 + Math.random() * 0.3;
                
                card.style.cssText = `
                    position: fixed;
                    width: ${dotSize}px;
                    height: ${dotSize}px;
                    opacity: 0;
                    transition: all 0.7s cubic-bezier(0.34, 1.2, 0.64, 1);
                    z-index: ${randomZIndex};
                    pointer-events: none;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 2px solid rgba(255, 255, 255, 0.9);
                    box-shadow: 0 0 15px rgba(255, 100, 150, 0.6);
                    transform: scale(0) rotate(${randomRotate}deg);
                `;
                
                card.style.left = Math.random() * window.innerWidth + 'px';
                card.style.top = Math.random() * window.innerHeight + 'px';
                
                overlay.appendChild(card);
                
                photoCards.push({
                    element: card,
                    targetX: point.x - dotSize/2 + randomOffsetX,
                    targetY: point.y - dotSize/2 + randomOffsetY,
                    finalRotate: (Math.random() * 8) - 4,
                    finalScale: randomScale,
                    delay: index * TIMING.cardAnimationDelay
                });
            });
            
            // Animate to heart shape
            photoCards.forEach((card) => {
                setTimeout(() => {
                    if (card.element) {
                        card.element.style.left = card.targetX + 'px';
                        card.element.style.top = card.targetY + 'px';
                        card.element.style.opacity = '0.95';
                        card.element.style.transform = `scale(${card.finalScale}) rotate(${card.finalRotate}deg)`;
                    }
                }, card.delay);
            });
        };
        
        createCards();
        
        // Handle resize
        const handleResize = () => {
            const newSizes = updateHeartSize();
            dotSize = newSizes.dotSize;
            scale = newSizes.scale;
            const newCenterX = window.innerWidth / 2;
            const newCenterY = window.innerHeight / 2 + 30;
            
            heartPoints = generateHeartOutline(newCenterX, newCenterY, scale, newSizes.outlinePoints);
            
            photoCards.forEach((card, idx) => {
                const point = heartPoints[idx % heartPoints.length];
                if (point && card.element) {
                    const randomOffsetX = (Math.random() - 0.5) * 12;
                    const randomOffsetY = (Math.random() - 0.5) * 12;
                    card.targetX = point.x - dotSize/2 + randomOffsetX;
                    card.targetY = point.y - dotSize/2 + randomOffsetY;
                    
                    card.element.style.width = `${dotSize}px`;
                    card.element.style.height = `${dotSize}px`;
                    card.element.style.left = card.targetX + 'px';
                    card.element.style.top = card.targetY + 'px';
                }
            });
        };
        
        window.addEventListener('resize', handleResize);
        
        // Confetti after heart forms
        const totalDelay = heartPoints.length * TIMING.cardAnimationDelay + 500;
        setTimeout(() => {
            const confettiCount = window.innerWidth < 768 ? CONFETTI_SETTINGS.smallPhone : CONFETTI_SETTINGS.default;
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                const colors = ['#ff69b4', '#ffb6c1', '#ff1493', '#ff7a9b', '#ffd27d'];
                confetti.style.cssText = `
                    position: fixed;
                    width: ${Math.random() * 8 + 4}px;
                    height: ${Math.random() * 8 + 4}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${window.innerWidth / 2}px;
                    top: ${window.innerHeight / 2}px;
                    z-index: 201;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                `;
                overlay.appendChild(confetti);
                
                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * 10 + 5;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                confetti.animate([
                    { transform: `translate(0, 0)`, opacity: 1 },
                    { transform: `translate(${vx * 30}px, ${vy * 30}px)`, opacity: 0 }
                ], {
                    duration: (Math.random() * 1200) + 800,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    fill: 'forwards'
                });
            }
        }, totalDelay);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); text-shadow: 0 0 20px rgba(255,255,255,0.6); }
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translate(-50%, 20%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, 0);
                }
            }
        `;
        document.head.appendChild(style);
        
    }, TIMING.heartFormDelay);
}

function showAlbum() {
    const albumContainer = document.querySelector('.album-container');
    albumContainer.style.display = 'flex';
    albumContainer.style.opacity = '0';
    albumContainer.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        albumContainer.style.transition = 'all 0.5s ease-out';
        albumContainer.style.opacity = '1';
        albumContainer.style.transform = 'scale(1)';
    }, 100);
    
    if (!albumInitialized) {
        updateAlbum();
        document.getElementById('prevBtn').addEventListener('click', prevPage);
        document.getElementById('nextBtn').addEventListener('click', nextPage);
        albumInitialized = true;
    }
}

function hideAlbumInitially() {
    const albumContainer = document.querySelector('.album-container');
    albumContainer.style.display = 'none';
}

const totalMessageDuration = BIRTHDAY_MESSAGES.length * TIMING.messageDelay;
const albumShowDelay = totalMessageDuration + TIMING.messageDelay;

hideAlbumInitially();

setTimeout(() => {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, TIMING.messageFadeOut);
    }
    showAlbum();
}, albumShowDelay);
}