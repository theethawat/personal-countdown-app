const { app, BrowserWindow } = require("electron");
const path = require("path");
require("../backend/index.js");
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true, // Important for security
      enableRemoteModule: false, // Disable remote module for security reasons
      nodeIntegration: false, // Do not enable nodeIntegration for security reasons
    },
  });

  // Load the local web server URL
  // Dev
  // mainWindow.loadURL('http://localhost:5173');
  // Production
  mainWindow.loadURL(
    `file://${path.join(__dirname, "../frontend/dist/index.html")}`
  );
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
