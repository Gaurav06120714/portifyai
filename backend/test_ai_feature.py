import asyncio
import os
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

# Set ANTHROPIC_API_KEY and SECRET_KEY in your .env file before running this script.

from app.services.resume_builder import build_resume_with_claude

test_payload = {
    "personal": {"name": "Test User", "title": "Software Engineer"},
    "experience_summary": {"years": "5", "tech_stack": ["Python", "React"]},
    "work_experiences": [
        {"company": "Google", "role": "Engineer", "achievements": "Built search"}
    ],
    "projects": [{"name": "MyProject", "description": "Cool app", "tech": ["Next.js"]}],
    "education": {"degree": "CS", "institution": "MIT", "year": "2020"},
    "skills": ["Coding"],
    "social_links": {"github": "github.com", "linkedin": "", "website": ""},
    "career_goal": "Senior role"
}

def test_ai_builder():
    print("Testing AI Builder service...")
    try:
        result = build_resume_with_claude(test_payload)
        print("✅ AI Builder Success!")
        print(f"Name: {result.full_name}")
        print(f"Summary: {result.summary}")
        print(f"Experiences: {len(result.work_experience)}")
        return True
    except Exception as e:
        print(f"❌ AI Builder Failed: {e}")
        return False

if __name__ == "__main__":
    test_ai_builder()
