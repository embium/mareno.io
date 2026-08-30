"""Search service for Brave Search integration."""

import logging
from typing import Any, Literal, Optional

from integrations.brave import search_brave

logger = logging.getLogger(__name__)


class SearchService:
    """Service for managing Brave Search queries."""

    @staticmethod
    def search_web(
        query: str,
        count: int = 10,
        region: str = "us-en",
        safesearch: Literal["off", "moderate", "on"] = "moderate",
        timelimit: Optional[Literal["d", "w", "m", "y"]] = None,
        page: int = 1,
        extraction: bool = False,
    ) -> list[Any]:
        """
        Perform a web search using Brave Search.

        Args:
            query: Search query string
            count: Number of results to return (1-100, default: 10)
            region: Region code for localization (e.g., 'us-en', 'gb-en')
            safesearch: Safe search filter ('off', 'moderate', 'on')
            timelimit: Time filter ('d'=day, 'w'=week, 'm'=month, 'y'=year)
            page: Page number for pagination (default: 1)
            extraction: Whether to fetch full page content for each result

        Returns:
            List of search result dictionaries

        Raises:
            ValueError: If query is empty or invalid
            RuntimeError: If Brave search fails after retries
        """
        try:
            logger.debug(f"Performing web search: query='{query}', count={count}")

            results = search_brave(
                query=query,
                max_results=count,
                region=region,
                safesearch=safesearch,
                timelimit=timelimit,
                page=page,
                extraction=extraction,
                news=False,
            )

            logger.info(
                f"Web search completed successfully: query='{query}', results={len(results)}"
            )

            return results

        except ValueError as e:
            logger.warning(f"Invalid search request: {e}")
            raise
        except RuntimeError as e:
            logger.error(f"Brave search failed: {e}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error during web search: {e}")
            raise RuntimeError(f"Search failed: {e}")

    @staticmethod
    def search_news(
        query: str,
        count: int = 10,
        region: str = "us-en",
        timelimit: Optional[Literal["d", "w", "m", "y"]] = None,
        page: int = 1,
        extraction: bool = False,
    ) -> list[Any]:
        """
        Perform a news search using Brave Search.

        Args:
            query: Search query string
            count: Number of results to return (1-100, default: 10)
            region: Region code for localization (e.g., 'us-en', 'gb-en')
            timelimit: Time filter ('d'=day, 'w'=week, 'm'=month, 'y'=year)
            page: Page number for pagination (default: 1)
            extraction: Whether to fetch full article content for each result

        Returns:
            List of news result dictionaries

        Raises:
            ValueError: If query is empty or invalid
            RuntimeError: If Brave search fails after retries
        """
        try:
            logger.debug(f"Performing news search: query='{query}', count={count}")

            results = search_brave(
                query=query,
                max_results=count,
                region=region,
                safesearch="moderate",  # Always moderate for news
                timelimit=timelimit,
                page=page,
                extraction=extraction,
                news=True,
            )

            logger.info(
                f"News search completed successfully: query='{query}', results={len(results)}"
            )

            return results

        except ValueError as e:
            logger.warning(f"Invalid news search request: {e}")
            raise
        except RuntimeError as e:
            logger.error(f"Brave news search failed: {e}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error during news search: {e}")
            raise RuntimeError(f"News search failed: {e}")

    @staticmethod
    def validate_search_params(
        query: str,
        count: int,
        timelimit: Optional[str] = None,
    ) -> tuple[bool, Optional[str]]:
        """
        Validate search parameters.

        Returns:
            Tuple of (is_valid, error_message)
        """
        if not query or not query.strip():
            return False, "Search query cannot be empty"

        if len(query) > 500:
            return False, "Search query must be 500 characters or less"

        if count < 1 or count > 100:
            return False, "Result count must be between 1 and 100"

        if timelimit and timelimit not in ("d", "w", "m", "y"):
            return False, "Invalid time limit. Must be 'd', 'w', 'm', or 'y'"

        return True, None


# Global service instance
search_service = SearchService()
