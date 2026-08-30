"""Pydantic schemas for Brave Search endpoints."""

from typing import Any, Literal, Optional

from pydantic import BaseModel, Field


class SearchRequest(BaseModel):
    """Schema for search request (web and news)."""

    query: str = Field(
        ...,
        min_length=1,
        max_length=500,
        description="Search query string",
        examples=["python fastapi"],
    )
    count: int = Field(
        10,
        ge=1,
        le=100,
        description="Number of results to return (default: 10, max: 100)",
    )
    region: str = Field(
        "us-en",
        description="Region code for localization (e.g., 'us-en', 'gb-en', 'de-de')",
    )
    safesearch: Literal["off", "moderate", "on"] = Field(
        "moderate",
        description="Safe search filter: 'off' (no filter), 'moderate' (balanced), 'on' (strict)",
    )
    timelimit: Optional[Literal["d", "w", "m", "y"]] = Field(
        None,
        description="Filter results by time: 'd'=today, 'w'=past week, 'm'=past month, 'y'=past year",
    )
    page: int = Field(
        1,
        ge=1,
        description="Page number for pagination (default: 1)",
    )
    extraction: bool = Field(
        False,
        description="Whether to extract full page content for each result (may be slower)",
    )

    class Config:
        """Pydantic config."""

        json_schema_extra = {
            "example": {
                "query": "artificial intelligence",
                "count": 10,
                "region": "us-en",
                "safesearch": "moderate",
                "timelimit": "w",
                "page": 1,
                "extraction": False,
            }
        }


class SearchResult(BaseModel):
    """Schema for individual search result."""

    title: str = Field(..., description="Result title")
    url: str = Field(..., description="Result URL")
    description: str = Field(..., description="Result snippet/summary")
    thumbnail_url: Optional[str] = Field(
        None, description="Thumbnail/preview image URL"
    )
    favicon_url: Optional[str] = Field(
        None, description="Site favicon/logo URL"
    )
    page_age: Optional[str] = Field(
        None, description="Publication/update date (ISO 8601)"
    )
    content: Optional[str] = Field(
        None, description="Full extracted page content (if extraction=true)"
    )

    class Config:
        """Pydantic config."""

        from_attributes = True
        extra = "allow"


class SearchResponse(BaseModel):
    """Schema for search response."""

    query: str = Field(..., description="The search query used")
    search_type: Literal["web", "news"] = Field(
        ..., description="Type of search performed"
    )
    results: list[SearchResult] = Field(
        ..., description="List of search results"
    )
    count: int = Field(..., description="Number of results returned")

    class Config:
        """Pydantic config."""

        from_attributes = True
        json_schema_extra = {
            "example": {
                "query": "python fastapi",
                "search_type": "web",
                "results": [
                    {
                        "title": "FastAPI",
                        "url": "https://fastapi.tiangolo.com/",
                        "description": "FastAPI is a modern, fast web framework for building APIs with Python",
                        "thumbnail_url": None,
                        "favicon_url": "https://fastapi.tiangolo.com/favicon.png",
                        "page_age": "2024-01-15T12:00:00Z",
                        "content": None,
                    }
                ],
                "count": 1,
            }
        }
