(function(app) {
    var Models = app.getNamespace('Models'),
        Views = app.getNamespace('Views');

    Views.NoteView = function(note) {

        this._data = note;

        this._element = null;

        this.parentEle = document.getElementById('canvas');
    };

    Views.NoteView.prototype._buildElement = function() {
        var note = document.createElement('div'),
            noteBody = document.createElement('section'),
            noteHeader = document.createElement('section'),
            noteCaption = document.createElement('input'),
            noteDescription = document.createElement('textarea'),
            exitButton = document.createElement('input');

        note.className = 'noteWrapper';
        //parentEle.appendChild(note);
        note.appendChild(noteHeader);
        note.appendChild(noteBody);
        noteHeader.appendChild(noteCaption);
        noteHeader.appendChild(exitButton);
        noteBody.appendChild(noteDescription);
    
        exitButton.setAttribute('type','button');
        noteCaption.className = 'textControl';
        noteCaption.setAttribute('value', this._data.title);
        noteDescription.className = 'textControl';
        noteDescription.innerText = this._data.description;
        noteDescription.style.resize = 'none';
        noteDescription.setAttribute('spellcheck', 'false');
        exitButton.className = 'btn';
        exitButton.setAttribute('value', '×');

        // title.innerText = this._data.title;
        // title.className = 'title';
        // description.innerText = this._data.description;
        // description.className = 'description';
        // note.id = 'note-' + this._data.id;
         //note.className = 'note';
        //note.style.position = 'absolute';
        // note.style.top = this._data.position.Y + this.parentEle.offsetTop * 1.05 +200;
        // note.style.left = this._data.position.X + this.parentEle.offsetLeft * 1.05 + 300;

        // note.appendChild(title);
        // note.appendChild(description);

        this._element = note;
    };

    Views.NoteView.prototype.render = function() {
        if (!this.parentEle) {
            throw new ReferenceError('A parent element is empty!');
        }

        this._buildElement();

        this.parentEle.appendChild(this._element);
    };


})(Application);