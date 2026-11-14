import {
  CURRENT_FOCUS_ITEMS,
  HACKATHONS,
  LEARNING_STAGES,
  ROADMAP_ITEMS,
  VISION_STATEMENT,
} from '../data/portfolioData';

export function HackathonsTimelineSection() {
  return (
    <>
      {/* Hackathons & Ideathons */}
      <section id="hackathons" className="scroll-mt-20 border-b border-white/[0.08] bg-[#090C14] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-wider text-blue-400">
              Hackathons &amp; Ideathons
            </p>
            <h2 className="mt-2 font-['Outfit'] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Collaborative Problem Solving &amp; Ideation
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              “I enjoy participating in hackathons and ideathons because they give me an opportunity
              to explore real-world problems, develop ideas, collaborate with others, and learn how
              technology can create practical solutions.”
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {HACKATHONS.map((item) => (
              <article
                key={item.title}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0F1523] p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-medium text-blue-400">{item.badge}</span>
                  </div>
                  <h3 className="mt-2 font-['Outfit'] text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-slate-400">{item.role}</p>

                  <div className="mt-6 space-y-5 border-t border-white/[0.08] pt-5">
                    <div>
                      <p className="text-[11px] font-medium tracking-wider text-slate-400">
                        What I Explored
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                        {item.explored}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium tracking-wider text-slate-400">
                        What I Learned
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                        {item.learned}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Journey Timeline + Long-Term Vision */}
      <section id="journey" className="scroll-mt-20 border-b border-white/[0.08] bg-[#07090E] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-wider text-blue-400">Timeline</p>
            <h2 className="mt-2 font-['Outfit'] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Learning Journey
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              A step-by-step view of my progression from foundational programming to web technologies
              and exploring generative AI.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            {LEARNING_STAGES.map((stage) => (
              <div
                key={stage.stage}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0D131F] p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono font-semibold text-blue-400 tabular-nums">
                      {stage.stage}
                    </span>
                    <span
                      className={
                        stage.status === 'Future Goal'
                          ? 'text-slate-400'
                          : 'font-medium text-emerald-300'
                      }
                    >
                      {stage.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-['Outfit'] text-base font-semibold text-white">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Current Focus + Long-Term Vision */}
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0D131F] p-6 sm:p-8 lg:col-span-5">
              <p className="text-xs font-medium tracking-wider text-blue-400">Current Focus</p>
              <h3 className="mt-2 font-['Outfit'] text-2xl font-bold text-white">
                What I&apos;m Currently Learning
              </h3>
              <ul className="mt-6 divide-y divide-white/[0.07]">
                {CURRENT_FOCUS_ITEMS.map((item) => (
                  <li key={item} className="py-3 text-sm text-slate-200">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0D131F] p-6 sm:p-8 lg:col-span-7">
              <p className="text-xs font-medium tracking-wider text-blue-400">Long-Term Vision</p>
              <h3 className="mt-2 font-['Outfit'] text-2xl font-bold text-white">
                Where I&apos;m Heading
              </h3>
              <blockquote className="mt-4 text-base leading-relaxed text-slate-200">
                {VISION_STATEMENT}
              </blockquote>

              <div className="mt-8 border-t border-white/[0.08] pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-['Outfit'] text-lg font-semibold text-white">
                    Future Learning Roadmap
                  </h4>
                  <span className="text-xs text-slate-400">
                    Planned study milestones (Not claimed as current expertise)
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {ROADMAP_ITEMS.map((item) => (
                    <div
                      key={item.index}
                      className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#070A11] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold text-blue-400 tabular-nums">
                          {item.index}
                        </span>
                        <span className="text-sm font-medium text-slate-200">{item.topic}</span>
                      </div>
                      <span className="text-[11px] text-slate-500">Target</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
