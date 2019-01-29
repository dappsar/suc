![Build Status](https://travis-ci.org/dappsar/suc.svg?branch=master)&nbsp;

# Token Salva un Caballo

## Introducción

Esta es una implementación de un Token no fungible (NFT), para la ONG "Salva un Caballo". Cumple el estándard [ERC-721](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md). 




A continuación se describe:

- [Estructura del proyecto](https://github.com/dappsar/suc#estructura-del-proyecto)
    
    * Carpetas y archivos
    * Diagrama de clases de los contratos e interfaces

- [Preparación del ambiente](https://github.com/dappsar/suc#preparaci%C3%B3n-del-ambiente)

    * Requisitos
    * Instalación

- [Iniciar el proyecto](https://github.com/dappsar/suc#iniciar-el-proyecto)


---

## Estructura del proyecto

Todos los contratos y tests, se encuentra en la carpeta [src](https://github.com/dappsar/suc/blob/master/src).

### Carpetas y archivos

```bash
├───build               --> 
├───doc                 --> 
├───images              --> 
└───src
    ├───contracts       
    │   ├───math        --> Support Math Utils Library
    │   ├───ownership   --> Support Ownable Contract
    │   ├───principal   --> NFT Principal
    │   ├───tokens      --> Support ERC721 Interfaces (enumerable, metadata, receiver)
    │   └───utils       --> Supports libraries (ERC165, AddressUtils and Supports Interface)
    └───tests           
        ├───principal   --> Contract Tests
        └───tokens      --> Javascript Tests
├───.babelrc            --> 
├───.editorconfig       --> 
├───.eslintrc.js        --> 
├───.gitattributes      --> 
├───.npmignore          --> npm ignore files
├───.solhint.json       --> 
├───.travis.yml         --> circle-ci Script
├───LICENSE             --> License
├───package.json        --> To download dependencies
├───README.md           --> This File
├───truffle-config.js   --> 
├───tsconfig.json       --> 
└── .gitignore          --> 
```


### Diagrama de clases de los contratos e interfaces

```mermaid
classDiagram
Erc721Metadata <|-- NFTokenMetadata
NfToken <|-- NFTokenMetadata

Erc721Enumerable <|-- NFTokenEnumerable
NfToken <|-- NFTokenEnumerable

Erc765 <|-- SupportsInterface
SupportsInterface <|-- NfToken
Erc721 <|-- NfToken

Ownable <|-- SucToken
NFTokenMetadata <|-- SucToken
NFTokenEnumerable <|-- SucToken

AddressUtils -- NfToken: Usa
SafeMath -- NfToken: Usa
ERC721TokenReceiver -- NfToken: Usa

Erc721 : <<'interface'>>:
Erc721Enumerable : <<'interface'>>
Erc721Metadata : <<'interface'>>
ERC721TokenReceiver :  <<'interface'>>
Erc765 : <<'interface'>>
SupportsInterface : <<'interface'>>
AddressUtils :  <<'library'>>
SafeMath :  <<'library'>>

```



---

## Preparación del ambiente

### Requisitos

En el ambiente es requerido, tener instalado:

- [Git](https://nodejs.org/en/)
- [nodeJs](https://nodejs.org/en/)
- [Ganache](https://truffleframework.com/ganache)
- [Truffle](https://truffleframework.com/)
- [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es)
- npm install -g ethereumjs-testrpc

### Instalación

#### PASO 1: Clonación

Descargar el proyecto con git

```
git clone https://github.com/dappsar/suc.git
```

#### PASO 2: Instalar dependencias

Instalar las dependencias del proyecto con:

```
npm install
```

Eso generará la carpeta _node_modules_ con todas las dependencias requeridas.

---

## Iniciar el proyecto

### PASO 1: Iniciar Ganache

Iniciar el cliente ganache que se haya descargado.

### PASO 2: Compilar, testear, publicar y desplegar el contrato inteligente

#### Compilación del contrato

Para realizar la compilación del contrato, se tiene que ejecutar el siguiente comando:

```
truffle compile
```

#### Migración del contrato a una blockchain

Teniendo los contratos compilados e iniciado _Ganache_, se pueden migrar a la blockchain con el siguiente comando:

```
truffle migrate --reset
```

Si se desea desplegar en otra red, diferente a la local, se tiene que usar el parámetro _network_ y tener configurada la red en el archivo _truffle.js_.

```
# Depliegue en Rinkeby
truffle migrate --reset --network rinkeby

# Despliegue en Ropsten
truffle migrate --reset --network ropsten
```

#### Testing del contrato

Se pueden correr los tests realizados para el contrato, con el comando:

```
npm run test
```

#### Distribución del proyecto

Se puede generar una carpeta con todos los archivos requeridos del proyecto, en caso de que se quiera distribuir (por ejemplo, para desplegar en un webServer. En mi máquina local, he usado tomcat, para lo cual hay un script deploy-tomcat.sh). Para ello, basta con ejecutar:

```
npm run build
```

---


## Créditos

* La implementación del proyecto, se basa en el código fuente de [0xCert](https://github.com/0xcert/ethereum-erc721), quienes tienen una implementación estándard para tokens no fungibles (NTF) cumpliendo el estándar [ERC-721](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md). 

- Para la realización del diagrama de clases en markdown, usamos [Mermaid](https://github.com/knsv/mermaid), y la ayuda de estee [post](http://mdp.tylingsoft.com/#class-diagram).




