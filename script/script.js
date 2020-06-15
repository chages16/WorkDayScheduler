var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var hournow = parseInt(moment().format('H'));
var classes = [".8AM", ".9AM", ".10AM", ".11AM", ".12PM", ".1PM", ".2PM", ".3PM", ".4PM", ".5PM", ".6PM"]
var time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
console.log(hournow)
var classindex = time.indexOf(hournow);
$("#currentDay").text(moment.utc().format('dddd, MMMM D, YYYY'));

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
    for (i = 1; i < time.length; i++) {
        console.log(classes[i])
        $(classes[i]).addClass("future");
    }
    $(classes[0]).addClass("present");
}

function allpast() {
    for (i = 0; i < time.length - 1; i++) {
        console.log(classes[i])
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