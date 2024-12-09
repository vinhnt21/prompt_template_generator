import { Template } from '../types/template';

export const defaultTemplates: Template[] = [
  {
    id: 'role-context-task-en',
    name: 'Role-Context-Task (English)',
    language: 'en',
    fields: [
      {
        id: 'role',
        label: 'Role/Expertise',
        placeholder: 'e.g., Software Engineer'
      },
      {
        id: 'context',
        label: 'Context',
        placeholder: 'Describe the situation or background'
      },
      {
        id: 'task',
        label: 'Task',
        placeholder: 'What needs to be done?'
      }
    ],
    template: 'You are an expert {{role}}\n\nContext: {{context}}\n\nPlease complete the following task: {{task}}'
  },
  {
    id: 'role-context-task-vi',
    name: 'Vai trò-Bối cảnh-Nhiệm vụ (Tiếng Việt)',
    language: 'vi',
    fields: [
      {
        id: 'role',
        label: 'Vai trò/Chuyên môn',
        placeholder: 'VD: Kỹ sư phần mềm'
      },
      {
        id: 'context',
        label: 'Bối cảnh',
        placeholder: 'Mô tả tình huống hoặc bối cảnh'
      },
      {
        id: 'task',
        label: 'Nhiệm vụ',
        placeholder: 'Cần thực hiện những gì?'
      }
    ],
    template: 'Bạn là một chuyên gia {{role}}\n\nBối cảnh: {{context}}\n\nVui lòng thực hiện nhiệm vụ sau: {{task}}'
  }
];