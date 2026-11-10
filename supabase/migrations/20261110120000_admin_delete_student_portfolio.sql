-- Admin: delete a student's full document portfolio (profile + enrollment docs + practice submissions)

CREATE POLICY profile_documents_admin_delete
  ON public.profile_documents
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY practice_submissions_admin_delete
  ON public.practice_submissions
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

CREATE OR REPLACE FUNCTION public.admin_delete_student_portfolio(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, storage
AS $$
DECLARE
  v_actor uuid := auth.uid();
  v_profile int := 0;
  v_enrollment_docs int := 0;
  v_practice int := 0;
  v_storage int := 0;
  v_deleted int := 0;
  v_name text;
  v_email text;
BEGIN
  IF v_actor IS NULL THEN
    RAISE EXCEPTION 'not authenticated' USING ERRCODE = '42501';
  END IF;

  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'not authorized' USING ERRCODE = '42501';
  END IF;

  IF p_user_id IS NULL THEN
    RAISE EXCEPTION 'user_id required' USING ERRCODE = '22023';
  END IF;

  SELECT first_name || ' ' || last_name, email
    INTO v_name, v_email
  FROM public.profiles
  WHERE id = p_user_id;

  IF v_name IS NULL THEN
    RAISE EXCEPTION 'profile not found' USING ERRCODE = 'P0002';
  END IF;

  DELETE FROM storage.objects o
  USING public.profile_documents pd
  WHERE pd.user_id = p_user_id
    AND o.bucket_id = 'enrollment-documents'
    AND o.name = pd.path;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  v_storage := v_storage + v_deleted;

  DELETE FROM storage.objects o
  USING public.enrollment_documents ed
  JOIN public.enrollments e ON e.id = ed.enrollment_id
  WHERE e.user_id = p_user_id
    AND o.bucket_id = 'enrollment-documents'
    AND o.name = ed.path;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  v_storage := v_storage + v_deleted;

  DELETE FROM storage.objects o
  USING public.practice_submission_files psf
  JOIN public.practice_submissions ps ON ps.id = psf.submission_id
  WHERE ps.user_id = p_user_id
    AND o.bucket_id = 'practice-submissions'
    AND o.name = psf.path;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  v_storage := v_storage + v_deleted;

  DELETE FROM public.practice_submissions WHERE user_id = p_user_id;
  GET DIAGNOSTICS v_practice = ROW_COUNT;

  DELETE FROM public.enrollment_documents ed
  USING public.enrollments e
  WHERE ed.enrollment_id = e.id
    AND e.user_id = p_user_id;
  GET DIAGNOSTICS v_enrollment_docs = ROW_COUNT;

  DELETE FROM public.profile_documents WHERE user_id = p_user_id;
  GET DIAGNOSTICS v_profile = ROW_COUNT;

  INSERT INTO public.activity_log (actor_id, actor_role, action, summary, meta)
  VALUES (
    v_actor,
    'admin',
    'portfolio.deleted',
    format('a șters portofoliul documentelor cursantului %s (%s)', v_name, coalesce(v_email, 'fără email')),
    jsonb_build_object(
      'targetUserId', p_user_id,
      'deleted', jsonb_build_object(
        'profileDocuments', v_profile,
        'enrollmentDocuments', v_enrollment_docs,
        'practiceSubmissions', v_practice,
        'storageObjects', v_storage
      )
    )
  );

  RETURN jsonb_build_object(
    'userId', p_user_id,
    'profileDocuments', v_profile,
    'enrollmentDocuments', v_enrollment_docs,
    'practiceSubmissions', v_practice,
    'storageObjects', v_storage
  );
END;
$$;

REVOKE ALL ON FUNCTION public.admin_delete_student_portfolio(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_delete_student_portfolio(uuid) TO authenticated;
