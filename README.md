# Token Salva un Caballo

## Introducción

[TBC]



El contrato hace uso de la librería **[open-zeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity)** (Ownable, ERC721) 

A continuación se describe:

- [Preparación del ambiente](https://github.com/dappsar/suc#preparaci%C3%B3n-del-ambiente)
- [Cómo ejecutar el proyecto](https://github.com/dappsar/suc#ejecuci%C3%B3n-del-proyecto)

## Preparación del ambiente

### Requisitos

En el ambiente es requerido, tener instalado:

- [Git](https://nodejs.org/en/)
- [nodeJs](https://nodejs.org/en/)
- [Ganache](https://truffleframework.com/ganache)
- [Truffle](https://truffleframework.com/)
- [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es)
- npm install -g ethereumjs-testrpc

### Inicialización del proyecto web

Para instalar las dependencias que se usan para la aplicación (detalladas en el archivo _package.json_), basta con ejecutar el siguiente comando:

```
npm install
```

Eso generará la carpeta _node_modules_ con todas las dependencias requeridas.

---


## Ejecución del proyecto

### PASO 1: Clonación

Descargar el proyecto con git

```
git clone https://github.com/dappsar/suc.git
```

### PASO 2: Instalar dependencias

Instalar las dependencias del proyecto con:

```
npm install
```

### PASO 3: Iniciar Ganache

Iniciar el cliente ganache que se haya descargado.

### PASO 4: Compilar, testear, publicar y desplegar el contrato inteligente

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
truffle test
```


#### Distribución del proyecto

Se puede generar una carpeta con todos los archivos requeridos del proyecto, en caso de que se quiera distribuir (por ejemplo, para desplegar en un webServer. En mi máquina local, he usado tomcat, para lo cual hay un script deploy-tomcat.sh). Para ello, basta con ejecutar:

```
npm run build
```




