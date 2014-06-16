(function(app) {
    var Controllers = app.getNamespace('Controllers'),
        Models = app.getNamespace('Models'),
        Views = app.getNamespace('Views');

    Controllers.NavigationController = {
        bind: function(dateRange) {
            var canvasParent = document.querySelector('.container'),
                header = document.querySelector('.wrapper header'),
                canvas = new Views.CanvasView(),
                navigation = new Views.NavigationView(),
                month = new Views.MonthView(),
                date = new Views.DateView(),
                day = dateRange.getCurrentDay().date.getDate();

            month.month = Models.Months[dateRange.getCurrentDay().date.getMonth()];
            month.parent = header;
            month.render(false); //a boolean value as argument is an append flaque

            date.date = day < 10 ? '0' + day : day;
            date.parent = canvasParent;
            date.render();

            canvas.parent = canvasParent;
            canvas.data = dateRange.getCurrentDay();
            canvas.render();

            navigation.parent = header;
            navigation.data = dateRange;
            navigation.render();

            dateRange.subscribe(function(date) {
                canvas.data = date;
                canvas.refresh();
            });

            dateRange.subscribe(function(date) {
                month.month = Models.Months[date.date.getMonth()];
                month.refresh();
            });

            dateRange.subscribe(function(d) {
                date.date = d.date.getDate();
                date.refresh();
            });
        }
    };
})(Application);