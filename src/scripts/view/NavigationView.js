(function(app) {
    var Views = app.getNamespace('Views'),
        Models = app.getNamespace('Models');

    Views.NavigationView = function() {

        this.id = 'navigation-view-' + (++Views.NavigationView.count);

        this._element = null;

        this.data = null;

        this.parent = null;
    };

    Views.NavigationView.prototype._rebuildElement = function() {
        var week = null,
            index,
            length = 7,
            previousNextButtonMarkup = [
                '<label class="roundStyle noPin" id="{0}">',
                '<p>{1}</p>',
                '<span></span>',
                '<p>{2}</p>',
                '</label>'
            ].join('\n'),
            dayButtonMarkup = [
                '<input type="radio" name="daysNdates" id="{0}"/>',
                '<label for={0} class="roundStyle" id="{1}">',
                '<p class="day">{2}</p>',
                '<span></span>',
                '<p>{0}</p>',
                '</label>'
            ].join('\n'),
            days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            input;

        week = this.data.getCurrentWeek();

        this._element.innerHTML = '';

        child = document.createElement('section');
        child.innerHTML = previousNextButtonMarkup.replace(/\{0\}/g, 'previous').replace(/\{1\}/g, '◄').replace(/\{2\}/g, 'prev');
        this._element.appendChild(child);

        for (index = 0; index < length; index++) {
            child = document.createElement('section');
            child.innerHTML = dayButtonMarkup.replace(/\{0\}/g, days[index]).replace(/\{1\}/g, index).replace(/\{2\}/g,
                this.data.getCurrentWeek()[index].date.getDate());

            if (index === this.data.getCurrentWeek().indexOf(this.data.getCurrentDay())) {
                input = child.querySelector('input[type="radio"]');
                input.checked = true;
            }

            this._element.appendChild(child);
        }

        child = document.createElement('section');
        child.innerHTML = previousNextButtonMarkup.replace(/\{(0|2)\}/g, 'next').replace(/\{1\}/g, '►');
        this._element.appendChild(child);
    };

    Views.NavigationView.prototype._buildElement = function() {
        this._element = document.createElement('nav');
        this._element.id = this.id;

        if (!this.data) {
            throw new ReferenceError(' The data property of instance can\'t be null ');
        }

        this._rebuildElement();
    };

    Views.NavigationView.prototype._bind = function() {

        var self = this,
            month = document.getElementById('month'),
            day = document.getElementById('date'),
            canvas = document.querySelector('[id^="canvas-"]');


        this._element.addEventListener('click', function(e) {
            var doesTargetHave = true,
                target;

            if (!((doesTargetHave = e.target.classList.contains('roundStyle')) || (e.target.parentElement.classList.contains('roundStyle')))) {
                return;
            }

            target = doesTargetHave ? e.target : e.target.parentElement;

            if (target.id === 'previous') {
                self.data.getPreviousWeek();
                self._rebuildElement();

            } else if (target.id === 'next') {
                self.data.getNextWeek();
                self._rebuildElement();
            } else if (target.id !== 'createNote') {
                self.data.changeCurrentDay(+target.id);
            }
        });
    };

    Views.NavigationView.prototype.render = function() {
        if (!this.parent) {
            throw new ReferenceError('A parent element is empty!');
        }

        this._buildElement();

        this._bind();

        this.parent.appendChild(this._element);
    };

    Views.NavigationView.count = 0;
})(Application);