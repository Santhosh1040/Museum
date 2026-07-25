from pydantic import BaseModel

from app.schemas.artist import ArtistResponse
from app.schemas.artwork import ArtworkResponse


class DashboardResponse(BaseModel):
    total_artists: int
    total_artworks: int
    total_departments: int
    total_classifications: int

    recent_artists: list[ArtistResponse]
    recent_artworks: list[ArtworkResponse]