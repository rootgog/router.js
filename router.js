var Router = {
    routes: {},
    on: function (route, handler) {
        if (typeof route == 'function') {
            handler = route;
            route = '/';
        }
        this.routes[route] = handler;
        return this;
    },
    notFound: function (handler) {
        this.notFound = handler;
        return this;
    },
    resolve: function (url = window.location.pathname) {
        url = (url.length > 1 && url[0] == "/") ? url.slice(1) : url;
        for (var route in this.routes) {
            if (url == route) {
                this.setURL(url);
                this.routes[route]();
                return;
            } else {
                regex = route.replace(/\//g, '\\/');
                regex = regex.replace(/\*/g, "[^ ]*");
                regex = "(^|\s)" + regex + "(\s|$)";
                regex = new RegExp(regex, "g");
                if (url.match(regex)) {
                    this.setURL(url);
                    this.routes[route]();
                    return;
                }
            }
        }
        this.notFound();
    },
    sendTo: function (path) {
        this.resolve(path);
    },
    setURL: function (url) {
        url = url[0] == "/" ? url.slice(1) : url;
        history.pushState(null, null, "/" + url);
    }
}
window.addEventListener("popstate", function () {
    Router.resolve();
});
