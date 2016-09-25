const handleChapterHeading = (headingText, parentNode) => {
  console.log("this > ", parentNode);
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

const handleChapterVerse = ({verseNum, content}, parentNode) => {
  console.log(verseNum, content);
  // Create verse container span
  const verseContainer = document.createElement('span');
  verseContainer.setAttribute('class', 'verseContainer');

  // Create verse number and append to verse container
  const verseNumber = document.createElement('sup');
  verseNumber.setAttribute('class', 'verseNum');
  verseNumber.textContent = ' ' + verseNum + ' ';
  verseContainer.appendChild(verseNumber);

  // Create verse text container
  const verseTextContainer = document.createElement('span');
  verseTextContainer.setAttribute('class', 'verseTextContainer');

  // Parse verse content chunks
  for (let i = 0, verseLen = content.length; i < verseLen; i++) {
    let verseChunk;
    if (content[i].class === "divine-name") {
      // Create verse text
      verseChunk = document.createElement('span');
      verseChunk.setAttribute('class', 'divineName');
      verseChunk.textContent = content[i].text;

    } else {
      switch(content[i].type) {
        case "text":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'verseTextChunk');
          verseChunk.textContent = content[i].text;
          break;
        case "beginDoubleQuote":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'beginDoubleQuote');
          verseChunk.textContent = '"';
          break;
        case "endDoubleQuote":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'endDoubleQuote');
          verseChunk.textContent = '"';
          break;
        case "beginSingleQuote":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'beginSingleQuote');
          verseChunk.textContent = '\'';
          break;
        case "endSingleQuote":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'endSingleQuote');
          verseChunk.textContent = '\'';
          break;
        case "endLine":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'endLine');
          break;
        case "beginLine":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'beginLine');
          break;
        case "beginWOC":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'beginWOC');
          break;
        case "endWOC":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'endWOC');
          break;
        case "beginParagraph":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'beginParagraph');
          break;
        case "endParagraph":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'endParagraph');
          break;
        case "beginBlockIndent":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'beginBlockIndent');
          break;
        case "endBlockIndent":
          verseChunk = document.createElement('span');
          verseChunk.setAttribute('class', 'endBlockIndent');
          break;
        default:
      }
    }

    // Append verse chunk to parent node
    verseTextContainer.appendChild(verseChunk);
  }


  // Append verse data to verse container
  verseContainer.appendChild(verseNumber);
  verseContainer.appendChild(verseTextContainer);

  // Append verse container to chapter container
  parentNode.appendChild(verseContainer);
};

const getBookText = (section, passage) => {
  console.log(section, passage);
  fetch(`https://readscripture-api.herokuapp.com/api/v1/passage?search=${passage}`)
  .then(res => res.json())
  .then(bookText => {
    console.log(bookText);
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

      const chapterContentArray = bookText[i].content;
      for (let j = 0, versesLen = chapterContentArray.length; j < versesLen; j++) {
        const type = chapterContentArray[j].type;

        // Check for content type
        switch(type) {
          case "heading":
            handleChapterHeading(chapterContentArray[j].content[0].text, chapterContainer);
            break;
          case "beginParagraph":
            handleChapterParagraphBreak(chapterContainer);
            break;
          case "beginBlockIndent":
            handleChapterParagraphBreak(chapterContainer);
            break;
          case "verse":
            handleChapterVerse(chapterContentArray[j], chapterContainer);
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
  var watchMenuDiv = document.getElementById('menu-item-watch');
  var numWatches = watchArray.length;
  for(var i = 0; i < numWatches; i++ ) {

    //main content
    var video = document.createElement('div');
    video.setAttribute('class', 'video');
    var title = document.createElement('h5');
    title.textContent = watchArray[i].title;
    video.appendChild(title);
    var iframe = document.createElement('iframe');
    // we get back a direct url instead of an embed url which doesn't work in this context
    var url = watchArray[i].youtubeUrl.replace('watch?v=','embed/');
    iframe.setAttribute('src', url + "?hl=en&amp;autoplay=0&amp;cc_load_policy=0&amp;loop=0&amp;iv_load_policy=0&amp;fs=1&amp;showinfo=0");
    iframe.setAttribute('width', '640');
    iframe.setAttribute('height', '390');
    video.appendChild(iframe);
    var desc = document.createElement('span');
    desc.textContent = watchArray[i].watchDesc;
    video.appendChild(desc);
    watchDiv.appendChild(video);

    //menu content
    var mtitle = document.createElement('h1');
    mtitle.textContent = watchArray[i].title;
    watchMenuDiv.appendChild(mtitle);
  }

  //most days don't have videos
  var header = document.getElementById('watch-header');
  var menuheader = document.getElementById('menu-item-watch-header');
  if(numWatches == 0) {
    header.setAttribute('class','hide');
    menuheader.setAttribute('class','hide');
  } else {
    header.setAttribute('class','');
    menuheader.setAttribute('class','');
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
              break;
              case "watch":
                watch.push(node);
                break;
              break;
              case "pray":
                pray = node.passage;
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
      document.getElementById('menu-item-watch').innerHTML = '';
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
    previous.addEventListener('click', function() {
      jumpTo(api.getPlanDay() - 1);
    });
    var next = document.getElementById('picker-next');
    next.addEventListener('click', function() {
        jumpTo(api.getPlanDay() + 1);
    });
    var header = document.getElementById('header');
    var logo = document.getElementById('logo');
    logo.addEventListener('click', function() {
        if (header.className == 'hover') {
            header.className = '';
        } else {
            header.className = 'hover';
        }
    });
    var menu = document.getElementById('menu');
    menu.addEventListener('click', function() {
        header.className = '';
    });
    window.addEventListener("scroll", showFooter);
    window.addEventListener("scroll", hideDate);
});
