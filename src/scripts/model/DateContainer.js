(function(app) {

    var Models = app.getNamespace('Models');

    Models.DateContainer = function(date, notes) {

        this.date = date;

        this.notes = notes;
    };

    Models.DateContainer.prototype.save = function() {
        Models.Storage.Notes.save(this.date, this.notes);
    };

    Models.DateContainer.prototype.createNote = function() {
        var newNote = new Models.Note(),
            max = Math.max(newNote.id, this.notes.length && this.notes.reduce(function(max, next) {
                max = max && max.id || 0;
                next = next && next.id || 0;
                return Math.max(max, next);
            }) || 0);
        newNote.id = newNote.id < max ? max + 1 : newNote.id;
        this.notes.push(newNote);
        this.save();
        return newNote;
    };

    Models.DateContainer.prototype.getNoteById = function(id) {
        var index = 0,
            length = this.notes.length;

        for (index = 0; index < length; index++) {
            if (this.notes[index].id === id) {
                return this.notes[index];
            }
        }

        return null;
    }
})(Application);