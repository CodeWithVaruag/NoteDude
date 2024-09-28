const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 350,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: true,
        },
        icon: path.join(__dirname, 'icon.ico'),
        autoHideMenuBar: true, // Hide the menu bar
        alwaysOnTop: true, // Keep the window always on top
    });

    win.loadFile('index.html');

    // Optionally, set a custom menu to be empty
    const menu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
