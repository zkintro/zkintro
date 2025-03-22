const FootnotesSidebar = ({ footnotes }) => (
  <div>
    <h2 className="text-xl font-bold">Footnotes</h2>
    <ul className="list-inside list-disc">
      {footnotes.map((note, index) => (
        <li key={index}>
          <a href={`#fn${index + 1}`}>{note}</a>
        </li>
      ))}
    </ul>
  </div>
)

export default FootnotesSidebar
