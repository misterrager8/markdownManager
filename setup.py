import setuptools

setuptools.setup(
    name="notable",
    entry_points={"console_scripts": ["notable=notable.__main__:cli"]},
    py_modules=["notable"],
)
