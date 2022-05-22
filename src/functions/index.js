export function getMeta(url, callback) {
    const img = new Image();
    img.src = url;
    img.onload = function() { callback(this.width, this.height); }
}
export function getDate(seconds){
    var fdate = new Date(seconds * 1000)
    var year = fdate.getFullYear()
    var month = fdate.getMonth() + 1
    var date = fdate.getDate()
    if(date < 10){
        date = '0' + date.toString()
    }
    if(month < 10){
        month = '0' + month.toString()
    }
    return year.toString() + '-' + month.toString() + '-' + date.toString();
}
export function getTime(seconds){
    var fdate = new Date(seconds * 1000)
    var hours = fdate.getHours()
    var minutes = fdate.getMinutes()
    var m = 'am'
    if(hours >= 12){
        if(hours != 12)
            hours -= 12
        m = 'pm'
    }
    if(hours < 10){
        hours = '0' + hours.toString()
    }
    if(minutes < 10){
        minutes = '0' + minutes.toString()
    }
    return hours.toString() + ':' + minutes.toString() + m;
}
export function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}