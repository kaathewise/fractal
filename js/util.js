function Loader (resources) {
    var self = this
        , successes = 0
        , successesNeeded = 0;

    this.$ = $(this);

    resources.forEach(function (resource) {
        if (!resource.delayed) {
            successesNeeded++;
        }
    });

    resources.forEach(function (resource) {
        resource.obj.success(function (data) {
            resource.callback(data);
            if (!resource.delayed) {
                successes++;
                loadSucceeded();
            }
            self.$.trigger('success', resource);
        });
    });

    function loadSucceeded() {
        if (successes == successesNeeded) {
            self.$.trigger('finish');
        }
    }
}
