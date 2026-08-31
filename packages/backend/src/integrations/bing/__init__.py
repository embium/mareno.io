"""Bing Answer integration module.

This module provides integration with the Bing Answer feature,
supporting result parsing and content extraction.
"""

from integrations.bing.answer import (
    BingCitation,
    BingAnswer,
    generate_convid,
    parse_bing_answers_raw,
    get_bing_answer
)

__all__ = [
    "BingCitation",
    "BingAnswer",
    "generate_convid",
    "parse_bing_answers_raw",
    "get_bing_answer"
]