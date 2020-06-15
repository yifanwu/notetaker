define([
    'base/js/namespace',
    // hack for midas experiment
    'codemirror/addon/fold/foldcode',
    'codemirror/addon/fold/foldgutter',
    'codemirror/addon/fold/brace-fold',
    'codemirror/addon/fold/indent-fold'
], function (Jupyter) {
    "use strict";

    function load_ipython_extension() {
      console.log('Notetaking starting now!');
      // add control buttons
      // const historyBtnId = "notetaker-clear-history-btn";
      // const toggleBtnId = "notetaker-toggle-btn";
      // const historyBtn = `<div class="btn-group">
      //   <button
      //     id="${historyBtnId}"
      //     class="btn btn-default"
      //     title="Remove all notetaker history"
      //   >🧽</button>
      // </div>`;
      // let takingNoteFlag = true;
  
      // function toggleNoteFlag() {
      //   // TODO:
      //   takingNoteFlag = !takingNoteFlag;
      //   if (takingNoteFlag) {
      //     $(`#${toggleBtnId}`).html("⏸️");
      //   } else {
      //     $(`#${toggleBtnId}`).html("✏");
      //   }
      //   return;
      // }

      /**
       * creates a cell and put the execution trace
       * righ tnow does not differentiate between cells
       */
      //   function showAllHistory() {
      //     const history = Jupyter.notebook.metadata.history;
      //     const text = history
      //       .filter(h => h.type === "execution")
      //       .map(h => h.code).join("\n\n");
      //     const allCells = Jupyter.notebook.get_cells();
      //     const insertIdx = allCells.length;
      //     let cell = Jupyter.notebook.insert_cell_at_index("code", insertIdx);
      //     const comment = "# [NOTETAKER] execution history";
      //     cell.set_text(comment + "\n" + text);
      //     cell.code_mirror.display.lineDiv.scrollIntoView();
      //   }
        
      //   const putHistoryBtnId = "notetaker-show-history-btn";
      //   const putHistoryBtn = `<div class="btn-group">
      //   <button
      //     id="${putHistoryBtnId}"
      //     class="btn btn-default"
      //     title="Show all execution traces"
      //   >📖</button>
      // </div>
      //   `
    
      //   const toggleBtn = `<div class="btn-group">
      //     <button
      //       id="${toggleBtnId}"
      //       class="btn btn-default"
      //       title="Toggle note-taking"
      //     >⏸️</button>
      //   </div>`;
      
      //   const warnText = "(Please do not click this button if you are participating in the experiment)";
      
      //   $("#maintoolbar-container").append(historyBtn);
      //   $("#maintoolbar-container").append(toggleBtn);
      //   $("#maintoolbar-container").append(putHistoryBtn);

      //   $(`#${historyBtnId}`).click(() => {
      //     if (confirm(`Are you sure you want to remove all history? ${warnText}`)) {
      //       clearAllHistory();
      //     }
      //   });
      //   $(`#${toggleBtnId}`).click(() => {
      //     if (confirm(`Are you sure you want to toggle history logging? ${warnText}`)) {
      //       toggleNoteFlag();
      //     }
      //   });
      //   $(`#${putHistoryBtnId}`).click(() => {
      //     showAllHistory();
      //   });
      // function clearAllHistory() {
      //   Jupyter.notebook.metadata.history = [];
      //   Jupyter.notebook.save_notebook();
      // }

      let lastSaved = null;

      function addLogEntry(newItem) {
        // if (!takingNoteFlag) {
        //   return;
        // }
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
        const code = data.cell.get_text();
        // getcell id
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

    return {
      load_ipython_extension: load_ipython_extension
    };

 });