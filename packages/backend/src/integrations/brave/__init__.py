"""Brave Search integration module.

This module provides integration with the Brave Search engine,
supporting both web and news search with result parsing and content extraction.
"""

from integrations.brave.brave import (
    BraveNewsResult,
    BraveSearchResult,
    extract_news_results,
    extract_web_results,
    get_clean_image_url,
    get_page_content,
    get_random_user_agent,
    get_str_attr,
    parse_dt_to_utc,
    search_brave,
)

__all__ = [
    "search_brave",
    "extract_web_results",
    "extract_news_results",
    "get_page_content",
    "get_random_user_agent",
    "get_str_attr",
    "get_clean_image_url",
    "parse_dt_to_utc",
    "BraveSearchResult",
    "BraveNewsResult",
]
