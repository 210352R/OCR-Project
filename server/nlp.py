# import pickle

# # Load the serialized FastText model from the pickle file
# with open("./correct_noisy_word.pkl", "rb") as file:
#     model_deserialized = pickle.load(file)


# def get_vector_api(text: str):
#     # Get vector representation of the input text using the deserialized model
#     vector = model_deserialized.wv[text]
#     print(vector)
#     return {"vector": vector.tolist()}
