ALTER TABLE public."Category"
    ADD COLUMN name_en TEXT,
    ADD COLUMN name_ja TEXT,
    ADD COLUMN name_zh TEXT;

ALTER TABLE public."Subject"
    ADD COLUMN name_en TEXT,
    ADD COLUMN name_ja TEXT,
    ADD COLUMN name_zh TEXT;

ALTER TABLE public."Series"
    ADD COLUMN name_en TEXT,
    ADD COLUMN name_ja TEXT,
    ADD COLUMN name_zh TEXT;

ALTER TABLE public."Tag"
    ADD COLUMN name_en TEXT,
    ADD COLUMN name_ja TEXT,
    ADD COLUMN name_zh TEXT;

COMMENT ON COLUMN public."Category".name_ja IS 'Japanese category label';
COMMENT ON COLUMN public."Category".name_zh IS 'Simplified Chinese category label';
COMMENT ON COLUMN public."Category".name_en IS 'English category label';
COMMENT ON COLUMN public."Subject".name_ja IS 'Japanese subject label';
COMMENT ON COLUMN public."Subject".name_zh IS 'Simplified Chinese subject label';
COMMENT ON COLUMN public."Subject".name_en IS 'English subject label';
COMMENT ON COLUMN public."Series".name_ja IS 'Japanese series label';
COMMENT ON COLUMN public."Series".name_zh IS 'Simplified Chinese series label';
COMMENT ON COLUMN public."Series".name_en IS 'English series label';
COMMENT ON COLUMN public."Tag".name_ja IS 'Japanese tag label';
COMMENT ON COLUMN public."Tag".name_zh IS 'Simplified Chinese tag label';
COMMENT ON COLUMN public."Tag".name_en IS 'English tag label';
