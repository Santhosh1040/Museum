import pandas as pd
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.artist import Artist
from app.models.artwork import Artwork


db: Session = SessionLocal()


def to_int(value):
    """
    Convert values safely to int.

    Handles:
    - NaN
    - ""
    - "6969, 8134" (multiple artist ids)
    - floats like 1930.0
    """
    if pd.isna(value):
        return None

    if isinstance(value, str):
        value = value.strip()

        if value == "":
            return None

        # Handle multiple artist ids
        if "," in value:
            value = value.split(",")[0].strip()

    return int(float(value))


def to_float(value):
    """
    Convert values safely to float.
    """
    if pd.isna(value):
        return None

    if isinstance(value, str):
        value = value.strip()

        if value == "":
            return None

    return float(value)


def to_str(value):
    """
    Convert values safely to string.
    """
    if pd.isna(value):
        return None

    value = str(value).strip()

    if value == "":
        return None

    return value


try:

    # =====================================================
    # ARTISTS
    # =====================================================

    print("Importing artists...")

    artists_df = pd.read_csv("../dataset/artists.csv")

    for index, row in artists_df.iterrows():

        artist_id = to_int(row["Artist ID"])

        if artist_id is None:
            continue

        exists = (
            db.query(Artist)
            .filter(Artist.artist_id == artist_id)
            .first()
        )

        if exists:
            continue

        artist = Artist(
            artist_id=artist_id,
            name=to_str(row["Name"]),
            nationality=to_str(row["Nationality"]),
            gender=to_str(row["Gender"]),
            birth_year=to_int(row["Birth Year"]),
            death_year=to_int(row["Death Year"]),
        )

        db.add(artist)

        try:
            db.flush()
        except Exception:
            print("\nFailed while inserting artist")
            print(f"CSV Row: {index}")
            print(row.to_dict())
            raise

    db.commit()

    print("Artists imported successfully!")

    # =====================================================
    # ARTWORKS
    # =====================================================

    print("Importing artworks...")

    artworks_df = pd.read_csv("../dataset/artworks.csv")

    for index, row in artworks_df.iterrows():

        artwork_id = to_int(row["Artwork ID"])
        artist_id = to_int(row["Artist ID"])

        if artwork_id is None or artist_id is None:
            continue

        exists = (
            db.query(Artwork)
            .filter(Artwork.artwork_id == artwork_id)
            .first()
        )

        if exists:
            continue

        artwork = Artwork(
            artwork_id=artwork_id,
            artist_id=artist_id,
            title=to_str(row["Title"]),
            name=to_str(row["Name"]),
            date=to_str(row["Date"]),
            medium=to_str(row["Medium"]),
            dimensions=to_str(row["Dimensions"]),
            acquisition_date=to_str(row["Acquisition Date"]),
            credit=to_str(row["Credit"]),
            catalogue=to_str(row["Catalogue"]),
            department=to_str(row["Department"]),
            classification=to_str(row["Classification"]),
            object_number=to_str(row["Object Number"]),
            diameter_cm=to_float(row["Diameter (cm)"]),
            circumference_cm=to_float(row["Circumference (cm)"]),
            height_cm=to_float(row["Height (cm)"]),
            length_cm=to_float(row["Length (cm)"]),
            width_cm=to_float(row["Width (cm)"]),
            depth_cm=to_float(row["Depth (cm)"]),
            weight_kg=to_float(row["Weight (kg)"]),
            duration_s=to_float(row["Duration (s)"]),
        )

        db.add(artwork)

        try:
            db.flush()
        except Exception:
            print("\nFailed while inserting artwork")
            print(f"CSV Row: {index}")
            print(row.to_dict())
            raise

    db.commit()

    print("Artworks imported successfully!")

except Exception:
    db.rollback()
    raise

finally:
    db.close()