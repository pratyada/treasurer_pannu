"""
Push Scraped Drafts to TreasuryPulse Database
==============================================
Reads all JSON output files from scrapers and POSTs them to the
/api/admin/drafts endpoint so Pranav can review them in the admin panel.

Usage:
    python3 scrapers/push_to_db.py

Environment variables (scrapers/.env):
    APP_URL=http://localhost:3000   (or your deployed URL)
    SCRAPER_API_KEY=your_secret_key (must match SCRAPER_API_KEY in .env.local)
"""

import json
import os
import requests
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

APP_URL = os.getenv("APP_URL", "http://localhost:3000")
API_KEY = os.getenv("SCRAPER_API_KEY", "")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")

DRAFT_FILES = [
    "rbi_drafts.json",
    "sebi_drafts.json",
    "rss_drafts.json",
]


def push_drafts(drafts: list[dict], source_file: str) -> tuple[int, int]:
    success = 0
    failed = 0

    for draft in drafts:
        try:
            response = requests.post(
                f"{APP_URL}/api/admin/drafts",
                json=draft,
                headers={
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY,
                },
                timeout=10,
            )

            if response.status_code == 201:
                success += 1
            elif response.status_code == 409:
                # Duplicate — skip silently
                pass
            else:
                print(f"  ⚠ Failed ({response.status_code}): {draft.get('title', '')[:60]}")
                failed += 1

        except requests.RequestException as e:
            print(f"  ✗ Network error: {e}")
            failed += 1

    return success, failed


def main():
    if not API_KEY:
        print("❌ SCRAPER_API_KEY not set in scrapers/.env")
        print("   Add: SCRAPER_API_KEY=your_secret_key")
        return

    print(f"📡 Pushing scraped drafts to {APP_URL}...")
    total_success = 0
    total_failed = 0

    for filename in DRAFT_FILES:
        filepath = os.path.join(OUTPUT_DIR, filename)
        if not os.path.exists(filepath):
            print(f"  [SKIP] {filename} not found (run scrapers first)")
            continue

        with open(filepath, encoding="utf-8") as f:
            drafts = json.load(f)

        if not drafts:
            print(f"  [SKIP] {filename} is empty")
            continue

        print(f"\n📄 Processing {filename} ({len(drafts)} items)...")
        s, f = push_drafts(drafts, filename)
        total_success += s
        total_failed += f
        print(f"  ✅ {s} pushed, {f} failed")

    print(f"\n🎉 Done — {total_success} drafts ready for Pranav's review in admin panel")
    print(f"   Admin URL: {APP_URL}/admin/drafts")


if __name__ == "__main__":
    main()
