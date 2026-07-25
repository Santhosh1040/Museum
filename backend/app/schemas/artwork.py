from typing import Optional

from pydantic import BaseModel


class ArtworkBase(BaseModel):
    artwork_id: int
    artist_id: int

    title: Optional[str] = None
    name: Optional[str] = None
    date: Optional[str] = None
    medium: Optional[str] = None
    dimensions: Optional[str] = None
    acquisition_date: Optional[str] = None
    credit: Optional[str] = None
    catalogue: Optional[str] = None
    department: Optional[str] = None
    classification: Optional[str] = None
    object_number: Optional[str] = None

    diameter_cm: Optional[float] = None
    circumference_cm: Optional[float] = None
    height_cm: Optional[float] = None
    length_cm: Optional[float] = None
    width_cm: Optional[float] = None
    depth_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    duration_s: Optional[float] = None


class ArtworkCreate(ArtworkBase):
    pass


class ArtworkUpdate(BaseModel):
    artwork_id: Optional[int] = None
    artist_id: Optional[int] = None

    title: Optional[str] = None
    name: Optional[str] = None
    date: Optional[str] = None
    medium: Optional[str] = None
    dimensions: Optional[str] = None
    acquisition_date: Optional[str] = None
    credit: Optional[str] = None
    catalogue: Optional[str] = None
    department: Optional[str] = None
    classification: Optional[str] = None
    object_number: Optional[str] = None

    diameter_cm: Optional[float] = None
    circumference_cm: Optional[float] = None
    height_cm: Optional[float] = None
    length_cm: Optional[float] = None
    width_cm: Optional[float] = None
    depth_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    duration_s: Optional[float] = None


class ArtworkResponse(ArtworkBase):
    id: int

    class Config:
        from_attributes = True