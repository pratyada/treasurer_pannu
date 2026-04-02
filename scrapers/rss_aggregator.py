"""
RSS Feed Aggregator for Treasury News
======================================
Aggregates financial news RSS feeds and filters for treasury-relevant content.
Sources: Economic Times Markets, Mint, BQ Prime, LiveMint, Financial Express

Outputs to scrapers/output/rss_drafts.json

Usage:
    python3 scrapers/rss_aggregator.py
"""

import feedparser
import json
import os
import re
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "rss_drafts.json")

RSS_FEEDS = [
    {
        "name": "Economic Times Markets",
        "url": "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
        "source": "et",
    },
    {
        "name": "Economic Times Money",
        "url": "https://economictimes.indiatimes.com/wealth/rssfeeds/837555174.cms",
        "source": "et",
    },
    {
        "name": "Mint Markets",
        "url": "https://www.livemint.com/rss/markets",
        "source": "mint",
    },
    {
        "name": "Mint Economy",
        "url": "https://www.livemint.com/rss/economy",
        "source": "mint",
    },
    {
        "name": "Financial Express Economy",
        "url": "https://www.financialexpress.com/economy/feed/",
        "source": "financial_express",
    },
    {
        "name": "Business Standard Markets",
        "url": "https://www.business-standard.com/rss/markets-106.rss",
        "source": "bs",
    },
]

TREASURY_KEYWORDS = [
    "RBI", "Reserve Bank", "repo rate", "reverse repo", "monetary policy",
    "G-Sec", "government bond", "T-bill", "treasury bill", "gilts",
    "forex", "rupee", "USD/INR", "exchange rate", "dollar",
    "MIBOR", "call money", "overnight rate", "liquidity",
    "SEBI", "debt market", "bond yield", "interest rate",
    "CRR", "SLR", "bank rate", "OMO", "open market",
    "commercial paper", "NCD", "debenture", "corporate bond",
    "inflation", "CPI", "WPI", "fiscal deficit",
    "foreign portfolio", "FPI", "FII", "foreign investment",
]

EXCLUDE_KEYWORDS = [
    "stock tip", "buy this stock", "multibagger", "penny stock",
    "Sensex rally", "Nifty 50 target", "IPO allotment",
    "mutual fund NAV", "SIP returns", "insurance premium",
]


def is_treasury_relevant(text: str) -> bool:
    text_lower = text.lower()
    if any(kw.lower() in text_lower for kw in EXCLUDE_KEYWORDS):
        return False
    return any(kw.lower() in text_lower for kw in TREASURY_KEYWORDS)


def clean_html(text: str) -> str:
    return re.sub(r"<[^>]+>", "", text or "").strip()


def parse_feed(feed_config: dict) -> list[dict]:
    results = []
    cutoff = datetime.now() - timedelta(hours=24)

    try:
        print(f"[RSS] Fetching {feed_config['name']}...")
        feed = feedparser.parse(feed_config["url"])

        for entry in feed.entries:
            title = clean_html(entry.get("title", ""))
            summary = clean_html(entry.get("summary", entry.get("description", "")))
            link = entry.get("link", "")

            if not title or not is_treasury_relevant(f"{title} {summary}"):
                continue

            results.append({
                "title": title,
                "summary": summary[:500] if summary else f"News from {feed_config['name']}: {title}",
                "sourceUrl": link,
                "sourceName": feed_config["source"],
                "rawContent": f"Source: {feed_config['name']}\nTitle: {title}\n\n{summary}",
            })

        print(f"[RSS] {feed_config['name']}: {len(results)} treasury-relevant items")

    except Exception as e:
        print(f"[RSS] Error fetching {feed_config['name']}: {e}")

    return results


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    all_results = []
    for feed in RSS_FEEDS:
        all_results.extend(parse_feed(feed))

    # Deduplicate by title
    seen = set()
    unique = []
    for item in all_results:
        if item["title"] not in seen:
            seen.add(item["title"])
            unique.append(item)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(unique, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Saved {len(unique)} RSS items to {OUTPUT_FILE}")
    return unique


if __name__ == "__main__":
    main()
