"""Answer models and typed structures for direct question answering."""

from typing import TypedDict


class CitationDict(TypedDict):
    """Structure for an individual citation reference."""

    number: int
    title: str
    url: str


class AnswerResultDict(TypedDict):
    """Structure for an answer result with extracted citations."""

    text: str
    citations: list[CitationDict]
