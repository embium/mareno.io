"""Third-party service integrations.

This package contains integrations with external services:
- Brave Search: Web and news search engine
- Bing Answers: Direct AI question answering and citation extraction
"""

from integrations.bing import (
    BingAnswer,
    BingCitation,
    generate_convid,
    get_bing_answer,
    parse_bing_answers_raw,
)
from integrations.brave import search_brave

__all__ = [
    "search_brave",
    "get_bing_answer",
    "BingAnswer",
    "BingCitation",
    "generate_convid",
    "parse_bing_answers_raw",
]

