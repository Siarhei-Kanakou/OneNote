(function(app) {

    var Models = app.getNamespace('Models');

    Models.DateRange = function() {

        this._currentDate = null;

        this._currentWeek = null;

        this._initialize();
    };

    Models.DateRange.MILISEC = 86400000; //miliseconds per day

    Models.DateRange.DAYS_QUANTITY = 7; //days per week

    Models.DateRange.prototype._initialize = function() {

        /*variable region*/

        var date = new Date(),
            day = date.getDay(),
            startDate = date.getTime() - (day - 1) * Models.DateRange.MILISEC,
            finishDate = date.getTime() + (Models.DateRange.DAYS_QUANTITY - day) * Models.DateRange.MILISEC,
            temp,
            current,
            index;
        /*end region*/

        if (day === 0) {
            startDate = date.getTime() - (Models.DateRange.DAYS_QUANTITY - 1) * Models.DateRange.MILISEC;
            finishDate = date;
        }

        for (current = startDate, this._currentWeek = []; current <= finishDate; current += Models.DateRange.MILISEC) {
            temp = new Models.DateContainer(new Date(current), Models.Storage.Notes.get(new Date(current)));
            this._currentWeek.push(temp);

            if (current === date.getTime()) {
                this._currentDate = temp;
            }
        }
    };

    Models.DateRange.prototype.createNote = function() {
        return this._currentDate.createNote();
    };

    Models.DateRange.prototype.getNextWeek = function() {
        var startDate = this._currentWeek[this._currentWeek.length - 1].date.getTime() + Models.DateRange.MILISEC,
            finishDate = startDate + (Models.DateRange.DAYS_QUANTITY - 1) * Models.DateRange.MILISEC,
            current;

        //calculate new week
        this._currentWeek = [];
        for (current = startDate; current <= finishDate; current += Models.DateRange.MILISEC) {
            this._currentWeek.push(new Models.DateContainer(new Date(current), Models.Storage.Notes.get(new Date(current))));
        }

        this._currentDate = this._currentWeek[0];

        return this._currentWeek;
    };

    Models.DateRange.prototype.getPreviousWeek = function() {
        var startDate = this._currentWeek[0].date.getTime() - Models.DateRange.DAYS_QUANTITY * Models.DateRange.MILISEC,
            finishDate = startDate + Models.DateRange.MILISEC * (Models.DateRange.DAYS_QUANTITY - 1),
            current;

        this._currentWeek = [];
        for (current = startDate; current <= finishDate; current += Models.DateRange.MILISEC) {
            this._currentWeek.push(new Models.DateContainer(new Date(current), Models.Storage.Notes.get(new Date(current))));
        }

        this._currentDate = this._currentWeek[this._currentWeek.length - 1];

        return this._currentWeek;
    };

    Models.DateRange.prototype.getCurrentWeek = function() {
        return this._currentWeek;
    };

    Models.DateRange.prototype.getCurrentDay = function() {
        return this._currentDate;
    };

    Models.DateRange.prototype.changeCurrentDay = function(miliseconds) {
        var range;

        if (typeof miliseconds !== 'number') {
            throw new TypeError('Models.DateRange.getConcreteDay illegal argument error!');
        } else if (this._currentWeek[0].date.getTime() > miliseconds ||
            this._currentWeek[this._currentWeek.length - 1].date.getTime() < miliseconds) {
            throw new RangeError('Date is out of the range!');
        }

        range = miliseconds - this._currentWeek[0].date.getTime();

        return (this._currentDate = this._currentWeek[range / Models.DateRange.MILISEC]);
    };
})(Application);