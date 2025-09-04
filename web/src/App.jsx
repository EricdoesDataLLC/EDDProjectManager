import { useEffect, useMemo, useRef, useState } from 'react';
import Toolbar from './components/Toolbar.jsx';
import ProjectRow from './components/ProjectRow.jsx';
import Paginator from './components/Paginator.jsx';
import Toast from './components/Toast.jsx';
import { fetchProjects, bulkSave } from './api.js';

function useDebounced(value, delay) {
  const [v, setV] = useState(value);
  useEffect(() => { const id = setTimeout(() => setV(value), delay); return () => clearTimeout(id); }, [value, delay]);
  return v;
}

export default function App() {
  const [filters, setFilters] = useState({ clientId: '', preparer: '' });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [data, setData] = useState({ rows: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [edits, setEdits] = useState(new Map());
  const [toast, setToast] = useState(null);

  const dClientId = useDebounced(filters.clientId, 300);
  const dPreparer = useDebounced(filters.preparer, 300);

  useEffect(() => { setPage(1); }, [dClientId, dPreparer]);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetchProjects({ clientId: dClientId, preparer: dPreparer, page, pageSize })
      .then(res => { if (!ignore) setData(res); })
      .catch(err => setToast({ kind: 'error', message: err.message }))
      .finally(() => setLoading(false));
    return () => { ignore = true; };
  }, [dClientId, dPreparer, page, pageSize]);

  const onEdit = (id, payload) => {
    const next = new Map(edits);
    next.set(id, payload);
    setEdits(next);
  };

  const save = async () => {
    if (edits.size === 0) return;
    const payload = Array.from(edits.values());
    try {
      await bulkSave(payload);
      setToast({ kind: 'success', message: `Saved ${payload.length} change(s).` });
      setEdits(new Map());
      // Reload
      const res = await fetchProjects({ clientId: dClientId, preparer: dPreparer, page, pageSize });
      setData(res);
    } catch (e) {
      setToast({ kind: 'error', message: e.message });
    }
  };

  const dirtyCount = edits.size;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-slate-800 mb-4">Project Tracker</h1>

      <Toolbar
        clientId={filters.clientId}
        preparer={filters.preparer}
        onFilterChange={patch => setFilters(prev => ({ ...prev, ...patch }))}
        onSave={save}
        dirtyCount={dirtyCount}
      />

      <div className="mt-4 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2 text-sm text-slate-600 border-b flex items-center justify-between">
          <div>{loading ? 'Loading…' : `${data.total} project(s)`}</div>
          <Paginator page={page} pageSize={pageSize} total={data.total} onChange={setPage} />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="text-left font-medium px-3 py-2">ID</th>
                <th className="text-left font-medium px-3 py-2">Name</th>
                <th className="text-left font-medium px-3 py-2">Client</th>
                <th className="text-left font-medium px-3 py-2">Preparer</th>
                <th className="text-left font-medium px-3 py-2">Priority</th>
                <th className="text-left font-medium px-3 py-2">Comments</th>
                <th className="text-left font-medium px-3 py-2">Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map(p => (
                <ProjectRow key={p.ProjectId} p={p} onEdit={onEdit} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
import Login from './Login.jsx';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) return <Login onLogin={setToken} />;

  return (
    <MainApp />  // the previous App content moved to MainApp component
  );
}