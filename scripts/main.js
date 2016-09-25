const handleChapterHeading = (headingText, parentNode) => {
  const chapterHeader = document.createElement('h2');
  chapterHeader.setAttribute('class', 'chapterHeader');
  chapterHeader.textContent = headingText;
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
          verseChunk.setAttribute('class', 'beginWOC');
          break;
        case "endWOC":
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
            chapterContainer.appendChild(currentParentNode);
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

const getBookText = (section, passage) => {
  fetch(`https://readscripture-api.herokuapp.com/api/v1/passage?search=${passage}`)
  .then(res => res.json())
  .then(bookText => {
    const sectionDiv = document.getElementById(section);

    // Create chapter range header
    const chapterRange = document.createElement('h1');
    chapterRange.setAttribute('class', 'chapterRange');
    chapterRange.textContent = passage;
    sectionDiv.appendChild(chapterRange);

    // Create chapter header and text for each chapter
    for (let i = 0, chaptersLen = bookText.length; i < chaptersLen; i++) {
      const chapterDiv = document.createElement('div');

      // Create chapter header
      const chapterNumberHeader = document.createElement('h2');
      chapterNumberHeader.setAttribute('class', 'chapterNumberHeader');
      chapterNumberHeader.textContent = `Chapter ${bookText[i].chapterNum}`;
      chapterDiv.appendChild(chapterNumberHeader);

      // Create chapter text div
      const chapterContainer = document.createElement('div');

      // Default dynamic parent node to pass to functions based on previous syntax bits
      let currentParentNode = chapterContainer;

      const chapterContentArray = bookText[i].content;
      for (let j = 0, versesLen = chapterContentArray.length; j < versesLen; j++) {
        const type = chapterContentArray[j].type;

        // Check for content type
        switch(type) {
          case "heading":
            handleChapterHeading(chapterContentArray[j].content[0].text, currentParentNode);
            break;
          case "beginParagraph":
            handleChapterParagraphIndent(currentParentNode);
            break;
          case "endParagraph":
            handleChapterParagraphBreak(currentParentNode);
            console.log(j, chapterContentArray);
            break;
          case "beginBlockIndent":
            const blockIndentContainer = document.createElement('div');
            blockIndentContainer.setAttribute('class', 'block-indent');
            currentParentNode = blockIndentContainer;
            break;
          case "endBlockIndent":
            if (currentParentNode !== chapterContainer) {
              chapterContainer.appendChild(currentParentNode);
              currentParentNode = chapterContainer;
              handleChapterParagraphBreak(currentParentNode);
            }
            break;
          case "verse":
            handleChapterVerse(chapterContentArray[j], currentParentNode);
            break;
          default:
        }
      }

      // Append chapter container to chapter div
      chapterDiv.appendChild(chapterContainer);
      sectionDiv.appendChild(chapterDiv);
    }
  }).catch(err => console.error(err))
};

function renderWatchText(watchArray) {
  var watchDiv = document.getElementById('watch');
  var watchMenuH1 = document.getElementById('menu-header-Watch-Title');
  var numWatches = watchArray.length;
  for(var i = 0; i < numWatches; i++ ) {

    //main content
    var video = document.createElement('div');
    video.setAttribute('class', 'video');
    var title = document.createElement('h1');
    title.textContent = watchArray[i].title;
    video.appendChild(title);
    var iframe = document.createElement('iframe');
    // we get back a direct url instead of an embed url which doesn't work in this context
    var url = watchArray[i].youtubeUrl.replace('watch?v=','embed/');
    iframe.setAttribute('src', url + "?hl=en&amp;autoplay=0&amp;cc_load_policy=0&amp;loop=0&amp;iv_load_policy=0&amp;fs=1&amp;showinfo=0");
    iframe.setAttribute('width', '720');
    iframe.setAttribute('height', '480');
    video.appendChild(iframe);
    var desc = document.createElement('p');
    desc.textContent = watchArray[i].watchDesc;
    video.appendChild(desc);
    watchDiv.appendChild(video);

    //menu content
    watchMenuH1.textContent = watchArray[i].title;
  }

  //most days don't have videos
  var header = document.getElementById('watch-header');
  var menuHeader = document.getElementById('menu-header-Watch-Title');
  var menuTitle = document.getElementById('menu-header-Watch');
  if(numWatches == 0) {
    header.setAttribute('class','hide');
    menuHeader.setAttribute('class','hide');
    menuTitle.setAttribute('class','hide');
  } else {
    header.setAttribute('class','');
    menuHeader.setAttribute('class','');
    menuTitle.setAttribute('class','');
  }
}

window.api = (function () {
    function Api (els) {

    }

    var read = Array();
    var watch = Array();
    var pray = Array();
    var planDay;
    var planDayLongForm;
    var chapterId;
    var chapterName;

    var api = {
        calculateDayOfYear: function (selector) {
          var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = now - start;
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.floor(diff / oneDay);
      return day;
        },

        getChapter: function (chapterId) {
          var url  = 'https://readscripture-api.herokuapp.com/api/v1/chapters/' + chapterId;
        return fetch(url)
        .then(res => res.json())
        .then(chapterJSON => {
          chapterName = chapterJSON.title;
        }
        ).catch(err => console.error(err))
        },

        getPlan: function (specificDay) {

          var day = this.calculateDayOfYear();
          if(specificDay) {
            day = specificDay;
          }
          planDay = day;

          var url  = 'https://readscripture-api.herokuapp.com/api/v1/days/' + day;
        return fetch(url)
        .then(res => res.json())
        .then(daysJSON => {
          console.log(daysJSON);
          read = Array();
            watch = Array();
            pray = Array();
          var numNodes = daysJSON.dayContents.length;
          planDayLongForm = 'Reading for ' + daysJSON.date;
          chapterId = daysJSON.chapterId;

          for (var i = 0; i < numNodes; i++) {
            var node = daysJSON.dayContents[i];
            switch(node.type) {
              case "read":
                read = node.passage;
                document.getElementById('menu-header-Read-Title').textContent = node.passage;
              break;
              case "watch":
                watch.push(node);
                document.getElementById('menu-header-Watch').textContent = "Watch";
                document.getElementById('menu-header-Watch-Title').textContent = node.passage;
                break;
              break;
              case "pray":
                pray = node.passage;
                document.getElementById('menu-header-Pray-Title').textContent = node.passage;
              break;

              default:
            }
          }
        }).catch(err => console.error(err))
          },

        getReadArray: function (selector) {
          return read;
        },
        getPrayArray: function (selector) {
          return pray;
        },
        getWatchArray: function (selector) {
          return watch;
        },
        getPlanDay: function (selector) {
          return planDay;
        },
        getPlanDayLongForm: function (selector) {
          return planDayLongForm;
        },
        getChapterName: function (selector) {
          return chapterName;
        },
        getChapterId: function (selector) {
          return chapterId;
        }
    };

    return api;
}());

function jumpTo(day) {
  if (day > 365) {
    day = 1;
  } else if (day < 0) {
    day = 365;
  }
  api.getPlan(day)
    .then(() => {
      document.getElementById('read').innerHTML = '';
      document.getElementById('watch').innerHTML = '';
      document.getElementById('pray').innerHTML = '';
      // document.getElementById('menu-item-watch').innerHTML = '';
      var footerNav = document.getElementById("footer-nav");
      footerNav.className = ""
    }
      )
    .then(() => {
      renderWatchText(api.getWatchArray());
      getBookText('read', api.getReadArray());
      getBookText('pray', api.getPrayArray());
      api.getChapter(api.getChapterId())
      .then(() => {
        document.getElementById('chapterName').innerHTML = api.getChapterName();
      });;
      document.getElementById('dayLongForm').innerHTML = api.getPlanDayLongForm();
    })
}


function showFooter () {
  var footerNav = document.getElementById("footer-nav");
  var y = window.scrollY;
  var contentHeight = document.getElementsByTagName('body')[0].clientHeight;
  var windowHeight = window.innerHeight;

  if (y >= (contentHeight - windowHeight)) {
    footerNav.className = "show"
  } else {
    footerNav.className = ""
  }
};

function hideDate() {
  var date = document.getElementById("date");
  var y = window.scrollY;
  if (y >= 16) {
    date.style.opacity = '1' - y / 40;
  } else {
    date.style.opacity = '1';
  }
};

jumpTo();

/****** event listeners ******/
document.addEventListener('DOMContentLoaded', function() {
    var previous = document.getElementById('picker-previous');
    var next = document.getElementById('picker-next');
    var header = document.getElementById('header');
    var logo = document.getElementById('logo');
    var footerNav = document.getElementById("footer-nav");

    previous.addEventListener('click', function() {
      jumpTo(api.getPlanDay() - 1);
      header.className = '';
    });

    next.addEventListener('click', function() {
        jumpTo(api.getPlanDay() + 1);
        header.className = '';
    });

    logo.addEventListener('click', function() {
        if (header.className == 'hover') {
            header.className = '';
        } else {
            header.className = 'hover';
            footerNav.className = "";
        }
    });
    var menu = document.getElementById('menu');
    menu.addEventListener('click', function() {
        header.className = '';
    });
    window.addEventListener("scroll", showFooter);
    window.addEventListener("scroll", hideDate);
});
