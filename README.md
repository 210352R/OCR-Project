# OCR Project

This project is an Optical Character Recognition (OCR) system built using Python. It leverages the `pytesseract` library for text extraction, `OpenCV` for image processing, `re` for regular expressions, and `NLTK` , `GENISM` for natural language processing. And build backend server using `fast api`

This is belongs To car sapre part life time prediction Project. In this Process Get Uploded spare parts bills from firebase storage and scan and read that bill snd extract wanted text from it.

## Special Task
But in some time noisy words are Extracted and those are made problems in prediction process. To Overcome this issue I trained NLP model for detect most  similar context familiar word for noisy words.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

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

