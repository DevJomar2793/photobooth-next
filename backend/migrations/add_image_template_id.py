from sqlalchemy import text

from database import engine


ADD_TEMPLATE_COLUMN = """
ALTER TABLE image
ADD COLUMN IF NOT EXISTS template_id VARCHAR(50)
"""

BACKFILL_TEMPLATE_IDS = """
UPDATE image
SET template_id = CASE
    WHEN filename LIKE 'best-friends-%' THEN 'best-friends'
    WHEN filename LIKE 'school-life-%' THEN 'school-life'
    WHEN filename LIKE 'film-strip-%' THEN 'film-strip'
    WHEN filename LIKE 'cute-doodles-%' THEN 'cute-doodles'
    WHEN filename LIKE 'classic-%' THEN 'classic'
    WHEN filename LIKE 'colorful-%' THEN 'colorful'
    WHEN filename LIKE 'notebook-%' THEN 'notebook'
    WHEN filename LIKE 'premium-%' THEN 'premium'
    ELSE template_id
END
WHERE template_id IS NULL
"""


def run_migration() -> None:
    if engine is None:
        raise RuntimeError("Database connection parameters are not set in backend/.env.")

    with engine.begin() as connection:
        connection.execute(text(ADD_TEMPLATE_COLUMN))
        connection.execute(text(BACKFILL_TEMPLATE_IDS))

    print("Image template migration completed.")


if __name__ == "__main__":
    run_migration()
