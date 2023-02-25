if (!IikoBiz) {
    var IikoBiz = {};
}

if (!IikoBiz.DateUtils) {
    IikoBiz.DateUtils = {};
}

IikoBiz.DateUtils.getMilliSecsInDay = function() {
    return 1000 * 60 * 60 * 24;
}

Date.prototype.getWeekInYear = function() {
    var firstJan = new Date(this.getFullYear(), 0, 1);
    var millisecsInDay = IikoBiz.DateUtils.getMilliSecsInDay();
    return Math.ceil((((this - firstJan) / millisecsInDay) + firstJan.getDay() + 1) / 7);
};

Date.prototype.getDayInYear = function() {
    var now = this;
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var millisecsInDay = IikoBiz.DateUtils.getMilliSecsInDay();
    var day = Math.floor(diff / millisecsInDay);
    return day;
}