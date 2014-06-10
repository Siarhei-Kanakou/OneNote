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
        note.id = 'note-' + this._data.id;
        note.style.left = (this._data.position.x || 350) + 'px';
        note.style.top = (this._data.position.y || 150) + 'px';
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

    Views.NoteView.prototype._bind = function() {
        var closeButton = this._element.querySelector('.btn.delete'),
            text = this._element.querySelectorAll('.title, .description'),
            self = this,
            index,
            length,
            dragndrop = false;

        closeButton.addEventListener('click', function(e) {
            var note = e.target.parentElement.parentElement;
            Models.Storage.Notes.delete(self._date, self._data.id);
            note.parentElement.removeChild(note);
        });

        for (index = 0, length = text.length; index < length; index++) {
            text[index].addEventListener('change', function(e) {

                if (e.target.tagName === 'INPUT') {
                    self._data.title = e.target.value;
                } else {
                    self._data.description = e.target.value;
                }
                Models.Storage.Notes.saveOne(self._date, self._data);
                console.log('change');
            });
        }

        this._element.addEventListener('mouseup', function(e) {
            var offsetX,
                offsetY;

            if (e.target.type === 'button') {
                return;
            }

            offsetX = e.offsetX || 0;
            offsetY = e.offsetY || 0;
            e.currentTarget.className = e.currentTarget.className.replace(/\w*move/, '');
            e.currentTarget.style.cursor = 'text';
            dragndrop = false;
            e.currentTarget.style.left = e.clientX - offsetX + 'px';
            e.currentTarget.style.top = e.clientY - offsetY + 'px';
            self._data.position.x = e.clientX - offsetX;
            self._data.position.y = e.clientY - offsetY;
            Models.Storage.Notes.saveOne(self._date, self._data);
            Utils.setTransformParams(e.currentTarget, 0, 0, false);
        });

        this._element.addEventListener('mousemove', function(e) {
            if (!dragndrop) {
                return;
            }

            Utils.setTransformParams(e.currentTarget, e.clientX - self._data.position.x, e.clientY - self._data.position.y);
        });

        this._element.addEventListener('mousedown', function(e) {
            if (e.target.type === 'button') {
                return;
            }

            dragndrop = true;
            e.currentTarget.className += ' move';
            e.currentTarget.style.cursor = 'move';
            self._data.position.x = e.clientX;
            self._data.position.y = e.clientY;
        });
    };

    Views.NoteView.prototype.render = function() {
        if (!this.parentEle) {
            throw new ReferenceError('A parent element is empty!');
        }

        this._buildElement();

        this._bind();

        this.parentEle.appendChild(this._element);
    };


})(Application);