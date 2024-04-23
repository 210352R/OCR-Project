from veryfi import Client


# get your keys here: https://hub.veryfi.com/api/
client_id = "vrfudW65UwDLHIbBW7lTkmGwmzccvdTEVAv2PsE"
client_secret = "RUMtwhtu9sGsrTdh2R16oUEsIt66Af40buv5AZ49tnLWUu1fTHWgYjwkNPFi4lhGrBljbZK5vcheBVjrsXJG3sh0hNB5hY0lgmckvKlk5UdH9sKyWBhjE9Tf4YibKDaU"
username = "eshanmaduranga0329"
api_key = "edd21201d02d5e44a7de71315fd1a01b"

veryfi_client = Client(client_id, client_secret, username, api_key)

global response


async def getOcrText(image_path):
    categories = ["Grocery", "Utilities", "Travel", "Car Repair"]
    file_path = r"./uploads/" + image_path
    try:
        # This submits document for processing (takes 3-5 seconds to get response)
        response = veryfi_client.process_document(file_path, categories=categories)
        print(response)
        return response["ocr_text"], response["date"]
    except Exception as e:
        print(f"Error processing document: {e}")
        return None, None
