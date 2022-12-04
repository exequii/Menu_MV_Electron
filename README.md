Proyecto Instalador MV React-Electron - NCR

El proyecto consta de migrar el soft anterior de Javascript puro y Electron.js a esta version realizada con React y Electron.
Tambien se busco hacer un codigo mas sostenible y legible para futuras modificaciones.

Consta de una etapa de Pre-Seteo, en donde en principio se realizan las validaciones de los campos.
Una vez realizado el seteo, tendremos un resumen de lo que se configuro, el cual podemos exportar en PDF o proceder a instalar.
Al instalar, se generan archivos .txt con los nombres de las distintas cosas que se configuraron, los cuales son necesarios para que el cajero levante con dichos seteos. Tambien genera un archivo .bat .

Adicionalmente, cuenta con un menu exclusivo para desarrolladores, el cual nos da acceso a configuraciones adicionales para que generen archivos sus correspondientes archivos .txt .

- Se utiliza NodeJS para la generacion de archivos y acceso al FileSystem.

- Se utiliza Electron para montar el programa en una aplicacion de Escritorio.
  Mediante el preload.js realizamos la comunicacion del Client Process y Renderer Process (Back-Front) ya que React nos inhibe las funciones de FileSystem desde el Front.

- Se utiliza ReactJS para todo el Front, manejo de variables, validaciones, generacion de PDF. Como libreria de CSS se utilizo MATERIAL UI.

Desarrollo realizado por Sanson, Ezequiel Damian.
