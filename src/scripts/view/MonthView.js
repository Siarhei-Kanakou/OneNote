(function(app) {
    var Views = app.getNamespace('Views');

    Views.MonthView = function() {

        this.id = 'month-view-' + (++Views.MonthView.count);

        this.month = '';

        this._element = null;

        this.parent = null;
    };

    Views.MonthView.count = 0;

    Views.MonthView.prototype._buildElement = function() {
        this._element = document.createElement('span');
        this._element.id = this.id;
        this._element.className = "monthText";

        if (this.month) {
            this._element.innerText = this.month;
        }
    };

    Views.MonthView.prototype.render = function(append) {
        if (!this.parent) {
            throw new ReferenceError('A parent element is empty!');
        }

        this._buildElement();

        if (append !== false) {
            this.parent.appendChild(this._element);
        } else {
            this.parent.insertBefore(this._element, this.parent.firstChild);
        }
    };

    Views.MonthView.prototype.refresh = function() {
        if (this.month) {
            this._element.innerText = this.month;
        }
    };

})(Application);