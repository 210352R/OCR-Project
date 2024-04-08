from fastapi import FastAPI
import firebaseStorage as fs

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/add_data")
async def add_data():
    result = fs.add_image_to_storage()
    return result
