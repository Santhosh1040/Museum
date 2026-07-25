from pydantic import BaseModel
from typing import Optional


class ArtistBase(BaseModel):
    artist_id: int
    name: str
    nationality: Optional[str] = None
    gender: Optional[str] = None
    birth_year: Optional[int] = None
    death_year: Optional[int] = None


class ArtistCreate(ArtistBase):
    pass


class ArtistUpdate(BaseModel):
    name: Optional[str] = None
    nationality: Optional[str] = None
    gender: Optional[str] = None
    birth_year: Optional[int] = None
    death_year: Optional[int] = None


class ArtistResponse(ArtistBase):
    id: int

    class Config:
        from_attributes = True


class ArtistBulkDelete(BaseModel):
    artist_ids: list[int]