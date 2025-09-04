import { useEffect } from 'react';

export default function Toast({ message, onClose, kind = 'success' }) {
  useEffect(() => {
    const id = setTimeout(onClose, 2500);
    return () => clearTimeout(id);
  }, [onClose]);
  return (
    <div className={`fixed top-4 right-4 z-50 rounded-xl px-4 py-3 shadow-lg text-sm ${kind==='success'?'bg-green-600 text-white':'bg-red-600 text-white'}`}>
      {message}
    </div>
  );
}