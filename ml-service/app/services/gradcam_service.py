import uuid
from pathlib import Path

import cv2
import numpy as np
import torch
import torch.nn as nn

from PIL import Image

from torchvision import (
    models,
    transforms
)

from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import (
    show_cam_on_image
)

DEVICE = torch.device(
    "cuda" if torch.cuda.is_available()
    else "cpu"
)

MODEL_PATH = "app/models/best_model.pth"

model = models.densenet121(
    weights=None
)

num_features = (
    model.classifier.in_features
)

model.classifier = nn.Linear(
    num_features,
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

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std=[0.229,0.224,0.225]
    )
])

HEATMAP_FOLDER = Path(
    "uploads/heatmaps"
)

HEATMAP_FOLDER.mkdir(
    parents=True,
    exist_ok=True
)


def generate_heatmap_analysis(
    image_path: str
):

    image = Image.open(
        image_path
    ).convert("RGB")

    input_tensor = transform(
        image
    ).unsqueeze(0).to(
        DEVICE
    )

    target_layers = [
        model.features.norm5
    ]

    cam = GradCAM(
        model=model,
        target_layers=target_layers
    )

    grayscale_cam = cam(
        input_tensor=input_tensor
    )[0]

    heatmap = grayscale_cam.copy()

    threshold = 0.85

    binary_mask = (
        heatmap > threshold
    ).astype(np.uint8)

    ys, xs = np.where(
        binary_mask == 1
    )

    if len(xs) == 0:

        region = "No Significant Region"

        severity = "None"

    else:

        x_min = xs.min()
        x_max = xs.max()

        y_min = ys.min()
        y_max = ys.max()

        center_x = (
            x_min + x_max
        ) / 2

        center_y = (
            y_min + y_max
        ) / 2

        width = 224
        height = 224

        side = (
            "Left"
            if center_x < width/2
            else "Right"
        )

        if center_y < height * 0.33:
            zone = "Upper"

        elif center_y < height * 0.66:
            zone = "Middle"

        else:
            zone = "Lower"

        region = (
            f"{side} {zone} Lung"
        )

        activated_pixels = np.sum(
            binary_mask
        )

        total_pixels = (
            224 * 224
        )

        ratio = (
            activated_pixels /
            total_pixels
        )

        if ratio < 0.05:

            severity = "Mild"

        elif ratio < 0.15:

            severity = "Moderate"

        else:

            severity = "Severe"

    rgb_img = np.array(
        image.resize((224,224))
    ).astype(np.float32) / 255.0

    visualization = (
        show_cam_on_image(
            rgb_img,
            grayscale_cam,
            use_rgb=True
        )
    )

    heatmap_filename = (
        f"{uuid.uuid4()}.png"
    )

    heatmap_path = (
        HEATMAP_FOLDER /
        heatmap_filename
    )

    cv2.imwrite(
        str(heatmap_path),
        cv2.cvtColor(
            visualization,
            cv2.COLOR_RGB2BGR
        )
    )

    return {
        "region": region,
        "severity": severity,
        "heatmap_image": f"/heatmaps/{heatmap_filename}"
    }