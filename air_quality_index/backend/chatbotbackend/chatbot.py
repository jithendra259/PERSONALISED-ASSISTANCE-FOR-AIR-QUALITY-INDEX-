from fastapi import FastAPI
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

chatbot= FastAPI()

# Load model and tokenizer from Hugging Face
MODEL_NAME = "deepseek-ai/deepseek-coder-6.7b"  # Change if needed
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, torch_dtype=torch.float16, device_map="auto")

@chatbot.post("/generate/")
async def generate_text(prompt: str):
    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
    outputs = model.generate(**inputs, max_new_tokens=100)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": response}

# Run server using: uvicorn app:app --host 0.0.0.0 --port 8000
