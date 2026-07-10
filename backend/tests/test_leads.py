import asyncio
import os
import sys
import unittest

from fastapi import BackgroundTasks, HTTPException

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

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
    def test_returns_service_unavailable_when_db_commit_fails(self):
        async def run_test():
            with self.assertRaises(HTTPException) as ctx:
                await create_lead(
                    LeadCreate(
                        first_name="Test",
                        last_name="User",
                        email="test@example.com",
                        phone="+2348000000000",
                    ),
                    BackgroundTasks(),
                    db=FailingDbSession(),
                )

            self.assertEqual(ctx.exception.status_code, 503)

        asyncio.run(run_test())
