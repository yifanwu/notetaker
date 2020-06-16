def _jupyter_nbextension_paths():
    return [{
        "section": "notebook",
        "dest": "notetaker",
        "src": "static",
        "require": "notetaker/main"
    }]