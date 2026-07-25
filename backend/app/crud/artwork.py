from sqlalchemy.orm import Session

from app.models.artwork import Artwork
from app.schemas.artwork import ArtworkCreate, ArtworkUpdate


def get_artworks(db: Session, skip: int = 0, limit: int = 20):
    return (
        db.query(Artwork)
        .order_by(Artwork.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_artwork_by_id(db: Session, artwork_id: int):
    return (
        db.query(Artwork)
        .filter(Artwork.artwork_id == artwork_id)
        .first()
    )


def create_artwork(db: Session, artwork: ArtworkCreate):
    db_artwork = Artwork(**artwork.model_dump())

    db.add(db_artwork)
    db.commit()
    db.refresh(db_artwork)

    return db_artwork


def update_artwork(db: Session, artwork_id: int, artwork: ArtworkUpdate):
    db_artwork = get_artwork_by_id(db, artwork_id)

    if not db_artwork:
        return None

    for key, value in artwork.model_dump(exclude_unset=True).items():
        setattr(db_artwork, key, value)

    db.commit()
    db.refresh(db_artwork)

    return db_artwork


def delete_artwork(db: Session, artwork_id: int):
    db_artwork = get_artwork_by_id(db, artwork_id)

    if not db_artwork:
        return None

    db.delete(db_artwork)
    db.commit()

    return db_artwork