LONG_DESCRIPTION = """
Notetaker
============

Records code execution history in notebook metadata

"""

DESCRIPTION         = "Notetaker: record code history"
NAME                = "notetaker"
PACKAGES            = ['notetaker']
PACKAGE_DATA        = {'notetaker': ['static/*.js']}
AUTHOR              = 'Yifan Wu'
AUTHOR_EMAIL        = 'yifanwu@berkeley.edu'
URL                 = 'http://github.com/yifanwu/notetaker'
DOWNLOAD_URL        = 'http://github.com/yifanwu/notetaker'
LICENSE             = 'BSD 3-clause'
DATA_FILES          = [
                            ('share/jupyter/nbextensions/notetaker', [
                             'notetaker/main.js'
                            ])
                        ]

import io
import os
import re

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup


def read(path, encoding='utf-8'):
    path = os.path.join(os.path.dirname(__file__), path)
    with io.open(path, encoding=encoding) as fp:
        return fp.read()


def version(path):
    """Obtain the packge version from a python file e.g. pkg/__init__.py

    See <https://packaging.python.org/en/latest/single_source_version.html>.
    """
    version_file = read(path)
    version_match = re.search(r"""^__version__ = ['"]([^'"]*)['"]""",
                              version_file, re.M)
    if version_match:
        return version_match.group(1)
    raise RuntimeError("Unable to find version string.")



setup(name=NAME,
      version="0.0.1",
      description=DESCRIPTION,
      long_description=LONG_DESCRIPTION,
      author=AUTHOR,
      author_email=AUTHOR_EMAIL,
      url=URL,
      download_url=DOWNLOAD_URL,
      license=LICENSE,
      packages=PACKAGES,
      package_data=PACKAGE_DATA,
      data_files=DATA_FILES,
      include_package_data=True,
      classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Environment :: Other Environment',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: Apache Software License',
        'Natural Language :: English',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3.7'],
     )
