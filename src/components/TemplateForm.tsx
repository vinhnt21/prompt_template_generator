import React from 'react';
import { Template, TemplateInput } from '../types/template';

interface TemplateFormProps {
  template: Template;
  inputs: TemplateInput[];
  onChange: (inputs: TemplateInput[]) => void;
}

export function TemplateForm({ template, inputs, onChange }: TemplateFormProps) {
  const handleInputChange = (fieldId: string, value: string) => {
    const newInputs = inputs.map(input =>
      input.fieldId === fieldId ? { ...input, value } : input
    );
    onChange(newInputs);
  };

  return (
    <div className="space-y-4">
      {template.fields.map((field) => (
        <div key={field.id}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder={field.placeholder}
            value={inputs.find(input => input.fieldId === field.id)?.value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}