import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from pathlib import Path

DEVICE = torch.device("cpu")

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "best_model.pth"

model = models.densenet121(weights=None)

model.classifier = nn.Linear(
    model.classifier.in_features,
    2
)

model.load_state_dict(
    torch.load(
        MODEL_PATH,
        map_location=DEVICE
    )
)

model.to(DEVICE)
model.eval()

CLASS_NAMES = [
    "NORMAL",
    "PNEUMONIA"
]

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


def predict_xray(image_path: str):

    image = Image.open(image_path).convert("RGB")

    image_tensor = transform(image)
    image_tensor = image_tensor.unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = torch.softmax(outputs, dim=1)

        confidence, prediction = torch.max(
            probabilities,
            dim=1
        )

    return {
        "prediction": CLASS_NAMES[prediction.item()],
        "confidence": round(
            confidence.item() * 100,
            2
        )
    }