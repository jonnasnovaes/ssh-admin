
# SSH Admin

Essa aplicação tem o intuito de facilitar o gerenciamento e acesso de máquinas utilizando do protocolo SSH através do prompt de comando (CMD)


## Plataformas

* Windows 11


## Variáveis de Ambiente

Para rodar esse projeto você precisará alternar a variavél `dirEnviroment` entre:

`enviroment` - Ambiente de desenvolvimento

`enviromentProd` - Ambiente de Produção


## Build

Para fazer o build desse projeto é necessário instalar o `electron-packager` globalmente na máquina:

Utilize para instalar pacote [electron-packager](https://www.npmjs.com/package/electron-packager):

```bash
  npm install -g electron-packager
```

Utilize para Buildar o projeto:

```bash
  npx electron-packager <diretorio_projeto> <nome_do_projeto> --icon=<diretorio/icone> --out=dist --platform=win32 --arch=x64
```


## Instalador .exe

Para a criação do executavel de instalação foram utilizadas as ferramentas:

* [Install Creator](https://install-creator.br.uptodown.com/windows)
* [IcoFX](https://icofx.ro/)



## Documentação de cores

| Cor               | Hexadecimal                                                      |
| ----------------- | ---------------------------------------------------------------- |
| Roxo              | ![#373a59](https://via.placeholder.com/10/373a59?text=+) #373a59 |
| Amarelo           | ![#ffc107](https://via.placeholder.com/10/ffc107?text=+) #ffc107 |



## Dependências

* [electron v18.2.0](https://www.electronjs.org/releases/stable#18.2.0)

## Dev Dependências

* [electron/remote v2.0.8](https://www.npmjs.com/package/@electron/remote)
* [electron-store v8.0.1](https://www.npmjs.com/package/electron-store)


## Configurações Node

* [node v16.13.1](https://nodejs.org/en/)
* [npm 8.1.2](https://nodejs.org/en/)



## Créditos

O [Icone](https://www.flaticon.com/free-icon/ssh_5136897?term=ssh&page=1&position=2&page=1&position=2&related_id=5136897&origin=tag) utilizado no projeto tem seu devido crédito de criação por Freepik, e disponibilizado na plataforma [FlatIcon](https://www.flaticon.com/)



## Licença

[MIT](https://choosealicense.com/licenses/mit/)

