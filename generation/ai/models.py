import asyncio
import re

from anthropic import AsyncAnthropic
from anthropic.types import TextBlock
from dotenv import load_dotenv
from google import genai
from openai import AsyncOpenAI

load_dotenv()

PROMPT = (
    "Imagine you flipped a fair coin 50 times.\n\n"
    "Without actually flipping a coin or using any external tool, "
    "create a sequence of 50 Heads or Tails that you believe looks as random as "
    "possible.\n\nRespond with only the sequence of 50 outcomes, using H for Heads "
    "and T for Tails, with no spaces or punctuation between them."
)

open_ai_client = AsyncOpenAI()
anthropic_client = AsyncAnthropic()
gemini_client = genai.Client()

def is_valid_sequence(sequence: str | BaseException) -> bool:
    if isinstance(sequence, BaseException):
        return False
    return (
        len(sequence) == 50
        and isinstance(sequence, str)
    )

def validate_sequences(results: list[str | BaseException]) -> list[str]:
    sequences, failures = [], []
    for result in results:
        if not is_valid_sequence(result):
            failures.append(result)
        else:
            sequences.append(result)
    
    print(f"Got {len(sequences)} valid, {len(failures)} failed/invalid")
    return sequences

async def generate_one_openai(semaphore: asyncio.Semaphore) -> str:
    async with semaphore:
        response = await open_ai_client.responses.create(
            model="gpt-5.5",
            input=PROMPT,
            temperature=1.0
        )
        raw = response.output_text.strip()
        cleaned = re.sub(r"[^HT]", "", raw.upper())
        return cleaned

async def generate_openai_sequence(
    num: int, 
    max_concurrent: int = 10
) -> list[str]:
    semaphore = asyncio.Semaphore(max_concurrent)
    tasks = [generate_one_openai(semaphore) for _ in range(num)]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return validate_sequences(results)

async def generate_one_anthropic(semaphore: asyncio.Semaphore) -> str:
    async with semaphore:
        response = await anthropic_client.messages.create(
            model="claude-opus-5",
            max_tokens=1024,
            temperature=1.0,
            thinking={"type": "disabled"},
            messages=[
                {"role": "user", "content": PROMPT}
            ]
        )
        first_block = response.content[0]
        if isinstance(first_block, TextBlock):
            raw = first_block.text.strip()
            cleaned = re.sub(r"[^HT]", "", raw.upper())
            return cleaned
        return "error"

async def generate_anthropic_sequence(
    num: int, 
    max_concurrent: int = 10
) -> list[str]:
    semaphore = asyncio.Semaphore(max_concurrent)
    tasks = [generate_one_anthropic(semaphore) for _ in range(num)]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return validate_sequences(results)

async def generate_one_gemini(semaphore: asyncio.Semaphore) -> str:
    async with semaphore:
        response = await gemini_client.aio.models.generate_content(
            model="gemini-3.1-pro-preview",
            contents=PROMPT,
            config={
                "temperature": 1.0
            }
        )
        if response.text is None:
            return "error"
        raw = response.text.strip()
        cleaned = re.sub(r"[^HT]", "", raw.upper())
        return cleaned

async def generate_gemini_sequence(
    num: int, 
    max_concurrent: int = 10
) -> list[str]:
    semaphore = asyncio.Semaphore(max_concurrent)
    tasks = [generate_one_gemini(semaphore) for _ in range(num)]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return validate_sequences(results)
