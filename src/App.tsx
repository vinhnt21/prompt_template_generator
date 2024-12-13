import React, { useEffect, useState } from "react";
import { Template, TemplateInput } from "./types/template";
import { defaultTemplates } from "./data/defaultTemplates";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { TemplateSelector } from "./components/TemplateSelector";
import { TemplateForm } from "./components/TemplateForm";
import { GeneratedPrompt } from "./components/GeneratedPrompt";
import { CreateTemplateModal } from "./components/CreateTemplateModal";
import { TemplateManager } from "./components/TemplateManager";
import { Sparkles, Plus, Sun, Moon } from "lucide-react";
import Footer from "./components/common/Footer";
import { TranslateWidget } from "./components/TranslateWidget";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  const [templates, setTemplates] = useLocalStorage<Template[]>(
    "templates",
    defaultTemplates
  );
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    templates[3]
  );
  const [inputs, setInputs] = useState<TemplateInput[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setInputs(
      template.fields.map((field) => ({ fieldId: field.id, value: "" }))
    );
  };

  useEffect(() => {
    if (selectedTemplate) {
      setInputs(
        selectedTemplate.fields.map((field) => ({
          fieldId: field.id,
          value: "",
        }))
      );
    }
  }, [selectedTemplate]);

  const handleSaveTemplate = (template: Template) => {
    if (editingTemplate) {
      setTemplates(
        templates.map((t) => (t.id === editingTemplate.id ? template : t))
      );
    } else {
      setTemplates([...templates, template]);
    }
    setEditingTemplate(null);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
    if (selectedTemplate?.id === id) {
      setSelectedTemplate(null);
      setInputs([]);
    }
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setShowCreateModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <TranslateWidget />
      <button
        onClick={toggleDarkMode}
        className="fixed top-2 right-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-color "
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6 text-yellow-200 dark:text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-gray-950 dark:text-gray-300" />
        )}
      </button>
      <div className="max-w-5xl mx-auto p-3">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="text-blue-500" size={28} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Prompt Generator
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Create customized prompts using templates  
          </p>
        </header>
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 my-2">
          <div className="grid grid-cols-1 gap-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 ">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Template
                  </label>
                  <TemplateSelector
                    templates={templates}
                    selectedTemplate={selectedTemplate}
                    onSelect={handleTemplateSelect}
                  />
                   
                </div>
                    
              </div>
            </section>
            {/* Custom Templates Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                   Custom Templates   
                </h2>
                  
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="h-[38px] px-4 py-8 md:py-0 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                  <Plus size={20} />
                  <span>New Template</span> 
                </button>
              </div>
              <TemplateManager
                templates={templates}
                onDeleteTemplate={handleDeleteTemplate}
                onEditTemplate={handleEditTemplate}
              />
            </section>
            {selectedTemplate && (
              <>
                 
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Fill in the Details
                  </h2>
                  <TemplateForm
                    template={selectedTemplate}
                    inputs={inputs}
                    onChange={setInputs}
                  />
                   
                </section>
                 
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Generated Prompt
                  </h2>
                  <GeneratedPrompt
                    template={selectedTemplate}
                    inputs={inputs}
                  />
                   
                </section>
                  
              </>
            )}
             
          </div>
            
        </main>
        <Footer />
      </div>
      {/* Modal */}
      {showCreateModal && (
        <CreateTemplateModal
          onClose={() => {
            setShowCreateModal(false);
            setEditingTemplate(null);
          }}
          onSave={handleSaveTemplate}
          editingTemplate={editingTemplate}
        />
      )}
       
    </div>
  );
}

export default App;
