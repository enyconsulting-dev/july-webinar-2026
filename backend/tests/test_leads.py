import asyncio
import os
import sys
import unittest
from unittest.mock import AsyncMock, patch

from fastapi import BackgroundTasks, HTTPException

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.integrations.pabbly import trigger_zoom_registration
from database import build_async_engine_kwargs
from routers.leads import create_lead
from schemas import LeadCreate


class FailingDbSession:
    def add(self, lead):
        self.added = lead

    async def commit(self):
        raise RuntimeError("database unavailable")

    async def refresh(self, lead):
        self.refreshed = lead


class LeadCreationTests(unittest.TestCase):
    def test_translates_sslmode_require_for_asyncpg(self):
        kwargs = build_async_engine_kwargs(
            "postgresql+asyncpg://user:pass@db.example.com:5432/postgres?sslmode=require"
        )

        self.assertEqual(kwargs["connect_args"], {"ssl": True})
        self.assertEqual(kwargs["url"].query, {})

    def test_returns_service_unavailable_when_db_commit_fails(self):
        async def run_test():
            with self.assertRaises(HTTPException) as ctx:
                await create_lead(
                    LeadCreate(
                        first_name="Test",
                        last_name="User",
                        email="test@example.com",
                        phone="+2348000000000",
                        city="Lagos",
                        country="NG",
                        industry="Accounting",
                        job_title="Developer",
                        questions_comments="Interested",
                    ),
                    BackgroundTasks(),
                    db=FailingDbSession(),
                )

            self.assertEqual(ctx.exception.status_code, 503)

        asyncio.run(run_test())


class PabblyIntegrationTests(unittest.TestCase):
    def test_returns_false_when_webhook_url_missing(self):
        async def run_test():
            with patch("app.integrations.pabbly.settings.pabbly_webhook_url", ""):
                self.assertFalse(await trigger_zoom_registration("test@example.com", "Test"))

        asyncio.run(run_test())

    def test_forwards_zoom_registration_fields_to_pabbly(self):
        async def run_test():
            fake_client = AsyncMock()
            fake_response = unittest.mock.Mock()
            fake_response.raise_for_status.return_value = None
            fake_client.__aenter__.return_value.post.return_value = fake_response

            with patch("app.integrations.pabbly.settings.pabbly_webhook_url", "https://example.test"):
                with patch("app.integrations.pabbly.httpx.AsyncClient", return_value=fake_client):
                    result = await trigger_zoom_registration(
                        "test@example.com",
                        "Test",
                        "User",
                        city="Lagos",
                        country="NG",
                        phone="+2348000000000",
                        industry="Accounting",
                        job_title="Developer",
                        questions_comments="Interested",
                    )

            self.assertTrue(result)
            fake_client.__aenter__.return_value.post.assert_awaited_once()
            args, kwargs = fake_client.__aenter__.return_value.post.await_args
            self.assertEqual(
                kwargs["json"],
                {
                    "email": "test@example.com",
                    "first_name": "Test",
                    "last_name": "User",
                    "city": "Lagos",
                    "country": "NG",
                    "phone": "+2348000000000",
                    "industry": "Accounting",
                    "job_title": "Developer",
                    "questions_comments": "Interested",
                },
            )

        asyncio.run(run_test())
