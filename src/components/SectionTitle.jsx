export default function SectionTitle({ index, kicker, title, children }) {
  return (
    <div className="section-head" data-reveal>
      <div className="section-kicker">
        {index && <span className="section-index">{index}</span>}
        <span className="section-kicker-line" />
        <span>{kicker}</span>
      </div>
      <h2 className="section-title">{title}</h2>
      {children && <div className="section-lead">{children}</div>}
    </div>
  )
}
