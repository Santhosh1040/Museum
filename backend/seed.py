import pandas as pd

from app.database import SessionLocal
from app.models.artwork import Artwork


# ==============================
# Helper functions
# ==============================

def to_int(value):
    if pd.isna(value):
        return None

    if isinstance(value, str):
        value = value.strip()

        if value == "":
            return None

        if "," in value:
            value = value.split(",")[0].strip()

    try:
        return int(float(value))
    except:
        return None


def to_float(value):
    if pd.isna(value):
        return None

    if isinstance(value, str):
        value = value.strip()

        if value == "":
            return None

    try:
        return float(value)
    except:
        return None


def to_str(value):
    if pd.isna(value):
        return None

    value = str(value).strip()

    if value == "":
        return None

    return value


db = SessionLocal()


try:

    print("Loading artworks...")

    artworks_df = pd.read_csv(
        "../dataset/artworks.csv"
    )


    # Load already inserted artwork IDs
    existing_artwork_ids = {
        x[0]
        for x in db.query(Artwork.artwork_id).all()
    }


    print(
        f"Existing artworks in DB: {len(existing_artwork_ids)}"
    )


    artworks = []


    for _, row in artworks_df.iterrows():

        artwork_id = to_int(row["Artwork ID"])
        artist_id = to_int(row["Artist ID"])


        if artwork_id is None or artist_id is None:
            continue


        # skip already inserted artworks
        if artwork_id in existing_artwork_ids:
            continue


        artworks.append({

            "artwork_id": artwork_id,
            "artist_id": artist_id,

            "title": to_str(row["Title"]),
            "name": to_str(row["Name"]),
            "date": to_str(row["Date"]),
            "medium": to_str(row["Medium"]),
            "dimensions": to_str(row["Dimensions"]),
            "acquisition_date": to_str(row["Acquisition Date"]),
            "credit": to_str(row["Credit"]),
            "catalogue": to_str(row["Catalogue"]),
            "department": to_str(row["Department"]),
            "classification": to_str(row["Classification"]),
            "object_number": to_str(row["Object Number"]),

            "diameter_cm": to_float(row["Diameter (cm)"]),
            "circumference_cm": to_float(row["Circumference (cm)"]),
            "height_cm": to_float(row["Height (cm)"]),
            "length_cm": to_float(row["Length (cm)"]),
            "width_cm": to_float(row["Width (cm)"]),
            "depth_cm": to_float(row["Depth (cm)"]),
            "weight_kg": to_float(row["Weight (kg)"]),
            "duration_s": to_float(row["Duration (s)"])

        })


    print(
        f"New artworks to insert: {len(artworks)}"
    )


    batch_size = 500


    for i in range(0, len(artworks), batch_size):

        batch = artworks[i:i + batch_size]


        try:

            db.bulk_insert_mappings(
                Artwork,
                batch
            )

            db.commit()


            print(
                f"Inserted artworks {min(i+batch_size,len(artworks))}/{len(artworks)}"
            )


        except Exception as e:

            db.rollback()

            print("\nBatch failed:")
            print(e)

            db.close()
            db = SessionLocal()



    print("\nARTWORK SEED COMPLETED SUCCESSFULLY!")


except Exception as e:

    print("\nFATAL ERROR:")
    print(e)

    db.rollback()


finally:

    db.close()