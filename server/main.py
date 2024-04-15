from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from secrets import token_hex
import firebaseStorage as fs
from model import Scan_image

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/add_data")
async def add_data():
    result = fs.add_image_to_storage()
    return result


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Process the file here
    # print(file.filename)

    file_ext = file.filename.split(".").pop()

    if file_ext not in ["jpg", "jpeg", "png"]:
        return JSONResponse(status_code=400, content={"error": "Invalid file type"})

    file_name = "scan_img_" + token_hex(10)

    file_path = f"uploads/{file_name}.{file_ext}"

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    load_name = file_name + "." + file_ext

    # URL = await fs.add_image_to_storage(load_name, file_path)

    # result = await fs.download_image_from_storage(load_name)

    text = await Scan_image(load_name)

    return {
        "Sucess": True,
        "filename": f"{file.filename} is uploaded successfully",
        # "URL": URL,
        "text": text,
    }
