import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateStudentGrade,
  evaluateVoterEligibility,
  filterProjects,
  processAtmTransaction,
  validateContactForm,
  type ProjectItem,
} from './portfolioLogic';

const sampleProjects: ProjectItem[] = [
  {
    id: 'voter',
    title: 'Voter Eligibility Calculator',
    category: 'Python',
    stageLabel: 'Beginner / Academic Project',
    summary: 'Determines voter eligibility from age input.',
    highlights: ['Conditional statements'],
    technologies: ['Python', 'Conditional Logic', 'CLI'],
    image: '/a.jpg',
    imageAlt: 'Voter',
    githubUrl: 'https://github.com',
    codeFileName: 'voter.py',
    codeLanguage: 'Python 3',
    codeSnippet: 'print("ok")',
    demoType: 'voter',
  },
  {
    id: 'genai',
    title: 'GenAI Prompt & Web Lab',
    category: 'Web & GenAI',
    stageLabel: 'Exploratory / Web & AI Project',
    summary: 'Interactive prompt structure sandbox.',
    highlights: ['Prompt templates'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Generative AI'],
    image: '/b.jpg',
    imageAlt: 'GenAI',
    githubUrl: 'https://github.com',
    codeFileName: 'prompt.js',
    codeLanguage: 'JavaScript',
    codeSnippet: 'console.log("ok")',
    demoType: 'genai',
  },
];

test('filterProjects filters by category and search query', () => {
  assert.equal(filterProjects(sampleProjects, 'All', '').length, 2);
  assert.equal(filterProjects(sampleProjects, 'Python', '').length, 1);
  assert.equal(filterProjects(sampleProjects, 'Web & GenAI', '').length, 1);
  assert.equal(filterProjects(sampleProjects, 'All', 'conditional').length, 1);
  assert.equal(filterProjects(sampleProjects, 'Python', 'javascript').length, 0);
});

test('evaluateVoterEligibility handles age thresholds and validation', () => {
  assert.equal(evaluateVoterEligibility('', true).valid, false);
  assert.equal(evaluateVoterEligibility(17, true).eligible, false);
  assert.equal(evaluateVoterEligibility(18, true).eligible, true);
  assert.equal(evaluateVoterEligibility(22, false).eligible, false);
});

test('processAtmTransaction enforces positive amounts and balance limits', () => {
  const deposit = processAtmTransaction(5000, 'deposit', 1500);
  assert.equal(deposit.success, true);
  assert.equal(deposit.newBalance, 6500);

  const overdraft = processAtmTransaction(5000, 'withdraw', 6000);
  assert.equal(overdraft.success, false);
  assert.equal(overdraft.newBalance, 5000);

  const invalid = processAtmTransaction(5000, 'deposit', -10);
  assert.equal(invalid.success, false);
});

test('calculateStudentGrade computes average, letter grade, and validates range', () => {
  const validPass = calculateStudentGrade([92, 88, 90]);
  assert.equal(validPass.valid, true);
  assert.equal(validPass.letterGrade, 'A+');
  assert.equal(validPass.status, 'Pass');

  const invalidMark = calculateStudentGrade([95, 105]);
  assert.equal(invalidMark.valid, false);

  const failSubject = calculateStudentGrade([80, 28, 75]);
  assert.equal(failSubject.valid, true);
  assert.equal(failSubject.status, 'Needs Improvement');
});

test('validateContactForm catches invalid inputs and accepts valid data', () => {
  const bad = validateContactForm({ name: 'A', email: 'not-an-email', message: 'hi' });
  assert.equal(bad.valid, false);
  assert.ok(bad.errors.name);
  assert.ok(bad.errors.email);
  assert.ok(bad.errors.message);

  const good = validateContactForm({
    name: 'Dimple Sri',
    email: 'nutalapatidimplesri9@gmail.com',
    message: 'Interested in collaborating on a Python and GenAI hackathon project.',
  });
  assert.equal(good.valid, true);
});
