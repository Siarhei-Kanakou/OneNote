(function(app) {
    var Models = app.getNamespace('Models'),
        Utils = app.getNamespace('Utils'),
        Views = app.getNamespace('Views');

    Views.NoteView = function(date, note) {

        this._date = date;

        this._data = note;

        this._element = null;

        this.parentEle = null;
    };

    Views.NoteView.prototype._buildElement = function() {
        var note = document.createElement('div'),
            noteBody = document.createElement('section'),
            noteHeader = document.createElement('section'),
            noteCaption = document.createElement('input'),
            noteDescription = document.createElement('textarea'),
            exitButton = document.createElement('input');

        note.className = 'noteWrapper';
        note.setAttribute('number', this._data.id);
        note.setAttribute('draggable', 'true');
        note.id = 'note-' + this._data.id;
        note.style.left = (this._data.position.x || 350) + 'px';
        note.style.top = (this._data.position.y || 150) + 'px';
        note.style.zIndex = this._data.index;
        note.appendChild(noteHeader);
        note.appendChild(noteBody);
        noteHeader.appendChild(noteCaption);
        noteHeader.appendChild(exitButton);
        noteBody.appendChild(noteDescription);

        exitButton.setAttribute('type', 'button');
        noteCaption.className = 'textControl title';
        noteCaption.setAttribute('value', this._data.title);
        noteDescription.className = 'textControl description';
        noteDescription.textContent = this._data.description;
        noteDescription.style.resize = 'none';
        noteDescription.setAttribute('spellcheck', 'false');
        exitButton.className = 'btn delete';
        exitButton.setAttribute('value', '×');

        this._element = note;
    };

    Views.NoteView.prototype.getElement = function() {
        this._buildElement();

        return this._element;
    };

    Views.NoteView.prototype.render = function() {
        if (!this.parentEle) {
            throw new ReferenceError('A parent element is empty!');
        }

        this._buildElement();

        this.parentEle.appendChild(this._element);
    };


})(Application);