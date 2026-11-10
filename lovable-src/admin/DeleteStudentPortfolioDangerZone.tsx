/**
 * Éles site (Lovable): másold be src/components/admin/DeleteStudentPortfolioDangerZone.tsx alá.
 * Illeszd a cursant admin / member detail oldal „danger zone” szekciójába.
 */
import { useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Trash2 } from 'lucide-react';

import { deleteStudentPortfolio } from '@/lib/admin/delete-student-portfolio';

type Props = {
  supabase: SupabaseClient;
  userId: string;
  studentName: string;
  onDeleted?: () => void;
};

export function DeleteStudentPortfolioDangerZone({
  supabase,
  userId,
  studentName,
  onDeleted,
}: Props) {
  const [open, setOpen] = useState(false);
  const [confirmName, setConfirmName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canConfirm = confirmName.trim() === studentName.trim();

  async function handleDelete() {
    if (!canConfirm || busy) return;
    setBusy(true);
    setError(null);
    try {
      const result = await deleteStudentPortfolio(supabase, userId);
      setOpen(false);
      setConfirmName('');
      onDeleted?.();
      // Ha van toast rendszer: success üzenet a result számlálókkal
      void result;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ștergerea a eșuat');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="border-destructive/30 rounded-lg border p-4">
      <h3 className="text-destructive text-sm font-semibold">Zonă sensibilă</h3>
      <p className="text-muted-foreground mt-1 text-sm">
        Șterge <strong>tot portofoliul de documente</strong> al cursantului: fișiere profil, documente
        de înscriere și predări la practică. Înscrierea la curs și progresul LMS rămân.
      </p>
      <button
        type="button"
        className="bg-destructive text-destructive-foreground mt-3 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="size-4" />
        Șterge portofoliul complet
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-portfolio-title"
        >
          <div className="bg-background max-w-md rounded-lg border p-6 shadow-lg">
            <h2 id="delete-portfolio-title" className="text-lg font-semibold">
              Confirmă ștergerea portofoliului
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Acțiunea este ireversibilă. Scrie numele cursantului{' '}
              <strong>{studentName}</strong> pentru confirmare.
            </p>
            <input
              type="text"
              className="border-input mt-4 w-full rounded-md border px-3 py-2 text-sm"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              autoComplete="off"
              disabled={busy}
            />
            {error ? <p className="text-destructive mt-2 text-sm">{error}</p> : null}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-md border px-3 py-2 text-sm"
                onClick={() => {
                  setOpen(false);
                  setConfirmName('');
                  setError(null);
                }}
                disabled={busy}
              >
                Anulează
              </button>
              <button
                type="button"
                className="bg-destructive text-destructive-foreground rounded-md px-3 py-2 text-sm font-medium disabled:opacity-50"
                onClick={handleDelete}
                disabled={!canConfirm || busy}
              >
                {busy ? 'Se șterge…' : 'Șterge definitiv'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
