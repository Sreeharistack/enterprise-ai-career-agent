import os

from dotenv import load_dotenv
from huggingface_hub import InferenceClient


load_dotenv()

hf_token = os.getenv("HF_TOKEN")

if not hf_token:
    raise ValueError(
        "HF_TOKEN was not found. "
        "Please check your .env file."
    )


client = InferenceClient(
    api_key=hf_token
)


def ask_ai(prompt: str) -> str:
    """
    Send a prompt to a Hugging Face Inference Provider
    and return the AI response.
    """

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b:fastest",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content