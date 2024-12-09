import React from "react";
import { Template, TemplateInput } from "../types/template";
import { Copy, CheckCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

interface GeneratedPromptProps {
  template: Template;
  inputs: TemplateInput[];
}

export function GeneratedPrompt({ template, inputs }: GeneratedPromptProps) {
  const [isCopied, setIsCopied] = useState(false);

  const generatePrompt = () => {
    let prompt = template.template;
    inputs.forEach((input) => {
      prompt = prompt.replace(`{{${input.fieldId}}}`, input.value);
    });
    return prompt;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatePrompt());
      setIsCopied(true);
      toast.success("Copied to clipboard!", {
        duration: 2000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "10px",
          padding: "16px",
        },
        icon: "📋",
      });

      // Reset copy icon after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy text", {
        duration: 2000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "10px",
          padding: "16px",
        },
      });
    }
  };

  return (
    <div className="relative">
      <pre className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg whitespace-pre-wrap text-sm">
        {generatePrompt()}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg transition-colors duration-200"
        title="Copy to clipboard"
      >
        {isCopied ? (
          <CheckCheck size={20} className="text-green-500" />
        ) : (
          <Copy size={20} />
        )}
      </button>
    </div>
  );
}
