import os
from pathlib import Path

import dotenv


dotenv.load_dotenv()


PORT = os.getenv("port") or "2204"
HOME_DIR = Path(os.getenv("home_dir") or Path(__file__).parent.parent / "Notes")

if not Path(HOME_DIR).exists():
    Path(HOME_DIR).mkdir()
