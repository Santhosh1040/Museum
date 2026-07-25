from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.artist import Artist
from app.models.artwork import Artwork


def get_dashboard_data(db: Session):
    # Total counts
    total_artists = db.query(func.count(Artist.id)).scalar()
    total_artworks = db.query(func.count(Artwork.id)).scalar()

    # Distinct departments
    total_departments = (
        db.query(func.count(func.distinct(Artwork.department)))
        .filter(Artwork.department.isnot(None))
        .scalar()
    )

    # Distinct classifications
    total_classifications = (
        db.query(func.count(func.distinct(Artwork.classification)))
        .filter(Artwork.classification.isnot(None))
        .scalar()
    )

    # 5 most recently added artists
    recent_artists = (
        db.query(Artist)
        .order_by(Artist.id.desc())
        .limit(5)
        .all()
    )

    # 5 most recently added artworks
    recent_artworks = (
        db.query(Artwork)
        .order_by(Artwork.id.desc())
        .limit(5)
        .all()
    )

    return {
        "total_artists": total_artists,
        "total_artworks": total_artworks,
        "total_departments": total_departments,
        "total_classifications": total_classifications,
        "recent_artists": recent_artists,
        "recent_artworks": recent_artworks,
    }