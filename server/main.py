from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from secrets import token_hex
import firebaseStorage as fs
from model import Scan_image
from model import check_image_quality
from model import scan_image_with_processing
from verify import getOcrText
from exceptions import OCRError

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:19006",  # Add your Expo development URL here
    "http://http://127.0.0.1/:8081",  # Add your local IP address
    # Add any other origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/add_data")
async def add_data():
    result = fs.add_image_to_storage()
    return result


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_ext = file.filename.split(".").pop()

        if file_ext not in ["jpg", "jpeg", "png"]:
            return JSONResponse(status_code=400, content={"error": "Invalid file type"})

        file_name = "scan_img_" + token_hex(10)

        file_path = f"uploads/{file_name}.{file_ext}"

        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        load_name = file_name + "." + file_ext

        checkImage = check_image_quality(load_name)

        if checkImage == False:
            raise HTTPException(status_code=400, detail="Image Quality is too Low ")

        ocr_result = await scan_image_with_processing(load_name)

        return {
            "Sucess": True,
            "filename": f"{file.filename} is uploaded successfully",
            "text": ocr_result,
            "date": ocr_result[1],
        }
    except OCRError as eocr:
        return JSONResponse(status_code=500, content={"error": eocr.detail})
    except Exception as e:
        # Handle the exception here
        return JSONResponse(status_code=500, content={"error": str(e)})


# # Load the serialized FastText model from the pickle file
# with open(r"./fasttext_model.pkl", "rb") as file:
#     model_deserialized = pickle.load(file)


# # Define a FastAPI endpoint to use the deserialized model
# @app.post("/get_vector")
# def get_vector_api(text: str):
#     # Get vector representation of the input text using the deserialized model
#     vector = model_deserialized.wv[text]
#     return {"vector": vector.tolist()}
