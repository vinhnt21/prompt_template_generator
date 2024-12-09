import { Facebook, Linkedin, Github, Code, MessageCircle } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ngtv117/",
      icon: <Linkedin size={24} />,
    },
    {
      name: "GitHub",
      url: "https://github.com/vinhnt21",
      icon: <Github size={24} />,
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/vinhnek117/",
      icon: <Code size={24} />,
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 py-8 mt-auto">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
            Rất vui được kết nối! 🤝
          </p>
        </div>

        <div className="flex justify-center space-x-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              title={link.name}
            >
              {link.icon}
              <span className="sr-only">{link.name}</span>
            </a>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
