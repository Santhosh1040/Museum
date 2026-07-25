from sqlalchemy import Column, Integer, Float, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Artwork(Base):
    __tablename__ = "artworks"

    id = Column(Integer, primary_key=True, index=True)

    artwork_id = Column(
        Integer,
        unique=True,
        nullable=False
    )

    artist_id = Column(
        Integer,
        ForeignKey("artists.artist_id"),
        nullable=False
    )

    # Text fields
    title = Column(Text)
    name = Column(Text)
    date = Column(Text)
    medium = Column(Text)
    dimensions = Column(Text)
    acquisition_date = Column(Text)
    credit = Column(Text)
    catalogue = Column(Text)
    department = Column(Text)
    classification = Column(Text)
    object_number = Column(Text)

    # Numeric fields
    diameter_cm = Column(Float)
    circumference_cm = Column(Float)
    height_cm = Column(Float)
    length_cm = Column(Float)
    width_cm = Column(Float)
    depth_cm = Column(Float)
    weight_kg = Column(Float)
    duration_s = Column(Float)

    artist = relationship(
        "Artist",
        back_populates="artworks"
    )