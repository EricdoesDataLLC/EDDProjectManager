export default function Paginator({ page, pageSize, total, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center justify-between text-sm text-slate-600">
      <div>Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{pages}</span></div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 rounded border" onClick={() => onChange(page-1)} disabled={page<=1}>Prev</button>
        <button className="px-3 py-1 rounded border" onClick={() => onChange(page+1)} disabled={page>=pages}>Next</button>
      </div>
    </div>
  );
}