import { stats } from '../data'

export function StatsBar() {
  return (
    <section className="bg-brand-muted border-y border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-5 py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-2xl md:text-3xl font-bold text-brand-dark">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
