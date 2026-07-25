from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException

from app.models.artist import Artist
from app.schemas.artist import ArtistCreate, ArtistUpdate


def get_artists(db: Session, skip: int = 0, limit: int = 20):
    return (
        db.query(Artist)
        .order_by(Artist.id.desc())   # Show newest artists first
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_artist_by_id(db: Session, artist_id: int):
    return (
        db.query(Artist)
        .filter(Artist.artist_id == artist_id)
        .first()
    )


def create_artist(db: Session, artist: ArtistCreate):
    db_artist = Artist(**artist.model_dump())

    db.add(db_artist)
    db.commit()
    db.refresh(db_artist)

    return db_artist


def update_artist(db: Session, artist_id: int, artist: ArtistUpdate):
    db_artist = get_artist_by_id(db, artist_id)

    if not db_artist:
        return None

    for key, value in artist.model_dump(exclude_unset=True).items():
        setattr(db_artist, key, value)

    db.commit()
    db.refresh(db_artist)

    return db_artist


def delete_artist(db: Session, artist_id: int):
    db_artist = get_artist_by_id(db, artist_id)

    if not db_artist:
        return None

    db.delete(db_artist)
    db.commit()

    return db_artist


def bulk_delete_artists(db: Session, artist_ids: list[int]):
    try:
        deleted_count = (
            db.query(Artist)
            .filter(Artist.artist_id.in_(artist_ids))
            .delete(synchronize_session=False)
        )

        db.commit()

        return {
            "deleted_count": deleted_count
        }

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="Cannot delete one or more artists because they are associated with existing artworks."
        )