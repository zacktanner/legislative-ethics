$(document).ready(function() {
	var senString = "";
	var houseString = "";
	//Senate
	$.post("php/getSenators.php", function(data){ 
	  
	  //ISOTOPE
	  var $container = $('.lawmakers .senate'),
      filters = {};
		var $container2 = $('.lawmakers .house'),
      filters = {};
	  $container.isotope({
		itemSelector : '.info'
	  });
	  $container2.isotope({
		itemSelector : '.info'
	  });
	  
	  var iso = $container.data('isotope');
	  $container.isotope( 'reveal', iso.items );
	  var iso2 = $container2.data('isotope');
	  $container2.isotope( 'reveal', iso2.items );
	  
		
	   // reveal all items after init
		// filter buttons
	  $('select').change(function(){
		var $this = $(this);
		
		// store filter value in object
		var group = $this.attr('data-filter-group');
		
		filters[ group ] = $this.find(':selected').attr('data-filter-value');
		//console.log( $this.find(':selected') )
		// convert object into array
		var isoFilters = [];
		for ( var prop in filters ) {
		  isoFilters.push( filters[ prop ] )
		}
		//console.log(filters);
		var selector = isoFilters.join('');
		$container.isotope({ filter: selector });
		$container2.isotope({ filter: selector });
		return false; //END ISOTOPE
	  });
	  
	  $.post("php/getCounties.php", function(data){ //grab data from database via php
			var obj = jQuery.parseJSON(data);
			var objLowerCase;
			for (var i=0; i< obj.length; i++) {
				objLowerCase = obj[i].toLowerCase();
				$('#county').append("<option value='#filter-county-" + objLowerCase + "' data-filter-value='." + objLowerCase + "'>" + obj[i] + "</option>\n");
			}
		});
		var obj = jQuery.parseJSON(data);
		
		for (var i=0; i< obj.length; i++) {
			nameBackward = obj[i].Name;
			var res = nameBackward.split(", ");
			var nameForward = res[1] + " " + res[0];
			var lastNameLowerCase = res[0].toLowerCase();
			var photo = "img/s-" + lastNameLowerCase + ".jpg";
			var party = obj[i].Party;
			var partyAbbrev;
			if (party == "R") { partyAbbrev = "rep";}
			if (party == "D") { partyAbbrev = "dem";}
			var county = obj[i].County;
			county = county.toLowerCase();
			var committees = obj[i].Committees;
			var arrCommittees = committees.split("; ");
			var strCommittees = "";
			for (var j = 0; j< arrCommittees.length; j++) {
				strCommittees += '<li>' + arrCommittees[j] + '</li>\n';
			}
			var interests = obj[i].Outside_interests;
			var arrInterests = interests.split("; ");
			var strInterests = "";
			if (arrInterests[0] != "") {
				for (var k = 0; k < arrInterests.length; k++) {
					strInterests += '<li>' + arrInterests[k] + '</li>\n';
				}
			} else {
				strInterests = "Some senators and representatives reported no outside income or only income related to a spouse's job or regular investments. In those cases, this column was left blank.";
			}
			
			senString += '<div class="info ' + partyAbbrev + ' ' + county + '">\
					<img src="' + photo + '" >\
						<div class="data">\
							<div class="name">'+ nameForward + '</div>\
							<div class="party">' + party + '</div> - \
							<div class="from">' + obj[i].Neighborhood + '</div>\
							<div class="click-show"><a href="#" id="info3'+ lastNameLowerCase + '-show" class="showLink" onclick="showHide(\'info3'+ lastNameLowerCase + '\');return false;">Click To Show</a></div></div></a>\
					<div class="clear"></div>\
					<div id="info3'+ lastNameLowerCase + '" class="more popup">\
						<table class="info-table">\
							<tr class="table-pop"><th>Committees</th><th>Outside interests</th></tr>\
								<tr>\
									<td>\
										<ul class="committees">'
											+ strCommittees + 
										'</ul>\
									</td>\
									<td>\
										<ul class="interests">'
											+ strInterests + 
										'</ul>\
										<br/>\
									</td>\
								</tr>\
						</table>\
						<a href="#" id="info3'+ lastNameLowerCase + '-hide" class="hideLink" onclick="showHide(\'info3'+ lastNameLowerCase + '\');return false;">Click To Hide</a>\
					</div>\
			</div>';
			//var $newItems = $('<div class="right senate"><h2>Senate</h2>');
			
		}
		var $newItems = $(senString);
		$('.lawmakers .senate').isotope( 'insert', $newItems );
	//House
	$.post("php/getRepresentatives.php", function(data){ 
		var obj = jQuery.parseJSON(data);
		for (var i=0; i< obj.length; i++) {
			nameBackward = obj[i].Name;
			var res = nameBackward.split(", ");
			var nameForward = res[1] + " " + res[0];
			var splitLast = res[0].split(" ");
			var photo;
			
			var lastNameLowerCase = res[0].toLowerCase();
			var firstNameFirstLetter = res[1].charAt(0);
			firstNameFirstLetter = firstNameFirstLetter.toLowerCase();
			var photo = "img/h-" + lastNameLowerCase + ".jpg";
			if ((lastNameLowerCase == 'boyle') ||  (lastNameLowerCase == 'brown') ||  (lastNameLowerCase == 'costa') || (lastNameLowerCase == 'daley') || (lastNameLowerCase == 'harris') || (lastNameLowerCase == 'keller') || (lastNameLowerCase == 'miller')){
				photo = "img/h-" + lastNameLowerCase + firstNameFirstLetter + ".jpg";
			}
			if (lastNameLowerCase.charAt(1) == "'") {
				lastNameLowerCase = lastNameLowerCase.replace("'", "");
				photo = "img/h-" + lastNameLowerCase + ".jpg";
			}
			if ((splitLast[1] == "Jr.") || (splitLast[1] == "Sr.")){
				//console.log(lastNameLowerCase);
				var suffix = splitLast[1];
				nameForward = res[1] + " " + splitLast[0] + " " + suffix;
				lastNameLowerCase = splitLast[0].toLowerCase();
				photo = "img/h-" + lastNameLowerCase + ".jpg";
			}
			var party = obj[i].Party;
			var partyAbbrev;
			if (party == "R") { partyAbbrev = "rep";}
			if (party == "D") { partyAbbrev = "dem";}
			var county2 = obj[i].County;
			county2 = county2.toLowerCase();
			var committees = obj[i].Committees;
			var arrCommittees = committees.split("; ");
			var strCommittees = "";
			for (var j = 0; j< arrCommittees.length; j++) {
				strCommittees += '<li>' + arrCommittees[j] + '</li>\n';
			}
			var interests = obj[i].Outside_interests;
			var arrInterests = interests.split("; ");
			var strInterests = "";
			if (arrInterests[0] != "") {
				for (var k = 0; k < arrInterests.length; k++) {
					strInterests += '<li>' + arrInterests[k] + '</li>\n';
				}
			} else {
				strInterests = "Some senators and representatives reported no outside income or only income related to a spouse's job or regular investments. In those cases, this column was left blank.";
			}
			houseString += '<div class="info ' + partyAbbrev + ' ' + county2 + '">\
					<img src="' + photo + '" >\
						<div class="data">\
							<div class="name">'+ nameForward + '</div>\
							<div class="party">' + party + '</div> - \
							<div class="from">' + obj[i].Neighborhood + '</div>\
							<div class="click-show"><a href="#" id="info3'+ lastNameLowerCase + firstNameFirstLetter + '-show" class="showLink" onclick="showHide(\'info3'+ lastNameLowerCase + firstNameFirstLetter + '\');return false;">Click To Show</a></div></div></a>\
					<div class="clear"></div>\
					<div id="info3'+ lastNameLowerCase + firstNameFirstLetter + '" class="more popup">\
						<table class="info-table">\
							<tr class="table-pop"><th>Committees</th><th>Outside interests</th></tr>\
								<tr>\
									<td>\
										<ul class="committees">'
											+ strCommittees + 
										'</ul>\
									</td>\
									<td>\
										<ul class="interests">'
											+ strInterests + 
										'</ul>\
										<br/>\
									</td>\
								</tr>\
						</table>\
						<a href="#" id="info3'+ lastNameLowerCase + firstNameFirstLetter + '-hide" class="hideLink" onclick="showHide(\'info3'+ lastNameLowerCase + firstNameFirstLetter + '\');return false;">Click To Hide</a>\
					</div>\
			</div>';
		}
		var $houseItems = $(houseString);
		$('.lawmakers .house').isotope( 'insert', $houseItems );
	});
	
	});
	

});
function showHide(shID) {
//console.log(document.getElementById(shID));
   if (document.getElementById(shID)) {
	  //console.log('we have an element');
      if (document.getElementById(shID+'-show').style.display != 'none') {
         document.getElementById(shID+'-show').style.display = 'none';
         document.getElementById(shID).style.display = 'block';
      }
      else {
         document.getElementById(shID+'-show').style.display = 'inline';
         document.getElementById(shID).style.display = 'none';
      }
   }
}
$(window).load(function(){

	
});

