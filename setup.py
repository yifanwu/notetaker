import setuptools
from glob import glob

setuptools.setup(
    name='notetaker',
    version='0.0.2',
    url="https://github.com/yifanwu/notetaker",
    author="Yifan Wu",
    description="Jupyter Notebook extension to record history",
    data_files=[
        ('share/jupyter/nbextensions/notetaker', glob('*.js'))
    ],
    packages=setuptools.find_packages(),
    package_data={'notetaker': ['static/*']},
)