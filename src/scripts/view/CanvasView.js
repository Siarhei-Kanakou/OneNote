(function(app) {
    var Views = app.getNamespace('Views'),
        Models = app.getNamespace('Models');

    Views.CanvasView = function() {

        this.id = 'canvas-' + (++Views.CanvasView.count);

        this.parent = null; //DOM element

        this._element = null;

        this.data = null;
    };

    Views.CanvasView.prototype._buildElement = function() {
        var child,
            index,
            length;

        this._element = this._element || document.createElement('div');
        this._element.id = this.id;

        if (!this.data || !this.data.notes) {
            return;
        }

        for (index = 0, length = this.data.notes.length; index < length; index++) {
            child = new Views.NoteView(this.data.date, this.data.notes[index]);
            this._element.appendChild(child.getElement());
        }
    };

    Views.CanvasView.prototype._bind = function() {
        var self = this;

        if (!this._element) {
            return;
        }

        function deleteNoteHandler(parent, element) {
            var date = self.data,
                notes = date.notes,
                number = +element.getAttribute('number'),
                index,
                length = notes.length;

            for (index = 0; index < length; index++) {
                if (notes[index].id === number) {
                    break;
                }
            }

            notes.splice(1, index);
            date.save();

            parent.removeChild(element);
        }

        this._element.addEventListener('click', function(e) {
            if (e.target.classList.contains('delete')) {
                deleteNoteHandler(e.currentTarget, e.target.parentElement.parentElement);
            }
        });

        this._element.addEventListener('mousedown', function(e) {
            var noteView,
                parent,
                note,
                shiftX,
                shiftY;

            //go out if it isn't title
            if (!e.target.classList.contains('title')) {
                return;
            }

            noteView = e.target.parentElement.parentElement;
            note = self.data.getNoteById(+noteView.getAttribute('number'));
            parent = e.currentTarget.parentElement;
            shiftX = e.clientX - noteView.offsetLeft;
            shiftY = e.clientY - noteView.offsetTop;

            e.target.style.cursor = 'move';
            noteView.style.zIndex = 1000;

            function mouseMoveHandler(e) {
                var x = e.clientX,
                    y = e.clientY,
                    top = y - parent.offsetTop - shiftY,
                    left = x - parent.offsetLeft - shiftX,
                    right = left + noteView.clientWidth;

                if (top > 0) {
                    noteView.style.top = y - shiftY + 'px';
                }

                if (parent.clientWidth > right && right > noteView.clientWidth) {
                    noteView.style.left = x - shiftX + 'px';
                }
            }

            function mouseUpHandler(e) {

                var index,
                    length,
                    zIndex = 0;

                note.position.y = e.clientY - shiftY;
                note.position.x = e.clientX - shiftX;

                for (index = 0, length = self.data.notes.length; index < length; index++) {
                    if (self.data.notes[index].id !== note.id &&
                        Math.abs(self.data.notes[index].position.x - note.position.x) < noteView.clientWidth &&
                        Math.abs(self.data.notes[index].position.y - note.position.y) < noteView.clientHeight) {
                        zIndex = self.data.notes[index].index >= zIndex ? self.data.notes[index].index + 1 : zIndex;
                    }
                }

                note.index = zIndex;
                Models.Storage.Notes.saveOne(self.data.date, note);

                e.target.style.cursor = 'text';
                noteView.style.zIndex = zIndex;

                parent.removeEventListener('mouseup', mouseUpHandler);
                parent.removeEventListener('mousemove', mouseMoveHandler);
            }

            parent.addEventListener('mousemove', mouseMoveHandler);
            parent.addEventListener('mouseup', mouseUpHandler);
        });

        this._element.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });

        this._element.addEventListener('change', function(e) {
            var current = null,
                note = null;

            if (!self.data) {
                return;
            }

            current = self.data;
            note = current.getNoteById(+e.target.parentElement.getAttribute('number'));

            if (e.target.classList.contains('title')) {
                note.title = e.target.value;
            } else if (e.target.classList.contains('description')) {
                note.description = e.target.value;
            }

            Models.Storage.Notes.saveOne(current.date, note);
        });
    };

    Views.CanvasView.prototype.render = function() {
        if (!this.parent) {
            throw new ReferenceError('A parent element is empty!');
        }

        this._buildElement();

        this._bind();

        this.parent.appendChild(this._element);
    };

    Views.CanvasView.prototype.clear = function() {

        while (this._element && this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
        }
    };

    Views.CanvasView.prototype.refresh = function() {
        this.clear();
        this._buildElement();
    };

    Views.CanvasView.count = 0;

})(Application);