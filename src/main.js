const { BrowserWindow, ipcMain, app } = require("electron");
const path = require("path");

let mainWindow;

const turnRight = () => {
  port.write("1");
};

const turnLeft = () => {
  port.write("0");
};

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1200,
    minHeight: 900,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      contextIsolation: false,
    },
  });

  mainWindow.maximize();

  mainWindow.loadFile("src/views/index.html");
  // mainWindow.setSimpleFullScreen(true);

  app.whenReady().then(() => {
    mainWindow.webContents.on("did-finish-load", () => {
      console.log("did-finish-load");
      mainWindow.webContents.send("data-from-server", { func: "turnLeft" });
    });
  });
}

module.exports = {
  createWindow,
  turnLeft,
  turnRight,
};
