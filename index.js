const {app, Menu, Tray, MenuItem, dialog, BrowserWindow} = require('electron');
const child_process = require('child_process');
const { resolve } = require("path");

const fs = require("fs");

require('@electron/remote/main').initialize();

const Store = require('electron-store');

const scheme = {
    ssh: {
      type: 'string',
    },
  }
  
const store = new Store({ scheme });

let tray = null;

var items = [];

function criaListItems(reset = false) {

  const storeSSH = store.get('ssh');
  const sshClients = storeSSH ? JSON.parse(storeSSH) : [];

  items = sshClients.map(item => ({
    label: item.nomeConexao,
    submenu:[{
      label: 'Cliente SSH',
      click: () => { executeSSHCommandLine(item.destinoBat) }
    },
    {
      label: 'Remover',
      click: () => {
          const sshClienteSelecionado = sshClients.find(sshItem => sshItem.nomeConexao == item.nomeConexao);

          try {
            if (sshClienteSelecionado.chave != '' && sshClienteSelecionado.bat != '') {
              fs.unlinkSync(resolve(app.getAppPath(), `keys\\${sshClienteSelecionado.chave}`));
              fs.unlinkSync(resolve(app.getAppPath(), `keys\\${sshClienteSelecionado.bat}`));
            }
          } catch (error) {
              dialog.showMessageBoxSync(null, {
                icon: resolve(__dirname, 'assets', 'tray-icon.png'),
                title: 'Error',
                message: 'Não foi possível deletar os arquivos relacionados a essa conexão',
              }); 
          }

          const sshClientsUpdate = sshClients.filter(sshItem => sshItem.nomeConexao != item.nomeConexao);
          store.set('ssh', JSON.stringify(sshClientsUpdate));
          
          criaListItems(true);
      }
    }
  ]
  }));

  if (reset) {
    tray.destroy();
    tray = new Tray(resolve(__dirname, 'assets', 'tray-icon.png'));
    render();
  }
}



function render() {

    criaListItems();


    const contextMenu = Menu.buildFromTemplate([
        ... items,
        {
          type: 'separator',
        },
        {
          type: 'normal',
          label: 'Sair',
          role: 'quit',
          enabled: true,
        }
      ]);

    contextMenu.insert(0, new MenuItem({ 
          label: 'Adicionar SSH', click: () => { 
            openCreateSSHDialog();
            render();
        }
      }
    ));

    contextMenu.insert(1, new MenuItem({
        label: 'Remover Conexões',
        click: () => {

            const apagarConexoes = dialog.showMessageBoxSync(null, {
                icon: resolve(__dirname, 'assets', 'tray-icon.png'),
                title: 'Apagar todas as conexões',
                message: 'Esta ação deletará todas as conexão, deseja continuar ?',
                buttons: ['Continuar', 'Cancelar']
            });           


            if (apagarConexoes == 0) {
                store.set('ssh', JSON.stringify([]));
            }
            
        }
    }))

    tray.setToolTip('SSH Admin');
    tray.setContextMenu(contextMenu);
}


function openCreateSSHDialog() {
    const win = new BrowserWindow({
        title: 'Adicionar Conexão SSH',
        icon: 'assets/tray-icon.png',
        width: 500, 
        height: 300, 
        center: true, 
        resizable: false,
        frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        darkTheme: true,
        backgroundColor: '#373a59'
    });

    win.loadFile('pages/ssh-form/ssh-form.html');
    require('@electron/remote/main').enable(win.webContents);

}

function executeSSHCommandLine(batFile) {
  child_process.spawn("cmd", ['/c', 'start', '""', batFile], { env: process.env });
}

app.on('ready', () => {
  tray = new Tray(resolve(__dirname, 'assets', 'tray-icon.png'));
  render();
}
  
);