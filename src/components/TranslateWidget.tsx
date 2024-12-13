import React, { useState } from "react";
import { Languages, Minimize2, Maximize2 } from "lucide-react";

interface TranslateWidgetProps {
  className?: string;
}

export const TranslateWidget: React.FC<TranslateWidgetProps> = ({
  className,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const translateUrl = "https://www.bing.com/translator?from=vi&to=en";

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg z-50"
        aria-label="Show translator"
      >
        <Languages size={24} />
      </button>
    );
  }

  return (
    <div
      className={`fixed ${
        isMaximized ? "inset-4" : "bottom-4 right-4 w-[400px] h-[500px]"
      } bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 z-50 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Languages className="text-blue-500" size={20} />
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Bing Translator
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMaximize}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label={isMaximized ? "Minimize" : "Maximize"}
          >
            {isMaximized ? (
              <Minimize2
                size={18}
                className="text-gray-600 dark:text-gray-400"
              />
            ) : (
              <Maximize2
                size={18}
                className="text-gray-600 dark:text-gray-400"
              />
            )}
          </button>
          <button
            onClick={toggleVisibility}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close translator"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600 dark:text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Translator iframe */}
      <div className="w-full h-[calc(100%-48px)] overflow-hidden">
        <iframe
          src={translateUrl}
          className="w-[143%] h-[143%] border-none origin-top-left"
          style={{ transform: isMaximized ? "scale(1)" : "scale(0.7)" }}
          title="Bing Translator"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          loading="lazy"
        />
      </div>
    </div>
  );
};
