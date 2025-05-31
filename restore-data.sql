-- Restore Categories
INSERT INTO Category (id, name, slug, description, createdAt, updatedAt)
VALUES 
  ('cat1', 'Employment & HR', 'employment-hr', 'Documents related to employment and human resources', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat2', 'Corporate Governance', 'corporate-governance', 'Documents related to corporate governance', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat3', 'Real Estate', 'real-estate', 'Documents related to real estate transactions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat4', 'Business Formation', 'business-formation', 'Documents related to business formation and registration', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Restore Document Templates
INSERT INTO DocumentTemplate (id, name, type, description, content, state, categoryId, version, metadata, variables)
VALUES 
  ('llc-operating', 'LLC Operating Agreement', 'document', 'Agreement governing the operation of an LLC', 'template content', 'published', 'cat1', '1.0.0', '{"sections":["Organization","Membership","Management","Distributions","Dissolution","Miscellaneous"]}', '{}');

-- Restore Questionnaires
INSERT INTO Questionnaire (id, name, description, templateId, createdAt, updatedAt, metadata)
VALUES 
  ('llc-operating-questions', 'LLC Operating Agreement Questionnaire', 'Questions for creating an LLC Operating Agreement', 'llc-operating', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '{}');

-- Restore Questions
INSERT INTO Question (id, label, type, required, section, helpText, placeholder, questionnaireId, createdAt, updatedAt)
VALUES 
  ('q1', 'What is the name of the LLC?', 'text', true, 'Organization', NULL, NULL, 'llc-operating-questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('q2', 'When was the LLC formed?', 'date', true, 'Organization', NULL, NULL, 'llc-operating-questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('q3', 'What is the purpose of the LLC?', 'textarea', true, 'Organization', NULL, NULL, 'llc-operating-questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('q4', 'What is the principal place of business?', 'text', true, 'Organization', NULL, NULL, 'llc-operating-questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('q5', 'Who is the registered agent?', 'text', true, 'Organization', NULL, NULL, 'llc-operating-questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('q6', 'List all initial members', 'textarea', true, 'Membership', NULL, NULL, 'llc-operating-questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('q7', 'What are the capital contributions of each member?', 'textarea', true, 'Membership', NULL, NULL, 'llc-operating-questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('q8', 'What are the terms for admitting new members?', 'textarea', true, 'Membership', NULL, NULL, 'llc-operating-questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('q9', 'How will the LLC be managed?', 'select', true, 'Management', NULL, NULL, 'llc-operating-questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('q10', 'How will voting rights be allocated?', 'textarea', true, 'Management', NULL, NULL, 'llc-operating-questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('q11', 'How will profits be distributed?', 'textarea', true, 'Distributions', NULL, NULL, 'llc-operating-questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('q12', 'What events will trigger dissolution?', 'textarea', true, 'Dissolution', NULL, NULL, 'llc-operating-questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Restore Question Options
INSERT INTO QuestionOption (id, value, label, questionId, createdAt)
VALUES 
  ('opt1', 'member', 'Member-managed', 'q9', CURRENT_TIMESTAMP),
  ('opt2', 'manager', 'Manager-managed', 'q9', CURRENT_TIMESTAMP);

-- Restore Question Dependencies
INSERT INTO QuestionDependency (id, questionId, dependsOnQuestionId, conditionType, conditionValue, createdAt)
VALUES 
  ('dep1', 'q2', 'q1', 'equals', 'My Company LLC', CURRENT_TIMESTAMP); 