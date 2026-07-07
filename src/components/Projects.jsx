import { motion } from 'framer-motion'
import { projects } from '../data/portfolio'
import { staggerContainer, viewport } from '../lib/motion'
import SectionHeading from './ui/SectionHeading'
import Particles from './ui/Particles'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="section">
      {/* decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="halo left-1/4 top-10 h-56 w-56 bg-rose-300/30" aria-hidden="true" />
        <span className="halo bottom-16 right-10 h-64 w-64 bg-lilac-300/25" aria-hidden="true" />
        <span className="halo bottom-24 left-8 h-52 w-52 bg-sage-300/20" aria-hidden="true" />
        <Particles count={14} />
      </div>

      <SectionHeading
        eyebrow="Patent & Projects"
        emoji="🔬"
        title={
          <>
            Welcome to my <span className="text-gradient-anim">Lab</span> 🔬
          </>
        }
        description="A published patent and a family of hardware builds — pet care, greenhouses, and clean energy. Tap each little illustration to play!"
        accent="bg-rose-400"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </motion.div>
    </section>
  )
}
