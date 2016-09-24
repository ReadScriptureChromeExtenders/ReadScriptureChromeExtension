
// Get schedule

// Check date against schedule and get required verses

// Get verse text data and translate to HTML

const getBookText = ({book, startChapter, endChapter}) => {
  fetch(`http://app.readscripture.org/api/${book}.json`)
  .then(res => res.json())
  .then(bookText => {
    console.log(bookText);
    relevantChapters = bookText.chapters.slice(startChapter - 1, endChapter);

    // Create chapter range header
    const chapterRange = document.createElement('h1');
    chapterRange.setAttribute('id', 'chapterRange');
    chapterRange.textContent = `${book} ${startChapter} - ${endChapter}`;

    // Create chapter header and text for each chapter
    for (let i = 0, chaptersLen = relevantChapters.length; i < chaptersLen; i++) {
      const chapterDiv = document.createElement('div');
      // Create chapter header
      const chapterHeader = document.createElement('h2');
      chapterHeader.setAttribute('class', 'chapterHeader');
      chapterHeader.textContent = `Chapter ${startChapter}`;
      chapterDiv.appendChild(chapterHeader);

      // Create chapter text div
      const chapterText = document.createElement('div');

      const chapterVerseArray = chapterRange[i].verses;
      for (let j = 0, versesLen = chapterVerseArray.length; j < versesLen; j++) {

        // Create verse container span
        const verseContainer = document.createElement('span');
        verseContainer.setAttribute('class', 'verseContainer');

        // Create verse number
        const verseNum = document.createElement('sub');
        verseNum.setAttribute('class', 'verseNum');
        verseNum.textContent = i + 1;

        // Create verse text
        const verseText = document.createElement('p');
        verseText.textContent = chapterVerseArray[j].chardata;

        // Append verse data to verse container
        verseContainer.appendChild(verseNum);
        verseContainer.appendChild(verseText);
      }

      // Append chapter text to chapter div
      chapterDiv.appendChild(chapterText);

    }

    // Append chapter to content section
    document.getElementById('content').appendChild(chapterDiv);

  }).catch(err => console.error(err))
};

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
			  fetch(url)
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
		    				var chapters = tokens[1].split('-');
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
		    				var chapters = tokens[1].split('-');
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
    };
     
    return api;
}());

api.getPlan();
getBookText(api.getReadArray);
