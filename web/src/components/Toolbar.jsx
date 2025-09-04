import { useRef } from 'react';

export default function Toolbar({ clientId, preparer, onFilterChange, onSave, dirtyCount }) {
  const cidRef = useRef(clientId ?? '');
  const prepRef = useRef(preparer ?? '');

  const update = (key, val) => onFilterChange({ [key]: val });

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 p-4 bg-white rounded-xl shadow-sm">
      <div className="flex-1">
        <label className="block text-xs text-slate-500">Client ID</label>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
          placeholder="e.g. 101"
          defaultValue={clientId ?? ''}
          onChange={e => update('clientId', e.target.value.replace(/[^0-9]/g,''))}
        />
      </div>

      <div className="flex-1">
        <label className="block text-xs text-slate-500">Preparer</label>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
          placeholder="e.g. alice"
          defaultValue={preparer ?? ''}
          onChange={e => update('preparer', e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3 sm:ml-auto">
        <button
          onClick={onSave}
          disabled={dirtyCount===0}
          className={`rounded-xl px-4 py-2 font-medium text-white shadow-sm transition ${dirtyCount>0? 'bg-indigo-600 hover:bg-indigo-700':'bg-slate-400 cursor-not-allowed'}`}
        >
          Save Changes {dirtyCount>0 && <span className="ml-2 bg-white/20 rounded px-2 py-0.5 text-xs">{dirtyCount}</span>}
        </button>
      </div>
    </div>
  );
}