'use strict';

class Router {
    constructor() {
        this.routes = {};
        return this;
    }
    on(route, handler, forward = false) {
        if (typeof route == 'function') {
            handler = route;
            route = '/';
        }
        this.routes[route] = {
            handler: handler,
            forward: forward
        };
        return this;
    }
    notFound(handler) {
        this.notFound = handler;
        return this;
    }
    getRouteHandler(url) {
        url = (url.length > 1 && url[0] == "/") ? url.slice(1) : url;
        if (url !== "/") {
            url = url.replace(/\/\s*$/, "");
        }
        let match = false;
        for (var route in this.routes) {
            if (url == route) {
                match = true;
                if (this.routes[route].handler instanceof Router) {
                    let newurl = url;
                    if (!this.routes[route].forward) {
                        if (url.includes("/")) {
                            newurl = url.substring(url.indexOf("/") + 1);
                        } else {
                            newurl = "/";
                        }
                    }
                    return this.routes[route].handler.getRouteHandler(newurl);
                } else {
                    return this.routes[route].handler;
                }
            } else {
                let regex = route.replace(/\//g, '\\/');
                regex = regex.replace(/\*/g, "[^ ]*");
                if (this.routes[route].handler instanceof Router) {
                    regex = "(^|\s)" + regex;
                } else {
                    regex = "(^|\s)" + regex + "(\s|$)";
                }
                regex = new RegExp(regex, "g");
                if (url.match(regex)) {
                    match = true;
                    if (this.routes[route].handler instanceof Router) {
                        let newurl = url;
                        if (!this.routes[route].forward) {
                            if (url.includes("/") && (route.match(/\//g) || []).length != (url.match(/\//g) || []).length) {
                                newurl = url.substring(url.indexOf("/") + 1);
                                for (let i = 0; i < (route.match(/\//g) || []).length; i++) {
                                    newurl = newurl.substring(newurl.indexOf("/") + 1);
                                }
                            } else {
                                newurl = "/";
                            }
                        }
                        return this.routes[route].handler.getRouteHandler(newurl);
                    } else {
                        return this.routes[route].handler;
                    }
                }
            }
        }
        if (!match) {
            return false;
        }
    }
    resolve({
        path = window.location.pathname,
        url = undefined,
        seturl = true
    } = {}) {
        var route = this.getRouteHandler(path);
        if (typeof route == 'function') {
            if (seturl) {
                if (!url) {
                    url = path;
                }
                this.setURL(url);
            }
            route();
        } else {
            if (typeof this.notFound == 'function') {
                this.notFound();
            }
        }
        return this;
    }
    sendTo({
        path = window.location.pathname,
        url = undefined
    } = {}) {
        this.resolve({
            path: path,
            url: url
        });
        return this;
    }
    setURL(url) {
        let base = document.getElementsByTagName("base")[0].getAttribute("href") ? document.getElementsByTagName("base")[0].getAttribute("href") : "";
        base = base[0] == "/" ? base.slice(1) : base;
        url = url[0] == "/" ? url.slice(1) : url;
        history.pushState(null, null, "/" + base + "/" + url);
        return this;
    }
}

module.exports = Router;
