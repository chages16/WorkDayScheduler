var hournow = parseInt(moment().format('H'));
var classes = [".8AM", ".9AM", ".10AM", ".11AM", ".12PM", ".1PM", ".2PM", ".3PM", ".4PM", ".5PM", ".6PM"]
var time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var classindex = time.indexOf(hournow);
$("#currentDay").text(moment.utc().format('dddd, MMMM D, YYYY'));
var currentdaycheck = moment.utc().format('dddd, MMMM D, YYYY')
var allnotes = ["", "", "", "", "", "", "", "", "", "", ""]

if (hournow < 9) {
    allfuture();
}
else if (hournow > 17) {
    allpast();
}
else {
    formattimes()
}

function allfuture() {
    for (i = 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
    $(classes[0]).addClass("present");
}

function allpast() {
    for (i = 0; i < classes.length - 1; i++) {
        $(classes[i]).addClass("past");
    }
    $(classes[time.length - 1]).addClass("present");
}

function formattimes() {
    $(classes[classindex]).addClass("present");
    for (i = 0; i < classindex; i++) {
        $(classes[i]).addClass("past");
    }
    for (i = classindex + 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
}

$(".saveBtn").on("click", function () {
    var di = $(this).data('index');
    allnotes[di] = $(classes[di]).val();
    localStorage.setItem('allnotes', JSON.stringify(allnotes))
    alert("saved")

})

grabdata();

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

$(".cleary").on("click", function () {
    cleardata()
})
function cleardata() {
    var confirmdelete = confirm("Are you sure you want to clear all data");
    if (confirmdelete == true) {
        allnotes = ["", "", "", "", "", "", "", "", "", "", ""];
        localStorage.setItem('allnotes', JSON.stringify(allnotes));
        grabdata();
    }
}

checkday()
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