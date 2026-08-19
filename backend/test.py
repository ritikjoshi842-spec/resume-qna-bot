import os
import sys
from dotenv import load_dotenv
from groq import Groq

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    print("Error: GROQ_API_KEY is not set in .env file.")
    exit(1)

client = Groq(api_key=api_key)
model = "openai/gpt-oss-120b"

print(f"Testing stream response with Groq model '{model}'...")

try:
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Tell me a 3-word sentence."}
        ],
        stream=True
    )
    
    print("\n--- Chunks received ---")
    chunk_count = 0
    for chunk in response:
        chunk_count += 1
        print(f"Chunk {chunk_count}: choices={getattr(chunk, 'choices', None)}")
        if hasattr(chunk, "choices") and chunk.choices and len(chunk.choices) > 0:
            delta = getattr(chunk.choices[0], "delta", None)
            if delta and hasattr(delta, "content") and delta.content:
                print(f" -> content: {repr(delta.content)}")
    print("----------------------")
    print(f"Total chunks: {chunk_count}")
except Exception as e:
    print(f"\nAPI Stream Error: {e}")
