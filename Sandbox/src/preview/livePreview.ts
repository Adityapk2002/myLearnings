import { Sandbox } from "e2b";
import { groq } from "../config/groqClient.js";

export async function generateLivePreview(userPrompt: string) {
  console.log("🚀 Creating sandbox...");
  const sandbox = await Sandbox.create();

  try {
    // 1️⃣ Ask AI to generate React component
    console.log("🧠 Generating React website code...\n");

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are an expert React developer. Create a complete, production-ready modern website using React and Tailwind CSS.

CRITICAL REQUIREMENTS:
1. Return ONLY valid HTML code (no explanations, no markdown backticks)
2. ALL JSX syntax must be 100% correct
3. Use proper attribute syntax
4. DO NOT use Framer Motion - use CSS animations instead

Technical Stack:
- React 18 via CDN (use React.useState, React.useEffect, etc.)
- Tailwind CSS via CDN with custom animations
- Babel Standalone for JSX compilation

Design Requirements:
- Fully responsive (mobile + tablet + desktop)
- Modern UI with glassmorphism, gradients, smooth CSS animations
- Professional 2026-level startup website aesthetic

Sections to Include:
1. Hero section with headline and CTA
2. Sticky navbar with logo
3. About section with fade-in animations
4. Services/features cards with hover effects
5. Portfolio/gallery grid
6. Testimonials section
7. Pricing cards with hover animations
8. Contact form with validation
9. Footer with social links

Animation Guidelines:
- Use CSS transitions and animations
- Add Tailwind animation classes (animate-fade-in, animate-slide-up, etc.)
- Hover effects with transform and transition
- Scroll-triggered animations using Intersection Observer

EXACT FORMAT TO RETURN:

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern React App</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="icon" href="data:,">
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .animate-fade-in { animation: fadeIn 0.6s ease-out; }
    .animate-slide-in { animation: slideIn 0.6s ease-out; }
  </style>
</head>
<body>
  <div id="root"></div>
  
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  
  <script type="text/babel">
    const { useState, useEffect, useRef } = React;
    
    function App() {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [scrolled, setScrolled] = useState(false);
      
      useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
      
      // Intersection Observer for scroll animations
      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
              }
            });
          },
          { threshold: 0.1 }
        );
        
        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
          observer.observe(el);
        });
        
        return () => observer.disconnect();
      }, []);
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* YOUR COMPLETE COMPONENT CODE HERE */}
          {/* Use className="animate-on-scroll" for scroll-triggered animations */}
        </div>
      );
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>

STYLING GUIDELINES:
- Use Tailwind utility classes for everything
- Add smooth transitions: transition-all duration-300 ease-in-out
- Hover effects: hover:scale-105 hover:shadow-xl
- Glass morphism: backdrop-blur-lg bg-white/10
- Gradients: bg-gradient-to-r from-purple-500 to-pink-500
- Shadows: shadow-2xl shadow-purple-500/50

DOUBLE-CHECK:
✓ All JSX attributes use correct syntax
✓ All strings are properly quoted
✓ All tags are properly closed
✓ No Framer Motion imports
✓ Valid JavaScript/JSX throughout
`,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.3,
    });

    let htmlCode = response.choices[0]?.message.content || "";

    // Clean up the response
    htmlCode = htmlCode
      .replace(/```html\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    // Validate basic HTML structure
    if (!htmlCode.includes("<!DOCTYPE html>")) {
      throw new Error("Generated code is missing DOCTYPE declaration");
    }

    console.log("📦 Writing HTML file to sandbox...");

    // 2️⃣ Create directory and write HTML file
    await sandbox.commands.run("mkdir -p ~/app");
    await sandbox.files.write("~/app/index.html", htmlCode);

    // 3️⃣ Create package.json
    const packageJson = {
      name: "react-app",
      version: "1.0.0",
      scripts: {
        start: "npx serve . -l 3000 --no-clipboard --cors",
      },
    };

    await sandbox.files.write(
      "~/app/package.json",
      JSON.stringify(packageJson, null, 2),
    );

    // 4️⃣ Start HTTP server
    console.log("🌐 Starting dev server...");

    await sandbox.commands.run("npx serve . -l 3000 --no-clipboard --cors", {
      cwd: "~/app",
      background: true,
    });

    // Wait for server to start
    console.log("⏳ Waiting for server to start...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 5️⃣ Get public preview URL
    const previewUrl = sandbox.getHost(3000);

    console.log("\n🎉 LIVE PREVIEW URL:");
    console.log(previewUrl);
    console.log("\n📝 Generated code saved to ~/app/index.html");

    return {
      previewUrl,
      sandboxId: sandbox.sandboxId,
      htmlCode,
    };
  } catch (err) {
    console.error("❌ Error:", err);
    throw err;
  }
}
