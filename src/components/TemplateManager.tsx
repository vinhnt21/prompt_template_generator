import React from 'react';
import { Template } from '../types/template';
import { Pencil, Trash2 } from 'lucide-react';

interface TemplateManagerProps {
  templates: Template[];
  onDeleteTemplate: (id: string) => void;
  onEditTemplate: (template: Template) => void;
}

export function TemplateManager({ templates, onDeleteTemplate, onEditTemplate }: TemplateManagerProps) {
  const customTemplates = templates.filter(t => !t.id.startsWith('role-context-task'));

  if (customTemplates.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No custom templates yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {customTemplates.map((template) => (
        <div
          key={template.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <h3 className="font-medium text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-500">
              {template.language === 'en' ? 'English' : 'Vietnamese'} • {template.fields.length} fields
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEditTemplate(template)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={() => onDeleteTemplate(template.id)}
              className="p-2 text-red-500 hover:text-red-700 rounded-lg"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}