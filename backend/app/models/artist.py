from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Artist(Base):
    __tablename__ = "artists"

    id = Column(Integer, primary_key=True, index=True)

    artist_id = Column(
        Integer,
        unique=True,
        nullable=False
    )

    name = Column(
        String(255),
        nullable=False
    )

    nationality = Column(
        String(100)
    )

    gender = Column(
        String(50)
    )

    birth_year = Column(
        Integer
    )

    death_year = Column(
        Integer
    )

    artworks = relationship(
        "Artwork",
        back_populates="artist",
        cascade="all, delete"
    )