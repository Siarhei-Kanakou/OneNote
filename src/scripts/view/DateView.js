(function(app) {
    var Views = app.getNamespace('Views');

    Views.DateView = function() {

        this.id = 'date-container-' + ++Views.DateView.count;

        this.date = null;

        this.parent = null;

        this._element = null;
    };

    Views.DateView.count = 0;

    Views.DateView.prototype._buildElement = function() {
        this._element = document.createElement('div');
        this._element.className = 'dateText';
        this._element.appendChild(document.createElement('span'));
        this._element.firstChild.id = 'date';

        if (this.date) {
            this._element.firstChild.appendChild(document.createTextNode(this.date));
        }
    };

    Views.DateView.prototype.refresh = function() {
        this._element.firstChild.innerText = this.date ? this.date : '';
    };

    Views.DateView.prototype.render = function() {
        if (!this.parent) {
            throw new ReferenceError('A parent element is empty!');
        }

        this._buildElement();

        this.parent.appendChild(this._element);
    };
})(Application)