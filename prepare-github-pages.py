"""Set deployment metadata; existing relative asset and navigation URLs are portable."""
import os
from pathlib import Path
from urllib.parse import urlsplit

base_url = os.environ["PAGES_URL"].rstrip("/")
parsed = urlsplit(base_url)
if parsed.scheme != "https" or not parsed.netloc or parsed.query or parsed.fragment:
    raise SystemExit("PAGES_URL must be the HTTPS base URL from configure-pages.")

previous_url = "https://mealf-kitchen.cloudcook.chatgpt.site"
for page in Path("dist").rglob("*.html"):
    original = page.read_text(encoding="utf-8")
    updated = original.replace(previous_url, base_url)
    if updated != original:
        page.write_text(updated, encoding="utf-8")
