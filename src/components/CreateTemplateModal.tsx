import React, { useState, useEffect } from 'react';
import { Template } from '../types/template';
import { X } from 'lucide-react';
import { generateId } from '../utils/generateId';

interface CreateTemplateModalProps {
  onClose: () => void;
  onSave: (template: Template) => void;
  editingTemplate?: Template | null;
}

export function CreateTemplateModal({ onClose, onSave, editingTemplate }: CreateTemplateModalProps) {
  const [name, setName] = useState(editingTemplate?.name || '');
  const [language, setLanguage] = useState<'en' | 'vi'>(editingTemplate?.language || 'en');
  const [promptText, setPromptText] = useState(editingTemplate?.template || '');

  useEffect(() => {
    if (editingTemplate) {
      setName(editingTemplate.name);
      setLanguage(editingTemplate.language);
      setPromptText(editingTemplate.template);
    }
  }, [editingTemplate]);

  const extractPlaceholders = (text: string): string[] => {
    const matches = text.match(/<([^>]+)>/g) || [];
    return [...new Set(matches.map(match => match.slice(1, -1)))];
  };

  const handleSave = () => {
    const placeholders = extractPlaceholders(promptText);
    const fields = placeholders.map(placeholder => ({
      id: placeholder.toLowerCase(),
      label: placeholder.charAt(0).toUpperCase() + placeholder.slice(1).toLowerCase(),
      placeholder: `Enter ${placeholder.toLowerCase()}`
    }));

    const template: Template = {
      id: editingTemplate?.id || generateId(),
      name,
      language,
      fields,
      template: promptText.replace(/<([^>]+)>/g, (_, p1) => `{{${p1.toLowerCase()}}}`)
    };

    onSave(template);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {editingTemplate ? 'Edit Template' : 'Create New Template'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Project Manager Prompt"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'vi')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="vi">Vietnamese</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prompt Template
            </label>
            <div className="text-sm text-gray-500 mb-2">
              Use angle brackets to create placeholders (e.g., {'<role>'}, {'<context>'}, {'<task>'}). These will be automatically converted to input fields.
            </div>
            <div className="mb-2 p-3 bg-gray-50 rounded-lg text-sm">
              <strong>Example:</strong><br />
              You are a {'<role>'}<br />
              <br />
              Context: {'<context>'}<br />
              <br />
              Task: {'<task>'}
            </div>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={8}
              placeholder="Enter your prompt template here..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!name || !promptText || !extractPlaceholders(promptText).length}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingTemplate ? 'Update' : 'Save'} Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}