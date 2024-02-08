<!DOCTYPE html>
<html>

<head>
  <title>OpenAPI Skema</title>
  <link rel="stylesheet" href="swagger-ui.css" />
  <!-- <link rel="shortcut icon" href="logo.png" type="image/x-icon" /> -->
</head>

<body>
  <div id="swagger-ui"></div>

  <script src="./swagger-ui-bundle.js"></script>
  <script>
    window.onload = function () {
      const ui = SwaggerUIBundle({
        url: "openapi.yml",
        dom_id: "#swagger-ui",
      });
    };
  </script>
</body>

</html>