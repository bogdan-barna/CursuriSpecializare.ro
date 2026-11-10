/**
 * Éles site (Lovable): másold be src/lib/admin/delete-student-portfolio.ts alá.
 */
import type { SupabaseClient } from '@supabase/supabase-js';

export type DeleteStudentPortfolioResult = {
  userId: string;
  profileDocuments: number;
  enrollmentDocuments: number;
  practiceSubmissions: number;
  storageObjects: number;
};

export async function deleteStudentPortfolio(
  supabase: SupabaseClient,
  userId: string
): Promise<DeleteStudentPortfolioResult> {
  const { data, error } = await supabase.rpc('admin_delete_student_portfolio', {
    p_user_id: userId,
  });

  if (error) {
    throw error;
  }

  return data as DeleteStudentPortfolioResult;
}
