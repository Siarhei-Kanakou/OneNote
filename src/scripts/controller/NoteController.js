(function(app) {
    var Controllers = app.getNamespace('Controllers'),
        Models = app.getNamespace('Models'),
        Views = app.getNamespace('Views');

    Controllers.NoteController = {
        bind: function(dateRange) {
            var createNoteButton = document.getElementById('createNote');

            createNoteButton.addEventListener('click', function() {
                var newNote = new Views.NoteView(dateRange.createNote()),
                    canvas = document.getElementById('canvas');

                newNote.parentEle = canvas;
                newNote.render();
            });
        }
    };
})(Application);