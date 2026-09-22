"""Brave Search API endpoints using API key authentication."""

import logging
from typing import Literal, Optional

from fastapi import APIRouter, Depends, HTTPException, Header, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.verify_api_key import verify_api_key
from core.database import get_db
from core.dependencies import extract_api_key_header
from schemas.search import SearchRequest, SearchResponse
from services.api_key_service import api_key_service
from services.search_service import search_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/search", tags=["Search"])


@router.post(
    "/web",
    response_model=SearchResponse,
    status_code=status.HTTP_200_OK,
    summary="Search the web using Brave",
    description="""
    Perform a web search using Brave Search engine.

    Returns organic web results with titles, descriptions, URLs, and optional content extraction.

    **Authentication**: Requires valid API key via `X-API-Key` header or `Authorization: Bearer <key>`.
    """,
)
async def search_web(
    request: SearchRequest,
    key_record=Depends(verify_api_key),
    db: AsyncSession = Depends(get_db),
):
    """
    Search the web using Brave Search.

    **Authentication**: API Key required (X-API-Key header or Bearer token)

    **Request Body**:
    - `query`: Search query string (required, min 1 char)
    - `count`: Number of results (default: 10, max: 100)
    - `region`: Region code (default: 'us-en', e.g., 'gb-en', 'fr-fr')
    - `safesearch`: Safe search level ('off', 'moderate', 'on'; default: 'moderate')
    - `timelimit`: Filter by time ('d'=day, 'w'=week, 'm'=month, 'y'=year; optional)
    - `page`: Page number for pagination (default: 1)
    - `extraction`: Fetch full page content for each result (default: false)

    **Response**: Array of search results with:
    - `title`: Result title
    - `url`: Result URL
    - `description`: Result snippet
    - `thumbnail_url`: Image thumbnail (optional)
    - `favicon_url`: Site favicon (optional)
    - `page_age`: When the content was published
    - `content`: Full page text (if extraction=true)

    **Example Usage**:
    ```bash
    curl -X POST http://localhost:8000/search/web \
      -H "X-API-Key: brave_live_..." \
      -H "Content-Type: application/json" \
      -d '{
        "query": "python fastapi",
        "count": 10,
        "safesearch": "moderate"
      }'
    ```

    **Rate Limits**: Applied per API key
    """
    try:
        logger.info(
            f"Web search requested by API key {key_record.id}: {request.query}"
        )

        # Validate parameters
        is_valid, error_msg = search_service.validate_search_params(
            request.query, request.count, request.timelimit
        )
        if not is_valid:
            logger.warning(f"Invalid search parameters: {error_msg}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_msg,
            )

        # Perform search
        results = search_service.search_web(
            query=request.query,
            count=request.count,
            region=request.region,
            safesearch=request.safesearch,
            timelimit=request.timelimit,
            page=request.page,
            extraction=request.extraction,
            format=request.format,
        )

        logger.info(
            f"Web search completed for key {key_record.id}: {len(results)} results"
        )

        return SearchResponse(
            query=request.query,
            results=results,
            count=len(results),
            search_type="web",
        )

    except ValueError as e:
        logger.warning(f"Invalid search request: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"Search error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Search failed. Please try again.",
        )


@router.post(
    "/news",
    response_model=SearchResponse,
    status_code=status.HTTP_200_OK,
    summary="Search news using Brave",
    description="""
    Perform a news search using Brave Search engine.

    Returns recent news articles with titles, sources, and optional content extraction.

    **Authentication**: Requires valid API key via `X-API-Key` header or `Authorization: Bearer <key>`.
    """,
)
async def search_news(
    request: SearchRequest,
    key_record=Depends(verify_api_key),
    db: AsyncSession = Depends(get_db),
):
    """
    Search news using Brave Search.

    **Authentication**: API Key required (X-API-Key header or Bearer token)

    **Request Body**:
    - `query`: Search query string (required, min 1 char)
    - `count`: Number of results (default: 10, max: 100)
    - `region`: Region code (default: 'us-en')
    - `timelimit`: Filter by time ('d'=day, 'w'=week, 'm'=month, 'y'=year; optional)
    - `extraction`: Fetch full article content (default: false)

    **Response**: Array of news results with:
    - `title`: Article title
    - `url`: Article URL
    - `source`: News source name
    - `description`: Article snippet
    - `thumbnail_url`: Article thumbnail (optional)
    - `page_age`: Publication date
    - `content`: Full article text (if extraction=true)

    **Example Usage**:
    ```bash
    curl -X POST http://localhost:8000/search/news \
      -H "X-API-Key: brave_live_..." \
      -H "Content-Type: application/json" \
      -d '{
        "query": "technology",
        "count": 5,
        "timelimit": "d"
      }'
    ```
    """
    try:
        logger.info(
            f"News search requested by API key {key_record.id}: {request.query}"
        )

        # Validate parameters
        is_valid, error_msg = search_service.validate_search_params(
            request.query, request.count, request.timelimit
        )
        if not is_valid:
            logger.warning(f"Invalid news search parameters: {error_msg}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_msg,
            )

        # Perform news search
        results = search_service.search_news(
            query=request.query,
            count=request.count,
            region=request.region,
            timelimit=request.timelimit,
            page=request.page,
            extraction=request.extraction,
        )

        logger.info(
            f"News search completed for key {key_record.id}: {len(results)} results"
        )

        return SearchResponse(
            query=request.query,
            results=results,
            count=len(results),
            search_type="news",
        )

    except ValueError as e:
        logger.warning(f"Invalid search request: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"News search error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="News search failed. Please try again.",
        )
