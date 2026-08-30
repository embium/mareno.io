"""Create API keys table

Revision ID: 902aa1d30985
Revises: 49be3fd6f5a9
Create Date: 2026-08-30 08:15:00.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "902aa1d30985"
down_revision: Union[str, Sequence[str], None] = "49be3fd6f5a9"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create API keys table."""
    op.create_table(
        "api_keys",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("key_hash", sa.Text(), nullable=False),
        sa.Column("key_prefix", sa.String(length=8), nullable=False),
        sa.Column("key_suffix", sa.String(length=4), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
        ),
        sa.Column("last_used_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("revoked_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("key_hash"),
    )
    # Create indexes
    op.create_index("ix_api_keys_id", "api_keys", ["id"])
    op.create_index("ix_api_keys_user_id", "api_keys", ["user_id"])
    op.create_index("ix_api_keys_name", "api_keys", ["name"])
    op.create_index("ix_api_keys_key_prefix", "api_keys", ["key_prefix"])
    op.create_index("ix_api_keys_is_active", "api_keys", ["is_active"])
    op.create_index(
        "ix_api_keys_created_at", "api_keys", ["created_at"]
    )
    op.create_index(
        "ix_api_keys_last_used_at", "api_keys", ["last_used_at"]
    )
    op.create_index(
        "ix_api_keys_user_active",
        "api_keys",
        ["user_id", "is_active"],
    )
    op.create_index(
        "ix_api_keys_key_hash_active",
        "api_keys",
        ["key_hash", "is_active"],
    )


def downgrade() -> None:
    """Drop API keys table."""
    op.drop_index("ix_api_keys_key_hash_active", table_name="api_keys")
    op.drop_index("ix_api_keys_user_active", table_name="api_keys")
    op.drop_index("ix_api_keys_last_used_at", table_name="api_keys")
    op.drop_index("ix_api_keys_created_at", table_name="api_keys")
    op.drop_index("ix_api_keys_is_active", table_name="api_keys")
    op.drop_index("ix_api_keys_key_prefix", table_name="api_keys")
    op.drop_index("ix_api_keys_name", table_name="api_keys")
    op.drop_index("ix_api_keys_user_id", table_name="api_keys")
    op.drop_index("ix_api_keys_id", table_name="api_keys")
    op.drop_table("api_keys")
