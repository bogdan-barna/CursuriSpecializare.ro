# Admin: cursant teljes portfólió törlése

## Mit jelent a „portfólió”?

A cursant **összes feltöltött dokumentuma** az LMS-ben és az inscrierében:

| Réteg | Tábla | Storage bucket |
| --- | --- | --- |
| Profil (CI, diplomák stb.) | `profile_documents` | `enrollment-documents` |
| Inscriere dokumentumok | `enrollment_documents` | `enrollment-documents` |
| Practică predásek | `practice_submissions` (+ `practice_submission_files`) | `practice-submissions` |

**Nem** törli: a user fiókot, enrollment rekordokat, lesson progress-t, teszteredményeket.

## Backend (Supabase) – már éles

Migration: `supabase/migrations/20261110120000_admin_delete_student_portfolio.sql`

- RPC: `admin_delete_student_portfolio(p_user_id uuid)` → `jsonb` (számlálók)
- Csak `is_admin()` hívhatja
- Törli a storage fájlokat és a DB sorokat, `activity_log` → `portfolio.deleted`
- RLS: admin törölhet `profile_documents` és `practice_submissions` sorokat is

## Lovable UI – mit illeszd be?

1. Másold a fájlokat:

   - `lovable-src/admin/delete-student-portfolio.ts` → pl. `src/lib/admin/delete-student-portfolio.ts`
   - `lovable-src/admin/DeleteStudentPortfolioDangerZone.tsx` → pl. `src/components/admin/DeleteStudentPortfolioDangerZone.tsx`

2. **Cursant admin nézet** (ahol már látszik a profil / dokumentumok / practică):

   Keress: `StudentDetail`, `CursantDetail`, `admin/users`, `MemberDetail` stb.

   A „Danger zone” vagy „Documente” szekció aljára:

   ```tsx
   import { DeleteStudentPortfolioDangerZone } from '@/components/admin/DeleteStudentPortfolioDangerZone';

   <DeleteStudentPortfolioDangerZone
     userId={student.userId}
     studentName={`${profile.first_name} ${profile.last_name}`}
     onDeleted={() => refetchStudent()}
   />
   ```

3. **Alternatíva csak RPC** (saját gomb):

   ```ts
   import { deleteStudentPortfolio } from '@/lib/admin/delete-student-portfolio';

   const result = await deleteStudentPortfolio(supabase, userId);
   // toast: șters X documente profil, Y înscriere, Z practică
   ```

## UX követelmények

- Megerősítő dialog: egyértelmű román szöveg („Șterge tot portofoliul de documente”)
- Csak admin UI-ban jelenjen meg (`is_admin` / role check a szervertől is jön az RPC-n)
- Siker: toast + lista újratöltés
- Hiba: `not authorized` → session; `profile not found` → rossz `userId`

## Teszt (staging / dev)

1. Admin belépés
2. Olyan cursant, akinek van practică file a `practice-submissions` bucketben
3. RPC hívás után: üres dokumentum listák, fájlok nincsenek a storage-ban, activity logban `portfolio.deleted`
