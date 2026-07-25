from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.schemas.artist import (
    ArtistCreate,
    ArtistUpdate,
    ArtistResponse,
    ArtistBulkDelete,
)
from app.crud.artist import (
    get_artists,
    get_artist_by_id,
    create_artist,
    update_artist,
    delete_artist,
    bulk_delete_artists,
)

router = APIRouter(
    prefix="/artists",
    tags=["Artists"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=List[ArtistResponse])
def read_artists(
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    skip = (page - 1) * limit
    return get_artists(db, skip, limit)


@router.get("/{artist_id}", response_model=ArtistResponse)
def read_artist(
    artist_id: int,
    db: Session = Depends(get_db),
):
    artist = get_artist_by_id(db, artist_id)

    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")

    return artist


@router.post("/", response_model=ArtistResponse)
def add_artist(
    artist: ArtistCreate,
    db: Session = Depends(get_db),
):
    return create_artist(db, artist)


@router.put("/{artist_id}", response_model=ArtistResponse)
def edit_artist(
    artist_id: int,
    artist: ArtistUpdate,
    db: Session = Depends(get_db),
):
    updated = update_artist(db, artist_id, artist)

    if not updated:
        raise HTTPException(status_code=404, detail="Artist not found")

    return updated


# Bulk Delete MUST come before /{artist_id}
@router.delete("/bulk-delete")
def remove_multiple_artists(
    request: ArtistBulkDelete,
    db: Session = Depends(get_db),
):
    result = bulk_delete_artists(db, request.artist_ids)

    return {
        "message": f"{result['deleted_count']} artist(s) deleted successfully",
        "deleted_count": result["deleted_count"],
    }


@router.delete("/{artist_id}")
def remove_artist(
    artist_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_artist(db, artist_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Artist not found")

    return {"message": "Artist deleted successfully"}