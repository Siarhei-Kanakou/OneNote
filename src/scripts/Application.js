var Application = (function() {

    /*dependencies region*/
    var Models = {},
        Controllers = {};
    /*end region*/

    var dateRange = null;

    /*return namespace by namespace name*/
    function _getNamespace(namespace) {
        var spaces = (namespace || 'Application').split('.'),
            index,
            length,
            parent = window.Application || (window.Application = {});

        spaces = spaces[0] === 'Application' ? spaces.slice(1) : spaces;

        for (index = 0, length = spaces.length; index < length; index++) {
            parent[spaces[index]] = parent[spaces[index]] || {};
            parent = parent[spaces[index]];
        }

        return parent;
    }

    function _initialize() {
        dateRange = new Models.DateRange();
        Controllers.NavigationController.bind(dateRange);
        Controllers.NoteController.bind(dateRange);
    }

    function _start() {
        window.addEventListener('load', function() {
            _initialize();
        });
    }

    return {
        Models: Models,
        Controllers: Controllers,
        getNamespace: _getNamespace,
        start: _start
    };
})();