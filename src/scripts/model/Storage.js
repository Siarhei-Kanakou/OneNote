(function(app) {
    var Models = app.getNamespace('Models'),
        Utils = app.getNamespace('Utils');

    /*Process request to localStorage (to server in future)*/
    Models.Storage = {
        Notes: {
            get: function(date) {
                var value = null;

                if (!(date instanceof Date)) {
                    throw new TypeError('Illegal arguments!');
                }

                date = Utils.resetTime(date);
                value = localStorage && localStorage[date.getTime()];

                return value ? JSON.parse(value) : [];
            },
            save: function(date, notes) {
                if (!date instanceof Date) {
                    throw new TypeError('Illegal arguments!');
                }

                //reset time
                date = Utils.resetTime(date);

                localStorage[date.getTime()] = JSON.stringify(notes);
            },
            saveOne: function(date, note) {
                var notes,
                    index,
                    length;

                if (!note instanceof Models.Note) {
                    throw new TypeError('Illegal argument');
                }

                notes = this.get(date);

                for (index = 0, length = notes.length; index < length; index++) {
                    if (notes[index].id === note.id) {
                        notes[index] = note;
                        break;
                    }
                }

                this.save(date, notes);
            },
            delete: function(date, id) {
                var index,
                    length,
                    target;

                target = this.get(date);

                for (index = 0, length = target.length; index < length; index++) {
                    if (target[index].id === id) {
                        break;
                    }
                }

                target.splice(index, 1);
                this.save(date, target);
            },
            deleteAll: function(date) {
                if (!(date instanceof Date)) {
                    throw new TypeError('Illegal arguments!');
                }

                date = Utils.resetTime(date);
                localStorage.removeItem(date.getTime());
            }
        }
    };
})(Application);