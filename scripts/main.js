const CHAPTER = document.getElementById('chapter');
const VERSE = document.getElementById('verse');

const getExodus = () => {
  fetch('http://app.readscripture.org/api/exodus.json')
  .then(res => res.json())
  .then(bookText => {
    CHAPTER.textContent = bookText.book + bookText.chapters[0].chapterNum;
    verseArray = bookText.chapters[0].verses.map(verseObj => verseObj.chardata);
    VERSE.textContent = verseArray.join(' ');
  }).catch(err => console.error(err))
}

getExodus();


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

footerNav = document.getElementById("footer-nav");

var showFooter = function() {
  var y = window.scrollY;
  if (y >= 800) {
    footerNav.className = "animated fadeInUp show"
  } else {
    footerNav.className = "animated fadeInUp"
  }
};


document.addEventListener('DOMContentLoaded', function() {
    var previous = document.getElementById('picker-previous');
    previous.addEventListener('click', function() {
        api.getPlan(api.getPlanDay() - 1);
        //refresh view
    });
    var next = document.getElementById('picker-next');
    next.addEventListener('click', function() {
        api.getPlan(api.getPlanDay() + 1);
        //refresh view
    });
    window.addEventListener("scroll", showFooter);
});
