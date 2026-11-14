import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactFooter } from './components/ContactFooter';
import { HackathonsTimelineSection } from './components/HackathonsTimelineSection';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectGallerySection, type GalleryTab } from './components/ProjectGallerySection';
import { ProjectLightboxModal } from './components/ProjectLightboxModal';
import { SkillsSection } from './components/SkillsSection';
import { PROJECTS } from './data/portfolioData';
import type { ProjectItem } from './utils/portfolioLogic';

export default function App() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [initialTab, setInitialTab] = useState<GalleryTab>('visual');

  const handleOpenProject = (project: ProjectItem, tab: GalleryTab = 'visual') => {
    setInitialTab(tab);
    setActiveProject(project);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-[#E6ECF5]">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectGallerySection onOpenProject={handleOpenProject} />
        <HackathonsTimelineSection />
        <ContactFooter />
      </main>
      <ProjectLightboxModal
        project={activeProject}
        projects={PROJECTS}
        initialTab={initialTab}
        onClose={() => setActiveProject(null)}
        onSelectProject={(project) => setActiveProject(project)}
      />
    </div>
  );
}
