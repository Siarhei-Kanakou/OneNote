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
            length;


        closeButton.addEventListener('click', function(e) {
            var note = e.target.parentElement.parentElement;
            Models.Storage.Notes.delete(self._date, self._data.id);
            note.parentElement.removeChild(note);
        });

        this._element.addEventListener('mousedown', function(e) {
            var noteView = this,
                parent = this.parentElement,
                shiftX = e.clientX - parent.offsetLeft - noteView.offsetLeft,
                shiftY = e.clientY - parent.offsetTop - noteView.offsetTop;

            if (e.currentTarget.type === 'button') {
                return;
            }

            noteView.style.cursor = 'move';

            function mouseMoveHandler(e) {
                var x = e.clientX - parent.offsetLeft,
                    y = e.clientY - parent.offsetTop,
                    top = y - shiftY,
                    left = x - shiftX,
                    right = left + e.currentTarget.clientWidth;


                if (top > 0) {
                    noteView.style.top = y - shiftY + 'px';
                }

                if (parent.clientWidth > right && right > e.currentTarget.clientWidth) {
                    noteView.style.left = x - shiftX + 'px';
                }
            };

            function mouseUpHandler(e) {
                self._data.position.y = e.clientY - parent.offsetTop - shiftY;
                self._data.position.x = e.clientX - parent.offsetLeft - shiftX;
                Models.Storage.Notes.saveOne(self._date, self._data);

                noteView.style.cursor = 'text';

                noteView.removeEventListener('mouseup', mouseUpHandler);
                noteView.removeEventListener('mouseout', mouseUpHandler);
                noteView.removeEventListener('mousemove', mouseMoveHandler);
            };

            noteView.addEventListener('mousemove', mouseMoveHandler);
            noteView.addEventListener('mouseout', mouseUpHandler);
            noteView.addEventListener('mouseup', mouseUpHandler);
        });

        this._element.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });

        for (index = 0, length = text.length; index < length; index++) {
            text[index].addEventListener('change', function(e) {
                if (e.currentTarget.type === 'text') {
                    self._data.title = e.currentTarget.value;
                } else {
                    self._data.description = e.currentTarget.value;
                }

                Models.Storage.Notes.saveOne(self._date, self._data);
            });
        }

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