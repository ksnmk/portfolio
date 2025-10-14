// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .education-item, .stat, .achievement-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Enhanced experience section animations
function animateExperienceSection() {
    const achievementItems = document.querySelectorAll('.achievement-item');
    const techTags = document.querySelectorAll('.tech-tag');
    
    // Stagger achievement items animation
    achievementItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Animate tech tags with delay
    setTimeout(() => {
        techTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.8)';
            tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'scale(1)';
            }, index * 50);
        });
    }, 1000);
    
    // Add interactive functionality to achievement items
    addAchievementInteractions();
    
    // Add interactive functionality to tech tags
    addTechTagInteractions();
}

// Add interactive functionality to achievement items
function addAchievementInteractions() {
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    achievementItems.forEach((item, index) => {
        // Add click to expand/collapse functionality
        item.addEventListener('click', function() {
            toggleAchievementExpansion(this);
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Toggle achievement expansion
function toggleAchievementExpansion(item) {
    const isExpanded = item.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse
        item.classList.remove('expanded');
        item.style.transform = 'translateY(0) scale(1)';
        
        // Remove expanded content
        const expandedContent = item.querySelector('.expanded-content');
        if (expandedContent) {
            expandedContent.remove();
        }
    } else {
        // Expand
        item.classList.add('expanded');
        item.style.transform = 'translateY(-8px) scale(1.05)';
        
        // Add expanded content
        addExpandedContent(item);
    }
}

// Add expanded content to achievement item
function addExpandedContent(item) {
    const achievementContent = item.querySelector('.achievement-content');
    const achievementTitle = achievementContent.querySelector('h6').textContent;
    
    // Create expanded content based on achievement
    let expandedDetails = '';
    
    switch(achievementTitle) {
        case 'ETL Performance Optimization':
            expandedDetails = `
                <div class="expanded-details">
                    <h4>Technical Implementation:</h4>
                    <ul>
                        <li>Optimized PySpark jobs using broadcast joins and partitioning strategies</li>
                        <li>Implemented data caching and checkpointing for fault tolerance</li>
                        <li>Used columnar storage formats (Parquet) for better compression</li>
                        <li>Applied dynamic resource allocation based on data volume</li>
                    </ul>
                    <h4>Business Impact:</h4>
                    <p>Reduced processing time from 4 hours to 2.6 hours, enabling real-time analytics for business stakeholders.</p>
                </div>
            `;
            break;
        case 'ML Model Development':
            expandedDetails = `
                <div class="expanded-details">
                    <h4>Model Architecture:</h4>
                    <ul>
                        <li>Built ensemble models combining Random Forest and Gradient Boosting</li>
                        <li>Implemented feature engineering pipeline with automated selection</li>
                        <li>Used cross-validation and hyperparameter tuning for optimization</li>
                        <li>Deployed models using AWS SageMaker with A/B testing framework</li>
                    </ul>
                    <h4>Performance Metrics:</h4>
                    <p>Achieved 18% improvement in forecast accuracy with 95% confidence interval.</p>
                </div>
            `;
            break;
        case 'Business Intelligence Automation':
            expandedDetails = `
                <div class="expanded-details">
                    <h4>Automation Pipeline:</h4>
                    <ul>
                        <li>Created automated ETL workflows using Apache Airflow</li>
                        <li>Built interactive Tableau dashboards with real-time data connections</li>
                        <li>Implemented alerting system for data quality issues</li>
                        <li>Established data governance and documentation standards</li>
                    </ul>
                    <h4>User Impact:</h4>
                    <p>Enabled 50+ business users to access real-time KPIs and make data-driven decisions.</p>
                </div>
            `;
            break;
        case 'Cross-functional Collaboration':
            expandedDetails = `
                <div class="expanded-details">
                    <h4>Collaboration Framework:</h4>
                    <ul>
                        <li>Led daily standups and sprint planning sessions</li>
                        <li>Implemented CI/CD pipeline for ML model deployment</li>
                        <li>Created API documentation and integration guides</li>
                        <li>Conducted knowledge transfer sessions for team members</li>
                    </ul>
                    <h4>Team Impact:</h4>
                    <p>Improved team velocity by 20% and reduced deployment time by 40%.</p>
                </div>
            `;
            break;
        case 'Data Architecture & Engineering':
            expandedDetails = `
                <div class="expanded-details">
                    <h4>Architecture Design:</h4>
                    <ul>
                        <li>Designed star schema for dimensional modeling</li>
                        <li>Implemented data lake architecture on AWS S3</li>
                        <li>Created data quality framework with automated validation</li>
                        <li>Established data lineage and metadata management</li>
                    </ul>
                    <h4>Scalability Impact:</h4>
                    <p>Built infrastructure supporting 10TB+ daily data processing with 99.9% uptime.</p>
                </div>
            `;
            break;
        default:
            expandedDetails = `
                <div class="expanded-details">
                    <h4>Additional Details:</h4>
                    <p>This achievement demonstrates strong technical skills and business impact. Click on other achievements to learn more about specific implementations and results.</p>
                </div>
            `;
    }
    
    const expandedContent = document.createElement('div');
    expandedContent.className = 'expanded-content';
    expandedContent.innerHTML = expandedDetails;
    
    // Add styles for expanded content
    const expandedStyles = `
        .expanded-content {
            margin-top: 1rem;
            padding: 1rem;
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            border-radius: 8px;
            border-left: 4px solid #2563eb;
            animation: slideDown 0.3s ease-out;
        }
        .expanded-content h4 {
            color: #1e293b;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        .expanded-content ul {
            margin: 0.5rem 0;
            padding-left: 1.2rem;
        }
        .expanded-content li {
            color: #475569;
            font-size: 0.85rem;
            margin-bottom: 0.3rem;
            line-height: 1.4;
        }
        .expanded-content p {
            color: #475569;
            font-size: 0.85rem;
            margin: 0.5rem 0;
            line-height: 1.5;
        }
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    // Inject expanded styles
    if (!document.querySelector('#expanded-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'expanded-styles';
        styleSheet.textContent = expandedStyles;
        document.head.appendChild(styleSheet);
    }

// =====================
// Contact Interactions
// =====================
function setupContactInteractions() {
    const chips = document.querySelectorAll('.chip-group .chip');
    const interestField = document.getElementById('interestField');
    const message = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const mood = document.getElementById('mood');
    const moodEmoji = document.getElementById('moodEmoji');
    const sendBtn = document.getElementById('sendBtn');

    // Chips: single-select behavior
    if (chips && chips.length) {
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                if (interestField) interestField.value = chip.dataset.value || '';
            });
        });
    }

    // Character counter
    if (message && charCount) {
        const limit = 500;
        message.setAttribute('maxlength', String(limit));
        const updateCount = () => { charCount.textContent = String(message.value.length); };
        message.addEventListener('input', updateCount);
        updateCount();
    }

    // Mood slider emoji sync
    if (mood && moodEmoji) {
        const faces = ['☹️','🙁','🙂','😊','🤩'];
        const syncMood = () => {
            const idx = Math.max(0, Math.min(faces.length - 1, parseInt(mood.value || '2', 10)));
            moodEmoji.textContent = faces[idx];
        };
        mood.addEventListener('input', syncMood);
        syncMood();
    }

    // Fun submit animation
    if (typeof contactForm !== 'undefined' && contactForm && sendBtn) {
        contactForm.addEventListener('submit', () => {
            sendBtn.classList.add('sending');
            launchConfetti();
            setTimeout(() => sendBtn.classList.remove('sending'), 1300);
        });
    }
}

function launchConfetti() {
    const colors = ['#fbbf24', '#2563eb', '#7c3aed', '#10b981', '#ef4444'];
    const count = 40;
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animation = `confettiFall ${3 + Math.random()*2}s linear forwards`;
        piece.style.transform = `rotate(${Math.random()*360}deg)`;
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 6000);
    }
}

// Initialize contact interactions after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupContactInteractions();
});

// =====================
// About Interactions
// =====================
function setupAboutInteractions() {
    const toggleBtn = null; // removed
    const extra = null; // removed
    const chips = document.querySelectorAll('.about-chip');
    const selected = document.getElementById('aboutSelected');

    // read more removed

    if (chips && chips.length && selected) {
        const active = new Set();
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chip.classList.toggle('active');
                const value = chip.dataset.value || chip.textContent.trim();
                if (chip.classList.contains('active')) {
                    active.add(value);
                } else {
                    active.delete(value);
                }
                selected.textContent = active.size ? `Selected: ${Array.from(active).join(', ')}` : '';
            });
        });
    }

    // Tooltips via title attribute using data-tooltip
    const highlights = document.querySelectorAll('.about-highlights [data-tooltip]');
    highlights.forEach(item => {
        item.setAttribute('title', item.getAttribute('data-tooltip'));
    });
}

// Initialize about interactions
document.addEventListener('DOMContentLoaded', () => {
    setupAboutInteractions();
});

// =====================
// Home (Hero) Interactions
// =====================
function setupHeroInteractions() {
    const toggleBtn = null; // removed
    const extra = null; // removed
    const chips = [];
    const selected = null;

    // read more removed

    // chips removed
}

// Initialize hero interactions
document.addEventListener('DOMContentLoaded', () => {
    setupHeroInteractions();
});
    
    achievementContent.appendChild(expandedContent);
}

// Add interactive functionality to tech tags
function addTechTagInteractions() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('click', function() {
            showTechTagModal(this.textContent);
        });
        
        // Add pulse animation on hover
        tag.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
}

// Show tech tag modal with detailed information
function showTechTagModal(techName) {
    const techInfo = {
        'Python': {
            description: 'Primary programming language for data engineering and machine learning',
            experience: '3+ years',
            projects: 'All major projects including ETL pipelines, ML models, and web applications'
        },
        'PySpark': {
            description: 'Distributed computing framework for big data processing',
            experience: '2+ years',
            projects: 'Large-scale ETL pipelines processing 10TB+ daily data'
        },
        'Hadoop': {
            description: 'Big data storage and processing ecosystem',
            experience: '2+ years',
            projects: 'Data lake architecture and MapReduce jobs'
        },
        'TensorFlow': {
            description: 'Open-source machine learning framework',
            experience: '1.5+ years',
            projects: 'Deep learning models for predictive analytics'
        },
        'Scikit-learn': {
            description: 'Machine learning library for Python',
            experience: '2+ years',
            projects: 'Classification, regression, and clustering models'
        },
        'AWS SageMaker': {
            description: 'Cloud-based machine learning platform',
            experience: '1.5+ years',
            projects: 'Model training, deployment, and monitoring'
        },
        'SQL': {
            description: 'Structured Query Language for database management',
            experience: '3+ years',
            projects: 'Complex queries, stored procedures, and database optimization'
        },
        'Tableau': {
            description: 'Business intelligence and data visualization tool',
            experience: '2+ years',
            projects: 'Interactive dashboards and automated reports'
        },
        'REST APIs': {
            description: 'Application Programming Interface for web services',
            experience: '2+ years',
            projects: 'API development and integration for ML services'
        },
        'Agile': {
            description: 'Software development methodology',
            experience: '2+ years',
            projects: 'Sprint planning, daily standups, and continuous delivery'
        }
    };
    
    const info = techInfo[techName] || {
        description: 'Technology used in various projects',
        experience: '1+ years',
        projects: 'Multiple projects and applications'
    };
    
    const modal = document.createElement('div');
    modal.className = 'tech-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${techName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="tech-info">
                    <div class="info-item">
                        <h4>Description</h4>
                        <p>${info.description}</p>
                    </div>
                    <div class="info-item">
                        <h4>Experience</h4>
                        <p>${info.experience}</p>
                    </div>
                    <div class="info-item">
                        <h4>Key Projects</h4>
                        <p>${info.projects}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Add tech modal styles
    const techModalStyles = `
        .tech-modal .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        .tech-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
        }
        .tech-modal .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            transition: color 0.3s ease;
        }
        .tech-modal .modal-close:hover {
            color: #ef4444;
        }
        .tech-info {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .info-item h4 {
            color: #2563eb;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 0.3rem;
        }
        .info-item p {
            color: #4b5563;
            font-size: 0.85rem;
            line-height: 1.5;
            margin: 0;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    
    // Inject tech modal styles
    if (!document.querySelector('#tech-modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'tech-modal-styles';
        styleSheet.textContent = techModalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeTechModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeTechModal();
        }
    });
    
    function closeTechModal() {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    }
}

// Add experience section animation observer
const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateExperienceSection();
            experienceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    const experienceSection = document.querySelector('.experience');
    if (experienceSection) {
        experienceObserver.observe(experienceSection);
    }
    
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Enhanced contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Add real-time validation
    addRealTimeValidation();
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Enhanced validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        if (name.length < 2) {
            showNotification('Name must be at least 2 characters long.', 'error');
            return;
        }
        
        if (subject.length < 5) {
            showNotification('Subject must be at least 5 characters long.', 'error');
            return;
        }
        
        if (message.length < 10) {
            showNotification('Message must be at least 10 characters long.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission with animation
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Add success animation
            createSuccessAnimation();
        }, 2000);
    });
}

// Add real-time validation
function addRealTimeValidation() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    inputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            validateField(this);
        });
        
        // Add real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation rules
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'subject':
            if (value.length < 5) {
                isValid = false;
                errorMessage = 'Subject must be at least 5 characters long';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    // Add visual feedback
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = errorMessage;
        field.parentElement.appendChild(errorDiv);
    }
    
    return isValid;
}

// Create success animation
function createSuccessAnimation() {
    AnimationManager.createSuccessAnimation('✓', '#10b981');
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced parallax effects and scroll animations
// Scroll handling optimized with rAF and passive listener
let scrollPending = false;
function onScrollRaf() {
    scrollPending = false;
    const scrolled = window.pageYOffset;

    // Hero section parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.15; // gentler for less jank
        hero.style.transform = `translateY(${rate}px)`;

        const floatingElements = hero.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.06 + (index * 0.03);
            const yPos = scrolled * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Profile parallax on wrapper to avoid tilting conflicts
    const profileWrapper = document.querySelector('.profile-image-wrapper');
    if (profileWrapper) {
        const rect = profileWrapper.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
            const speed = 0.12;
            const yPos = Math.max(0, (window.innerHeight - rect.top) * speed);
            profileWrapper.style.transform = `translateY(${yPos}px)`;
        } else {
            profileWrapper.style.transform = '';
        }
        if (window.scrollY === 0) profileWrapper.style.transform = '';
    }

    // Section reveal + progress
    revealOnScroll();
    updateScrollProgress();
}

window.addEventListener('scroll', () => {
    if (!scrollPending) {
        scrollPending = true;
        requestAnimationFrame(onScrollRaf);
    }
}, { passive: true });

// Reveal elements on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// Update scroll progress
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Create or update scroll progress bar
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #2563eb, #7c3aed, #fbbf24);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrollPercent + '%';
}

// Add scroll-triggered animations to specific elements
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animations to stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px)';
        stat.style.transition = 'all 0.6s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Animate numbers
                        animateNumbers(entry.target);
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
    
    // Add scroll animations to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        card.style.transition = 'all 0.6s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(card);
    });
    
    // Add scroll animations to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(50px)';
        category.style.transition = 'all 0.6s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(category);
    });
});

// Animate numbers in stats
function animateNumbers(statElement) {
    const numberElement = statElement.querySelector('h3');
    const finalNumber = parseInt(numberElement.textContent);
    const duration = 2000;
    const increment = finalNumber / (duration / 16);
    let currentNumber = 0;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(currentNumber) + '+';
    }, 16);
}

// Enhanced skill tags interactions
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click to show skill details
        tag.addEventListener('click', function() {
            showSkillModal(this.textContent);
        });
    });
    
    // Add skill category interactions
    addSkillCategoryInteractions();
});

// Add skill category interactions
function addSkillCategoryInteractions() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        category.addEventListener('click', function() {
            toggleSkillCategory(this);
        });
    });
}

// Toggle skill category expansion
function toggleSkillCategory(category) {
    const isExpanded = category.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse
        category.classList.remove('expanded');
        const skillTags = category.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.style.display = 'inline-block';
        });
    } else {
        // Expand with animation
        category.classList.add('expanded');
        const skillTags = category.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.8)';
            tag.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'scale(1)';
            }, index * 50);
        });
    }
}

// Consolidated Modal System
class ModalManager {
    constructor() {
        this.activeModals = new Set();
    }

    createModal(config) {
        const modal = document.createElement('div');
        modal.className = `${config.type}-modal`;
        modal.innerHTML = this.generateModalHTML(config);
        
        this.applyModalStyles(modal, config);
        document.body.appendChild(modal);
        
        this.animateIn(modal);
        this.addCloseHandlers(modal, config);
        
        this.activeModals.add(modal);
        return modal;
    }

    generateModalHTML(config) {
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${config.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${config.content}
                </div>
            </div>
        `;
    }

    applyModalStyles(modal, config) {
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            ${config.padding ? `padding: ${config.padding};` : ''}
        `;
    }

    animateIn(modal) {
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }

    addCloseHandlers(modal, config) {
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(modal);
        });

        if (config.onClose) {
            modal.addEventListener('close', config.onClose);
        }
    }

    closeModal(modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
            this.activeModals.delete(modal);
        }, 300);
    }

    closeAllModals() {
        this.activeModals.forEach(modal => this.closeModal(modal));
    }
}

// Initialize modal manager
const modalManager = new ModalManager();

// Show skill modal with detailed information
function showSkillModal(skillName) {
    const skillInfo = {
        'Python': {
            level: 'Expert',
            experience: '3+ years',
            description: 'Primary programming language for data engineering, machine learning, and web development',
            projects: 'ETL pipelines, ML models, web applications, data analysis'
        },
        'Java': {
            level: 'Intermediate',
            experience: '2+ years',
            description: 'Object-oriented programming for enterprise applications and backend development',
            projects: 'Spring Boot applications, REST APIs, microservices'
        },
        'SQL': {
            level: 'Expert',
            experience: '3+ years',
            description: 'Database querying, optimization, and management',
            projects: 'Complex queries, stored procedures, database design'
        },
        'Pandas': {
            level: 'Expert',
            experience: '3+ years',
            description: 'Data manipulation and analysis library for Python',
            projects: 'Data cleaning, transformation, and analysis workflows'
        },
        'NumPy': {
            level: 'Advanced',
            experience: '3+ years',
            description: 'Numerical computing library for Python',
            projects: 'Mathematical operations, array processing, scientific computing'
        },
        'Scikit-learn': {
            level: 'Advanced',
            experience: '2+ years',
            description: 'Machine learning library for Python',
            projects: 'Classification, regression, clustering, model evaluation'
        },
        'TensorFlow': {
            level: 'Intermediate',
            experience: '1.5+ years',
            description: 'Open-source machine learning framework',
            projects: 'Deep learning models, neural networks, model deployment'
        },
        'PyTorch': {
            level: 'Intermediate',
            experience: '1+ years',
            description: 'Deep learning framework for Python',
            projects: 'Neural networks, computer vision, natural language processing'
        },
        'Hugging Face': {
            level: 'Intermediate',
            experience: '1+ years',
            description: 'Natural language processing and transformer models',
            projects: 'NLP applications, text classification, sentiment analysis'
        },
        'PySpark': {
            level: 'Advanced',
            experience: '2+ years',
            description: 'Distributed computing framework for big data processing',
            projects: 'Large-scale ETL pipelines, data processing, cluster computing'
        },
        'Hadoop': {
            level: 'Intermediate',
            experience: '2+ years',
            description: 'Big data storage and processing ecosystem',
            projects: 'Data lake architecture, MapReduce jobs, HDFS management'
        },
        'Spark': {
            level: 'Advanced',
            experience: '2+ years',
            description: 'Unified analytics engine for large-scale data processing',
            projects: 'Stream processing, batch processing, real-time analytics'
        },
        'MapReduce': {
            level: 'Intermediate',
            experience: '1.5+ years',
            description: 'Programming model for processing large datasets',
            projects: 'Distributed computing, data processing algorithms'
        },
        'ETL Pipelines': {
            level: 'Expert',
            experience: '2+ years',
            description: 'Extract, Transform, Load data processing workflows',
            projects: 'Data integration, data warehousing, automated pipelines'
        },
        'AWS (S3, EC2, SageMaker)': {
            level: 'Advanced',
            experience: '2+ years',
            description: 'Amazon Web Services cloud computing platform',
            projects: 'Cloud infrastructure, ML model deployment, data storage'
        },
        'GCP (BigQuery, Dataproc)': {
            level: 'Intermediate',
            experience: '1+ years',
            description: 'Google Cloud Platform services',
            projects: 'Data analytics, cloud computing, ML services'
        },
        'Git': {
            level: 'Advanced',
            experience: '3+ years',
            description: 'Version control system for software development',
            projects: 'Code management, collaboration, CI/CD pipelines'
        },
        'MySQL': {
            level: 'Advanced',
            experience: '3+ years',
            description: 'Relational database management system',
            projects: 'Database design, query optimization, data modeling'
        },
        'PostgreSQL': {
            level: 'Intermediate',
            experience: '2+ years',
            description: 'Advanced open-source relational database',
            projects: 'Complex queries, stored procedures, database optimization'
        },
        'MongoDB': {
            level: 'Intermediate',
            experience: '1.5+ years',
            description: 'NoSQL document database',
            projects: 'Document storage, flexible schema design, web applications'
        },
        'Tableau': {
            level: 'Advanced',
            experience: '2+ years',
            description: 'Business intelligence and data visualization tool',
            projects: 'Interactive dashboards, data visualization, business reporting'
        },
        'Power BI': {
            level: 'Intermediate',
            experience: '1+ years',
            description: 'Business analytics service by Microsoft',
            projects: 'Data visualization, business intelligence, reporting'
        }
    };
    
    const info = skillInfo[skillName] || {
        level: 'Intermediate',
        experience: '1+ years',
        description: 'Technology used in various projects and applications',
        projects: 'Multiple projects and applications'
    };
    
    const content = `
        <div class="skill-level">
            <div class="level-badge level-${info.level.toLowerCase()}">${info.level}</div>
            <span class="experience">${info.experience} experience</span>
        </div>
        
        <div class="skill-description">
            <h4>Description</h4>
            <p>${info.description}</p>
        </div>
        
        <div class="skill-projects">
            <h4>Key Projects</h4>
            <p>${info.projects}</p>
        </div>
    `;

    modalManager.createModal({
        type: 'skill',
        title: skillName,
        content: content
    });
}

// Enhanced project cards interactions
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Enhanced tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        });
        
        // Add click to show project modal
        card.addEventListener('click', function() {
            showProjectModal(this);
        });
        
        // Add tech tag interactions
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
                showTechTagModal(this.textContent);
            });
        });
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add fade-in animation to main content
    const mainContent = document.querySelectorAll('section');
    mainContent.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Enhanced Loading Screen Management
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Add interactive loading elements
    addLoadingInteractions();
    
    // Simulate loading time with progress
    let progress = 0;
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text p');
    
    const loadingMessages = [
        'Loading Portfolio...',
        'Initializing Components...',
        'Preparing Animations...',
        'Loading Content...',
        'Almost Ready...'
    ];
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        
        if (loadingProgress) {
            loadingProgress.style.width = progress + '%';
        }
        
        // Update loading message
        const messageIndex = Math.floor((progress / 100) * loadingMessages.length);
        if (loadingText && messageIndex < loadingMessages.length) {
            loadingText.textContent = loadingMessages[messageIndex];
        }
    }, 200);
    
    // Complete loading after 2.5 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
        
        // Initialize page animations
        initializePageAnimations();
    }, 2500);
});

// Add interactive loading elements
function addLoadingInteractions() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    // Add click interaction to loading screen
    loadingScreen.addEventListener('click', function() {
        // Create ripple effect
        createLoadingRipple(event);
    });
    
    // Add floating particles
    createFloatingParticles();
    
    // Add pulsing effect to logo
    const logoCircle = document.querySelector('.logo-circle');
    if (logoCircle) {
        logoCircle.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease-in-out infinite';
        });
        
        logoCircle.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse 2s infinite';
        });
    }
}

// Create loading ripple effect
function createLoadingRipple(event) {
    const ripple = document.createElement('div');
    const rect = event.currentTarget.getBoundingClientRect();
    const size = 100;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    event.currentTarget.appendChild(ripple);
    
    // Add ripple animation styles
    const rippleStyles = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#ripple-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'ripple-styles';
        styleSheet.textContent = rippleStyles;
        document.head.appendChild(styleSheet);
    }
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Create floating particles
function createFloatingParticles() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'loading-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        loadingScreen.appendChild(particle);
    }
    
    // Add particle animation styles
    const particleStyles = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.6;
            }
            25% {
                transform: translateY(-20px) translateX(10px);
                opacity: 1;
            }
            50% {
                transform: translateY(-10px) translateX(-10px);
                opacity: 0.8;
            }
            75% {
                transform: translateY(-30px) translateX(5px);
                opacity: 0.4;
            }
        }
    `;
    
    if (!document.querySelector('#particle-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'particle-styles';
        styleSheet.textContent = particleStyles;
        document.head.appendChild(styleSheet);
    }
}

// Initialize page animations
function initializePageAnimations() {
    // Set initial styles for animation
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Stagger the animations
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate hero elements
    animateHeroElements();
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate hero elements
function animateHeroElements() {
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        profileContainer.style.opacity = '0';
        profileContainer.style.transform = 'translateX(50px) scale(0.9)';
        profileContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            profileContainer.style.opacity = '1';
            profileContainer.style.transform = 'translateX(0) scale(1)';
        }, 1.5);
    }
    
    // Animate floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px) scale(0.8)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, 2 + (index * 0.2));
    });
    
    // Add interactive functionality to floating elements
    addFloatingElementInteractions();
    
    // Add profile image interactions
    addProfileImageInteractions();
}

// Add interactive functionality to floating elements
function addFloatingElementInteractions() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add click interaction
        element.addEventListener('click', function() {
            // Create ripple effect
            AnimationManager.createRippleEffect(this);
            
            // Show tooltip with technology info
            showFloatingElementTooltip(this, index);
            
            // Add bounce animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'float 6s ease-in-out infinite';
            }, 100);
        });
        
        // Add hover sound effect (visual feedback)
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) saturate(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
        });
    });
}

// Consolidated Animation System
class AnimationManager {
    static createRippleEffect(element, color = 'rgba(251, 191, 36, 0.3)', size = 100) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: ${color};
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: ${size}px;
            height: ${size}px;
            margin-left: -${size/2}px;
            margin-top: -${size/2}px;
        `;
        
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    static createFlashEffect(color = 'white', duration = 300) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${color};
            opacity: 0;
            z-index: 9999;
            pointer-events: none;
            animation: flash ${duration}ms ease-out;
        `;
        
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), duration);
    }

    static createSuccessAnimation(icon = '✓', color = '#10b981') {
        const successIcon = document.createElement('div');
        successIcon.innerHTML = icon;
        successIcon.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            background: ${color};
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
            z-index: 10001;
            opacity: 0;
            animation: successPop 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(successIcon);
        setTimeout(() => successIcon.remove(), 2000);
    }
}

// Show tooltip for floating elements
function showFloatingElementTooltip(element, index) {
    const tooltips = [
        'Python - My primary programming language',
        'Database - Data storage and management',
        'Machine Learning - AI and predictive modeling',
        'Cloud Computing - AWS and cloud services'
    ];
    
    // Remove existing tooltip
    const existingTooltip = document.querySelector('.floating-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'floating-tooltip';
    tooltip.textContent = tooltips[index] || 'Interactive element';
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    // Animate in
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px)';
        setTimeout(() => tooltip.remove(), 300);
    }, 3000);
}

// Add profile image interactions
function addProfileImageInteractions() {
    const profileImage = document.querySelector('.profile-image');
    if (!profileImage) return;
    
    profileImage.addEventListener('click', function() {
        // Create photo flash effect
        createPhotoFlash();
        
        // Show profile modal or enlarge image
        showProfileModal();
    });
    
    // Add parallax effect on mouse move
    profileImage.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    profileImage.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// Create photo flash effect
function createPhotoFlash() {
    AnimationManager.createFlashEffect('white', 300);
}

// Show profile modal
function showProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Sri Naga Kollepara</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="profile-picture.jpg" alt="Sri Naga Kollepara" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="profile-placeholder" style="display: none;">
                        <i class="fas fa-user-circle"></i>
                    </div>
                </div>
                <div class="modal-info">
                    <p><strong>Data Engineer & Machine Learning Enthusiast</strong></p>
                    <p>Computer Science graduate student at University of North Texas</p>
                    <p>Former Data Engineer at Accenture with 2+ years of experience</p>
                    <div class="modal-social">
                        <a href="https://www.linkedin.com/in/sri-naga-kollepara-85ab291a1" target="_blank">
                            <i class="fab fa-linkedin"></i> LinkedIn
                        </a>
                        <a href="https://github.com/ksnmk" target="_blank">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                        <a href="mailto:snmk.kollepara@gmail.com">
                            <i class="fas fa-envelope"></i> Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = `
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            transition: color 0.3s ease;
        }
        .modal-close:hover {
            color: #ef4444;
        }
        .modal-body {
            display: flex;
            gap: 1.5rem;
            align-items: center;
        }
        .modal-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            flex-shrink: 0;
        }
        .modal-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .modal-info p {
            margin-bottom: 0.8rem;
            color: #4b5563;
        }
        .modal-social {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
        .modal-social a {
            color: #2563eb;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s ease;
        }
        .modal-social a:hover {
            color: #1d4ed8;
        }
        @keyframes flash {
            0% { opacity: 0; }
            50% { opacity: 0.8; }
            100% { opacity: 0; }
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    // Inject modal styles
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    }
}

// Show project modal with detailed information
function showProjectModal(projectCard) {
    const projectTitle = projectCard.querySelector('h3').textContent;
    const projectDate = projectCard.querySelector('.project-date').textContent;
    const projectFeatures = Array.from(projectCard.querySelectorAll('.project-features li')).map(li => li.textContent);
    const projectTech = Array.from(projectCard.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
    
    // Tailored overview per project
    let overviewText = 'This project demonstrates advanced technical skills and problem-solving abilities.';
    switch (projectTitle.trim()) {
        case 'Predictive Modelling for Earthquake Magnitude and Location':
            overviewText = 'Built a predictive analytics pipeline to estimate earthquake magnitude and approximate location using distributed processing (Hadoop/Spark) and neural/regression models. Focused on scalable preprocessing, feature engineering, and rigorous evaluation on large seismic datasets.';
            break;
        case 'Accommodation Connect':
            overviewText = 'Developed a full‑stack platform for student housing discovery and roommate matching, featuring authentication, listing management, NLP‑based preference parsing with Transformers, and price prediction models to estimate fair rentals.';
            break;
        case 'Movie-Based Anime Recommendation System':
            overviewText = 'Designed a hybrid recommender that maps user movie preferences to anime suggestions by combining collaborative filtering (user/item KNN) with content‑based similarity (TF‑IDF + cosine) across MovieLens and Kaggle Anime datasets.';
            break;
        default:
            // Fallback uses existing features to compose a brief summary
            overviewText = `Highlights: ${projectTech.slice(0, 3).join(', ')}; key focus on ${projectFeatures[0] || 'core functionality and user experience'}.`;
    }
    
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${projectTitle}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="project-meta">
                    <span class="project-date">${projectDate}</span>
                    <div class="project-status">Completed</div>
                </div>
                
                <div class="project-description">
                    <h4>Project Overview</h4>
                    <p>${overviewText}</p>
                </div>
                
                <div class="project-features-detailed">
                    <h4>Key Features</h4>
                    <ul>
                        ${projectFeatures.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-tech-detailed">
                    <h4>Technologies Used</h4>
                    <div class="tech-grid">
                        ${projectTech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
    `;
    
    document.body.appendChild(modal);
    
    // Add project modal styles
    const projectModalStyles = `
        .project-modal .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        .project-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
        }
        .project-modal .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            transition: color 0.3s ease;
        }
        .project-modal .modal-close:hover {
            color: #ef4444;
        }
        .project-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding: 1rem;
            background: #f8fafc;
            border-radius: 8px;
        }
        .project-status {
            background: #10b981;
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .project-description h4,
        .project-features-detailed h4,
        .project-tech-detailed h4 {
            color: #1e293b;
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.8rem;
            margin-top: 1.5rem;
        }
        .project-description p {
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        .project-features-detailed ul {
            list-style: none;
            padding: 0;
        }
        .project-features-detailed li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.8rem;
            color: #4b5563;
            line-height: 1.6;
        }
        .project-features-detailed li::before {
            content: '▶';
            position: absolute;
            left: 0;
            color: #2563eb;
            font-size: 0.8rem;
        }
        .tech-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .tech-badge {
            background: #dbeafe;
            color: #1e40af;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
        }
        .project-links {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e5e7eb;
        }
        .project-link-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.8rem 1.5rem;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        .project-link-btn:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
        }
    `;
    
    // Inject project modal styles
    if (!document.querySelector('#project-modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'project-modal-styles';
        styleSheet.textContent = projectModalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeProjectModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    function closeProjectModal() {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    }
}

// Add interactive social links
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href.startsWith('mailto:')) {
                // Create email animation
                createEmailAnimation();
                // Open email client after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 1000);
            } else {
                // Create external link animation
                createExternalLinkAnimation(this);
                // Open link after animation
                setTimeout(() => {
                    window.open(href, '_blank');
                }, 500);
            }
        });
        
        // Add hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Create email animation
function createEmailAnimation() {
    const emailIcon = document.createElement('div');
    emailIcon.className = 'email-animation';
    emailIcon.innerHTML = '✉';
    emailIcon.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, #2563eb, #7c3aed);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        z-index: 10001;
        opacity: 0;
        animation: emailFly 1s ease-out forwards;
    `;
    
    document.body.appendChild(emailIcon);
    
    // Add email animation styles
    const emailStyles = `
        @keyframes emailFly {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
            }
            100% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(360deg);
            }
        }
    `;
    
    if (!document.querySelector('#email-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'email-styles';
        styleSheet.textContent = emailStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Remove after animation
    setTimeout(() => {
        emailIcon.remove();
    }, 2000);
}

// Create external link animation
function createExternalLinkAnimation(link) {
    const linkIcon = document.createElement('div');
    linkIcon.className = 'link-animation';
    linkIcon.innerHTML = '🔗';
    linkIcon.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        z-index: 10001;
        opacity: 0;
        animation: linkBounce 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(linkIcon);
    
    // Add link animation styles
    const linkStyles = `
        @keyframes linkBounce {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.3);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.3);
            }
            100% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    
    if (!document.querySelector('#link-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'link-styles';
        styleSheet.textContent = linkStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Remove after animation
    setTimeout(() => {
        linkIcon.remove();
    }, 1500);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading progress animation
    const loadingProgress = document.querySelector('.loading-progress');
    if (loadingProgress) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            loadingProgress.style.width = progress + '%';
        }, 100);
    }
});

// Add CSS for notification styles
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .notification-message {
        flex: 1;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
