import { scriptureApi } from './api/scripture-api.js';
import { scriptureRenderer } from './components/scripture-renderer.js';
import { stateManager } from './utils/state-manager.js';

const showError = (message, containerId = 'read') => {
  const container = document.getElementById(containerId);
  if (container) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    
    // Create error content
    const heading = document.createElement('h3');
    heading.textContent = '⚠️ Something went wrong';
    
    const text = document.createElement('p');
    text.textContent = message;
    
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    retryButton.addEventListener('click', () => {
      const currentDay = stateManager.getPlanDay() || scriptureApi.calculateDayOfYear();
      jumpTo(currentDay);
    });
    
    // Append elements
    errorDiv.appendChild(heading);
    errorDiv.appendChild(text);
    errorDiv.appendChild(retryButton);
    
    container.innerHTML = '';
    container.appendChild(errorDiv);
  }
};

const getBookText = async (section, passage) => {
  if (!passage) {
    console.log('No passage provided');
    return;
  }
  
  try {
    const data = await scriptureApi.getPassage(passage);
    
    const sectionDiv = document.getElementById(section);
    if (!sectionDiv) return;

    // Create chapter range header
    const chapterRange = document.createElement('h1');
    chapterRange.setAttribute('class', 'chapterRange');
    chapterRange.textContent = passage;
    sectionDiv.appendChild(chapterRange);

    // Process each chapter
    data.forEach(chapter => {
      const chapterDiv = document.createElement('div');
      if (chapter.chapterNum) {
        const chapterHeader = document.createElement('h2');
        chapterHeader.setAttribute('class', 'chapterNumberHeader');
        chapterHeader.textContent = `Chapter ${chapter.chapterNum}`;
        chapterDiv.appendChild(chapterHeader);
      }
      
      const contentDiv = document.createElement('div');
      
      chapter.content.forEach(item => {
        switch (item.type) {
          case 'verse':
            scriptureRenderer.renderVerse(item, contentDiv);
            break;
          case 'paragraph':
            scriptureRenderer.renderParagraphBreak(contentDiv);
            break;
        }
      });
      
      chapterDiv.appendChild(contentDiv);
      sectionDiv.appendChild(chapterDiv);
    });
  } catch (error) {
    console.error('Error fetching book text:', error);
    showError(error.message, section);
  }
};

const jumpTo = async (day) => {
  // Validate day parameter
  const validDay = Math.min(Math.max(1, Math.floor(day) || 1), 365);
  
  try {
    const planData = await scriptureApi.getPlan(validDay);
    stateManager.setPlanData(planData);
    
    // Clear existing content
    ['read', 'watch', 'pray'].forEach(id => {
      const section = document.getElementById(id);
      if (section) section.innerHTML = '';
    });
    
    const footerNav = document.getElementById('footer-nav');
    if (footerNav) footerNav.className = '';

    // Update content
    scriptureRenderer.renderWatchSection(stateManager.getWatchArray());
    
    await getBookText('read', stateManager.getReadArray());
    await getBookText('pray', stateManager.getPrayArray());

    // Update bookmark status
    const bookmark = document.getElementById('bookmark');
    if (bookmark) {
      const dayBookmark = localStorage.getItem('daybookmark');
      bookmark.className = stateManager.getPlanDay() == dayBookmark ? 'active' : '';
    }

    // Update chapter info
    const chapterData = await scriptureApi.getChapter(stateManager.getChapterId());
    stateManager.setChapterName(chapterData.title);

    const dayLongForm = document.getElementById('dayLongForm');
    if (dayLongForm) {
      dayLongForm.innerHTML = stateManager.getPlanDayLongForm();
    }
  } catch (error) {
    console.error('Error in jumpTo:', error);
    showError(error.message);
  }
};

// Initialize the app when DOM is ready
function initializeApp() {
  const today = scriptureApi.calculateDayOfYear();
  jumpTo(today);

  // Add event listeners
  const elements = {
    previous: document.getElementById('picker-previous'),
    next: document.getElementById('picker-next'),
    header: document.getElementById('header'),
    logo: document.getElementById('logo'),
    footerNav: document.getElementById('footer-nav'),
    bookmark: document.getElementById('bookmark'),
    menu: document.getElementById('menu'),
    date: document.getElementById('date')
  };

  // Navigation handlers
  const handleNavigation = (direction) => {
    const currentDay = stateManager.getPlanDay() || scriptureApi.calculateDayOfYear();
    const nextDay = currentDay + direction;
    jumpTo(nextDay);
    if (elements.header) elements.header.className = '';
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  if (elements.previous) {
    elements.previous.addEventListener('click', () => handleNavigation(-1));
  }

  if (elements.next) {
    elements.next.addEventListener('click', () => handleNavigation(1));
  }

  // Add scroll handlers
  window.addEventListener('scroll', () => {
    if (elements.footerNav) {
      elements.footerNav.className = window.scrollY >= document.body.clientHeight - window.innerHeight ? 'show' : '';
    }
    if (elements.date) {
      elements.date.style.opacity = window.scrollY >= 16 ? `${1 - window.scrollY/40}` : '1';
    }
  });
}

// Initialize only when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
} 