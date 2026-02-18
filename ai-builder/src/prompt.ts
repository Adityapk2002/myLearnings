export const landingPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>AI Startup</title>

  <style>
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      background: #0d0d0d;
      color: white;
    }

    header {
      display: flex;
      justify-content: space-between;
      padding: 20px 60px;
      background: #111;
      align-items: center;
    }

    header h2 {
      color: #ffd84d;
    }

    nav a {
      margin-left: 25px;
      color: white;
      text-decoration: none;
      opacity: 0.8;
    }

    nav a:hover {
      opacity: 1;
    }

    .hero {
      text-align: center;
      padding: 120px 20px;
      background: linear-gradient(to bottom, #111, #000);
    }

    .hero h1 {
      font-size: 52px;
      margin-bottom: 20px;
    }

    .hero p {
      font-size: 20px;
      opacity: 0.7;
      margin-bottom: 30px;
    }

    .btn {
      padding: 14px 28px;
      background: white;
      color: black;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
    }

    .features {
      display: flex;
      justify-content: center;
      gap: 30px;
      padding: 80px 40px;
      flex-wrap: wrap;
    }

    .card {
      background: #111;
      padding: 30px;
      border-radius: 12px;
      width: 280px;
      text-align: center;
      border: 1px solid #222;
    }

    .card h3 {
      margin-bottom: 10px;
    }

    footer {
      text-align: center;
      padding: 30px;
      background: #000;
      opacity: 0.6;
    }
  </style>
</head>

<body>

<header>
  <h2>AI Builder</h2>
  <nav>
    <a href="#">Home</a>
    <a href="#">Features</a>
    <a href="#">Pricing</a>
    <a href="#">Login</a>
  </nav>
</header>

<section class="hero">
  <h1>Build Websites with AI ⚡</h1>
  <p>Create stunning websites instantly using artificial intelligence</p>
  <a class="btn" href="#">Start Building</a>
</section>

<section class="features">
  <div class="card">
    <h3>⚡ Fast</h3>
    <p>Generate full websites in seconds using AI.</p>
  </div>

  <div class="card">
    <h3>🎨 Beautiful</h3>
    <p>Modern responsive designs ready to deploy.</p>
  </div>

  <div class="card">
    <h3>🚀 Deploy</h3>
    <p>Export and launch your site instantly.</p>
  </div>
</section>

<footer>
  © 2026 AI Builder. All rights reserved.
</footer>

</body>
</html>

`;
