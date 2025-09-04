import { useState } from 'react';

export default function ProjectRow({ p, onEdit }) {
  const [comments, setComments] = useState(p.Comments ?? '');
  const [priority, setPriority] = useState(p.Priority ?? '');

  const changed = (comments !== (p.Comments ?? '')) || (String(priority||'') !== String(p.Priority ?? ''));

  const apply = () => onEdit(p.ProjectId, {
    ProjectId: p.ProjectId,
    Comments: comments === '' ? null : comments,
    Priority: priority === '' ? null : Number(priority)
  });

  return (
    <tr className={`border-b ${changed? 'bg-amber-50':'bg-white'}`}>
      <td className="px-3 py-2 tabular-nums text-slate-700 whitespace-nowrap">{p.ProjectId}</td>
      <td className="px-3 py-2 text-slate-800">{p.Name}</td>
      <td className="px-3 py-2 text-slate-700">{p.ClientId}</td>
      <td className="px-3 py-2 text-slate-700">{p.Preparer}</td>
      <td className="px-3 py-2 w-28">
        <input
          className="w-24 rounded border border-slate-300 px-2 py-1"
          type="number"
          value={priority}
          onChange={e => setPriority(e.target.value)}
          onBlur={apply}
        />
      </td>
      <td className="px-3 py-2 w-[28rem]">
        <textarea
          className="w-full min-h-[40px] rounded border border-slate-300 px-2 py-1"
          value={comments}
          onChange={e => setComments(e.target.value)}
          onBlur={apply}
          placeholder="Add a comment"
        />
      </td>
      <td className="px-3 py-2 text-xs text-slate-500 whitespace-nowrap">{new Date(p.UpdatedAt).toLocaleString()}</td>
    </tr>
  );
}