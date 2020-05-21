          // takes the form input and translates it to usable link
          function writeText (form) {

              // remove colons from time inputs
              var startTimeRaw = document.getElementById("startTime").value;
              var startTimeClean = startTimeRaw.replace(/:/i, "");
              var endTimeRaw = document.getElementById("endTime").value;
              var endTimeClean = endTimeRaw.replace(/:/i, "");

              // convert GMT to local time
              var localTime = new Date();
            
              // checks if user is currently in daylight savings time
              function isDST(t) { //t is the date object to check, returns true if daylight saving time is in effect.
                var jan = new Date(t.getFullYear(),0,1);
                var jul = new Date(t.getFullYear(),6,1);
                return Math.min(jan.getTimezoneOffset(),jul.getTimezoneOffset()) == t.getTimezoneOffset();  
            }

              var timeDiff = ( localTime.getTimezoneOffset() / 60 * 100 ); 
              
              // add 100 if user is in DST
              if(isDST(localTime)) {
                timeDiff += 100;
            }

              var adjStartTimeRaw = parseInt(startTimeClean) + timeDiff;
              var adjEndTimeRaw = parseInt(endTimeClean) + timeDiff;
              var adjStartTimeClean = adjStartTimeRaw;
              var adjEndTimeClean = adjEndTimeRaw;

              // assign day variables
              var day1 = form.eventDay.value;
              var day2 = form.eventDay.value;

              // fixing negative numbers for time zones east of GMT
              if (adjStartTimeRaw <= 0 && adjEndTimeRaw <= 0) {
                adjStartTimeClean = adjStartTimeRaw + 2400;
                adjEndTimeClean = adjEndTimeRaw + 2400;
                day1 -= 1; // prevents start time from falling before end time
              } else if (adjStartTimeRaw <= 0) {
                adjStartTimeClean = adjStartTimeRaw + 2400;
                day1 -= 1; // prevents start time from falling before end time
              } else if (adjEndTimeRaw <= 0) {
                adjEndTimeClean = adjEndTimeRaw + 2400;
            }

            // corrects output of day, making it 00 instead of 0 for case when day1 falls on the 1st
            if (day1 === 0 && day2 === 0 ) {
                day1 = "00";
                day2 = "00";
            } else if (day1 === 0) {
              day1 = "00";
            } else if (day2 === 0) {
              day2 = "00";
            }
			
		
            // fixes output of start time so it has proper length
        	var leadZero1 = "";
			    var leadZero2 = "";
			
		    if (adjStartTimeClean.toString().length === 1) {
                leadZero1 = "000";
              } else if (adjStartTimeClean.toString().length === 2) {
                leadZero1 = "00";
              } else if (adjStartTimeClean.toString().length === 3) {
                leadZero1 = "0";
              } else {
                leadZero1 = "";
              }

            // fixes output of end time so it has proper length
            if (adjEndTimeClean.toString().length === 1) {
                  leadZero2 = "000";
                } else if (adjEndTimeClean.toString().length === 2) {
                  leadZero2 = "00";
                } else if (adjEndTimeClean.toString().length === 3) {
                  leadZero2 = "0";
                } else {
                  leadZero2 = "";
                }

			// handling an all-day event
      var allDay = document.getElementById("allDay");
      

      // handling for spaces in eventName
      eventNameRaw = form.eventName.value;
      eventNameClean = eventNameRaw.replace(/\s/gi, "%20");

      // handling for spaces in eventDetails
      eventDetailsRaw = form.eventDetails.value;
      eventDetailsClean = eventDetailsRaw.replace(/\s/gi, "%20");

			if (allDay.checked == 1) {
			// outputs a link to the form field with full day event
		    form.gCalOutput.value = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + eventNameClean + "&dates=" + form.eventYear.value + form.eventMonth.value + day1 + "/" + form.eventYear.value + form.eventMonth.value + day2 + "&details=" + eventDetailsClean + "&location=" + form.eventLocation.value + "&trp=true";

			} else {
			// outputs a link to the form field with start and end time           
		    form.gCalOutput.value = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + eventNameClean + "&dates=" + form.eventYear.value + form.eventMonth.value + day1 + "T" + leadZero1 + adjStartTimeClean + "00Z/" + form.eventYear.value + form.eventMonth.value + day2 + "T" + leadZero2 + adjEndTimeClean + "00Z&details=" + eventDetailsClean + "&location=" + form.eventLocation.value + "&trp=true"; }
		
            // select the outputted link
            var text_input = document.getElementById ('outputBox');
            text_input.focus ();
            text_input.select ();

            // copying the text with a button click
            var clipboard = new Clipboard('.btn-copy');

          }