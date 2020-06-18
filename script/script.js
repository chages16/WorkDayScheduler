//list of global variables
var hournow = parseInt(moment().format('H'));
var classes = [".8AM", ".9AM", ".10AM", ".11AM", ".12PM", ".1PM", ".2PM", ".3PM", ".4PM", ".5PM", ".6PM"]
var time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var classindex = time.indexOf(hournow);
$("#currentDay").text(moment().format('dddd, MMMM D, YYYY'));
var currentdaycheck = moment().format('dddd, MMMM D, YYYY')
var allnotes = ["", "", "", "", "", "", "", "", "", "", ""]

//startup code to designate past, future and present classes to container rows
if (hournow < 9) {
    allfuture();
}
else if (hournow > 17) {
    allpast();
}
else {
    formattimes()
}

//startup functions to grab data from local storage data and to determine if app opened on a new day
grabdata();
checkday()

/// function for when time is before 9am, assigning all but the first row the future class
function allfuture() {
    for (i = 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
    $(classes[0]).addClass("present");
}

/// function for when time is after 6pm, assigning all but the last row the past class
function allpast() {
    for (i = 0; i < classes.length - 1; i++) {
        $(classes[i]).addClass("past");
    }
    $(classes[time.length - 1]).addClass("present");
}

/// function for middle of the day- uses moment api to determine the hour and assigns classes by that
function formattimes() {
    $(classes[classindex]).addClass("present");
    for (i = 0; i < classindex; i++) {
        $(classes[i]).addClass("past");
    }
    for (i = classindex + 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
}

//save button function, stores in allnotes array and local storage data
$(".saveBtn").on("click", function () {
    var di = $(this).data('index');
    allnotes[di] = $(classes[di]).val();
    localStorage.setItem('allnotes', JSON.stringify(allnotes))
    alert("saved")

})

//grabdata function, restores data to rows from local storage
function grabdata() {
    allnotes = JSON.parse(localStorage.getItem("allnotes"));
    if (allnotes == null) {
        allnotes = ["", "", "", "", "", "", "", "", "", "", ""];
        return;
    }
    for (i = 0; i < classes.length; i++) {
        ($(classes[i])).val(allnotes[i]);
    }
}

//click event for the clear button
$(".cleary").on("click", function () {
    cleardata()
})

//clear data function, clears allnote array, all rows and stores empty array in local storage
function cleardata() {
    var confirmdelete = confirm("Are you sure you want to clear all data");
    if (confirmdelete == true) {
        allnotes = ["", "", "", "", "", "", "", "", "", "", ""];
        localStorage.setItem('allnotes', JSON.stringify(allnotes));
        grabdata();
    }
}

//function that compares current day with last day stored in local storage. offers user to clear data if day has changed.
function checkday() {
    var dateset = localStorage.getItem("date");
    if (dateset == null) {
        localStorage.setItem('date', currentdaycheck);
    }
    else if (currentdaycheck !== dateset) {
        localStorage.setItem('date', currentdaycheck);
        var confirmnewday = confirm("It's a new day, would you like to clear the calendar?")
        if (confirmnewday == true) {
            cleardata()
            localStorage.setItem('date', currentdaycheck);
        }
    }
}