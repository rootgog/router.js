# Router.js

Router.js is a lightweight frontend page router, and its nestable!.

Configure routes and their handlers, when you resonle a route its handler will be executed.

# Features

- Nested routers
- wildcard path parameters

# To Do:

- named wildcard parameters

# Usage

Link the router.js file

```html
<head>
  <script src="//unpkg.com/@rootgog/router"></script>
</head>
```

Start Configuring routes

```javascript
//define an account router for use later
let accountRouter = new Router();
accountRouter
  .on(() => {
    setPageContent("account.html");
  })
  .on("edit", () => {
    setPageContent("accountedit.html");
  });

//define the main router
let router = new Router();
router
  .on(() => {
    setPageContent("home.html");
  })
  .on("account", accountRouter)
  .on("post/*/edit", () => {
    setPageContent("editpost.html");
  })
  .notFound(() => {
    setPageContent("404.html");
  });
```

# Redirecting users

This will use the handler that was configured before

```javascript
Router.sendTo("account");
```
