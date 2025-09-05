// Ethiopian New Year Countdown and Interactive Features

// Set the target date for Ethiopian New Year 2024 (September 11, 2024)
const targetDate = new Date('2024-09-11T00:00:00').getTime();

// Update countdown every second
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Update the countdown display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // New Year has arrived!
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Show celebration message
        showCelebrationMessage();
    }
}

// Show celebration message when New Year arrives
function showCelebrationMessage() {
    const countdownContainer = document.querySelector('.countdown-container');
    countdownContainer.innerHTML = `
        <div class="celebration-message">
            <h2>🎉 Happy Ethiopian New Year! 🎉</h2>
            <p>እንኳን ለአዲሱ ዓመት በዓል አደረሰዎ!</p>
            <p>May this new year bring you joy, prosperity, and peace!</p>
        </div>
    `;
    
    // Add celebration styles
    const style = document.createElement('style');
    style.textContent = `
        .celebration-message {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.3);
            animation: celebrationPulse 2s infinite;
        }
        
        .celebration-message h2 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .celebration-message p {
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: white;
        }
        
        @keyframes celebrationPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
}

// Calculate and display current Ethiopian year
function updateEthiopianYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Ethiopian calendar starts in September, so we need to adjust
    const ethiopianYear = currentDate.getMonth() >= 8 ? currentYear - 7 : currentYear - 8;
    
    const yearElement = document.getElementById('ethiopian-year');
    if (yearElement) {
        yearElement.textContent = ethiopianYear;
    }
}

// Add floating animation to tradition cards
function addFloatingAnimation() {
    const cards = document.querySelectorAll('.tradition-card, .calendar-fact, .greeting-card');
    
    cards.forEach((card, index) => {
        // Add random floating animation
        const delay = index * 0.2;
        const duration = 3 + Math.random() * 2; // 3-5 seconds
        
        card.style.animation = `float 4s ease-in-out infinite`;
        card.style.animationDelay = `${delay}s`;
    });
}

// Add click effects to interactive elements
function addClickEffects() {
    const interactiveElements = document.querySelectorAll('.time-unit, .tradition-card, .calendar-fact, .greeting-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation CSS
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .time-unit, .tradition-card, .calendar-fact, .greeting-card {
            cursor: pointer;
            user-select: none;
        }
        
        .time-unit:hover, .tradition-card:hover, .calendar-fact:hover, .greeting-card:hover {
            transform: translateY(-5px) scale(1.02);
        }
    `;
    document.head.appendChild(style);
}

// Add confetti effect for celebration
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    `;
    document.body.appendChild(confettiContainer);
    
    const colors = ['#ff6b35', '#f7931e', '#ffd23f', '#11998e', '#38ef7d', '#ff416c', '#ff4b2b'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            animation: confettiFall ${3 + Math.random() * 2}s linear forwards;
        `;
        confettiContainer.appendChild(confetti);
    }
    
    // Add confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Add smooth scrolling for better UX
function addSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Update Ethiopian year
    updateEthiopianYear();
    
    // Add interactive features
    addFloatingAnimation();
    addClickEffects();
    addRippleStyles();
    addSmoothScrolling();
    
    // Add confetti on New Year (for testing, you can trigger this manually)
    // createConfetti();
    
    console.log('🎉 Ethiopian New Year celebration page loaded!');
    console.log('Enkutatash 2024 - May this new year bring you joy and prosperity!');
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Press 'C' for confetti
    if (event.key.toLowerCase() === 'c') {
        createConfetti();
    }
    
    // Press 'H' for happy new year message
    if (event.key.toLowerCase() === 'h') {
        alert('እንኳን ለአዲሱ ዓመት በዓል አደረሰዎ!\nHappy Ethiopian New Year!');
    }
});

// Add touch support for mobile devices
function addTouchSupport() {
    const touchElements = document.querySelectorAll('.time-unit, .tradition-card, .calendar-fact, .greeting-card');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function(e) {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        element.addEventListener('touchend', function(e) {
            this.style.transform = '';
        });
    });
}

// Initialize touch support
addTouchSupport();
