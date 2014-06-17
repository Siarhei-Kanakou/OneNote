(function(app) {
    var Models = app.getNamespace('Models');

    Models.Note = function(date) {

        this.id = Models.Note.id++;

        this.date = date;

        this.title = 'Title';

        this.description = 'Description';

        this.position = {
            x: 0,
            y: 0
        };
    };

    Models.Note.id = 0;

})(Application);