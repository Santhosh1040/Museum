from app.database import SessionLocal
from app.models.artist import Artist
from app.models.artwork import Artwork

db = SessionLocal()

print("Artists:", db.query(Artist).count())
print("Artworks:", db.query(Artwork).count())

db.close()