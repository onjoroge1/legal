import { Prisma, PrismaClient, DocumentTemplate, TemplateField as PrismaTemplateField } from '@prisma/client';
import { prisma } from '../db';

export interface TemplateField {
  id: string;
  fieldId: string;
  label: string;
  type: string;
  required: boolean;
  section: string;
  helpText?: string | null;
  placeholder?: string | null;
  options?: string[];
  showIf?: {
    field: string;
    value: string | string[] | boolean;
  };
}

export interface Template {
  id: string;
  code: string | null;
  name: string;
  type: string;
  categoryId: string;
  description?: string | null;
  version: string;
  metadata?: Prisma.JsonValue | null;
  fields: TemplateField[];
}

type DocumentTemplateWithFields = DocumentTemplate & {
  fields: (PrismaTemplateField & {
    options: { value: string }[];
    dependencies: { dependsOnFieldId: string; conditionValue: string }[];
  })[];
};

export const templateApi = {
  // Get all templates
  async getAllTemplates(): Promise<Template[]> {
    try {
      const templates = await prisma.documentTemplate.findMany({
        include: {
          fields: {
            include: {
              options: true,
              dependencies: true
            }
          }
        }
      }) as DocumentTemplateWithFields[];

      return templates.map(template => ({
        id: template.id,
        code: template.code,
        name: template.name,
        type: template.type,
        categoryId: template.categoryId,
        description: template.description,
        version: template.version,
        metadata: template.metadata as Prisma.JsonValue,
        fields: template.fields.map(field => ({
          id: field.id,
          fieldId: field.fieldId,
          label: field.label,
          type: field.type,
          required: field.required,
          section: field.section,
          helpText: field.helpText,
          placeholder: field.placeholder,
          options: field.options.map(opt => opt.value),
          showIf: field.dependencies[0] ? {
            field: field.dependencies[0].dependsOnFieldId,
            value: field.dependencies[0].conditionValue
          } : undefined
        }))
      }));
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  },

  // Get template by code
  async getTemplateByCode(code: string): Promise<Template | null> {
    try {
      const template = await prisma.documentTemplate.findFirst({
        where: { code },
        include: {
          fields: {
            include: {
              options: true,
              dependencies: true
            }
          }
        }
      }) as DocumentTemplateWithFields | null;

      if (!template) return null;

      return {
        id: template.id,
        code: template.code,
        name: template.name,
        type: template.type,
        categoryId: template.categoryId,
        description: template.description,
        version: template.version,
        metadata: template.metadata as Prisma.JsonValue,
        fields: template.fields.map(field => ({
          id: field.id,
          fieldId: field.fieldId,
          label: field.label,
          type: field.type,
          required: field.required,
          section: field.section,
          helpText: field.helpText,
          placeholder: field.placeholder,
          options: field.options.map(opt => opt.value),
          showIf: field.dependencies[0] ? {
            field: field.dependencies[0].dependsOnFieldId,
            value: field.dependencies[0].conditionValue
          } : undefined
        }))
      };
    } catch (error) {
      console.error('Error fetching template:', error);
      throw error;
    }
  },

  // Create new template
  async createTemplate(template: Omit<Template, 'id'>): Promise<Template> {
    try {
      const created = await prisma.documentTemplate.create({
        data: {
          code: template.code,
          name: template.name,
          type: template.type,
          categoryId: template.categoryId,
          description: template.description,
          metadata: template.metadata as Prisma.InputJsonValue,
          fields: {
            create: template.fields.map(field => ({
              fieldId: field.fieldId,
              label: field.label,
              type: field.type,
              required: field.required,
              section: field.section,
              helpText: field.helpText,
              placeholder: field.placeholder,
              options: field.options ? {
                create: field.options.map(opt => ({
                  value: opt,
                  label: opt
                }))
              } : undefined,
              dependencies: field.showIf ? {
                create: {
                  dependsOnFieldId: field.showIf.field,
                  conditionType: 'equals',
                  conditionValue: Array.isArray(field.showIf.value) 
                    ? field.showIf.value.join(',')
                    : String(field.showIf.value)
                }
              } : undefined
            }))
          }
        },
        include: {
          fields: {
            include: {
              options: true,
              dependencies: true
            }
          }
        }
      }) as DocumentTemplateWithFields;

      return {
        id: created.id,
        code: created.code,
        name: created.name,
        type: created.type,
        categoryId: created.categoryId,
        description: created.description,
        version: created.version,
        metadata: created.metadata as Prisma.JsonValue,
        fields: created.fields.map(field => ({
          id: field.id,
          fieldId: field.fieldId,
          label: field.label,
          type: field.type,
          required: field.required,
          section: field.section,
          helpText: field.helpText,
          placeholder: field.placeholder,
          options: field.options.map(opt => opt.value),
          showIf: field.dependencies[0] ? {
            field: field.dependencies[0].dependsOnFieldId,
            value: field.dependencies[0].conditionValue
          } : undefined
        }))
      };
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  },

  // Update template
  async updateTemplate(code: string, template: Partial<Template>): Promise<Template> {
    try {
      const updated = await prisma.documentTemplate.update({
        where: { code },
        data: {
          name: template.name,
          type: template.type,
          categoryId: template.categoryId,
          description: template.description,
          metadata: template.metadata as Prisma.InputJsonValue,
          fields: template.fields ? {
            deleteMany: {},
            create: template.fields.map(field => ({
              fieldId: field.fieldId,
              label: field.label,
              type: field.type,
              required: field.required,
              section: field.section,
              helpText: field.helpText,
              placeholder: field.placeholder,
              options: field.options ? {
                create: field.options.map(opt => ({
                  value: opt,
                  label: opt
                }))
              } : undefined,
              dependencies: field.showIf ? {
                create: {
                  dependsOnFieldId: field.showIf.field,
                  conditionType: 'equals',
                  conditionValue: Array.isArray(field.showIf.value)
                    ? field.showIf.value.join(',')
                    : String(field.showIf.value)
                }
              } : undefined
            }))
          } : undefined
        },
        include: {
          fields: {
            include: {
              options: true,
              dependencies: true
            }
          }
        }
      }) as DocumentTemplateWithFields;

      return {
        id: updated.id,
        code: updated.code,
        name: updated.name,
        type: updated.type,
        categoryId: updated.categoryId,
        description: updated.description,
        version: updated.version,
        metadata: updated.metadata as Prisma.JsonValue,
        fields: updated.fields.map(field => ({
          id: field.id,
          fieldId: field.fieldId,
          label: field.label,
          type: field.type,
          required: field.required,
          section: field.section,
          helpText: field.helpText,
          placeholder: field.placeholder,
          options: field.options.map(opt => opt.value),
          showIf: field.dependencies[0] ? {
            field: field.dependencies[0].dependsOnFieldId,
            value: field.dependencies[0].conditionValue
          } : undefined
        }))
      };
    } catch (error) {
      console.error('Error updating template:', error);
      throw error;
    }
  },

  // Delete template
  async deleteTemplate(code: string): Promise<void> {
    try {
      await prisma.documentTemplate.delete({
        where: { code }
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      throw error;
    }
  }
}; 