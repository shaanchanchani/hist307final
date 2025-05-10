"use client"

import { Particles } from "@/components/ui/particles"
import { ArrowDownIcon } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-neutral-900">
      <Particles
        className="absolute inset-0 z-0"
        quantity={300}
        color="#6366f1"
        ease={80}
        size={2}
      />
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl text-white">
          The Points That Define Us 
          <span className="text-neutral-400"> (and Animals)</span>
        </h1>
        <p className="mb-4 max-w-3xl text-lg text-neutral-300 md:text-xl">
          A historical analysis of AI keypoint conventions, examining how technical and practical compromises 
          shaped human body representation—and the consequences when these frameworks are applied to 
          diverse animal anatomies.
        </p>
        <p className="mb-8 max-w-3xl text-lg text-neutral-300 md:text-xl">
          By examining this history, we gain insight into the <span className="text-purple-400">epistemic and subjective choices</span> embedded in these representation schemes—awareness that is crucial for developing more thoughtful approaches to representing diverse biological forms.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="#timeline" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 px-4 py-2 rounded-md font-medium transition-colors duration-200 inline-flex items-center">
            Explore the Timeline
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/Hist_of_AI Final Paper.pdf" target="_blank" className="border border-neutral-400 text-neutral-200 hover:bg-neutral-800/50 px-4 py-2 rounded-md font-medium transition-colors duration-200 inline-flex items-center">
            Read Paper
          </Link>
        </div>
      </div>
    </div>
  )
} 