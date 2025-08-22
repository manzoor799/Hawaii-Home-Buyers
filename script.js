// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function() {
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener("click", function() {
            mobileMenuToggle.classList.toggle("active");
            mobileNav.classList.toggle("active");
        });

        // Close mobile menu when clicking on links
        const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
        mobileNavLinks.forEach(link => {
            link.addEventListener("click", function() {
                mobileMenuToggle.classList.remove("active");
                mobileNav.classList.remove("active");
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", function(event) {
            if (!mobileMenuToggle.contains(event.target) && !mobileNav.contains(event.target)) {
                mobileMenuToggle.classList.remove("active");
                mobileNav.classList.remove("active");
            }
        });
    }
});

// Hero Carousel
document.addEventListener("DOMContentLoaded", function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-nav-dot");

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add("active");
        }
        if (dots[index]) {
            dots[index].classList.add("active");
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance carousel
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
});

// Brands carousel now uses pure CSS animation - no JavaScript needed

// Calculator Functionality
let currentStep = 1;
const totalSteps = 4;

function updateProgressBar() {
    const progressFill = document.querySelector(".progress-fill");
    if (progressFill) {
        const progress = (currentStep / totalSteps) * 100;
        progressFill.style.width = progress + "%";
    }
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll(".form-step").forEach(stepEl => {
        stepEl.classList.remove("active");
    });
    
    // Show current step
    const currentStepEl = document.querySelector(`[data-step="${step}"]`);
    if (currentStepEl) {
        currentStepEl.classList.add("active");
    }
    
    updateProgressBar();
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function resetCalculator() {
    currentStep = 1;
    showStep(currentStep);
    
    // Reset form values
    document.getElementById("property-address").value = "";
    document.getElementById("square-footage").value = 1500;
    document.querySelector(".range-value").textContent = "1500 sq ft";
    document.getElementById("bedrooms").value = "3";
    document.getElementById("bathrooms").value = "2";
    document.getElementById("condition").value = "good";
    document.getElementById("island").value = "oahu";
}

function calculateOffer() {
    // Get form values
    const address = document.getElementById("property-address").value;
    const sqft = parseInt(document.getElementById("square-footage").value);
    const bedrooms = document.getElementById("bedrooms").value;
    const bathrooms = document.getElementById("bathrooms").value;
    const condition = document.getElementById("condition").value;
    const island = document.getElementById("island").value;
    
    // Simple calculation logic
    let basePrice = sqft * 400; // Base price per sq ft
    
    // Adjust for island
    const islandMultipliers = {
        "oahu": 1.2,
        "maui": 1.1,
        "big-island": 0.9,
        "kauai": 1.0,
        "molokai": 0.8,
        "lanai": 0.8
    };
    
    basePrice *= islandMultipliers[island] || 1.0;
    
    // Adjust for condition
    const conditionMultipliers = {
        "excellent": 1.0,
        "good": 0.9,
        "fair": 0.8,
        "needs-repairs": 0.7
    };
    
    basePrice *= conditionMultipliers[condition] || 0.9;
    
    // Create range (±10%)
    const lowEnd = Math.round(basePrice * 0.9);
    const highEnd = Math.round(basePrice * 1.1);
    
    // Format numbers with commas
    const formatPrice = (price) => {
        return "$" + price.toLocaleString();
    };
    
    // Display result
    const offerAmount = document.getElementById("offer-amount");
    if (offerAmount) {
        offerAmount.textContent = `${formatPrice(lowEnd)} - ${formatPrice(highEnd)}`;
    }
    
    // Update email link
    const emailLink = document.getElementById("email-estimate");
    if (emailLink) {
        const subject = encodeURIComponent("Cash Offer Estimate Request");
        const body = encodeURIComponent(`Hello,\n\nI would like to request a cash offer estimate for my property:\n\nProperty Address: ${address}\nSquare Footage: ${sqft} sq ft\nBedrooms: ${bedrooms}\nBathrooms: ${bathrooms}\nCondition: ${condition}\nIsland: ${island}\n\nEstimated Range: ${formatPrice(lowEnd)} - ${formatPrice(highEnd)}\n\nPlease contact me to discuss this further.\n\nThank you!`);
        
        emailLink.href = `mailto:Info@hawaiihomebuyers.com?subject=${subject}&body=${body}`;
    }
    
    // Move to results step
    currentStep = 4;
    showStep(currentStep);
}

// Range slider update
document.addEventListener("DOMContentLoaded", function() {
    const rangeSlider = document.getElementById("square-footage");
    const rangeValue = document.querySelector(".range-value");
    
    if (rangeSlider && rangeValue) {
        rangeSlider.addEventListener("input", function() {
            rangeValue.textContent = this.value + " sq ft";
        });
    }
    
    // Initialize calculator
    showStep(1);
});

// Contact Form Functionality
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const propertyType = document.getElementById("property-type").value;
            const message = document.getElementById("message").value;
            
            // Validate required fields
            if (!name || !email || !message) {
                alert("Please fill in all required fields.");
                return;
            }
            
            // Create email
            const subject = encodeURIComponent("Free Cash Offer Request");
            const body = encodeURIComponent(`Hello,\n\nI would like to request a free cash offer for my property:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProperty Type: ${propertyType}\n\nMessage:\n${message}\n\nPlease contact me to discuss this further.\n\nThank you!`);
            
            // Open email client
            window.location.href = `mailto:Info@hawaiihomebuyers.com?subject=${subject}&body=${body}`;
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("a[href^="#"]");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector(".header").offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

// Loading animations
function initLoadingAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("loaded");
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("loading");
        observer.observe(section);
    });
}

// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", initLoadingAnimations);

// Header scroll effect
window.addEventListener("scroll", function() {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
    } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
    }
});

