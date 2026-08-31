"""Answer service for AI-powered direct question answering via Bing Answer integration."""

import logging
from typing import Any, Optional

from integrations.bing import BingAnswer, get_bing_answer

logger = logging.getLogger(__name__)


class AnswerService:
    """Service for managing AI-generated direct question answering."""

    @staticmethod
    def get_answer(
        query: str,
        timeout: int = 15,
        max_attempts: int = 3,
        proxy: Optional[str] = None,
    ) -> Optional[BingAnswer]:
        """
        Fetch an AI-synthesized answer directly from the Bing Answer engine.

        Args:
            query: Question or search query string
            timeout: Timeout in seconds for HTTP requests (default: 15)
            max_attempts: Maximum retry attempts upon network failure (default: 3)
            proxy: Optional HTTP/HTTPS proxy URL

        Returns:
            BingAnswer dict containing 'text' and 'citations', or None if no answer found.

        Raises:
            ValueError: If the query is empty or invalid
            RuntimeError: If answer fetching fails after retries
        """
        try:
            logger.debug(f"Fetching AI answer for query='{query}', timeout={timeout}")

            answer = get_bing_answer(
                query=query,
                timeout=timeout,
                max_attempts=max_attempts,
                proxy=proxy,
            )

            if answer:
                logger.info(
                    f"AI answer generated successfully: query='{query}', "
                    f"text_length={len(answer.get('text', ''))}, "
                    f"citations={len(answer.get('citations', []))}"
                )
            else:
                logger.warning(f"No AI answer returned for query='{query}'")

            return answer

        except ValueError as e:
            logger.warning(f"Invalid answer request parameters: {e}")
            raise
        except RuntimeError as e:
            logger.error(f"Bing answer fetching failed: {e}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error during answer fetching: {e}")
            raise RuntimeError(f"Failed to generate answer: {e}")

    @staticmethod
    def validate_answer_params(
        query: str,
        timeout: Optional[int] = None,
    ) -> tuple[bool, Optional[str]]:
        """
        Validate answer query parameters.

        Returns:
            Tuple of (is_valid, error_message)
        """
        if not query or not query.strip():
            return False, "Query cannot be empty"

        if len(query.strip()) > 500:
            return False, "Query must be 500 characters or less"

        if timeout is not None and (timeout < 5 or timeout > 60):
            return False, "Timeout must be between 5 and 60 seconds"

        return True, None


# Global service singleton instance
answer_service = AnswerService()
