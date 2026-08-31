"""AI Answer API endpoints using API key authentication."""

import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from core.verify_api_key import verify_api_key
from schemas.answer import AnswerCitation, AnswerRequest, AnswerResponse
from services.answer_service import answer_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/answers", tags=["Answers"])


@router.post(
    "",
    response_model=AnswerResponse,
    status_code=status.HTTP_200_OK,
    summary="Get AI answer with citations",
    description="""
    Generate a direct AI answer with cited web sources.

    Returns rich, synthesized text with inline citation markers (`[1]`, `[2]`) alongside
    a list of source citations including URLs and page titles.

    **Authentication**: Requires a valid API key via `X-API-Key` header or `Authorization: Bearer <key>`.
    """,
)
@router.post(
    "/query",
    response_model=AnswerResponse,
    status_code=status.HTTP_200_OK,
    summary="Query AI answer with citations (alias)",
    description="""
    Alias endpoint for AI answer generation with web citations.

    **Authentication**: Requires a valid API key via `X-API-Key` header or `Authorization: Bearer <key>`.
    """,
)
async def generate_answer(
    request: AnswerRequest,
    key_record=Depends(verify_api_key),
    db: AsyncSession = Depends(get_db),
):
    """
    Generate an AI answer with source citations.

    **Authentication**: API Key required (X-API-Key header or Bearer token)

    **Request Body**:
    - `query`: Question or prompt string (required, 1-500 chars)
    - `timeout`: Request timeout in seconds (optional, default: 15, 5-60)

    **Response**:
    - `query`: The search query
    - `text`: Structured markdown text with inline `[1]`, `[2]` citation markers
    - `citations`: List of citations with `number`, `title`, and `url`
    - `count`: Number of citations
    - `answer_type`: 'bing'

    **Example Usage**:
    ```bash
    curl -X POST http://localhost:8000/answers \
      -H "X-API-Key: tare_live_..." \
      -H "Content-Type: application/json" \
      -d '{
        "query": "How do quantum logic gates work?",
        "timeout": 15
      }'
    ```

    **Rate Limits**: Applied per API key tier
    """
    try:
        logger.info(
            f"Answer requested by API key {key_record.id}: query='{request.query}'"
        )

        # Validate parameters
        is_valid, error_msg = answer_service.validate_answer_params(
            request.query, request.timeout
        )
        if not is_valid:
            logger.warning(f"Invalid answer parameters: {error_msg}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_msg,
            )

        # Generate answer
        answer = answer_service.get_answer(
            query=request.query,
            timeout=request.timeout or 15,
        )

        if not answer or not answer.get("text"):
            logger.info(f"No direct answer found for query: {request.query}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No direct answer could be generated for this query. Try rephrasing.",
            )

        citations = [
            AnswerCitation(
                number=c["number"],
                title=c["title"],
                url=c["url"],
            )
            for c in answer.get("citations", [])
        ]

        logger.info(
            f"Answer successfully returned for key {key_record.id}: "
            f"{len(citations)} citations"
        )

        return AnswerResponse(
            query=request.query,
            text=answer["text"],
            citations=citations,
            count=len(citations),
        )

    except HTTPException:
        raise
    except ValueError as e:
        logger.warning(f"Invalid answer request: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"Answer generation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate answer. Please try again.",
        )
