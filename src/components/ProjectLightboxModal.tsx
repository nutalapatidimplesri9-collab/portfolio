import { useEffect, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Image as ImageIcon,
  Play,
  RotateCcw,
  X,
} from 'lucide-react';
import {
  calculateStudentGrade,
  evaluateVoterEligibility,
  processAtmTransaction,
  type ProjectItem,
} from '../utils/portfolioLogic';
import type { GalleryTab } from './ProjectGallerySection';

interface ProjectLightboxModalProps {
  project: ProjectItem | null;
  projects: ProjectItem[];
  initialTab: GalleryTab;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectLightboxModal({
  project,
  projects,
  initialTab,
  onClose,
  onSelectProject,
}: ProjectLightboxModalProps) {
  const [activeTab, setActiveTab] = useState<GalleryTab>(initialTab);
  const [copiedCode, setCopiedCode] = useState(false);

  // Voter demo state
  const [voterAge, setVoterAge] = useState('19');
  const [isCitizen, setIsCitizen] = useState(true);

  // ATM demo state
  const [atmBalance, setAtmBalance] = useState(5000);
  const [atmAmount, setAtmAmount] = useState('500');
  const [atmMessage, setAtmMessage] = useState('Account initialized with ₹5,000.');
  const [atmSuccess, setAtmSuccess] = useState(true);
  const [atmHistory, setAtmHistory] = useState<string[]>([
    'Initial balance: ₹5,000',
  ]);

  // Grade demo state
  const [marks, setMarks] = useState<string[]>(['88', '91', '84', '79']);

  // GenAI prompt lab state
  const [promptRole, setPromptRole] = useState('AI Engineering Mentor');
  const [promptTopic, setPromptTopic] = useState('Conditional Statements in Python');
  const [promptFormat, setPromptFormat] = useState('3 bullet points with 1 code example');

  useEffect(() => {
    setActiveTab(initialTab);
    setCopiedCode(false);
  }, [initialTab, project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        const idx = projects.findIndex((p) => p.id === project.id);
        if (idx >= 0) {
          onSelectProject(projects[(idx + 1) % projects.length]);
        }
      } else if (event.key === 'ArrowLeft') {
        const idx = projects.findIndex((p) => p.id === project.id);
        if (idx >= 0) {
          onSelectProject(projects[(idx - 1 + projects.length) % projects.length]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onSelectProject, project, projects]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const voterResult = evaluateVoterEligibility(voterAge, isCitizen);
  const gradeResult = calculateStudentGrade(marks);
  const generatedPrompt = [
    `Role: ${promptRole.trim() || 'AI Mentor'}`,
    `Task: Explain "${promptTopic.trim() || 'Python Fundamentals'}" clearly for a 1st-year B.Tech student.`,
    `Format: ${promptFormat.trim() || 'Concise summary'}`,
  ].join('\n');

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(project.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1800);
    } catch {
      setCopiedCode(false);
    }
  };

  const handleAtmAction = (action: 'deposit' | 'withdraw') => {
    const result = processAtmTransaction(atmBalance, action, atmAmount);
    setAtmBalance(result.newBalance);
    setAtmMessage(result.message);
    setAtmSuccess(result.success);
    if (result.success) {
      setAtmHistory((prev) => [result.message, ...prev.slice(0, 4)]);
    }
  };

  const handleResetAtm = () => {
    setAtmBalance(5000);
    setAtmAmount('500');
    setAtmMessage('Account reset to ₹5,000.');
    setAtmSuccess(true);
    setAtmHistory(['Initial balance: ₹5,000']);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0B0F17] shadow-2xl">
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-blue-400">
              {project.stageLabel} · {currentIndex + 1} / {projects.length}
            </p>
            <h3
              id="lightbox-project-title"
              className="mt-0.5 truncate font-['Outfit'] text-xl font-semibold text-white"
            >
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              aria-label={`Previous project: ${prevProject.title}`}
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Prev</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              aria-label={`Next project: ${nextProject.title}`}
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project gallery"
              className="ml-1 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-2 text-slate-200 hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Gallery Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] bg-[#070A11] px-6 py-3">
          <div className="flex items-center gap-2" role="tablist" aria-label="Gallery slide view">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'visual'}
              onClick={() => setActiveTab('visual')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'visual'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Visual Preview</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'demo'}
              onClick={() => setActiveTab('demo')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'demo'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Interactive Demo</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'code'}
              onClick={() => setActiveTab('code')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'code'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Source Code</span>
            </button>
          </div>

          <p className="text-xs text-slate-400">{project.technologies.join(' · ')}</p>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6">
          {activeTab === 'visual' && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111722] lg:col-span-7">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <h4 className="font-['Outfit'] text-lg font-semibold text-white">
                    Project Overview
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.summary}</p>

                  <h5 className="mt-6 text-xs font-medium tracking-wider text-blue-400">
                    Key Learning Outcomes
                  </h5>
                  <ul className="mt-3 space-y-2.5 text-sm text-slate-300">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('demo')}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-blue-500"
                  >
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Launch Interactive Demo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('code')}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-slate-200 hover:bg-white/[0.08]"
                  >
                    <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Inspect Code</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="rounded-xl border border-white/[0.08] bg-[#070A11] p-6">
              {project.demoType === 'voter' && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-['Outfit'] text-lg font-semibold text-white">
                      Interactive Voter Eligibility Runner
                    </h4>
                    <p className="text-sm text-slate-400">
                      Test the Python conditional branching logic directly in the browser.
                    </p>

                    <div>
                      <label htmlFor="demo-voter-age" className="block text-xs font-medium text-slate-300">
                        Applicant Age
                      </label>
                      <input
                        id="demo-voter-age"
                        type="number"
                        value={voterAge}
                        onChange={(e) => setVoterAge(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0D131F] px-3.5 py-2.5 text-sm text-white tabular-nums focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <label className="flex items-center gap-2.5 text-sm text-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isCitizen}
                        onChange={(e) => setIsCitizen(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-[#0D131F] text-blue-600 focus:ring-blue-500"
                      />
                      <span>Verified Citizen</span>
                    </label>
                  </div>

                  <div className="flex flex-col justify-center rounded-xl border border-white/[0.08] bg-[#0D131F] p-6">
                    <p className="text-xs font-medium tracking-wider text-slate-400">
                      Evaluation Output
                    </p>
                    <p
                      data-testid="voter-demo-output"
                      className={`mt-2 font-['Outfit'] text-xl font-semibold ${
                        !voterResult.valid
                          ? 'text-amber-300'
                          : voterResult.eligible
                            ? 'text-emerald-300'
                            : 'text-rose-300'
                      }`}
                    >
                      {!voterResult.valid
                        ? 'Invalid Input'
                        : voterResult.eligible
                          ? 'Eligible to Vote'
                          : 'Not Eligible'}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">{voterResult.message}</p>
                  </div>
                </div>
              )}

              {project.demoType === 'atm' && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-['Outfit'] text-lg font-semibold text-white">
                        Interactive ATM Simulator
                      </h4>
                      <button
                        type="button"
                        onClick={handleResetAtm}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/[0.06]"
                      >
                        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Reset</span>
                      </button>
                    </div>

                    <div>
                      <label htmlFor="demo-atm-amount" className="block text-xs font-medium text-slate-300">
                        Transaction Amount (INR)
                      </label>
                      <input
                        id="demo-atm-amount"
                        type="number"
                        value={atmAmount}
                        onChange={(e) => setAtmAmount(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0D131F] px-3.5 py-2.5 text-sm text-white tabular-nums focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleAtmAction('deposit')}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-500"
                      >
                        Deposit Amount
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAtmAction('withdraw')}
                        className="rounded-lg border border-white/15 bg-[#111722] px-4 py-2 text-xs font-medium text-slate-100 hover:bg-[#192233]"
                      >
                        Withdraw Amount
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-[#0D131F] p-6">
                    <p className="text-xs font-medium tracking-wider text-slate-400">
                      Available Balance
                    </p>
                    <p
                      data-testid="atm-balance-value"
                      className="mt-1 font-['Outfit'] text-3xl font-bold text-white tabular-nums"
                    >
                      ₹{atmBalance.toLocaleString('en-IN')}
                    </p>
                    <p
                      data-testid="atm-status-message"
                      className={`mt-2 text-sm ${
                        atmSuccess ? 'text-emerald-300' : 'text-rose-300'
                      }`}
                    >
                      {atmMessage}
                    </p>

                    <div className="mt-5 border-t border-white/[0.08] pt-4">
                      <p className="text-xs font-medium text-slate-400">Recent Session Activity</p>
                      <ul className="mt-2 space-y-1.5 text-xs text-slate-300 font-mono">
                        {atmHistory.map((entry, idx) => (
                          <li key={`${entry}-${idx}`}>{entry}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {project.demoType === 'grade' && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-['Outfit'] text-lg font-semibold text-white">
                      Interactive Grade Calculator
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {['Python', 'Mathematics', 'Web Dev', 'AI Basics'].map((subject, index) => (
                        <div key={subject}>
                          <label
                            htmlFor={`mark-${index}`}
                            className="block text-xs font-medium text-slate-300"
                          >
                            {subject} (/100)
                          </label>
                          <input
                            id={`mark-${index}`}
                            type="number"
                            min={0}
                            max={100}
                            value={marks[index]}
                            onChange={(e) => {
                              const next = [...marks];
                              next[index] = e.target.value;
                              setMarks(next);
                            }}
                            className="mt-1 w-full rounded-lg border border-white/15 bg-[#0D131F] px-3 py-2 text-sm text-white tabular-nums focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center rounded-xl border border-white/[0.08] bg-[#0D131F] p-6">
                    <p className="text-xs font-medium tracking-wider text-slate-400">
                      Calculated Summary
                    </p>
                    <div className="mt-3 flex items-baseline gap-4">
                      <span className="font-['Outfit'] text-4xl font-bold text-white tabular-nums">
                        {gradeResult.valid ? gradeResult.letterGrade : '-'}
                      </span>
                      <span className="text-sm font-medium text-blue-300 tabular-nums">
                        {gradeResult.valid ? `${gradeResult.average}% Average` : 'Invalid marks'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{gradeResult.message}</p>
                  </div>
                </div>
              )}

              {project.demoType === 'genai' && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-['Outfit'] text-lg font-semibold text-white">
                      Structured Prompt Builder
                    </h4>
                    <div>
                      <label htmlFor="prompt-role" className="block text-xs font-medium text-slate-300">
                        Assistant Role
                      </label>
                      <input
                        id="prompt-role"
                        type="text"
                        value={promptRole}
                        onChange={(e) => setPromptRole(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0D131F] px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="prompt-topic" className="block text-xs font-medium text-slate-300">
                        Study Topic
                      </label>
                      <input
                        id="prompt-topic"
                        type="text"
                        value={promptTopic}
                        onChange={(e) => setPromptTopic(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0D131F] px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="prompt-format" className="block text-xs font-medium text-slate-300">
                        Output Format
                      </label>
                      <input
                        id="prompt-format"
                        type="text"
                        value={promptFormat}
                        onChange={(e) => setPromptFormat(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0D131F] px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-[#0D131F] p-6">
                    <p className="text-xs font-medium tracking-wider text-blue-400">
                      Compiled Prompt Output
                    </p>
                    <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-white/[0.06] bg-[#070A11] p-4 font-mono text-xs leading-6 text-slate-200">
                      {generatedPrompt}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#070A11]">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono font-medium text-white">{project.codeFileName}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">{project.codeLanguage}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/[0.08]"
                >
                  {copiedCode ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 text-slate-200">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Gallery Quick-Jump Thumbnail Strip */}
        <div className="border-t border-white/[0.08] bg-[#070A11] px-6 py-3">
          <div
            className="flex items-center gap-3 overflow-x-auto"
            aria-label="Project gallery quick switcher"
          >
            {projects.map((item, idx) => {
              const isCurrent = item.id === project.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectProject(item)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-lg border px-2.5 py-1.5 text-left transition-colors ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-600/15 text-white'
                      : 'border-white/[0.08] bg-[#0D131F] text-slate-400 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  <img
                    src={item.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-8 w-11 rounded object-cover"
                  />
                  <span className="text-xs font-medium whitespace-nowrap">
                    {idx + 1}. {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
