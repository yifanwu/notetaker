define([
    'base/js/namespace',
  ], function (Jupyter) {
    "use strict";

    function load_ipython_extension() {
      console.log('Notetaking starting now!');

      let lastSaved = null;

      function addLogEntry(newItem) {
        if (Jupyter.notebook.metadata.hasOwnProperty('history')) {
          Jupyter.notebook.metadata.history.push(newItem);
        } else {
          Jupyter.notebook.metadata.history = [newItem];
        }
        // only save every 1 min
        if (((lastSaved) && ((Date.now() - lastSaved) > 60000)) || (!lastSaved)) {
          Jupyter.notebook.save_notebook();
          lastSaved = Date.now();
        }
      }
  
  
      Jupyter.notebook.events.on("execute.CodeCell", function(evt, data) {
        // remove non utf-8 compatible chars
        // based on https://stackoverflow.com/questions/2670037/how-to-remove-invalid-utf-8-characters-from-a-javascript-string
        const code = cleanString(data.cell.get_text());
        // get cell id
        const id = data.cell.cell_id;
        const idx = Jupyter.notebook.find_cell_index(data.cell);
        const time = new Date();
        const type = "execution";
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
    }

    // helper function
    function cleanString(input) {
      var output = "";
      for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
          output += input.charAt(i);
        }
      }
      return output;
    }

    return {
      load_ipython_extension: load_ipython_extension
    };

 });