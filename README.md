# OCR Project

This project is an Optical Character Recognition (OCR) system built using Python. It leverages the `pytesseract` library for text extraction, `OpenCV` for image processing, `re` for regular expressions, and `NLTK` , `GENISM` for natural language processing. And build backend server using `fast api`

This is belongs To car sapre part life time prediction Project. In this Process Get Uploded spare parts bills from firebase storage and scan and read that bill snd extract wanted text from it.

#### Example Extracted Text
![sskk2](https://github.com/210352R/OCR---Project/assets/127854691/2764ab10-7023-487d-9527-9e3b99341ee5)

## Special Task
But in some time noisy words are Extracted and those are made problems in prediction process. To Overcome this issue I trained NLP model for detect most  similar context familiar word for noisy words.

## Report: Noise Correction Using Word Embeddings

### Introduction
This notebook demonstrates a method for correcting noisy car part descriptions using word embeddings and cosine similarity.

### Data Preprocessing
The provided car part descriptions are preprocessed by tokenization, lowercase conversion, and filtering out stopwords and punctuation.

### Word Embeddings
To Overcome Out Of Vocabulary issue use FastText Algorithm.
FastText embeddings are utilized with custom parameters (min_count=1, vector_size=100) to generate word vectors for the car part descriptions.

### Noise Correction Algorithm
The `correct_car_word` function corrects noisy words by comparing their word vectors with the vectors of known car part descriptions using cosine similarity.

### Example
An example is shown where the noisy word 'bonnet hinges' is corrected using the algorithm, demonstrating its effectiveness.

```python
Noisy Word: bonninet hies
Corrected Word: bonnet hinges
```
Similarity Checking 
![similarity checking](https://github.com/210352R/OCR---Project/assets/127854691/09586562-d0d5-4227-9662-d0025f3a28ba)


## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)


## Features

- Extract text from images using Tesseract OCR.
- Preprocess images using OpenCV to improve OCR accuracy.
- Clean and format extracted text using regular expressions.
- Perform text analysis and processing using NLTK.
- For Detecting Context Familiar words Train NLP Model Using GENISM

## Requirements

- Python 3.7+
- Tesseract-OCR
- OpenCV
- pytesseract
- NLTK
- GENISM
- Sklearn
- Fast-API

## Installation

### Install Python and Tesseract-OCR

Make sure you have Python 3.7+ installed on your machine. You also need to install Tesseract-OCR

