// Sample data - Replace with your actual data
const resumeData = {
    experience: [
        {
            title: "Junior DevOps Engineer",
            company: "Freelance",
            period: "2024 - Present",
            description: "Working on automation and deployment of applications using modern DevOps tools and practices. Implementing CI/CD pipelines and containerization solutions."
        }
    ],
    education: [
        {
            degree: "EPAM Cloud & DevOps Trainee",
            school: "EPAM Systems",
            period: "2025",
            description: "Intensive training program focused on cloud technologies, containerization, and DevOps practices."
        }
    ],
    skills: [
        {
            name: "Linux",
            icon: "fab fa-linux",
            level: "Intermediate",
            description: "Proficient in Linux system administration, shell scripting, and system optimization."
        },
        {
            name: "Bash",
            icon: "fas fa-terminal",
            level: "Intermediate",
            description: "Expert in Bash scripting, automation, and command-line tools."
        },
        {
            name: "Jenkins",
            icon: "fab fa-jenkins",
            level: "Intermediate",
            description: "Experience with CI/CD pipeline development and Jenkins integration."
        },
        {
            name: "Python",
            icon: "fab fa-python",
            level: "Intermediate",
            description: "Skilled in Python scripting and automation."
        },
        {
            name: "SQL",
            icon: "fas fa-database",
            level: "Intermediate",
            description: "Proficient in database management and SQL queries."
        },
        {
            name: "Git",
            icon: "fab fa-git-alt",
            level: "Intermediate",
            description: "Expert in version control and Git workflow management."
        },
        {
            name: "AWS",
            icon: "fab fa-aws",
            level: "Intermediate",
            description: "Experience with AWS cloud services and infrastructure."
        },
        {
            name: "Docker",
            icon: "fab fa-docker",
            level: "Intermediate",
            description: "Skilled in containerization and Docker deployment."
        },
        {
            name: "RESTful APIs",
            icon: "fas fa-code",
            level: "Intermediate",
            description: "Experience with API development and integration."
        },
        {
            name: "Agile/Scrum",
            icon: "fas fa-tasks",
            level: "Intermediate",
            description: "Proficient in Agile methodologies and Scrum practices."
        }
    ]
};

// Function to create timeline items
function createTimelineItem(item, type) {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    
    const content = `
        <h3>${item.title || item.degree}</h3>
        <p class="company">${item.company || item.school}</p>
        <p class="period">${item.period}</p>
        <p class="description">${item.description}</p>
    `;
    
    div.innerHTML = content;
    return div;
}

// Function to create skill items with tooltip
function createSkillItem(skill) {
    const div = document.createElement('div');
    div.className = 'skill-item';
    
    const content = `
        <i class="${skill.icon}"></i>
        <span>${skill.name}</span>
        <div class="skill-tooltip">
            <div class="skill-level">${skill.level}</div>
            <div class="skill-description">${skill.description}</div>
        </div>
    `;
    
    div.innerHTML = content;
    
    // Add hover effect
    div.addEventListener('mouseenter', () => {
        div.style.transform = 'translateY(-5px) scale(1.05)';
        div.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
    
    div.addEventListener('mouseleave', () => {
        div.style.transform = 'translateY(0) scale(1)';
        div.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
    });
    
    return div;
}

// Populate experience timeline
const experienceTimeline = document.getElementById('experience-timeline');
resumeData.experience.forEach(item => {
    experienceTimeline.appendChild(createTimelineItem(item, 'experience'));
});

// Populate education timeline
const educationTimeline = document.getElementById('education-timeline');
resumeData.education.forEach(item => {
    educationTimeline.appendChild(createTimelineItem(item, 'education'));
});

// Populate skills grid
const skillsContainer = document.getElementById('skills-container');
resumeData.skills.forEach(skill => {
    skillsContainer.appendChild(createSkillItem(skill));
});

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.main-nav');
    
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    header.insertBefore(menuButton, nav);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
};

// Initialize mobile menu on small screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    } else {
        const menuButton = document.querySelector('.mobile-menu-btn');
        if (menuButton) {
            menuButton.remove();
        }
        document.querySelector('.main-nav').classList.remove('active');
    }
});

// Add hover effect to pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-color);
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .main-nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--white);
            padding: 1rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .main-nav.active {
            display: block;
        }
        
        .main-nav ul {
            flex-direction: column;
            gap: 1rem;
        }
    }
`;
document.head.appendChild(style); 