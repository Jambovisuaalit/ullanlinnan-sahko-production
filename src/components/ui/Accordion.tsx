export function Accordion({ items }: { items: readonly { id: string; question: string; answer: string }[] }) {
  return (
    <div className="accordion">
      {items.map((item) => (
        <details className="accordion__item" key={item.id}>
          <summary>
            <span>{item.question}</span>
          </summary>
          <div className="accordion__panel">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
