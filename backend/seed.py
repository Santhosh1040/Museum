import pandas as pd

from app.database import SessionLocal
from app.models.artwork import Artwork


# =========================
# Helpers
# =========================

def to_int(value):
    if pd.isna(value):
        return None

    try:
        if isinstance(value, str):
            value = value.split(",")[0].strip()

        return int(float(value))

    except:
        return None



def to_float(value):
    if pd.isna(value):
        return None

    try:
        return float(value)

    except:
        return None



def to_str(value):
    if pd.isna(value):
        return None

    value = str(value).strip()

    return value if value else None



# =========================
# Load artworks
# =========================

print("Loading artworks...")

df = pd.read_csv("../dataset/artworks.csv")


artworks = []


for _, row in df.iterrows():

    artwork_id = to_int(row["Artwork ID"])
    artist_id = to_int(row["Artist ID"])


    if artwork_id is None or artist_id is None:
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


print("Total artworks:", len(artworks))



# =========================
# Find existing
# =========================

db = SessionLocal()

existing_ids = set(
    x[0]
    for x in db.query(Artwork.artwork_id).all()
)

db.close()


print(
    "Already in DB:",
    len(existing_ids)
)



new_artworks = [

    x for x in artworks
    if x["artwork_id"] not in existing_ids

]


print(
    "Remaining to insert:",
    len(new_artworks)
)



# =========================
# Insert
# =========================


BATCH_SIZE = 100


for i in range(
    0,
    len(new_artworks),
    BATCH_SIZE
):

    batch = new_artworks[
        i:i+BATCH_SIZE
    ]


    try:

        db = SessionLocal()


        db.bulk_insert_mappings(
            Artwork,
            batch
        )


        db.commit()


        db.close()


        print(
            f"Inserted artworks {i+len(batch)}/{len(new_artworks)}"
        )


    except Exception as e:


        print("\nBatch failed:")
        print(e)


        try:
            db.rollback()
            db.close()

        except:
            pass


        print(
            "Retrying this batch..."
        )


        continue



print("\nARTWORK INSERT COMPLETED")