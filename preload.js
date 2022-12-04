const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electron", {
  crearFile: (filename) => {
    ipcRenderer.invoke("hacer-txt", filename);
  },
  crearBat: (bat) => {
    ipcRenderer.invoke("hacer-bat", bat);
  },
  cerrarElectron: () => {
    ipcRenderer.invoke("cerrar");
  },
  setearTodo: (variables) => {
    ipcRenderer.invoke("setear", variables);
  },
  devolverSeteo: () => {
    return ipcRenderer.invoke("seteado");
  },
  devolverTodo: () => {
    return ipcRenderer.invoke("valoresVariables");
  },
  generarPDF: () => {
    return ipcRenderer.invoke("generar-pdf");
  },
  traerJSON: () => {
    return ipcRenderer.invoke("traer-json");
  },
  importarConfig: () => {
    return ipcRenderer.invoke("importar-config");
  },
  ejecutarExe: () => {
    return ipcRenderer.invoke("executeCustomFile");
  }
});
