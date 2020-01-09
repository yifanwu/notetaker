define([
    'base/js/namespace',
    // 'require',
    // 'base/js/events',
    // 'services/config',
    // 'notebook/js/codecell'
    // , events, configmod, codecell
], function (Jupyter) {
    "use strict";

    function addLogEntry(newItem) {
      if (Jupyter.notebook.metadata.hasOwnProperty('history')) {
        Jupyter.notebook.metadata.history.push(newItem);
      } else {
        Jupyter.notebook.metadata.history = [newItem];
      }
      Jupyter.notebook.save_notebook();
    }


    Jupyter.notebook.events.on("execute.CodeCell", function(evt, data) {
      const code = data.cell.get_text();
      // getcell id
      const id = data.cell.cell_id;
      const idx = Jupyter.notebook.find_cell_index(data.cell);
      const time = new Date();
      const type = "exec";
      addLogEntry({
        type,
        code,
        id,
        idx,
        time
      })
    });

    Jupyter.notebook.events.on("finished_execute.CodeCell", function(evt, data) {
      const type = "completion";
      const id = data.cell.cell_id;
      const time = new Date();
      addLogEntry({
        type,
        id,
        time
      });
    });

    function load_ipython_extension() {
        console.log(
            'This is the current notebook application instance:',
            Jupyter.notebook
        );
    }

    return {
        load_ipython_extension: load_ipython_extension
    };

 });