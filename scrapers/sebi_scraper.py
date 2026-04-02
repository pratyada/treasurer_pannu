"""
SEBI Circular Scraper
=====================
Scrapes SEBI website for new circulars and press releases relevant to treasury.
Outputs results to scrapers/output/sebi_drafts.json

Usage:
    python3 scrapers/sebi_scraper.py
"""

import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

SEBI_CIRCULARS_URL = "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&type=1&subType=0"
SEBI_PRESS_URL = "https://www.sebi.gov.in/media/press-releases.html"

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "sebi_drafts.json")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

TREASURY_KEYWORDS = [
    "debt", "bond", "debenture", "G-Sec", "T-bill", "mutual fund debt",
    "corporate bond", "NCD", "commercial paper", "repo", "derivative",
    "interest rate", "credit rating", "OBPP", "fixed income", "money market",
    "treasury", "liquidity", "swap", "hedging", "forex"
]


def is_treasury_relevant(text: str) -> bool:
    text_lower = text.lower()
    return any(kw.lower() in text_lower for kw in TREASURY_KEYWORDS)


def scrape_sebi_circulars() -> list[dict]:
    results = []

    try:
        print("[SEBI] Fetching circulars...")
        response = requests.get(SEBI_CIRCULARS_URL, headers=HEADERS, timeout=30)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, "html.parser")

        # SEBI lists circulars in <ul> or table structure
        items = soup.find_all(["li", "tr"])

        for item in items[:50]:  # Check last 50 items
            link = item.find("a", href=True)
            if not link:
                continue

            title = link.get_text(strip=True)
            href = link.get("href", "")

            if len(title) < 15:
                continue

            if not is_treasury_relevant(title):
                continue

            full_url = href if href.startswith("http") else f"https://www.sebi.gov.in{href}"

            results.append({
                "title": title,
                "summary": f"SEBI Circular: {title[:200]}. This circular may impact debt market operations, treasury management, or fixed income portfolios.",
                "sourceUrl": full_url,
                "sourceName": "sebi",
                "rawContent": f"Title: {title}\nURL: {full_url}\nSource: SEBI Circulars",
            })

        print(f"[SEBI] Found {len(results)} relevant circulars")

    except Exception as e:
        print(f"[SEBI] Error: {e}")

    return results


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    results = scrape_sebi_circulars()

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"✅ Saved {len(results)} SEBI items to {OUTPUT_FILE}")
    return results


if __name__ == "__main__":
    main()
