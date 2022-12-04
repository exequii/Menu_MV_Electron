const process = require("process");
const data = require("C:/Install/Chain/Menu/resources/config.json");
const electron = require("electron");
const app = electron.app;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;

const child = require("child_process").execFile;

const path = require("path");
const isDev = require("electron-is-dev");

const fs = require("fs");
const { ipcMain } = require("electron");

var seteado = false;
var variables = [];
var arrayVariablesImportadas = [];

let mainWindow;

function createWindow() {
  var screenElectron = electron.screen;
  var mainScreen = screenElectron.getPrimaryDisplay();
  var anchoPantalla = mainScreen.size.width;
  var altoPantalla = mainScreen.size.height;
  mainWindow = new BrowserWindow({
    width: anchoPantalla,
    height: altoPantalla,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(app.getAppPath(), "preload.js"),
    },
  });
  mainWindow.loadURL(
    isDev
     ? "http://localhost:3000"
    : 
`file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
    //La linea de arriba hace que aparezcan las DevTools al abrirlo.
  }
  //mainWindow.setFullScreen(true);
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.removeMenu();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle("hacer-txt", (event, args) => {
  fs.writeFile(args, "", (e) => {
    if (e) {
      console.log("ERROR CREANDO ARCHIVO" + e);
      return;
    }
    console.log("Archivos creados satisfactoriamente");
  });
});

ipcMain.handle("hacer-bat", (event, args) => {
  fs.writeFile("C:/Install/Chain/confInicio.bat", args, (e) => {
    if (e) {
      console.log("ERROR CREANDO ARCHIVO" + e);
      return;
    }
    console.log("Archivos creados satisfactoriamente");
  });
});

ipcMain.handle("cerrar", (event, args) => {
  mainWindow.close();
});

ipcMain.handle("setear", (event, args) => {
  seteado = true;
  variables = args;
  console.log(variables)
});

ipcMain.handle("seteado", (event, args) => {
  return seteado;
});

ipcMain.handle("valoresVariables", (event, args) => {
  return variables;
});

ipcMain.handle("traer-json", (event, args) => {
  return data;
});

var options = {
  marginsType: 0,
  pageSize: "A4",
  printBackground: true,
  printSelectionOnly: false,
  landscape: true,
};

ipcMain.handle("generar-pdf", (event, args) => {
  mainWindow.webContents
    .printToPDF(options)
    .then((data) => {
      dialog
        .showSaveDialog({
          title: "Seleccione donde exportar su configuracion",
          defaultPath: "C:/",
          buttonLabel: "Guardar",
          properties: [],
        })
        .then((file) => {
          console.log(file.canceled);
          if (!file.canceled) {
            fs.writeFile(
              file.filePath.toString() + ".pdf",
              data,
              function (err) {
                if (err) throw err;
                console.log("Saved!");
              }
            );
            variables[7] = variables[7] === undefined ? "" : variables[7];
            variables[8] = variables[8] === undefined ? "" : variables[8];
            variables[9] = variables[9] === undefined ? "" : variables[9];
            fs.writeFile(
              file.filePath.toString() + "-export.json",
              '{"nombre": "' +
                variables[0] +
                '", "banco":"' +
                variables[1] +
                '", "vendor":"' +
                variables[2] +
                '","cajero":"' +
                variables[3] +
                '","ip":"' +
                variables[4] +
                '","mascara":"' +
                variables[5] +
                '","gateway":"' +
                variables[6] +
                '","biometria":"' +
                variables[7] +
                '","jitter":"' +
                variables[8] +
                '","modelo":"' +
                variables[9] +
                '"}',
              function (err) {
                if (err) throw err;
                return true;
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
});

ipcMain.handle("executeCustomFile", (event, args) => {
  var executablePath = "C:/Install/Merge/ExecuteCustomFile.exe";
  child(executablePath, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
    }
    console.log(stdout)
  });
})

ipcMain.handle("importar-config", (event, args) => {
  var importado = dialog.showOpenDialogSync({
    title: "Seleccione el archivo a importar",
    defaultPath: "C:/",
    buttonLabel: "Importar",
    properties: ["openFile"],
    filters: [{ name: "JSON", extensions: ["json"] }],
  });

  var respuesta = fs.readFileSync(importado[0]);
  try {
    var jsonRespuesta = JSON.parse(respuesta);
  } catch {
    return false;
  }

  var chequeoArray = crearArrayDesdeJson(
    arrayVariablesImportadas,
    jsonRespuesta
  );
  if (chequeoArray) return arrayVariablesImportadas;
  else return chequeoArray;
});

function crearArrayDesdeJson(arrayVariablesImportadas, jsonRespuesta) {
  if (verificarFormatoJson(jsonRespuesta)) return false;

  arrayVariablesImportadas[0] = jsonRespuesta.nombre;

  if (verificar(data.BancosBanelco, jsonRespuesta.banco)) return false;
  jsonRespuesta.banco = jsonRespuesta.banco.toUpperCase();
  arrayVariablesImportadas[1] = jsonRespuesta.banco;

  if (verificar(data.Modelos, jsonRespuesta.vendor)) return false;
  jsonRespuesta.vendor = jsonRespuesta.vendor.toUpperCase();
  arrayVariablesImportadas[2] = jsonRespuesta.vendor;

  jsonRespuesta.cajero = jsonRespuesta.cajero.toUpperCase();
  if (jsonRespuesta.cajero !== "ATM" && jsonRespuesta.cajero !== "TAS")
    return false;
  arrayVariablesImportadas[3] = jsonRespuesta.cajero;

  if (verificarDirecciones(jsonRespuesta.ip)) return false;
  arrayVariablesImportadas[4] = jsonRespuesta.ip;

  if (verificarDirecciones(jsonRespuesta.mascara)) return false;
  arrayVariablesImportadas[5] = jsonRespuesta.mascara;

  if (verificarDirecciones(jsonRespuesta.gateway)) return false;
  arrayVariablesImportadas[6] = jsonRespuesta.gateway;

  if (
    jsonRespuesta.biometria.toUpperCase() !== "ACTIVADO" &&
    jsonRespuesta.biometria.toUpperCase() !== "DESACTIVADO" &&
    jsonRespuesta.biometria !== ""
  )
    return false;
  arrayVariablesImportadas[7] = jsonRespuesta.biometria;

  if (
    jsonRespuesta.jitter.toUpperCase() !== "ACTIVADO" &&
    jsonRespuesta.jitter.toUpperCase() !== "DESACTIVADO" &&
    jsonRespuesta.jitter !== ""
  )
    return false;
  arrayVariablesImportadas[8] = jsonRespuesta.jitter;

  if (jsonRespuesta.vendor.toUpperCase() === "GRG")
    if (verificar(data.SubModelos.Grg, jsonRespuesta.modelo)) return false;
  if (jsonRespuesta.vendor.toUpperCase() === "DIEBOLD-NIXDORF")
    if (verificar(data.SubModelos.Dn, jsonRespuesta.modelo)) return false;
  jsonRespuesta.modelo = jsonRespuesta.modelo.toUpperCase();
  arrayVariablesImportadas[9] = jsonRespuesta.modelo;
  return true;
}

function verificar(data, aVerificar) {
  var retorno = true;
  aVerificar = aVerificar.toUpperCase();
  data.map((elemento, index) => {
    console.log(elemento.vistaLista, aVerificar);
    if (elemento.vistaLista === aVerificar) {
      retorno = false;
    }
  });
  if (retorno) return true;
  else return false;
}

function verificarDirecciones(direccion) {
  var retorno = false;
  if (typeof direccion !== "string") return true;
  var arrayDirecciones = direccion.split(".");
  if (arrayDirecciones.length < 4) return true;
  arrayDirecciones.forEach((element, index) => {
    element = parseInt(element);
    if (isNaN(element)) retorno = true;
  });
  if (retorno) return true;
  else return false;
}

function verificarFormatoJson(jsonRespuesta) {
  if (!jsonRespuesta.hasOwnProperty("nombre")) return true;
  if (!jsonRespuesta.hasOwnProperty("banco")) return true;
  if (!jsonRespuesta.hasOwnProperty("vendor")) return true;
  if (!jsonRespuesta.hasOwnProperty("cajero")) return true;
  if (!jsonRespuesta.hasOwnProperty("ip")) return true;
  if (!jsonRespuesta.hasOwnProperty("mascara")) return true;
  if (!jsonRespuesta.hasOwnProperty("gateway")) return true;
  if (!jsonRespuesta.hasOwnProperty("biometria")) return true;
  if (!jsonRespuesta.hasOwnProperty("jitter")) return true;
  if (!jsonRespuesta.hasOwnProperty("modelo")) return true;
  return false;
}
