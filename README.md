# Router.js

Router.js is a lightweight frontend page router.

This router is not made to be used with hashes and instead should be used with paths.
This is achieved by using the following in .htaccess on an apache server.

```.htaccess
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule (.*)$ index.html?request=$1 [QSA,NC,L]
</IfModule>
```
# Usage

Link the router.js file

```html
<head>
  <script src="/assets/js/router.js"></script>
</head>
```
Start Configuring routes

```javascript
Router
  .on("account", function () {
      setPageContent("account.html");
  })
  .on("post/*/edit", function () {
      setPageContent("editpost.html");
  })
  .notFound(function () {
      console.log("404.html");
  })
  .resolve();
```

# Redirecting users

This will use the handler that was configured before
```javascript
Router.sendTo("account");
```
