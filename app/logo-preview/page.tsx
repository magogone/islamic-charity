"use client"

import { BarkatLogo } from "@/components/barkat-logo"

export default function LogoPreviewPage() {
  return (
    <div className="min-h-screen bg-islamic-dark flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold text-islamic-gold mb-8">Barkat Alliance Foundation Logo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="flex flex-col items-center">
          <BarkatLogo size={120} />
          <p className="mt-4 text-islamic-cream">Default Variant</p>
        </div>

        <div className="flex flex-col items-center">
          <BarkatLogo size={120} variant="light" />
          <p className="mt-4 text-islamic-cream">Light Variant</p>
        </div>

        <div className="flex flex-col items-center">
          <BarkatLogo size={120} variant="gold" />
          <p className="mt-4 text-islamic-cream">Gold Variant</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center">
          <div className="bg-islamic-cream p-6 rounded-lg">
            <BarkatLogo size={80} />
          </div>
          <p className="mt-4 text-islamic-cream">On Light Background</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-islamic-medium p-6 rounded-lg">
            <BarkatLogo size={80} variant="light" />
          </div>
          <p className="mt-4 text-islamic-cream">On Medium Background</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-islamic-dark p-6 rounded-lg border border-islamic-medium">
            <BarkatLogo size={80} variant="gold" />
          </div>
          <p className="mt-4 text-islamic-cream">On Dark Background</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-bold text-islamic-gold mb-4">Logo Usage</h2>
        <p className="text-islamic-cream max-w-lg">
          The Barkat Alliance Foundation logo represents Islamic charity values with a stylized crescent moon and a
          giving hand symbol. The "BA" initials stand for Barkat Alliance, and the circular geometric pattern reflects
          Islamic art traditions.
        </p>
      </div>
    </div>
  )
}
