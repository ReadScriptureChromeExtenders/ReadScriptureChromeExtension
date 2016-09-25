
// Get schedule

// Check date against schedule and get required verses

// Get verse text data and translate to HTML

const getBookText = ({book, start, end}) => {
  console.log(book, start, end);
  fetch(`http://app.readscripture.org/api/${book.toLowerCase()}.json`)
  .then(res => res.json())
  .then(bookText => {

    relevantChapters = bookText.chapters.slice(start - 1, end);
    var readDiv = document.getElementById('read');

    // Create chapter range header
    const chapterRange = document.createElement('h1');
    chapterRange.setAttribute('id', 'chapterRange');
    chapterRange.textContent = `${book} ${start} - ${end}`;

    // Create chapter header and text for each chapter
    for (let i = 0, chaptersLen = relevantChapters.length; i < chaptersLen; i++) {
      const chapterDiv = document.createElement('div');
      // Create chapter header
      const chapterHeader = document.createElement('h2');
      chapterHeader.setAttribute('class', 'chapterHeader');
      chapterHeader.textContent = `Chapter ${start + i}`;
      chapterDiv.appendChild(chapterHeader);

      // Create chapter text div
      const chapterContainer = document.createElement('div');

      const chapterVerseArray = relevantChapters[i].verses;
      for (let j = 0, versesLen = chapterVerseArray.length; j < versesLen; j++) {

        // Create verse container span
        const verseContainer = document.createElement('span');
        verseContainer.setAttribute('class', 'verseContainer');

        // Create verse number
        const verseNum = document.createElement('sub');
        verseNum.setAttribute('class', 'verseNum');
        verseNum.textContent = j + 1;

        // Create verse text
        const verseText = document.createElement('p');
        verseContainer.setAttribute('class', 'p');
        verseText.textContent = chapterVerseArray[j].chardata;

        // Append verse data to verse container
        verseContainer.appendChild(verseNum);
        verseContainer.appendChild(verseText);

        // Append verse container to chapter container
        chapterContainer.appendChild(verseContainer);
      }

      // Append chapter container to chapter div
      chapterDiv.appendChild(chapterContainer);
      readDiv.appendChild(chapterDiv);
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
		watchMenuDiv.appendChild(title);
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
			    planDayLongForm = 'Reading plan for: ' + daysJSON.date;
			    chapterId = daysJSON.chapterId;

			    for (var i = 0; i < numNodes; i++) {
			    	var node = daysJSON.dayContents[i];
		    		switch(node.type) {
		    			case "read":
		    				var tokens = node.passage.split(' ');
		    				var book = tokens[0];
		    				var chapterIndex = 1;
		    				if (tokens.length > 2) {
		    					book += ' ' + tokens[1];
		    					chapterIndex = 2;
		    				}
		    				var chapters = tokens[chapterIndex].split('-');
		    				var item = {
		    					'book' : book,
		    					'start' : chapters[0]
		    				};
		    				if(chapters.length > 1) {
		    					item.end = chapters[1];
		    				} else {
                  item.end = chapters[0];
                }
		    				read.push(item);
		    			break;
		    			case "watch":
		    				watch.push(node);
		    				break;
		    			break;
		    			case "pray":
		    				var tokens = node.passage.split(' ');
		    				var book = tokens[0];
		    				var chapterIndex = 1;
		    				if (tokens.length > 2) {
		    					book += ' ' + tokens[1];
		    					chapterIndex = 2;
		    				}
		    				var chapters = tokens[chapterIndex].split('-');
		    				var item = {
		    					'book' : book,
		    					'start' : chapters[0]
		    				};
		    				if(chapters.length > 1) {
		    					item.end = chapters[1];
		    				} else {
                  item.end = chapters[0];
                }
		    				pray.push(item);
		    			break;

		    			default:
		    		}
			    }
			  }).catch(err => console.error(err))
	        },

        getReadArray: function (selector) {
        	return read[0];
        },

        getPrayArray: function (selector) {
        	return pray[0];
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
        	var footerNav = document.getElementById("footer-nav");
        	footerNav.className = ""
        }
        	)
        .then(() => {
        	renderWatchText(api.getWatchArray());
        	getBookText(api.getReadArray());
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
});
