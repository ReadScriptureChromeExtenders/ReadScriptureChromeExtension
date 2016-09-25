
// Get schedule

// Check date against schedule and get required verses

// Get verse text data and translate to HTML

const getBookText = ({book, start, end}) => {
  console.log(book, start, end);
  fetch(`http://app.readscripture.org/api/${book.toLowerCase()}.json`)
  .then(res => res.json())
  .then(bookText => {

    relevantChapters = bookText.chapters.slice(start - 1, end);

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
        verseText.textContent = chapterVerseArray[j].chardata;

        // Append verse data to verse container
        verseContainer.appendChild(verseNum);
        verseContainer.appendChild(verseText);

        // Append verse container to chapter container
        chapterContainer.appendChild(verseContainer);
      }

      // Append chapter container to chapter div
      chapterDiv.appendChild(chapterContainer);
      document.body.appendChild(chapterDiv);

      // Append chapter to content section
      document.getElementById('content').appendChild(chapterDiv);
    }

  }).catch(err => console.error(err))
};

/*refresh the view
function render() {
	var videos = api.getWatchArray();
	if()
	for(var i = 0)
}
*/


window.api = (function () {
    function Api (els) {

    }

    var read = Array();
    var watch = Array();
    var pray = Array();
    var planDay;
    var planDayLongForm;

    var api = {
        calculateDayOfYear: function (selector) {
        	var now = new Date();
			var start = new Date(now.getFullYear(), 0, 0);
			var diff = now - start;
			var oneDay = 1000 * 60 * 60 * 24;
			var day = Math.floor(diff / oneDay);
			return day;
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
			    planDayLongForm = daysJSON.date;
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
    };

    return api;
}());


footerNav = document.getElementById("footer-nav");

var showFooter = function() {
  var y = window.scrollY;
  var contentHeight = document.getElementsByTagName('body')[0].clientHeight;
  var windowHeight = window.innerHeight;

  if (y >= (contentHeight - windowHeight)) {
    footerNav.className = "show"
  } else {
    footerNav.className = ""
  }
};

api.getPlan()
.then(() => getBookText(api.getReadArray()));


/****** event listeners ******/
document.addEventListener('DOMContentLoaded', function() {
    var previous = document.getElementById('picker-previous');
    previous.addEventListener('click', function() {
        api.getPlan(api.getPlanDay() - 1);
        //render();
    });
    var next = document.getElementById('picker-next');
    next.addEventListener('click', function() {
        api.getPlan(api.getPlanDay() + 1);
        //render();
    });
    window.addEventListener("scroll", showFooter);
});
