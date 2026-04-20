import requests
from supabase import create_client
from dotenv import load_dotenv
import os, time

load_dotenv()
supabase = create_client(os.environ["PUBLIC_SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])

def get_series_from_google(title, author):
    url = f"https://www.googleapis.com/books/v1/volumes?q=intitle:{requests.utils.quote(title)}+inauthor:{requests.utils.quote(author)}&maxResults=3"
    try:
        items = requests.get(url, timeout=10).json().get("items", [])
        for item in items:
            info = item.get("volumeInfo", {})
            si = info.get("seriesInfo", {})
            if si.get("seriesName"):
                return {
                    "series": si["seriesName"],
                    "series_number": si.get("bookDisplayNumber"),
                }
    except Exception as e:
        print(f"  Error: {e}")
    return None

# Fetch books with no series set
page, page_size = 0, 100
total_updated = 0

while True:
    res = supabase.table("books") \
        .select("id, title, author") \
        .is_("series", "null") \
        .range(page * page_size, (page + 1) * page_size - 1) \
        .execute()

    batch = res.data
    if not batch:
        break

    for book in batch:
        print(f"Checking: {book['title']} — {book['author']}")
        data = get_series_from_google(book["title"], book["author"])

        if data:
            update = {"series": data["series"]}
            if data["series_number"]:
                try:
                    update["series_number"] = int(data["series_number"])
                except ValueError:
                    pass
            supabase.table("books").update(update).eq("id", book["id"]).execute()
            print(f"  -> {data['series']} #{data.get('series_number', '?')}")
            total_updated += 1
        else:
            print("  -> No series found")

        time.sleep(0.5)

    page += 1

print(f"\nDone. Updated {total_updated} books.")
