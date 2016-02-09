var sections = ['home', 'club', 'instructor', 'location', 'calendar', 'links', 'gallery'];
var mainDiv, secretDiv;

// called after page is loaded to set globals and
// to fix ie related UI issues
function initialize() {
	// fix the left margin of the club logo for ie based browsers
	if(document.all)
		$('club-logo').style.marginLeft = 10 + 'px';
	// some variables often referenced in the below functions
	mainDiv = $('main');
	secretDiv = $('secret');
	//show the current training schedule
	updateSchedule(document.getElementsByName('weeks')[0]);	
}

// tab switching script adapted from DHTML tabs tutorial @ www.BrainJar.com	
function switchTab(id, linkNo) {
	var contentPane;
	contentPane = $(id);

	// hide all panes except the one that was clicked
	for(var i = 0; i < sections.length; i++)
		$(sections[i]).style.display = "none";
	contentPane.style.display = "";

	// highlight clicked tab, blur others
	var anchorList = document.getElementsByTagName("a");
	for(i = 0; i < anchorList.length; i++) {
		if(anchorList[i] == document.getElementsByTagName("a")[linkNo]) {
			anchorList[i].className += " activeTab";
			anchorList[i].blur();
		}
		else
			removeClass(anchorList[i], "activeTab");
	}
}

// utility method to dynamically remove class names from div tags
// courtesy of www.BrainJar.com
function removeClass(anchorObj, classStr) {
	var newClasses = new Array();
	var currClasses = anchorObj.className.split(" ");
	var i;
	for(i = 0; i < currClasses.length; i++) {
		if(currClasses[i] != classStr)
			newClasses.push(currClasses[i]);
	}
	anchorObj.className = newClasses.join(" ");
}

// when a thumbnail is clicked, make background dim and
// unhide invisible div containing larger image source
function changeOpacity(opacity, imgSrc, shiftBackPixels) {
	// set background opacity to a dimming value and position the
	// hidden div some offset from the current y-scroll position
	if(document.getElementById && !document.all) { // for mozilla browsers
		mainDiv.style.MozOpacity = opacity;
		secretDiv.style.top = window.pageYOffset + 100 + 'px';
	}
	else { // for ie
		mainDiv.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
		secretDiv.style.top = document.body.scrollTop + 100 + 'px';
	}
	// set the x-scroll position so that image appears centered
	secretDiv.style.left = screen.width/2 - shiftBackPixels + 'px';
	// show the larger image in the hidden div and unhide the div
	$('secretImg').src = imgSrc;
	secretDiv.style.visibility = "visible";
}

// close the larger image and clear transparency
function close() {	
	$('secretImg').src = '';
	secretDiv.style.visibility = "hidden";
	// reset the opacity to shift focus back to main site contents
	if(document.getElementById && !document.all)
		mainDiv.style.MozOpacity = '1.0';
	else
		mainDiv.style.filter = 'alpha(opacity=' + 100 + ')';
}

/* This method displays the training schedule for the
 * week selected from the drop-down.
 * When the schedule is varying the drop-down is enabled in the 
 * html file, and this method is called on page-load to display 
 * the schedule for the current week (marked by selected="yes" 
 * in the <option> tag).
 * Subsequent invocations of this method are a result of selecting 
 * a different week from the drop-down.
 * When the schedule is constant, the drop-down is disabled in
 * the html file and this method is not called on page-load.
 */
function updateSchedule(weeksList) {
	var days = ['mon', 'wed', 'fri', 'sat'];
	var rooms = [
		"Room B1, Redwood Hall",
    "Burbank Room, USU",
    "Lake View Terrace Room, USU",
		"West Valley Room, USU",
		"Flintridge Room, USU",
		"Thousand Oaks Room, USU",
		"Lawn South of Redwood Hall"
	];
	var times = [
		// regular
		"7:00pm - 9:00pm",
		"12:00pm - 2:00pm",
		// First 3 weeks of Spring
		"7:00pm - 8:30pm",
		"12:00pm - 1:30pm"
	];
		
	week = parseInt(weeksList.options[weeksList.selectedIndex].value);
	var roomSchedule = [
		{"mon" : rooms[0], "wed" : rooms[1], "fri" : rooms[1], "sat" : rooms[2]},
		{"mon" : rooms[0], "wed" : rooms[1], "fri" : rooms[1], "sat" : rooms[1]}
	];
	var timeSchedule = [
		{"mon" : times[2], "wed" : times[0], "fri" : times[0], "sat" : times[1]},
		{"mon" : times[2], "wed" : times[0], "fri" : times[0], "sat" : times[1]}
	];
	
	for(var i = 0; i < days.length; i++) {
		$(days[i] + '-room').innerHTML = roomSchedule[week][days[i]];
		$(days[i] + '-time').innerHTML = timeSchedule[week][days[i]];
	}
}

// wrapper for document.getElementById()
function $(id) {
	return document.getElementById(id);
}