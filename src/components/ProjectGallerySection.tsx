import { useMemo, useState } from 'react';
import { Code2, ExternalLink, LayoutGrid, Maximize2, Play, Rows3, Search, X } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { filterProjects, type ProjectCategory, type ProjectItem } from '../utils/portfolioLogic';

export type GalleryTab = 'visual' | 'demo' | 'code';

interface ProjectGallerySectionProps {
  onOpenProject: (project: ProjectItem, initialTab?: GalleryTab) => void;
}

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'All', label: 'All Projects' },
  { id: 'Python', label: 'Python' },
  { id: 'Web & GenAI', label: 'Web & GenAI' },
];

export function ProjectGallerySection({ onOpenProject }: ProjectGallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'showcase'>('grid');

  const filteredProjects = useMemo(
    () => filterProjects(PROJECTS, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  return (
    <section id="projects" className="scroll-mt-20 border-b border-white/[0.08] bg-[#07090E] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-blue-400">
              Interactive Project Galleries
            </p>
            <h2 className="mt-2 font-['Outfit'] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Hands-on Programming &amp; Exploration Projects
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Applications created to solidify programming logic, handle user input, and explore
              web and Generative AI workflows. Click any project card to inspect its visual
              gallery, run a live interactive demo, or review the source code.
            </p>
          </div>

          <p className="text-sm font-medium text-slate-400 tabular-nums shrink-0">
            Showing {filteredProjects.length} of {PROJECTS.length} projects
          </p>
        </div>

        {/* Interactive Gallery Controls */}
        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#0D131F] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#070A11] p-1 border border-white/[0.06]"
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64 sm:flex-none">
              <label htmlFor="project-search" className="sr-only">
                Search projects or technologies
              </label>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="project-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title or tech..."
                className="w-full rounded-lg border border-white/10 bg-[#070A11] py-2 pl-9 pr-8 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear project search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div
              className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#070A11] p-1"
              aria-label="Gallery layout view"
            >
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                aria-label="Grid gallery view"
                aria-pressed={layoutMode === 'grid'}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  layoutMode === 'grid'
                    ? 'bg-white/[0.12] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('showcase')}
                aria-label="Showcase list view"
                aria-pressed={layoutMode === 'showcase'}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  layoutMode === 'showcase'
                    ? 'bg-white/[0.12] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Rows3 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Showcase</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Results */}
        {filteredProjects.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-[#0D131F] p-12 text-center">
            <p className="font-['Outfit'] text-lg font-semibold text-white">
              No matching projects found
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Try clearing your search query or switching back to All Projects.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              Reset Gallery Filters
            </button>
          </div>
        ) : (
          <div
            data-testid="project-gallery-grid"
            className={
              layoutMode === 'grid'
                ? 'mt-8 grid grid-cols-1 gap-7 md:grid-cols-2'
                : 'mt-8 flex flex-col gap-6'
            }
          >
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className={`group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D131F] transition-colors duration-150 hover:border-blue-500/40 ${
                  layoutMode === 'showcase' ? 'grid grid-cols-1 lg:grid-cols-12' : 'flex flex-col'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onOpenProject(project, 'visual')}
                  aria-label={`Open gallery for ${project.title}`}
                  className={`relative block w-full overflow-hidden bg-[#131B2B] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    layoutMode === 'showcase' ? 'lg:col-span-5 h-64 lg:h-full' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090E]/90 via-[#07090E]/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                    <span className="font-medium">Visual · Live Demo · Source</span>
                    <span className="inline-flex items-center gap-1 font-medium text-blue-300">
                      <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Inspect</span>
                    </span>
                  </div>
                </button>

                <div
                  className={`flex flex-1 flex-col justify-between p-6 ${
                    layoutMode === 'showcase' ? 'lg:col-span-7 sm:p-8' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                      <span className="font-medium text-blue-400">{project.stageLabel}</span>
                      <span>{project.category}</span>
                    </div>

                    <h3 className="mt-2 font-['Outfit'] text-xl font-semibold text-white">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.summary}</p>

                    <div className="mt-5 border-t border-white/[0.07] pt-4">
                      <p className="text-[11px] font-medium tracking-wider text-slate-500">
                        Technologies
                      </p>
                      <p className="mt-1.5 text-xs font-medium text-slate-300">
                        {project.technologies.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenProject(project, 'visual')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Open Gallery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenProject(project, 'demo')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-slate-200 whitespace-nowrap shrink-0 transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <Play className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                      <span>Live Demo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenProject(project, 'code')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-slate-200 whitespace-nowrap shrink-0 transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <Code2 className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
                      <span>Code</span>
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white whitespace-nowrap shrink-0"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
