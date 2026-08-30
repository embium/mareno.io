from core.config import settings
from services.reddit_scraper import (
    RedditClient,
    RedditScraper,
    ScraperConfig,
    ScraperMetrics,
)
import logging

logging.basicConfig(level=logging.DEBUG)


scraper = RedditScraper()

posts = scraper.scrape_subreddit("LocalLLaMA", limit=5)

# print(len(posts))

# subreddit = "localllama"
# id = "1vkmhyl"
posts_fetched = 0
for post in posts:
    subreddit = post["data"]["subreddit"]
    id = post["data"]["id"]
    post_data, comments = scraper.scrape_post_with_comments(subreddit, id)
    if comments:
        posts_fetched += 1
    print(post_data)
    print(len(comments))

print(f"Fetched {posts_fetched}/{len(posts)} posts")
