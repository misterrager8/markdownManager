from pathlib import Path

from notable import config


class Note:
    def __init__(self, path):
        self.path = Path(path)

    @property
    def name(self):
        return self.path.stem

    @property
    def content(self):
        return open(self.path).read()

    def add(self):
        return self.path.touch()

    @classmethod
    def all(cls):
        return [Note(i) for i in config.HOME_DIR.glob("**/*.txt")]

    def edit(self, content):
        open(self.path).write(content)

    def delete(self):
        self.path.unlink()

    def rename(self, new_name):
        new_path = config.HOME_DIR / f"{new_name}.txt"
        self.path.rename(new_path)

        return Note(new_path)

    def todict(self):
        return {"path": str(self.path), "name": self.stem, "content": self.content}
