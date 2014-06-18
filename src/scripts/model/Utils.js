(function(app) {
    var Utils = app.getNamespace('Utils');

    Utils.resetTime = function(date) {
        if (!(date instanceof Date)) {
            throw new TypeError('Illegal argument!');
        }

        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
    };

})(Application);