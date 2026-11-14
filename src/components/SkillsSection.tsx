import { SKILL_GROUPS } from '../data/portfolioData';

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 border-b border-white/[0.08] bg-[#090C14] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-wider text-blue-400">
            Skills &amp; Technologies
          </p>
          <h2 className="mt-2 font-['Outfit'] text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Technical Areas &amp; Current Familiarity
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Organized honestly by current stage of learning. No fabricated percentages or seniority
            claims—just a transparent look at what I am building with and studying.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0F1523] p-6"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-['Outfit'] text-lg font-semibold text-white">
                    {group.category}
                  </h3>
                </div>
                <p className="mt-1 text-xs text-slate-400 tabular-nums">{group.countLabel}</p>

                <ul className="mt-6 divide-y divide-white/[0.07]">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-3 py-3 text-sm"
                    >
                      <span className="text-slate-200">{item.name}</span>
                      <span className="shrink-0 text-xs font-medium text-blue-300">
                        {item.stage}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 rounded-xl border border-white/[0.08] bg-[#0D131F] px-5 py-4 text-sm leading-relaxed text-slate-300">
          <span className="font-semibold text-white">Proficiency Note:</span> Rather than arbitrary
          percentage ratings, skills are labeled as Beginner, Learning, or Exploring to reflect
          genuine academic progress during my first year.
        </p>
      </div>
    </section>
  );
}
