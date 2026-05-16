import os
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

# Set ANTHROPIC_API_KEY and SECRET_KEY in your .env file before running this script.

from app.services.resume_builder import suggest_skills_with_claude

test_payload = {
    "current_skills": ["Python"],
    "tech_stack": ["React"],
    "role_titles": ["Frontend Engineer"],
    "career_goal": "Fullstack role"
}

def test_suggest_skills():
    print("Testing Suggest Skills service...")
    try:
        result = suggest_skills_with_claude(
            test_payload["current_skills"],
            test_payload["tech_stack"],
            test_payload["role_titles"],
            test_payload["career_goal"]
        )
        print("✅ Suggest Skills Success!")
        print(f"Suggestions: {result}")
        return True
    except Exception as e:
        print(f"❌ Suggest Skills Failed: {e}")
        return False

if __name__ == "__main__":
    test_suggest_skills()
