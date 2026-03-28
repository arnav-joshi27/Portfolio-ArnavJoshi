const body = document.body;
const introSequence = document.getElementById('introSequence');
const stagePortfolio = document.getElementById('stagePortfolio');
const stageLoader = document.getElementById('stageLoader');
const stageAccess = document.getElementById('stageAccess');
const siteWrapper = document.getElementById('siteWrapper');

const loaderBarFill = document.getElementById('loaderBarFill');
const loaderPercentage = document.getElementById('loaderPercentage');
const loaderStatus = document.getElementById('loaderStatus');
const consoleLine1 = document.getElementById('consoleLine1');
const consoleLine2 = document.getElementById('consoleLine2');
const consoleLine3 = document.getElementById('consoleLine3');

const cursorDot = document.querySelector('.cursor-dot');
const mobileToggle = document.getElementById('mobileToggle');
const siteNav = document.getElementById('siteNav');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...document.querySelectorAll('main section')];
const revealElements = [...document.querySelectorAll('.reveal-up')];
const skillBars = [...document.querySelectorAll('.skill-bar span')];

body.style.overflow = 'hidden';

function switchStage(showStage) {
  [stagePortfolio, stageLoader, stageAccess].forEach((stage) => {
    if (stage === showStage) {
      stage.classList.add('active');
    } else {
      stage.classList.remove('active');
    }
  });
}

function startIntroSequence() {
  switchStage(stagePortfolio);

  setTimeout(() => {
    switchStage(stageLoader);
    startLoaderSequence();
  }, 2600);
}

function startLoaderSequence() {
  const statuses = [
    'Initializing modules...',
    'Decrypting visual assets...',
    'Linking identity systems...',
    'Rendering project matrix...',
    'Stabilizing motion layers...',
    'Finalizing interface...'
  ];

  const consoleMessages = [
    ['Injecting motion engine...', 'Rendering portfolio shell...', 'Synchronizing identity panel...'],
    ['Loading core stylesheets...', 'Mapping interactive cursor...', 'Preparing hero interface...'],
    ['Booting project cards...', 'Calibrating grid overlays...', 'Enabling section animations...'],
    ['Verifying communication panel...', 'Synchronizing experience nodes...', 'Checking mobile navigation...'],
    ['Optimizing visual hierarchy...', 'Authorizing access layer...', 'Final stability check...']
  ];

  let progress = 0;

  const timer = setInterval(() => {
    const increment = Math.floor(Math.random() * 6) + 3;
    progress = Math.min(progress + increment, 100);

    loaderBarFill.style.width = progress + '%';
    loaderPercentage.textContent = progress + '%';

    const stageIndex = Math.min(statuses.length - 1, Math.floor(progress / 20));
    loaderStatus.textContent = statuses[stageIndex];

    const consoleIndex = Math.min(consoleMessages.length - 1, Math.floor(progress / 25));
    const [line1, line2, line3] = consoleMessages[consoleIndex];
    consoleLine1.textContent = line1;
    consoleLine2.textContent = line2;
    consoleLine3.textContent = line3;

    if (progress >= 100) {
      clearInterval(timer);

      setTimeout(() => {
        switchStage(stageAccess);
      }, 500);

      setTimeout(() => {
        introSequence.classList.add('hidden');
        introSequence.style.pointerEvents = 'none';
        introSequence.style.display = 'none';
        stagePortfolio.style.pointerEvents = 'none';
        stageLoader.style.pointerEvents = 'none';
        stageAccess.style.pointerEvents = 'none';
        siteWrapper.classList.add('ready');
        siteWrapper.style.pointerEvents = 'auto';
        body.style.overflow = 'auto';
      }, 2100);
    }
  }, 110);
}

startIntroSequence();

/* Cursor */
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (cursorDot) {
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';

    const hoveredElement = document.elementFromPoint(mouseX, mouseY);

    if (hoveredElement && hoveredElement.closest('.red-zone')) {
      cursorDot.classList.add('on-red');
    } else {
      cursorDot.classList.remove('on-red');
    }
  }
});

/* Mobile Nav */
if (mobileToggle && siteNav) {
  mobileToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
    });
  });
}

/* Active Section */


/* Active Section - viewport based */
function updateActiveNav() {
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 80;
  const triggerLine = headerHeight + 40;

  let currentSectionId = '';

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= triggerLine && rect.bottom > triggerLine) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active', target === currentSectionId);
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);
window.addEventListener('resize', updateActiveNav);

/* Participation inline panel */
document.addEventListener('DOMContentLoaded', function () {
  const participationCards = document.querySelectorAll('.participation-card');
  const participationContents = document.querySelectorAll('.participation-content');
  const participationDisplay = document.getElementById('participationDisplay');

  participationCards.forEach((card) => {
    card.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);

      if (!targetContent || !participationDisplay) return;

      participationCards.forEach((item) => {
        item.classList.remove('active-card');
      });

      participationContents.forEach((content) => {
        content.classList.remove('active-content');
      });

      this.classList.add('active-card');
      targetContent.classList.add('active-content');
      participationDisplay.classList.add('show');

      requestAnimationFrame(() => {
        participationDisplay.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      });
    });
  });
});

/* Reveal Animations */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');

      if (entry.target.classList.contains('skill-card')) {
        const bar = entry.target.querySelector('.skill-bar span');
        if (bar) {
          bar.style.width = bar.dataset.width;
        }
      }
    }
  });
}, { threshold: 0.18 });

revealElements.forEach((element) => revealObserver.observe(element));
document.querySelectorAll('.skill-card').forEach((element) => revealObserver.observe(element));

/* Fallback skill bar animation if skill card already in viewport */
function initializeSkillBars() {
  skillBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      bar.style.width = bar.dataset.width;
    }
  });
}

window.addEventListener('load', initializeSkillBars);
window.addEventListener('resize', initializeSkillBars);

/* Force anchor/button interactions */
document.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href) return;

  if (href.startsWith('#')) {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return;
  }

  if (href.startsWith('mailto:') || href.startsWith('tel:')) {
    event.preventDefault();
    window.location.href = href;
    return;
  }

  if (href.startsWith('http://') || href.startsWith('https://')) {
    event.preventDefault();
    window.open(href, '_blank', 'noopener,noreferrer');
  }
});

/* Safety: ensure main site can receive clicks after intro */
window.addEventListener('load', () => {
  siteWrapper.style.pointerEvents = 'auto';
});
function createCyberStars() {
  const starLayer = document.getElementById('cyberStars');
  if (!starLayer) return;

  starLayer.innerHTML = '';
  const starCount = window.innerWidth < 768 ? 45 : 90;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('span');
    star.className = 'cyber-star';

    const sizeRand = Math.random();
    if (sizeRand < 0.33) star.classList.add('small');
    else if (sizeRand < 0.75) star.classList.add('medium');
    else star.classList.add('large');

    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + Math.random() * (window.innerHeight * 1.2);
    const driftX = (Math.random() - 0.5) * 220;
    const duration = 10 + Math.random() * 14;
    const delay = Math.random() * 12;

    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;
    star.style.setProperty('--drift-x', `${driftX}px`);
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;

    starLayer.appendChild(star);
  }
}

window.addEventListener('load', createCyberStars);
window.addEventListener('resize', createCyberStars);
const contactCards = document.querySelectorAll('.contact-connect-card');

contactCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  });
});