export const scriptureRenderer = {
  renderChapterHeading(headingNode, parentNode) {
    const chapterHeader = document.createElement('h2');
    chapterHeader.setAttribute('class', 'chapterHeader');
  
    for (let i = 0; i < headingNode.length; i++) {
      chapterHeader.textContent += headingNode[i].text;
    }
  
    parentNode.appendChild(chapterHeader);
  },

  renderParagraphBreak(parentNode) {
    const paragraphBreak = document.createElement('span');
    paragraphBreak.setAttribute('class', 'paragraphBreak');
    parentNode.appendChild(paragraphBreak);
  },

  renderParagraphIndent(parentNode) {
    const paragraphIndent = document.createElement('span');
    paragraphIndent.setAttribute('class', 'paragraphIndent');
    paragraphIndent.textContent = '\t';
    parentNode.appendChild(paragraphIndent);
  },

  renderVerse({verseNum, content}, parentNode) {
    const verseContainer = document.createElement('span');
    verseContainer.setAttribute('class', 'verseContainer');
  
    const verseNumber = document.createElement('sup');
    verseNumber.setAttribute('class', 'verseNum');
    verseNumber.textContent = '  ' + verseNum + '  ';
    verseContainer.appendChild(verseNumber);
  
    const verseTextContainer = document.createElement('span');
    verseTextContainer.setAttribute('class', 'verseTextContainer');
  
    let currentParentNode = verseTextContainer;
  
    content.forEach(chunk => {
      let verseChunk = document.createElement('span');
  
      if (chunk.class === "divine-name") {
        verseChunk.setAttribute('class', 'divineName');
        verseChunk.textContent = chunk.text;
      } else if (chunk.class === "indent") {
        verseChunk.setAttribute('class', 'indent');
        verseChunk.textContent = '\t';
      } else {
        switch(chunk.type) {
          case "text":
            verseChunk.setAttribute('class', 'verseTextChunk');
            verseChunk.textContent = chunk.text;
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
              this.renderParagraphBreak(currentParentNode);
            }
            verseChunk.setAttribute('class', 'endBlockIndent');
            break;
        }
      }
  
      if (currentParentNode !== verseChunk) {
        currentParentNode.appendChild(verseChunk);
      } else {
        verseTextContainer.appendChild(verseChunk);
      }
    });
  
    verseContainer.appendChild(verseTextContainer);
    parentNode.appendChild(verseContainer);
  },

  renderWatchSection(watchArray) {
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
  
    ['watch-header', 'menu-header-Watch-Title', 'menu-header-Watch'].forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.setAttribute('class', watchArray.length === 0 ? 'hide' : '');
      }
    });
  }
}; 