// Fixed decorative background: drifting violet orbs, faint grid, film grain.
export default function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid-lines" />
      <div className="grain" />
      <div className="vignette" />
    </div>
  );
}
