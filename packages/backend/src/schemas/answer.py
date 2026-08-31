"""Pydantic schemas for AI Answer endpoints."""

from typing import Optional

from pydantic import BaseModel, Field


class AnswerCitation(BaseModel):
    """Schema for individual citation source in an answer."""

    number: int = Field(
        ...,
        description="Citation marker number matching inline [n] markers in answer text",
        examples=[1],
    )
    title: str = Field(
        ...,
        description="Title or site name of the cited source",
        examples=["Quantum Logic Gate - Wikipedia"],
    )
    url: str = Field(
        ...,
        description="Direct URL to the cited resource",
        examples=["https://en.wikipedia.org/wiki/Quantum_logic_gate"],
    )

    class Config:
        """Pydantic config."""

        from_attributes = True
        extra = "allow"


# Alias for backwards/provider compatibility
BingCitationSchema = AnswerCitation


class AnswerRequest(BaseModel):
    """Schema for AI Answer request."""

    query: str = Field(
        ...,
        min_length=1,
        max_length=500,
        description="Question or prompt to generate an AI answer for",
        examples=["How do quantum logic gates work?"],
    )
    timeout: Optional[int] = Field(
        15,
        ge=5,
        le=60,
        description="Timeout in seconds for fetching the answer (default: 15, max: 60)",
    )

    class Config:
        """Pydantic config."""

        json_schema_extra = {
            "example": {
                "query": "How do quantum logic gates work?",
                "timeout": 15,
            }
        }


# Alias for backwards compatibility
BingAnswerRequest = AnswerRequest


class AnswerResponse(BaseModel):
    """Schema for AI Answer response."""

    query: str = Field(..., description="The search query or question answered")
    text: str = Field(
        ...,
        description="Markdown-formatted AI answer text with inline numbered citation markers (e.g. [1], [2])",
    )
    citations: list[AnswerCitation] = Field(
        default_factory=list,
        description="List of cited sources backing the answer",
    )
    count: int = Field(
        ...,
        description="Total number of citations associated with the answer",
    )

    class Config:
        """Pydantic config."""

        from_attributes = True
        json_schema_extra = {
            "example": {
                "query": "How do quantum logic gates work?",
                "text": "Quantum logic gates are elementary quantum circuits operating on qubits [1]. Unlike classical logic gates which perform Boolean algebra on deterministic bits, quantum gates execute unitary transformations preserving superposition and quantum entanglement [2].",
                "citations": [
                    {
                        "number": 1,
                        "title": "Quantum Logic Gate - Wikipedia",
                        "url": "https://en.wikipedia.org/wiki/Quantum_logic_gate",
                    },
                    {
                        "number": 2,
                        "title": "Introduction to Quantum Gates - IBM Quantum",
                        "url": "https://quantum.ibm.com/docs/concepts/gates",
                    },
                ],
                "count": 2,
                "answer_type": "bing",
            }
        }


# Alias for backwards compatibility
BingAnswerResponse = AnswerResponse
