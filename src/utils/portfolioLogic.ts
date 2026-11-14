export type ProjectCategory = 'All' | 'Python' | 'Web & GenAI';

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  stageLabel: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  image: string;
  imageAlt: string;
  githubUrl: string;
  codeFileName: string;
  codeLanguage: string;
  codeSnippet: string;
  demoType: 'voter' | 'atm' | 'grade' | 'genai';
}

export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory,
  searchQuery: string
): ProjectItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory = category === 'All' || project.category === category;
    if (!matchesCategory) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    const searchable = [
      project.title,
      project.stageLabel,
      project.summary,
      project.category,
      ...project.technologies,
    ]
      .join(' ')
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });
}

export interface VoterEligibilityResult {
  valid: boolean;
  eligible: boolean;
  message: string;
}

export function evaluateVoterEligibility(
  ageInput: string | number,
  isCitizen: boolean
): VoterEligibilityResult {
  const parsed = typeof ageInput === 'number' ? ageInput : Number(String(ageInput).trim());

  if (!Number.isFinite(parsed) || String(ageInput).trim() === '' || parsed < 0 || parsed > 130) {
    return {
      valid: false,
      eligible: false,
      message: 'Please enter a valid age between 0 and 130.',
    };
  }

  const age = Math.floor(parsed);

  if (!isCitizen) {
    return {
      valid: true,
      eligible: false,
      message: `Age ${age} recorded, but citizenship is required to register as a voter.`,
    };
  }

  if (age >= 18) {
    return {
      valid: true,
      eligible: true,
      message: `Eligible to vote: age ${age} meets the minimum requirement of 18+ years.`,
    };
  }

  const yearsRemaining = 18 - age;
  return {
    valid: true,
    eligible: false,
    message: `Not yet eligible: ${yearsRemaining} more ${yearsRemaining === 1 ? 'year' : 'years'} remaining until age 18.`,
  };
}

export type AtmAction = 'deposit' | 'withdraw';

export interface AtmTransactionResult {
  success: boolean;
  newBalance: number;
  message: string;
}

export function processAtmTransaction(
  currentBalance: number,
  action: AtmAction,
  amountInput: string | number
): AtmTransactionResult {
  const amount = typeof amountInput === 'number' ? amountInput : Number(String(amountInput).trim());

  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      success: false,
      newBalance: currentBalance,
      message: 'Enter a valid positive transaction amount.',
    };
  }

  const roundedAmount = Math.round(amount * 100) / 100;

  if (action === 'deposit') {
    const newBalance = Math.round((currentBalance + roundedAmount) * 100) / 100;
    return {
      success: true,
      newBalance,
      message: `Deposited ₹${roundedAmount.toLocaleString('en-IN')}. Updated balance: ₹${newBalance.toLocaleString('en-IN')}.`,
    };
  }

  if (roundedAmount > currentBalance) {
    return {
      success: false,
      newBalance: currentBalance,
      message: `Insufficient funds. Available balance is ₹${currentBalance.toLocaleString('en-IN')}.`,
    };
  }

  const newBalance = Math.round((currentBalance - roundedAmount) * 100) / 100;
  return {
    success: true,
    newBalance,
    message: `Withdrew ₹${roundedAmount.toLocaleString('en-IN')}. Remaining balance: ₹${newBalance.toLocaleString('en-IN')}.`,
  };
}

export interface GradeCalculationResult {
  valid: boolean;
  total: number;
  average: number;
  letterGrade: string;
  status: 'Pass' | 'Needs Improvement' | 'Invalid';
  message: string;
}

export function calculateStudentGrade(marksInput: Array<number | string>): GradeCalculationResult {
  if (marksInput.length === 0) {
    return {
      valid: false,
      total: 0,
      average: 0,
      letterGrade: '-',
      status: 'Invalid',
      message: 'Provide at least one subject mark.',
    };
  }

  const parsedMarks: number[] = [];
  for (const item of marksInput) {
    const str = String(item).trim();
    if (str === '') {
      return {
        valid: false,
        total: 0,
        average: 0,
        letterGrade: '-',
        status: 'Invalid',
        message: 'All subject mark fields must be filled.',
      };
    }
    const num = Number(str);
    if (!Number.isFinite(num) || num < 0 || num > 100) {
      return {
        valid: false,
        total: 0,
        average: 0,
        letterGrade: '-',
        status: 'Invalid',
        message: 'Each subject mark must be a number between 0 and 100.',
      };
    }
    parsedMarks.push(num);
  }

  const total = Math.round(parsedMarks.reduce((sum, val) => sum + val, 0) * 100) / 100;
  const average = Math.round((total / parsedMarks.length) * 100) / 100;
  const hasFailingSubject = parsedMarks.some((m) => m < 35);

  let letterGrade = 'F';
  if (average >= 90) letterGrade = 'A+';
  else if (average >= 80) letterGrade = 'A';
  else if (average >= 70) letterGrade = 'B';
  else if (average >= 60) letterGrade = 'C';
  else if (average >= 50) letterGrade = 'D';

  const passed = !hasFailingSubject && average >= 40;
  return {
    valid: true,
    total,
    average,
    letterGrade: hasFailingSubject && letterGrade !== 'F' ? `${letterGrade} (Reappear)` : letterGrade,
    status: passed ? 'Pass' : 'Needs Improvement',
    message: passed
      ? `Average ${average}% (${letterGrade}) — All subjects cleared.`
      : `Average ${average}% — Below passing threshold in one or more subjects.`,
  };
}

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (message.length < 10) {
    errors.message = 'Please include a brief note (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
