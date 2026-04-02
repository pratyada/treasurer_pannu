"""
RBI Notification Scraper
========================
Scrapes the RBI website for new notifications/circulars daily.
Outputs results to scrapers/output/rbi_drafts.json

Usage:
    python3 scrapers/rbi_scraper.py

Setup:
    pip install -r scrapers/requirements.txt
    Copy scrapers/.env.example to scrapers/.env and fill in values.
"""

import requests
from bs4 import BeautifulSoup
import json
import os
import re
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

RBI_NOTIFICATIONS_URL = "https://website.rbi.org.in/web/rbi/notifications"
RBI_PRESS_RELEASES_URL = "https://rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx"

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "rbi_drafts.json")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

TREASURY_KEYWORDS = [
    "liquidity", "repo", "reverse repo", "SDF", "MSF", "OMO", "VRR", "VRRR",
    "forex", "exchange rate", "G-Sec", "government securities", "T-bill", "treasury bill",
    "MIBOR", "call money", "CRR", "SLR", "interest rate", "monetary policy",
    "LAF", "marginal standing", "currency", "reserves", "CCIL", "CBLO",
    "derivative", "swap", "forward", "hedging", "NDF", "commercial paper"
]


def is_treasury_relevant(text: str) -> bool:
    text_lower = text.lower()
    return any(kw.lower() in text_lower for kw in TREASURY_KEYWORDS)


def generate_summary(title: str, content: str) -> str:
    """
    Generate a brief summary.
    In production: replace this with a Claude API call for AI-powered summarization.
    See README for Claude API integration instructions.
    """
    # Simple extraction: take first 2 sentences
    sentences = re.split(r'(?<=[.!?])\s+', content.strip())
    summary = " ".join(sentences[:2])
    if len(summary) > 300:
        summary = summary[:297] + "..."
    return summary or f"New RBI notification: {title}"


def scrape_rbi_notifications() -> list[dict]:
    """Scrape RBI notifications page for recent circulars."""
    results = []

    try:
        print(f"[RBI] Fetching {RBI_NOTIFICATIONS_URL}...")
        response = requests.get(RBI_NOTIFICATIONS_URL, headers=HEADERS, timeout=30)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, "html.parser")

        # RBI website structure: look for notification links
        # The actual DOM structure may vary — this handles the common patterns
        links = soup.find_all("a", href=True)

        cutoff_date = datetime.now() - timedelta(days=7)  # Last 7 days

        for link in links:
            href = link.get("href", "")
            title = link.get_text(strip=True)

            if not title or len(title) < 20:
                continue

            # Filter for notification-type URLs
            if not any(x in href for x in ["/notification", "/circular", "/press-release", "/RBI"]):
                continue

            if not is_treasury_relevant(title):
                continue

            # Build full URL
            if href.startswith("http"):
                full_url = href
            else:
                full_url = f"https://rbi.org.in{href}"

            results.append({
                "title": title,
                "summary": generate_summary(title, title),
                "sourceUrl": full_url,
                "sourceName": "rbi",
                "rawContent": f"Title: {title}\nURL: {full_url}\n\nFull content to be fetched separately.",
            })

        print(f"[RBI] Found {len(results)} relevant notifications")

    except requests.RequestException as e:
        print(f"[RBI] Error fetching notifications: {e}")
    except Exception as e:
        print(f"[RBI] Unexpected error: {e}")

    return results


def scrape_rbi_press_releases() -> list[dict]:
    """Scrape RBI press releases."""
    results = []

    try:
        print(f"[RBI] Fetching press releases...")
        response = requests.get(RBI_PRESS_RELEASES_URL, headers=HEADERS, timeout=30)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, "html.parser")

        # Parse press release table (RBI uses table-based layout)
        table = soup.find("table", {"class": "tablebg"}) or soup.find("table")
        if not table:
            print("[RBI] Could not find press release table")
            return results

        rows = table.find_all("tr")
        for row in rows[1:21]:  # Skip header, take last 20
            cols = row.find_all("td")
            if len(cols) < 2:
                continue

            date_text = cols[0].get_text(strip=True)
            link_tag = cols[1].find("a") or cols[1]
            title = link_tag.get_text(strip=True)
            href = link_tag.get("href", "") if link_tag.name == "a" else ""

            if not is_treasury_relevant(title):
                continue

            full_url = f"https://rbi.org.in{href}" if href and not href.startswith("http") else href

            results.append({
                "title": title,
                "summary": generate_summary(title, title),
                "sourceUrl": full_url,
                "sourceName": "rbi",
                "rawContent": f"Date: {date_text}\nTitle: {title}\nURL: {full_url}",
            })

        print(f"[RBI] Found {len(results)} relevant press releases")

    except Exception as e:
        print(f"[RBI] Press release error: {e}")

    return results


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    all_results = []
    all_results.extend(scrape_rbi_notifications())
    all_results.extend(scrape_rbi_press_releases())

    # Deduplicate by title
    seen = set()
    unique_results = []
    for r in all_results:
        if r["title"] not in seen:
            seen.add(r["title"])
            unique_results.append(r)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(unique_results, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Saved {len(unique_results)} RBI items to {OUTPUT_FILE}")
    return unique_results


if __name__ == "__main__":
    main()
