import avatarPortrait from '../assets/images/avatar_dimple_portrait_1794654271114.jpg';
import voterGalleryImg from '../assets/images/gallery_voter_eligibility_1794654272809.jpg';
import atmGalleryImg from '../assets/images/gallery_atm_system_1794654272601.jpg';
import gradeGalleryImg from '../assets/images/gallery_grade_calculator_1794654273780.jpg';
import genaiGalleryImg from '../assets/images/gallery_genai_workbench_1794654273647.jpg';
import type { ProjectItem } from '../utils/portfolioLogic';

export const PROFILE = {
  name: 'Dimple Sri Nutalapati',
  shortName: 'Dimple Sri',
  role: 'Aspiring AI Engineer',
  status: '1st-Year B.Tech Student',
  headlineSub: 'B.Tech Student · Python · Web Development · Generative AI',
  heroSummary:
    "I'm a first-year B.Tech student passionate about Artificial Intelligence, Python, Web Development, and Generative AI. I enjoy turning ideas into practical projects and learning through hackathons, ideathons, and hands-on experimentation.",
  tagline: 'Learning through hands-on code, hackathons, and steady daily practice.',
  footerTagline: 'Learning, building, experimenting, and preparing for a career in AI engineering.',
  email: 'nutalapatidimplesri9@gmail.com',
  githubDisplay: 'github.com/dimplesri-nutalapati',
  githubUrl: 'https://github.com/dimplesri-nutalapati',
  linkedinDisplay: 'linkedin.com/in/dimple-sri-nutalapati',
  linkedinUrl: 'https://linkedin.com/in/dimple-sri-nutalapati',
  avatarImage: avatarPortrait,
};

export const ABOUT_QUOTES = [
  '“I’m currently pursuing my B.Tech and building my foundation in software development and artificial intelligence. My current learning journey focuses on Python, web development, and Generative AI.”',
  '“I enjoy learning by building projects rather than only studying theory. My projects have helped me practice programming logic, application development, and problem solving.”',
  '“I also participate in hackathons and ideathons, where I get opportunities to explore ideas, collaborate, and understand how technology can be used to solve real-world problems.”',
];

export const ABOUT_APPROACH =
  'My approach is centered on consistent hands-on execution. Whether exploring conditional structures in Python, styling clean web layouts, or testing prompt formats, I value genuine understanding and iterative growth.';

export const FOCUS_AREAS = [
  { name: 'Artificial Intelligence', stage: 'Active' },
  { name: 'Generative AI', stage: 'Active' },
  { name: 'Python Development', stage: 'Active' },
  { name: 'Web Development', stage: 'Active' },
  { name: 'Problem Solving', stage: 'Active' },
];

export interface SkillGroup {
  category: string;
  countLabel: string;
  items: { name: string; stage: 'Beginner' | 'Learning' | 'Exploring' }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming',
    countLabel: '1 item in practice',
    items: [{ name: 'Python', stage: 'Learning' }],
  },
  {
    category: 'Web Development',
    countLabel: '3 items in practice',
    items: [
      { name: 'HTML', stage: 'Learning' },
      { name: 'CSS', stage: 'Learning' },
      { name: 'JavaScript', stage: 'Beginner' },
    ],
  },
  {
    category: 'AI',
    countLabel: '3 items in practice',
    items: [
      { name: 'Generative AI', stage: 'Exploring' },
      { name: 'Artificial Intelligence fundamentals', stage: 'Exploring' },
      { name: 'AI tools and experimentation', stage: 'Learning' },
    ],
  },
  {
    category: 'Other',
    countLabel: '4 items in practice',
    items: [
      { name: 'Problem Solving', stage: 'Learning' },
      { name: 'Hackathons', stage: 'Exploring' },
      { name: 'Ideathons', stage: 'Exploring' },
      { name: 'Git/GitHub', stage: 'Beginner' },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'voter-eligibility-calculator',
    title: 'Voter Eligibility Calculator',
    category: 'Python',
    stageLabel: 'Beginner / Academic Project',
    summary:
      'A beginner-friendly application designed to determine voter eligibility based on age-related eligibility criteria. This project helped me practice programming logic, conditional statements, and user input handling.',
    highlights: [
      'Validates numeric age bounds and handles non-integer edge cases gracefully.',
      'Uses clear if-elif-else branching to evaluate citizenship and age criteria.',
      'Outputs actionable feedback showing eligibility status or years remaining.',
    ],
    technologies: ['Python', 'Conditional Logic', 'User Input', 'CLI'],
    image: voterGalleryImg,
    imageAlt: 'Dark mode interface showcase for Voter Eligibility Calculator Python project',
    githubUrl: 'https://github.com/dimplesri-nutalapati',
    codeFileName: 'voter_eligibility.py',
    codeLanguage: 'Python 3',
    demoType: 'voter',
    codeSnippet: `def check_voter_eligibility(age: int, is_citizen: bool) -> str:
    if age < 0 or age > 130:
        return "Invalid age entered."
    if not is_citizen:
        return "Citizenship is required to register."
    if age >= 18:
        return f"Eligible to vote (Age: {age})."
    return f"Not yet eligible. Wait {18 - age} more year(s)."


if __name__ == "__main__":
    user_age = int(input("Enter your age: "))
    citizen_input = input("Are you a citizen? (yes/no): ").strip().lower()
    print(check_voter_eligibility(user_age, citizen_input == "yes"))`,
  },
  {
    id: 'atm-management-system',
    title: 'ATM Management System',
    category: 'Python',
    stageLabel: 'Beginner / Practice Project',
    summary:
      'A Python application that simulates core ATM operations—balance inquiries, deposits, and withdrawals—built to master programming logic, functions, and conditional control flow.',
    highlights: [
      'Simulates authentic ATM state transitions across check balance, deposit, and withdraw flows.',
      'Guards against negative deposits and overdrafts with conditional validation.',
      'Modularized into clean reusable Python functions with a menu-driven loop.',
    ],
    technologies: ['Python', 'Functions', 'Transaction Logic', 'Control Flow'],
    image: atmGalleryImg,
    imageAlt: 'Dark mode ATM Management System terminal UI showcase',
    githubUrl: 'https://github.com/dimplesri-nutalapati',
    codeFileName: 'atm_management.py',
    codeLanguage: 'Python 3',
    demoType: 'atm',
    codeSnippet: `def run_atm(balance: float = 5000.0) -> None:
    while True:
        print("\\n1. Check Balance  2. Deposit  3. Withdraw  4. Exit")
        choice = input("Select option: ").strip()

        if choice == "1":
            print(f"Current Balance: ₹{balance:,.2f}")
        elif choice == "2":
            amount = float(input("Deposit amount: "))
            if amount > 0:
                balance += amount
                print(f"Updated Balance: ₹{balance:,.2f}")
        elif choice == "3":
            amount = float(input("Withdraw amount: "))
            if 0 < amount <= balance:
                balance -= amount
                print(f"Remaining Balance: ₹{balance:,.2f}")
            else:
                print("Insufficient funds or invalid amount.")
        elif choice == "4":
            break`,
  },
  {
    id: 'student-grade-calculator',
    title: 'Student Grade Calculator',
    category: 'Python',
    stageLabel: 'Beginner / Academic Project',
    summary:
      'A simple application that calculates student grades based on entered marks. This project helped me practice calculations, conditional statements, input handling, and basic programming logic.',
    highlights: [
      'Computes total score and percentage average across multiple academic subjects.',
      'Maps average percentages onto structured grade bands (A+ through F).',
      'Checks per-subject minimum thresholds to flag subjects needing improvement.',
    ],
    technologies: ['Python', 'Calculations', 'Conditional Statements', 'Input Handling'],
    image: gradeGalleryImg,
    imageAlt: 'Dark mode Student Grade Calculator dashboard mockup',
    githubUrl: 'https://github.com/dimplesri-nutalapati',
    codeFileName: 'grade_calculator.py',
    codeLanguage: 'Python 3',
    demoType: 'grade',
    codeSnippet: `def calculate_grade(marks: list[float]) -> tuple[float, str]:
    average = sum(marks) / len(marks)
    if average >= 90:
        grade = "A+"
    elif average >= 80:
        grade = "A"
    elif average >= 70:
        grade = "B"
    elif average >= 60:
        grade = "C"
    elif average >= 50:
        grade = "D"
    else:
        grade = "F"
    return round(average, 2), grade`,
  },
  {
    id: 'genai-prompt-web-lab',
    title: 'GenAI Prompt & Web Lab',
    category: 'Web & GenAI',
    stageLabel: 'Exploratory / Web & AI Project',
    summary:
      'An interactive browser workspace for organizing structured Generative AI prompts and practicing responsive dark-theme HTML, CSS, and JavaScript interfaces.',
    highlights: [
      'Structures role, context, task, and output constraints into clean reusable prompt templates.',
      'Built with semantic HTML, modern CSS layouts, and interactive JavaScript state updates.',
      'Bridges foundational frontend development with practical Generative AI workflows.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Generative AI'],
    image: genaiGalleryImg,
    imageAlt: 'Dark mode Generative AI prompt exploration workspace',
    githubUrl: 'https://github.com/dimplesri-nutalapati',
    codeFileName: 'promptBuilder.ts',
    codeLanguage: 'TypeScript',
    demoType: 'genai',
    codeSnippet: `export function formatStructuredPrompt(
  role: string,
  topic: string,
  format: string
): string {
  return [
    \`Role: \${role}\`,
    \`Task: Explain \${topic} clearly for a 1st-year B.Tech student.\`,
    \`Output Format: \${format}\`,
  ].join("\\n");
}`,
  },
];

export interface HackathonEntry {
  title: string;
  role: string;
  badge: string;
  explored: string;
  learned: string;
}

export const HACKATHONS: HackathonEntry[] = [
  {
    title: 'Campus Ideathon / Hackathon Event',
    role: 'Role: Participant / Team Member',
    badge: 'Student Participant',
    explored:
      'Collaborated with teammates to explore how technology can solve everyday campus challenges and brainstormed functional application workflows.',
    learned:
      'Practiced problem decomposition, collaborative ideation under time constraints, and presenting ideas clearly to peers and mentors.',
  },
  {
    title: 'Student Innovation Sprint',
    role: 'Role: Participant / Team Member',
    badge: 'Student Participant',
    explored:
      'Explored beginner AI and software concepts to address practical student learning and productivity needs.',
    learned:
      'Gained hands-on experience structuring application flow, prioritizing essential features, and sharing code with teammates.',
  },
  {
    title: 'Upcoming Hackathons & Ideathons',
    role: 'Role: Active Registrant / Learner',
    badge: 'Student Participant',
    explored:
      'Preparing for upcoming collegiate coding competitions and ideathons to apply Python, web development, and generative AI concepts in real-time sprints.',
    learned:
      'Building strong teamwork, rapid prototyping skills, and continuous experimentation habits.',
  },
];

export const LEARNING_STAGES = [
  {
    stage: 'STAGE 1',
    status: 'In Progress',
    title: 'Programming Foundations',
    description: 'Learning Python and programming fundamentals.',
  },
  {
    stage: 'STAGE 2',
    status: 'In Progress',
    title: 'Web Development',
    description: 'Learning how to build websites using HTML, CSS and JavaScript.',
  },
  {
    stage: 'STAGE 3',
    status: 'In Progress',
    title: 'Artificial Intelligence',
    description: 'Exploring AI concepts and applications.',
  },
  {
    stage: 'STAGE 4',
    status: 'In Progress',
    title: 'Generative AI',
    description: 'Learning about modern Generative AI tools, applications, and workflows.',
  },
  {
    stage: 'STAGE 5',
    status: 'Future Goal',
    title: 'AI Engineering Mastery',
    description:
      'Develop stronger skills in AI engineering, machine learning, software development, and real-world AI applications.',
  },
];

export const CURRENT_FOCUS_ITEMS = [
  'Python',
  'Web Development',
  'Generative AI',
  'AI fundamentals',
  'Building practical projects',
  'Improving problem-solving skills',
  'Participating in hackathons and ideathons',
];

export const VISION_STATEMENT =
  '“My goal is to build a strong foundation in software development and artificial intelligence and gradually grow into an AI engineer capable of developing useful, practical, and responsible AI-powered applications.”';

export const ROADMAP_ITEMS = [
  { index: '01', topic: 'Machine Learning' },
  { index: '02', topic: 'Deep Learning' },
  { index: '03', topic: 'Generative AI' },
  { index: '04', topic: 'AI Agents' },
  { index: '05', topic: 'Data Structures & Algorithms' },
  { index: '06', topic: 'Backend Development' },
  { index: '07', topic: 'AI-powered applications' },
];
