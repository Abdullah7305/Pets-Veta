-- Compatibility tombstone.
--
-- This migration was originally a misnamed duplicate of
-- 20260702000001_add_messaging_models. Its timestamp placed messaging before
-- the base migration that creates User, making shadow-database replay fail.
-- The live database's failed zero-step attempt is recorded as rolled back.
-- Keep this no-op migration so Prisma histories remain comparable.
SELECT 1;
