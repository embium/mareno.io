import asyncio
import os
import sqlite3
import sys

# Add src to python path so we can import modules just like main.py does
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'src')))

from core.database import async_engine, Base, AsyncSessionLocal
from models.reddit import RedditProfession, RedditSubreddit, RedditSubredditProfession

SQLITE_DB_PATH = "../../painonsocial/professions_subreddits.db"

async def main():
    print("Connecting to sqlite DB...")
    db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), SQLITE_DB_PATH))
    if not os.path.exists(db_path):
        print(f"SQLite DB not found at {db_path}")
        return

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Create tables in PostgreSQL
    print("Creating tables in PostgreSQL...")
    async with async_engine.begin() as pg_conn:
        await pg_conn.run_sync(Base.metadata.create_all)
    
    print("Extracting from SQLite...")
    professions = cursor.execute("SELECT * FROM profession").fetchall()
    subreddits = cursor.execute("SELECT * FROM subreddit").fetchall()
    subreddit_professions = cursor.execute("SELECT * FROM subredditprofession").fetchall()
    
    print(f"Found {len(professions)} professions, {len(subreddits)} subreddits, {len(subreddit_professions)} relations.")
    
    async with AsyncSessionLocal() as session:
        # Check if already migrated
        result = await session.execute(
            __import__('sqlalchemy').select(RedditProfession).limit(1)
        )
        if result.scalars().first():
            print("Data already seems to exist in PostgreSQL. Please truncate tables if you want to run again.")
            return

        for p in professions:
            prof = RedditProfession(id=p['id'], name=p['name'])
            session.add(prof)
            
        for s in subreddits:
            sub = RedditSubreddit(
                id=s['id'],
                name=s['name'],
                description=s['description'],
                subscribers=s['subscribers'],
                activity_level=s['activity_level']
            )
            session.add(sub)
            
        for sp in subreddit_professions:
            rel = RedditSubredditProfession(
                id=sp['id'],
                subreddit_id=sp['subreddit_id'],
                profession_id=sp['profession_id']
            )
            session.add(rel)
            
        try:
            await session.commit()
            print("Successfully migrated data to PostgreSQL.")
        except Exception as e:
            await session.rollback()
            print(f"Error during migration: {e}")
            raise

if __name__ == "__main__":
    asyncio.run(main())
