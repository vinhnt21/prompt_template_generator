export interface Template {
  id: string;
  name: string;
  language: 'en' | 'vi';
  fields: {
    id: string;
    label: string;
    placeholder: string;
  }[];
  template: string;
}

export interface TemplateInput {
  fieldId: string;
  value: string;
}