(function(app) {
    var Controllers = app.getNamespace('Controllers'),
        Models = app.getNamespace('Models'),
        Views = app.getNamespace('Views');

    Controllers.NavigationController = {
        bind: function(dateRange) {
            var navigationBar = document.querySelector('header');

            function _changeDate(index) {

                var monthContainer = document.getElementById('month'),
                    dayContainer = document.getElementById('date'),
                    canvas = document.getElementById('canvas'),
                    newDate = dateRange.getCurrentWeek()[index],
                    index = 0,
                    length = newDate.notes.length,
                    note;

                week = dateRange.changeCurrentDay(newDate.date.getTime());
                monthContainer.textContent = Models.Months[newDate.date.getMonth()];
                dayContainer.textContent = newDate.date.getDate() < 10 ? '0' + newDate.date.getDate() : newDate.date.getDate();

                //remove all childs
                while (canvas.firstChild) {
                    canvas.removeChild(canvas.firstChild);
                }

                for (index = 0; index < length; index++) {
                    note = new Views.NoteView(newDate.notes[index]);
                    note.parentEle = canvas;
                    note.render();
                }
            }


            navigationBar.addEventListener('click', function(e) {
                var doesTargetHave = true,
                    target;

                if (!((doesTargetHave = /\w*roundStyle\w*/.test(e.target.className)) || (/\w*roundStyle*\w/.test(e.target.parentElement.className)))) {
                    return;
                }

                target = doesTargetHave ? e.target : e.target.parentElement;

                if (target.id === 'previous') {
                    dateRange.getPreviousWeek();
                    bind();

                } else if (target.id === 'next') {
                    dateRange.getNextWeek();
                    bind();
                } else if (target.id !== 'createNote') {
                    _changeDate(parseInt(target.id));
                }

            });

            bind = function() {
                var elements = document.querySelectorAll('p.day'),
                    index = 0,
                    length = elements.length,
                    week = dateRange.getCurrentWeek(),
                    current = dateRange.getCurrentDay();

                for (index = 0; index < length; index++) {
                    elements[index].textContent = week[index].date.getDate();

                    if (week[index].date.getTime() === current.date.getTime()) {

                        //select current day
                        elements[index].parentElement.parentElement.children[0].checked = true;
                        _changeDate(index);
                    }
                }
            };

            bind();
        }
    };
})(Application);