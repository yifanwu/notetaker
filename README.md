# Notetaker

Logs all the execution of a notebook and stores the log in the notebook metadata.

When you open the `.ipynb` file, it will be an array of objects under `.metadata.history`

## Installation

If you are using this, just run the following:

```bash
jupyter nbextension install notetaker
jupyter nbextension enable notetaker/main
```

If however, you are **developing** this extension and are making changes, then run the following

```bash
jupyter nbextension install --symlink notetaker
jupyter nbextension enable notetaker/main
```

Notice the addition of the `symlink` flag, which allows you to edit the file and when you refresh your notebook, the changes will be reflected. Note also that if you have already ran the previous command, running the flag `symlink` will no longer work, and you should 