(function(app) {

    var Models = app.getNamespace('Models');

    Models.DateContainer = function(date, notes) {

        this.date = date;

        this.notes = notes;
    };

    Models.DateContainer.prototype.save = function() {
        localStorage[this.date.getTime()] = JSON.stringify(this.notes);
    };

    Models.DateContainer.prototype.createNote = function() {
        var newNote = new Models.Note();
        this.notes.push(newNote);
        this.save();
        return newNote;
    };
})(Application);