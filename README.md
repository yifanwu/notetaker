# Notetaker

Logs all the execution of a notebook and stores the log in the notebook metadata. When you open the `.ipynb` file, it will be an array of objects under `.metadata.history`, and you can also access it via `Jupyter.notebook.metadata.history` in the console.

## Installation

Please navigate into the root of the directory

```bash
pip install notetaker
jupyter nbextension install --user --py notetaker
jupyter nbextension enable --user --py notetaker
```

This installs it for the current user. You can use --system to install it systemwide (needs root) too.

## Log Format

There are two types of log entries. One is `execution` and one is `completion`.

When a cell is executed, the entry of type `execution` is appended to the log, containing the following info:

- `type`, which is `"execution"`
- `code`, which is the code executed
- `id`, which is the id of the cell. Note that the id is not persisted across sessions, i.e., if you refresh the browser (even if your kernel is still running), the value of cell id will change.
- `idx`, the current position of the cell that is ran. For instance, if `idx` is `0`, then this is the first cell
- `time`, the time when the cell started to run. The format saved by Jupyter turns into an odd string, but once de-JSONed, the time should be correct.

When a cell has finished executing, the entry of type `completion` is appended to the log, containing the following info:

- `type`, which is `"completion"`
- `time`, the time when the cell finished running. Note that even if the cell crashes with error, this event is still called. Some cells can miss the corresponding "completion" log entry if the kernel hangs.

## Dev Notes

If you are **developing** this extension and are making changes, then install via the following

```bash
jupyter nbextension install --symlink notetaker
jupyter nbextension enable notetaker/main
```

Notice the addition of the `symlink` flag, which allows you to edit the file and when you refresh your notebook, the changes will be reflected. Note also that if you have already ran the previous command, running the flag `symlink` will no longer work, and you should 