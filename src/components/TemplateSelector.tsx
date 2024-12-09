import React from 'react';
import { Template } from '../types/template';
import { ChevronDown } from 'lucide-react';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: Template | null;
  onSelect: (template: Template) => void;
}

export function TemplateSelector({ templates, selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div className="relative">
      <select
        className="w-full p-3 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedTemplate?.id || ''}
        onChange={(e) => {
          const template = templates.find(t => t.id === e.target.value);
          if (template) onSelect(template);
        }}
      >
        <option value="">Select a template</option>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
}