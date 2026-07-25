from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.artwork import (
    ArtworkCreate,
    ArtworkUpdate,
    ArtworkResponse,
)
from app.crud.artwork import (
    get_artworks,
    get_artwork_by_id,
    create_artwork,
    update_artwork,
    delete_artwork,
)

router = APIRouter(
    prefix="/artworks",
    tags=["Artworks"],
)


@router.get("/", response_model=list[ArtworkResponse])
def read_artworks(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    return get_artworks(db, skip, limit)


@router.get("/{artwork_id}", response_model=ArtworkResponse)
def read_artwork(
    artwork_id: int,
    db: Session = Depends(get_db),
):
    artwork = get_artwork_by_id(db, artwork_id)

    if not artwork:
        raise HTTPException(
            status_code=404,
            detail="Artwork not found"
        )

    return artwork


@router.post("/", response_model=ArtworkResponse)
def add_artwork(
    artwork: ArtworkCreate,
    db: Session = Depends(get_db),
):
    return create_artwork(db, artwork)


@router.put("/{artwork_id}", response_model=ArtworkResponse)
def edit_artwork(
    artwork_id: int,
    artwork: ArtworkUpdate,
    db: Session = Depends(get_db),
):
    updated_artwork = update_artwork(
        db,
        artwork_id,
        artwork,
    )

    if not updated_artwork:
        raise HTTPException(
            status_code=404,
            detail="Artwork not found"
        )

    return updated_artwork


@router.delete("/{artwork_id}")
def remove_artwork(
    artwork_id: int,
    db: Session = Depends(get_db),
):
    deleted_artwork = delete_artwork(
        db,
        artwork_id,
    )

    if not deleted_artwork:
        raise HTTPException(
            status_code=404,
            detail="Artwork not found"
        )

    return {
        "message": "Artwork deleted successfully"
    }