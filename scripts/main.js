const handleChapterHeading = (headingNode, parentNode) => {
  const chapterHeader = document.createElement('h2');
  chapterHeader.setAttribute('class', 'chapterHeader');

  for (let i = 0; i < headingNode.length; i++) {
    chapterHeader.textContent += headingNode[i].text;
  }

  parentNode.appendChild(chapterHeader);
};

const handleChapterParagraphBreak = parentNode => {
  const paragraphBreak = document.createElement('span');
  paragraphBreak.setAttribute('class', 'paragraphBreak');
  parentNode.appendChild(paragraphBreak);
};

const handleChapterParagraphIndent = parentNode => {
  const paragraphIndent = document.createElement('span');
  paragraphIndent.setAttribute('class', 'paragraphIndent');
  paragraphIndent.textContent = '\t';
  parentNode.appendChild(paragraphIndent);
};

const handleChapterVerse = ({verseNum, content}, parentNode) => {
  // Create verse container span
  const verseContainer = document.createElement('span');
  verseContainer.setAttribute('class', 'verseContainer');

  // Create verse number and append to verse container
  const verseNumber = document.createElement('sup');
  verseNumber.setAttribute('class', 'verseNum');
  verseNumber.textContent = '  ' + verseNum + '  ';
  verseContainer.appendChild(verseNumber);

  // Create verse text container
  const verseTextContainer = document.createElement('span');
  verseTextContainer.setAttribute('class', 'verseTextContainer');

  // Initialize current parent node
  let currentParentNode = verseTextContainer;

  // Parse verse content chunks
  for (let i = 0, verseLen = content.length; i < verseLen; i++) {
      let verseChunk = document.createElement('span');

    if (content[i].class === "divine-name") {
      // Create verse text
      verseChunk.setAttribute('class', 'divineName');
      verseChunk.textContent = content[i].text;

    } else if (content[i].class === "indent") {
      verseChunk.setAttribute('class', 'indent');
      verseChunk.textContent = '\t';


    } else {
      switch(content[i].type) {
        case "text":
          verseChunk.setAttribute('class', 'verseTextChunk');
          verseChunk.textContent = content[i].text;
          break;
        case "beginDoubleQuote":
          verseChunk.setAttribute('class', 'beginDoubleQuote');
          verseChunk.textContent = '\u201C';
          break;
        case "endDoubleQuote":
          verseChunk.setAttribute('class', 'endDoubleQuote');
          verseChunk.textContent = '\u201D';
          break;
        case "beginSingleQuote":
          verseChunk.setAttribute('class', 'beginSingleQuote');
          verseChunk.textContent = '\u2018';
          break;
        case "endSingleQuote":
          verseChunk.setAttribute('class', 'endSingleQuote');
          verseChunk.textContent = '\u2019';
          break;
        case "endLine":
          verseChunk.setAttribute('class', 'endLine');
          break;
        case "beginLine":
          verseChunk.setAttribute('class', 'beginLine');
          break;
        case "beginWOC":
          verseChunk.setAttribute('class', 'WOC');
          currentParentNode = verseChunk;
          break;
        case "endWOC":
          if (currentParentNode.classList.contains('WOC')) {
            verseTextContainer.appendChild(currentParentNode);
            currentParentNode = verseTextContainer;
          }
          verseChunk.setAttribute('class', 'endWOC');
          break;
        case "beginParagraph":
          verseChunk.setAttribute('class', 'paragraphIndent');
          break;
        case "endParagraph":
          verseChunk.setAttribute('class', 'paragraphBreak');
          break;
        case "beginBlockIndent":
          verseChunk = document.createElement('div');
          verseChunk.setAttribute('class', 'block-indent');
          currentParentNode = verseChunk;
          break;
        case "endBlockIndent":
          if (currentParentNode !== verseTextContainer) {
            verseTextContainer.appendChild(currentParentNode);
            currentParentNode = verseTextContainer;
            handleChapterParagraphBreak(currentParentNode);
          }
          verseChunk.setAttribute('class', 'endBlockIndent');
          break;
        default:
      }
    }

    // Append verse chunk to parent node
    if (currentParentNode !== verseChunk) {
      currentParentNode.appendChild(verseChunk);
    } else {
      verseTextContainer.appendChild(verseChunk);
    }
  }


  // Append verse data to verse container
  verseContainer.appendChild(verseTextContainer);

  // Append verse container to chapter container
  parentNode.appendChild(verseContainer);
};

const fetchOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  credentials: 'omit'
};

// Initialize API object first
window.api = (function() {
  let read = Array();
  let watch = Array();
  let pray = Array();
  let planDay;
  let planDayLongForm;
  let chapterId;
  let chapterName;

  return {
    calculateDayOfYear: function() {
      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = now - start;
      return Math.floor(diff / 86400000);
    },
    getPlan: async function(day) {
      console.log(`Fetching plan for day: ${day}`);
      try {
        const response = await fetch(
          `https://readscripture-api.herokuapp.com/api/v1/days/${day}`,
          fetchOptions
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received plan data:', data);
        
        // Set the plan day
        planDay = day;
        
        // Reset arrays
        read = Array();
        watch = Array();
        pray = Array();
        
        // Set plan day long form
        planDayLongForm = `Reading for ${data.date}`;
        chapterId = data.chapterId;
        
        // Process day contents
        data.dayContents.forEach(content => {
          switch (content.type) {
            case 'read':
              read = content.passage;
              const readTitle = document.getElementById('menu-header-Read-Title');
              if (readTitle) readTitle.textContent = content.passage;
              break;
            case 'watch':
              watch.push(content);
              const watchHeader = document.getElementById('menu-header-Watch');
              const watchTitle = document.getElementById('menu-header-Watch-Title');
              if (watchHeader) watchHeader.textContent = 'Watch';
              if (watchTitle) watchTitle.textContent = content.passage;
              break;
            case 'pray':
              pray = content.passage;
              const prayTitle = document.getElementById('menu-header-Pray-Title');
              if (prayTitle) prayTitle.textContent = content.passage;
              break;
          }
        });

        return data;
      } catch (error) {
        console.error('Error fetching plan:', error);
        const dateElement = document.getElementById('date');
        if (dateElement) {
          dateElement.innerHTML = '<p>Error loading content. Please try refreshing.</p>';
        }
        throw error;
      }
    },
    getReadArray: () => read,
    getPrayArray: () => pray,
    getWatchArray: () => watch,
    getPlanDay: () => planDay,
    getPlanDayLongForm: () => planDayLongForm,
    getChapterName: () => chapterName,
    getChapterId: () => chapterId,
    getChapter: async function(id) {
      try {
        const response = await fetch(
          `https://readscripture-api.herokuapp.com/api/v1/chapters/${id}`,
          fetchOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        chapterName = data.title;
        return data;
      } catch (error) {
        console.error('Error fetching chapter:', error);
        throw error;
      }
    }
  };
})();

// First, define the helper functions
const getBookText = async (section, passage) => {
  if (!passage) {
    console.log('No passage provided');
    return;
  }
  
  try {
    console.log(`Fetching passage: ${passage}`);
    const response = await fetch(
      `https://readscripture-api.herokuapp.com/api/v1/passage?search=${encodeURIComponent(passage)}`,
      fetchOptions
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Received passage data:', data);
    
    const sectionDiv = document.getElementById(section);
    if (!sectionDiv) return;

    // Create chapter range header
    const chapterRange = document.createElement('h1');
    chapterRange.setAttribute('class', 'chapterRange');
    chapterRange.textContent = passage;
    sectionDiv.appendChild(chapterRange);

    // Process each chapter
    for (let i = 0; i < data.length; i++) {
      const chapterDiv = document.createElement('div');
      if (data[i].chapterNum) {
        const chapterHeader = document.createElement('h2');
        chapterHeader.setAttribute('class', 'chapterNumberHeader');
        chapterHeader.textContent = `Chapter ${data[i].chapterNum}`;
        chapterDiv.appendChild(chapterHeader);
      }
      
      // Process chapter content
      const contentDiv = document.createElement('div');
      let currentContainer = contentDiv;
      
      data[i].content.forEach(item => {
        switch (item.type) {
          case 'verse':
            renderVerse(item, currentContainer);
            break;
          case 'paragraph':
            renderParagraph(currentContainer);
            break;
          // Add other content type handlers as needed
        }
      });
      
      chapterDiv.appendChild(contentDiv);
      sectionDiv.appendChild(chapterDiv);
    }
  } catch (error) {
    console.error('Error fetching book text:', error);
    const sectionDiv = document.getElementById(section);
    if (sectionDiv) {
      sectionDiv.innerHTML = '<p>Error loading content. Please try refreshing.</p>';
    }
  }
};

// Helper functions for rendering content
const renderVerse = (verse, container) => {
  const verseContainer = document.createElement('span');
  verseContainer.setAttribute('class', 'verseContainer');

  // Add verse number
  const verseNum = document.createElement('sup');
  verseNum.setAttribute('class', 'verseNum');
  verseNum.textContent = `  ${verse.verseNum}  `;
  verseContainer.appendChild(verseNum);

  // Add verse content
  const textContainer = document.createElement('span');
  textContainer.setAttribute('class', 'verseTextContainer');
  
  verse.content.forEach(chunk => {
    const span = document.createElement('span');
    
    if (chunk.class === 'divine-name') {
      span.setAttribute('class', 'divineName');
    } else if (chunk.class === 'indent') {
      span.setAttribute('class', 'indent');
      chunk.text = '\t';
    }
    
    span.textContent = chunk.text;
    textContainer.appendChild(span);
  });

  verseContainer.appendChild(textContainer);
  container.appendChild(verseContainer);
};

const renderParagraph = (container) => {
  const span = document.createElement('span');
  span.setAttribute('class', 'paragraphBreak');
  container.appendChild(span);
};

// Function to handle navigation
const jumpTo = async (day) => {
  if (day > 365) day = 1;
  if (day < 0) day = 365;
  if (day % 1 !== 0) day = undefined;

  try {
    await api.getPlan(day);
    
    // Clear existing content
    const sections = ['read', 'watch', 'pray'].map(id => document.getElementById(id));
    sections.forEach(section => {
      if (section) section.innerHTML = '';
    });
    
    const footerNav = document.getElementById('footer-nav');
    if (footerNav) footerNav.className = '';

    // Update content
    const watchArray = api.getWatchArray();
    updateWatchSection(watchArray);
    
    await getBookText('read', api.getReadArray());
    await getBookText('pray', api.getPrayArray());

    // Update bookmark status
    const bookmark = document.getElementById('bookmark');
    if (bookmark) {
      const dayBookmark = localStorage.getItem('daybookmark');
      bookmark.className = api.getPlanDay() == dayBookmark ? 'active' : '';
    }

    // Update chapter info
    await api.getChapter(api.getChapterId());
    const chapterName = document.getElementById('chapterName');
    if (chapterName) chapterName.innerHTML = api.getChapterName();

    const dayLongForm = document.getElementById('dayLongForm');
    if (dayLongForm) dayLongForm.innerHTML = api.getPlanDayLongForm();
  } catch (error) {
    console.error('Error in jumpTo:', error);
  }
};

// Function to update watch section
const updateWatchSection = (watchArray) => {
  const watchContainer = document.getElementById('watch');
  const watchTitle = document.getElementById('menu-header-Watch-Title');
  
  if (!watchContainer || !watchTitle) return;

  watchArray.forEach(item => {
    const videoDiv = document.createElement('div');
    videoDiv.setAttribute('class', 'video');

    const title = document.createElement('h1');
    title.textContent = item.title;
    videoDiv.appendChild(title);

    const iframe = document.createElement('iframe');
    const videoUrl = item.youtubeUrl.replace('watch?v=', 'embed/');
    iframe.setAttribute('src', `${videoUrl}?hl=en&amp;autoplay=0&amp;cc_load_policy=0&amp;loop=0&amp;iv_load_policy=0&amp;fs=1&amp;showinfo=0`);
    iframe.setAttribute('width', '720');
    iframe.setAttribute('height', '480');
    videoDiv.appendChild(iframe);

    const description = document.createElement('p');
    description.textContent = item.watchDesc;
    videoDiv.appendChild(description);

    watchContainer.appendChild(videoDiv);
    watchTitle.textContent = item.title;
  });

  // Update watch header visibility
  ['watch-header', 'menu-header-Watch-Title', 'menu-header-Watch'].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.setAttribute('class', watchArray.length === 0 ? 'hide' : '');
    }
  });
};

// Initialize the app when DOM is ready
function initializeApp() {
  const today = api.calculateDayOfYear();
  jumpTo(today);

  // Add event listeners with null checks
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

  // Add event listeners only if elements exist
  Object.entries(elements).forEach(([key, element]) => {
    if (!element) return;

    switch (key) {
      case 'previous':
        element.addEventListener('click', () => {
          jumpTo(api.getPlanDay() - 1);
          if (elements.header) elements.header.className = '';
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        });
        break;
      case 'next':
        element.addEventListener('click', () => {
          jumpTo(api.getPlanDay() + 1);
          if (elements.header) elements.header.className = '';
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        });
        break;
      // Add other event listeners as needed
    }
  });

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
