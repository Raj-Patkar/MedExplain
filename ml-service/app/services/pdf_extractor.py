import fitz
import pytesseract
import os

from PIL import Image
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

EXTRACTED_DIR = "extracted"


def save_extracted_text(filename: str, text: str):

    os.makedirs(EXTRACTED_DIR, exist_ok=True)

    txt_filename = filename.replace(".pdf", ".txt")

    save_path = os.path.join(EXTRACTED_DIR, txt_filename)

    with open(save_path, "w", encoding="utf-8") as file:
        file.write(text)


def extract_with_ocr(pdf):

    ocr_text = ""

    for page in pdf:

        pix = page.get_pixmap()

        image = Image.frombytes(
            "RGB",
            [pix.width, pix.height],
            pix.samples
        )

        page_text = pytesseract.image_to_string(image)

        ocr_text += page_text

    return ocr_text


def extract_pdf_text(file_path: str):

    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:
        text += page.get_text()

    text = text.strip()

    if not text:

        print("No direct text found. Running OCR...")

        text = extract_with_ocr(pdf)

    filename = os.path.basename(file_path)

    save_extracted_text(filename, text)

    return text