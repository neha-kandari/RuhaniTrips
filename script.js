
document.addEventListener('DOMContentLoaded', function() {
    const sliderControls = document.querySelector('.slider-controls');
    const slides = document.querySelectorAll('.video-slide');
    let currentSlide = 0;
    let slideInterval;

    // Create dots dynamically
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `slider-dot${index === 0 ? ' active' : ''}`;
        dot.dataset.slide = index;
        sliderControls.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startSlideShow() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    sliderControls.addEventListener('click', function(e) {
        if (e.target.classList.contains('slider-dot')) {
            showSlide(parseInt(e.target.dataset.slide));
            startSlideShow();
        }
    });

    // Start slideshow
    startSlideShow();
});


// Theme management
document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('checkbox');
    const navbar = document.querySelector('.navbar');
    const contactButton = document.querySelector('.btn-contact');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to set theme
    function setTheme(isDark) {
        if (isDark) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            navbar.classList.remove('light-theme');
            navbar.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            checkbox.checked = true;
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            navbar.classList.remove('dark-theme');
            navbar.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            checkbox.checked = false;
        }
    }
    
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setTheme(true);
    } else if (savedTheme === 'light') {
        setTheme(false);
    } else {
        setTheme(prefersDarkScheme.matches);
    }
    
    // Listen for theme toggle
    checkbox.addEventListener('change', () => {
        setTheme(checkbox.checked);
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === null) {
            setTheme(e.matches);
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Navbar collapse behavior
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close navbar when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navbarToggler.contains(event.target) || 
                              navbarCollapse.contains(event.target);
        
        if (!isClickInside && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
    
    // Close navbar when clicking on a nav link or contact button
    const navLinks = document.querySelectorAll('.nav-link, .btn-contact');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Add hover animation for contact button
    if (contactButton) {
        contactButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        contactButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// event
// Event Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp Integration
    const whatsappNumber = '+919996650521'; // Replace with actual business WhatsApp number
    const packages = {
        'UK Char Dham Yatra': {
            duration: '12 Days, 11 Nights',
            pickup: 'Delhi, Haryana, Chandigarh'
        },
        'Every Friday': {
            duration: '4 Days, 3 Nights',
            destinations: 'Manali, Kasol, Khirganga'
        },
        'Manali Kasol Tosh Trek': {
            duration: '4 Days, 3 Nights',
            destinations: 'Manali, Kasol, Tosh',
            special: 'Bike Ride Salong Valley'
        },
        'Shimla Manali': {
            duration: '6 Days, 5 Nights',
            destinations: 'Manali, Shimla-Jakhu-Kufri-Mall Road'
        },
        'Srinagar Jammu Safari': {
            duration: '7 Days, 6 Nights',
            destinations: 'Srinagar, Gulmarg, Sonmarg, Pahalgaon'
        }
    };

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            eventCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Add animation
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // WhatsApp Integration for Contact Buttons
    document.querySelectorAll('.book-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.event-card');
            const packageTitle = card.querySelector('.event-title').textContent;
            const packageInfo = packages[packageTitle];
            
            let message = `Hi, I'm interested in the ${packageTitle} package:\n`;
            message += `Duration: ${packageInfo.duration}\n`;
            
            if (packageInfo.destinations) {
                message += `Destinations: ${packageInfo.destinations}\n`;
            }
            if (packageInfo.pickup) {
                message += `Pickup: ${packageInfo.pickup}\n`;
            }
            if (packageInfo.special) {
                message += `Special Feature: ${packageInfo.special}\n`;
            }
            
            message += "Please provide more information about the package.";

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        });
    });

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// about
document.addEventListener('DOMContentLoaded', function() {
    // Theme management for about section
    function updateAboutSectionTheme() {
        const body = document.body;
        const aboutSection = document.querySelector('.about-section');
        
        if (body.classList.contains('dark-theme')) {
            aboutSection.classList.add('dark-theme');
        } else {
            aboutSection.classList.remove('dark-theme');
        }
    }

    // Initial theme setup
    updateAboutSectionTheme();

    // Listen for theme changes
    const themeCheckbox = document.getElementById('checkbox');
    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', updateAboutSectionTheme);
    }

    // Intersection Observer for animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes when section comes into view
                entry.target.querySelectorAll('.info-card, .stat-card').forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                
                entry.target.querySelector('.founder-image-container').style.opacity = '1';
                entry.target.querySelector('.founder-image-container').style.transform = 'translateX(0)';
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Start observing the about section
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        observer.observe(aboutSection);
        
        // Set initial states for animations
        aboutSection.querySelectorAll('.info-card, .stat-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        const founderImage = aboutSection.querySelector('.founder-image-container');
        founderImage.style.opacity = '0';
        founderImage.style.transform = 'translateX(-30px)';
        founderImage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }
});

// gallery
// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 0);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Add click handler for gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Here you can add functionality to show a larger view of the image
            // or navigate to a detailed view page
            console.log('Gallery item clicked:', item.querySelector('h3').textContent);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all sections
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Function to update active state
    function updateActiveState() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Add scrolled class to navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Add smooth scroll behavior to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveState);
    
    // Initial call to set active state
    updateActiveState();
});

