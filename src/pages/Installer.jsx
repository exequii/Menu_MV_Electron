import { Typography } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import Swal from "sweetalert2";
import MaskedInput from "react-text-mask";

export const Installer = (props) => {
  var info;
  var botonTipoApp;
  var tipoAplicacion;
  var nombreTerminal;
  var banco;
  var vendor;
  var direccionIp;
  var mascaraRed;
  var gateway;
  var biometria;
  var jitter;
  var modeloDN;
  var bancoVista;
  var vendorVista;
  var textoAMostrar;
  var nombreResumen;
  var bancoResumen;
  var vendorResumen;
  var cajeroResumen;
  var direccionResumen;
  var mascaraResumen;
  var gatewayResumen;
  var bioResumen;
  var jitterResumen;
  var modeloResumen;
  var nombresVariables = [
    "Cajero",
    "Nombre",
    "Banco",
    "Vendor",
    "Direccion IP",
    "Mascara de Red",
    "Gateway",
    "Biometria",
    "Jitter",
    "Modelo",
  ];

  const [subItemsModelos, setSubItems] = React.useState([]);
  const [itemsBancos, setItemsBancos] = React.useState([]);
  const [itemsModelos, setItemsModelos] = React.useState([]);
  const [modelosBiomOk, setModelosBiomOk] = React.useState([]);
  const [value, setValue] = React.useState("Seleccione una opcion");
  const [value2, setValue2] = React.useState("Seleccione una opcion");
  const [subMenu, setSubMenu] = React.useState(false);
  const [menuBiom, setMenuBiom] = React.useState(false);
  const [menuJitter, setMenuJitter] = React.useState(false);
  const [menuBiom2, setMenuBiom2] = React.useState(true);
  const [menuBiomResumen, setMenuBiomResumen] = React.useState(false);
  const [menuBiomResumen2, setMenuBiomResumen2] = React.useState(true);
  const [menuJitterResumen, setMenuJitterResumen] = React.useState(false);
  const [tipoSubMenu, setTipoSubMenu] = React.useState();
  const [subSelect, setValueSubSelect] = React.useState(
    "Seleccione una opcion"
  );
  const [button1, setValue3] = React.useState("contained");
  const [button2, setValue4] = React.useState("outlined");
  const [checkedBio, setCheckedBio] = React.useState(false);
  const [checkedJitter, setCheckedJitter] = React.useState(false);

  const handleChangeInputText = (event) => {
    event.target.value = event.target.value.toUpperCase()
  };

  const handleChangeSelect = (event) => {
    setValue(event.target.value);
  };

  const handleChangeSelect2 = (event, importado) => {
    if (event.target.value !== null) {
      setValue2(event.target.value);
    } else {
      setValue2(importado);
    }
    if (
      event.target.value === "dn" ||
      importado === "DIEBOLD-NIXDORF"
    ) {
      setValueSubSelect("Seleccione una opcion");
      setSubMenu(true);
      setMenuBiom(false);
      setMenuBiomResumen(false);
      setMenuJitter(false);
      setMenuJitterResumen(false);
      setTipoSubMenu("DN");
    } else if (
      modelosBiomOk.includes(event.target.value) ||
      modelosBiomOk.includes(importado)
    ) {
      setMenuBiom(true);
      setMenuBiomResumen(true);
      setSubMenu(false);
      if (event.target.value === "ncr" || importado === "NCR") {
        setMenuJitter(true);
        setMenuJitterResumen(true);
      } else {
        setMenuJitter(false);
        setMenuJitterResumen(false);
      }
      if (event.target.value === "grg" || importado === "GRG") {
        setValueSubSelect("Seleccione una opcion");
        setSubMenu(true);
        setTipoSubMenu("GRG");
      }
    } else {
      setValueSubSelect("Seleccione una opcion");
      setSubMenu(false);
      setMenuBiom(false);
      setMenuJitter(false);
      setMenuBiomResumen(false);
      setMenuJitterResumen(false);
    }
  };

  const handleChangeSelect3 = (event, importado) => {
    event.target.value !== null
      ? setValueSubSelect(event.target.value)
      : setValueSubSelect(importado);
  };

  const handleChangeBio = (event) => {
    setCheckedBio(event.target.checked);
  };

  const handleChangeJitter = (event) => {
    setCheckedJitter(event.target.checked);
  };

  const selATM = (event) => {
    setValue3("contained");
    setValue4("outlined");
    setMenuBiom2(true);
    setMenuBiomResumen2(true);
  };

  const selTAS = (event) => {
    setMenuBiom2(false);
    setMenuBiomResumen2(false);
    setValue3("outlined");
    setValue4("contained");
  };

  const crearTXT = (txtACrear) => {
    window.electron.crearFile(txtACrear);
  };

  const crearBat = (batACrear) => {
    window.electron.crearBat(batACrear);
  };

  const propsMask = {
    guide: false,
    placeholderChar: "\u2000",
    mask: (value) => Array(value.length).fill(/[\d.]/),
    pipe: (value) => {
      if (value === "." || value.endsWith("..")) return false;
      const parts = value.split(".");
      if (
        parts.length > 4 ||
        parts.some((part) => part === "00" || part < 0 || part > 255)
      ) {
        return false;
      }
      return value;
    },
  };

  const validaciones = () => {
    var arrayDeIp;
    var arrayDeMascara;
    var arrayDeGateway;
    var direcciones;
    var nombresDirecciones;
    var volver = false;

    /* OBTENGO LOS DIV DEL FORM */
    botonTipoApp = button1 === "contained" ? true : false; //TRUE para ATM . FALSE para TAS
    tipoAplicacion = botonTipoApp === true ? "ATM" : "TAS";
    nombreTerminal = document.getElementById("nombre-app").value;
    bancoVista = document.getElementById("demo-simple-select").textContent;
    vendorVista = document.getElementById("demo-simple-select2").textContent;
    if (subMenu) {
      modeloDN = document.getElementById("demo-simple-select3").textContent;
    }
    direccionIp = document.getElementById("direccion-ip").value;
    mascaraRed = document.getElementById("mascara-red").value;
    gateway = document.getElementById("gateway").value;
    if (menuBiom && menuBiom2) {
      biometria = document.getElementById("bio").checked
        ? "Activado"
        : "Desactivado";
    }
    if (menuJitter) {
      jitter = document.getElementById("jitt").checked
        ? "Activado"
        : "Desactivado";
    }

    textoAMostrar = "";

    var variables = [
      tipoAplicacion,
      nombreTerminal,
      bancoVista,
      vendorVista,
      direccionIp,
      mascaraRed,
      gateway,
      biometria,
      jitter,
      modeloDN,
    ];

    variables.forEach((value, index) => {
      if (value === "" || value === null || value === "Seleccione una opcion") {
        textoAMostrar = textoAMostrar + " - " + nombresVariables[index];
      }
    });

    if (textoAMostrar !== "") {
      Swal.fire({
        title: "Error!",
        text: "Debes completar los siguientes campos: " + textoAMostrar,
        icon: "error",
        confirmButtonText: "Volver",
        customClass: {
          popup: props.tema ? '' : "swal-fire-dark-content",
          title: props.tema ? '' : "swal-fire-dark-text",
          htmlContainer: props.tema ? '' : "swal-fire-dark-text",
        }
      });
      return false;
    }

    arrayDeIp = direccionIp.split(".");
    arrayDeMascara = mascaraRed.split(".");
    arrayDeGateway = gateway.split(".");
    direcciones = [arrayDeIp, arrayDeMascara, arrayDeGateway];
    nombresDirecciones = ["Direccion de IP", "Mascara de Red", "Gateway"];

    if (!validacionesNombreTerminal(nombreTerminal)) {
      Swal.fire({
        title: "Error!",
        text: "Verifique el formato del nombre de la terminal.",
        icon: "error",
        confirmButtonText: "Volver",
        customClass: {
          popup: props.tema ? '' : "swal-fire-dark-content",
          title: props.tema ? '' : "swal-fire-dark-text",
          htmlContainer: props.tema ? '' : "swal-fire-dark-text",
        }
      });
      return false;
    }

    direcciones.forEach((value, index) => {
      if (value.length < 4 || value[3] === "") {
        textoAMostrar = textoAMostrar + " " + nombresDirecciones[index];
        volver = true;
      }
      Swal.fire({
        title: "Error!",
        text: "Verifique el formato de " + textoAMostrar,
        icon: "error",
        confirmButtonText: "Volver",
        customClass: {
          popup: props.tema ? '' : "swal-fire-dark-content",
          title: props.tema ? '' : "swal-fire-dark-text",
          htmlContainer: props.tema ? '' : "swal-fire-dark-text",
        }
      });
    });
    if (volver === true) return false;

    arrayDeIp.forEach((value, index) => {
      if ((value !== arrayDeGateway[index] && index <= 2 ) || direccionIp === gateway) {
        Swal.fire({
          title: "Error!",
          text: "La Direccion IP y el Gateway deben coincidir solo en sus tres primeras partes.",
          icon: "error",
          confirmButtonText: "Volver",
          customClass: {
            popup: props.tema ? '' : "swal-fire-dark-content",
            title: props.tema ? '' : "swal-fire-dark-text",
            htmlContainer: props.tema ? '' : "swal-fire-dark-text",
          }
        });
        volver = true;
      }
    });

    arrayDeMascara.forEach((value, index) => {
      if (value !== "255" && index <= 2) {
        Swal.fire({
          title: "Error!",
          text: "Las tres primeras partes de la Mascara de Red deben ser 255.",
          icon: "error",
          confirmButtonText: "Volver",
          customClass: {
            popup: props.tema ? '' : "swal-fire-dark-content",
            title: props.tema ? '' : "swal-fire-dark-text",
            htmlContainer: props.tema ? '' : "swal-fire-dark-text",
          }
        });
        volver = true;
      }
    });
    if (volver === true) return false;

    if (jitter === "Activado" && vendorVista !== "NCR") {
      Swal.fire({
        title: "Error!",
        text: "La opcion Jitter solo puede ser habilitada en Vendor NCR",
        icon: "error",
        confirmButtonText: "Volver",
        customClass: {
          popup: props.tema ? '' : "swal-fire-dark-content",
          title: props.tema ? '' : "swal-fire-dark-text",
          htmlContainer: props.tema ? '' : "swal-fire-dark-text",
        }
      });

      return false;
    }

    if (
      biometria === "Activado" &&
      tipoAplicacion !== "ATM" &&
      modelosBiomOk.includes(vendor) === false
    ) {
      Swal.fire({
        title: "Error!",
        text: "La opcion Biometria solo puede ser habilitada en Cajeros Tipo ATM y Vendor NCR - GRG - Hyosung",
        icon: "error",
        confirmButtonText: "Volver",
        customClass: {
          popup: props.tema ? '' : "swal-fire-dark-content",
          title: props.tema ? '' : "swal-fire-dark-text",
          htmlContainer: props.tema ? '' : "swal-fire-dark-text",
        }
      });
      return false;
    }

    banco = value;
    vendor = value2;
    return true;
  };

  const validacionesNombreTerminal = (nombreTerminal) => {
    var flagValidacion = false;
    if((nombreTerminal.length !== 8)){
      return false;
    }
    if(!nombreTerminal.startsWith('S1') && !nombreTerminal.startsWith('s1')){
      return false;
    }
    var primerasTresLetras = (nombreTerminal.slice(2,5).split(""));
    var ultimosTresNumeros = (nombreTerminal.slice(-3).split(""));

    primerasTresLetras.forEach((element) => {
      element = parseInt(element);
      if (!isNaN(element)){
        flagValidacion = true;
      }
    })

    ultimosTresNumeros.forEach((element) => {
      element = parseInt(element);
      if (isNaN(element)){
        flagValidacion = true;
      }
    })
    if(flagValidacion){
      return false;
    }else{
      return true;
    }
  }

  const setearConfig = () => {
    if (validaciones()) {
      nombreResumen = document.getElementById("nombre-terminal");
      bancoResumen = document.getElementById("banco");
      vendorResumen = document.getElementById("vendor");
      cajeroResumen = document.getElementById("cajero");
      direccionResumen = document.getElementById("direccion");
      mascaraResumen = document.getElementById("mascara");
      gatewayResumen = document.getElementById("gateway-r");

      if (subMenu) {
        modeloResumen = document.getElementById("modelo");
        modeloResumen.textContent = modeloDN;
      }
      if (menuBiomResumen && menuBiomResumen2) {
        bioResumen = document.getElementById("biometria-r");
        bioResumen.textContent = biometria;
      }
      if (menuJitterResumen) {
        console.log(menuJitterResumen);
        console.log(jitter);
        jitterResumen = document.getElementById("jitter-r");
        jitterResumen.textContent = jitter;
      }

      /* SETEO LOS VALORES DEL RESUMEN */
      nombreResumen.textContent = nombreTerminal;
      bancoResumen.textContent = bancoVista;
      vendorResumen.textContent = vendorVista;
      cajeroResumen.textContent = tipoAplicacion;
      direccionResumen.textContent = direccionIp;
      mascaraResumen.textContent = mascaraRed;
      gatewayResumen.textContent = gateway;

      var variables = [
        nombreTerminal,
        banco,
        vendor,
        tipoAplicacion,
        direccionIp,
        mascaraRed,
        gateway,
        biometria,
        jitter,
        modeloDN,
      ];

      console.log(modeloDN)

      window.electron.setearTodo(variables);

      Swal.fire({
        title: "Seteo Finalizado!",
        icon: "success",
        confirmButtonText: "Volver",
        customClass: {
          popup: props.tema ? '' : "swal-fire-dark-content",
          title: props.tema ? '' : "swal-fire-dark-text",
          htmlContainer: props.tema ? '' : "swal-fire-dark-text",
        }
      });
    }
  };


  const instalar = () => {
    window.electron.devolverSeteo().then((result) => {
      if (result === false) {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "No ha realizado ningun seteo.",
          confirmButtonText: "Volver",
          customClass: {
            popup: props.tema ? '' : "swal-fire-dark-content",
            title: props.tema ? '' : "swal-fire-dark-text",
            htmlContainer: props.tema ? '' : "swal-fire-dark-text",
          }
        });
        return;
      } else {
        var valorVariables = [];

        window.electron
          .devolverTodo()
          .then((result) => {
            valorVariables = result;

            var filename = "C:/Install/Chain/";
            var varCajero = "";
            var varBanco = "";
            var varModelo = "";
            var varVendor = "";
            var varBiom = "";
            var varName = "";
            var varIP = "";
            var varGate = "";
            var varMascara = "";
            var varJitter = "";

            varName = "\r\nset COMPUTERNAME=" + valorVariables[0];
            varBanco = "\r\nset BANCO=" + valorVariables[1];
            varVendor = "\r\nset CAJEROS=" + valorVariables[2];
            varCajero = "\r\nset TERMINAL=" + valorVariables[3];
            varIP = "\r\nset IP=" + valorVariables[4];
            varMascara = "\r\nset MASCARA=" + valorVariables[5];
            varGate = "\r\nset GATEWAY=" + valorVariables[6];
            if (valorVariables[7] !== "" && valorVariables[7] !== undefined && valorVariables[7] !== "Desactivado") {
              varBiom = "\r\nset Biometria=SI";
            }
            if (valorVariables[8] !== "" && valorVariables[8] !== undefined && valorVariables[8] !== "Desactivado") {
              varJitter = "\r\nset Jitter=SI";
            }
            if (valorVariables[9] !== "" && valorVariables[9] !== undefined) {
              varModelo = "\r\nset MODELO=" + valorVariables[9];
            }

            var variablesTxt = [
              valorVariables[0],
              valorVariables[1],
              valorVariables[2],
              valorVariables[3],
            ];

            if (valorVariables[7] !== "" && valorVariables[7] !== undefined && valorVariables[7] !== "Desactivado") {
              variablesTxt.push("Biometria");
            }

            if (valorVariables[8] !== "" && valorVariables[8] !== undefined && valorVariables[8] !== "Desactivado") {
              variablesTxt.push("JITTER");
            }

            if (valorVariables[9] !== "" && valorVariables[9] !== undefined) {
              variablesTxt.push(valorVariables[9]);
            }

            var variablesBat =
              varCajero +
              varBiom +
              varJitter +
              varName +
              varVendor +
              varBanco +
              varModelo +
              varIP +
              varGate +
              varMascara;

            variablesTxt.forEach((value) => {
              crearTXT(filename + value + ".txt");
            });

            crearBat(variablesBat);
            Swal.fire({
              title: "OK",
              text: "Su seleccion fue exitosa, se continuara con la instalacion, el ATM se reiniciara en unos segundos",
              icon: "success",
              customClass: {
                popup: props.tema ? '' : "swal-fire-dark-content",
                title: props.tema ? '' : "swal-fire-dark-text",
                htmlContainer: props.tema ? '' : "swal-fire-dark-text",
              }
            });

            window.electron.ejecutarExe();

            setTimeout(function () {
              window.electron.cerrarElectron();
            }, 8000);
          })
          .catch((e) => console.log(e));
      }
    });
  };

  // const exportar = () => {
  //   window.electron.devolverSeteo().then((result) => {
  //     if (result === false) {
  //       Swal.fire({
  //         title: "Error!",
  //         text: "No se han realizado seteos.",
  //         icon: "error",
  //         confirmButtonText: "Volver",
  //         customClass: {
  //           popup: props.tema ? '' : "swal-fire-dark-content",
  //           title: props.tema ? '' : "swal-fire-dark-text",
  //           htmlContainer: props.tema ? '' : "swal-fire-dark-text",
  //         }
  //       });
  //       return;
  //     } else {
  //       window.electron.generarPDF();
  //       setTimeout(() => {
  //         Swal.fire({
  //           title: "Archivos generados con exito!",
  //           icon: "success",
  //           confirmButtonText: "Volver",
  //           customClass: {
  //             popup: props.tema ? '' : "swal-fire-dark-content",
  //             title: props.tema ? '' : "swal-fire-dark-text",
  //             htmlContainer: props.tema ? '' : "swal-fire-dark-text",
  //           }
  //         });
  //       }, 500);
  //     }
  //   });
  // };

  // const importar = () => {
  //   var respuesta = window.electron.importarConfig();
  //   respuesta.then((result) => {
  //     var arrayImporado = result;
  //     console.log(arrayImporado);
  //     if (arrayImporado === false) {
  //       return Swal.fire({
  //         title: "Ha ocurrido un error al importar.",
  //         icon: "error",
  //         text: "Verifique el formato o el contenido del archivo que esta importando.",
  //         confirmButtonText: "Volver",
  //         customClass: {
  //           popup: props.tema ? '' : "swal-fire-dark-content",
  //           title: props.tema ? '' : "swal-fire-dark-text",
  //           htmlContainer: props.tema ? '' : "swal-fire-dark-text",
  //         }
  //       });
  //     }

  //     if (arrayImporado[3] === "ATM") {
  //       setValue3("contained");
  //       setValue4("outlined");
  //     } else {
  //       setValue3("outlined");
  //       setValue4("contained");
  //     }
  //     botonTipoApp = button1 === "contained" ? true : false;
  //     document.getElementById("nombre-app").value = arrayImporado[0];
  //     setValue(arrayImporado[1]);
  //     var nulleable = { target: { value: null } };
  //     handleChangeSelect2(nulleable, arrayImporado[2]);
  //     document.getElementById("direccion-ip").value = arrayImporado[4];
  //     document.getElementById("mascara-red").value = arrayImporado[5];
  //     document.getElementById("gateway").value = arrayImporado[6];
  //     if (arrayImporado[7] !== "") {
  //       arrayImporado[7] === "Activado"
  //         ? setCheckedBio(true)
  //         : setCheckedBio(false);
  //     }
  //     if (arrayImporado[8] !== "") {
  //       arrayImporado[8] === "Activado"
  //         ? setCheckedJitter(true)
  //         : setCheckedJitter(false);
  //     }
  //     if (arrayImporado[9] !== "") {
  //       handleChangeSelect3(nulleable, arrayImporado[9]);
  //     }
  //   });
  // };

  React.useState(() => {
    window.electron.traerJSON().then((result) => {
      info = result;
      setItemsBancos(info.BancosBanelco);
      setItemsModelos(info.Modelos);
      setModelosBiomOk(info.Modelos_Biom_ok);
      setSubItems(info.SubModelos.Dn);
    });
  });

  React.useEffect(() => {
    window.electron.traerJSON().then((result) => {
      if (tipoSubMenu === "DN") {
        setSubItems(result.SubModelos.Dn);
      } else if (tipoSubMenu === "GRG") {
        setSubItems(result.SubModelos.Grg);
      }
    });
  });

  return (
    <div className="container d-flex justify-content-around">
      <div id="configuracion">
        <div className="d-flex flex-column justify-content-around h-100">
          <Typography
            variant="h5"
            color="primary.textPrimary"
            className="text-left"
          >
            Ingrese los detalles técnicos
          </Typography>

          <div className="d-flex">
            <InputLabel
              className="text-left align-center ml-1 mt-2"
              sx={{ color: "primary.color" }}
            >
              Cajero
            </InputLabel>
            <Button
              variant={button1}
              size="large"
              className="ml-4"
              id="button-atm"
              value="true"
              onClick={selATM}
            >
              ATM
            </Button>
            <Button
              variant={button2}
              size="large"
              className="ml-5"
              id="button-tas"
              value="false"
              onClick={selTAS}
            >
              TAS
            </Button>
          </div>

          <TextField
            label="Nombre de la Terminal"
            variant="outlined"
            placeholder="Nombre del equipo - Ejemplo: S1ARB001"
            id="nombre-app"
            onChange={handleChangeInputText}
            InputLabelProps={
              props.tema
                ? { className: "darkMode", shrink: true }
                : { className: "lightMode", shrink: true }
            }
            inputProps={
              props.tema
                ? { className: "darkMode text-aligned" }
                : { className: "lightMode text-aligned" }
            }
            sx={{
              backgroundColor: "primary.fondoInputs",
              borderRadius: "5px",
            }}
          ></TextField>

          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: "primary.text" }}
            >
              Banco
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="Banco"
              onChange={handleChangeSelect}
              sx={{
                backgroundColor: "primary.fondoInputs",
                borderRadius: "5px",
                color: "primary.text",
              }}
            >
              <MenuItem value="Seleccione una opcion" disabled>
                Seleccione una opcion
              </MenuItem>
              {itemsBancos.map((elemento, index) => (
                <MenuItem key={index} value={elemento.txt}>
                  {elemento.vistaLista}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select2-label"
              sx={{ color: "primary.text" }}
            >
              Vendor
            </InputLabel>
            <Select
              labelId="demo-simple-select2-label"
              id="demo-simple-select2"
              value={value2}
              label="Marca"
              onChange={handleChangeSelect2}
              sx={{
                backgroundColor: "primary.fondoInputs",
                borderRadius: "5px",
                color: "primary.text",
              }}
            >
              <MenuItem value="Seleccione una opcion" disabled>
                Seleccione una opcion
              </MenuItem>
              {itemsModelos.map((elemento, index) => (
                <MenuItem key={index} value={elemento.txt}>
                  {elemento.vistaLista}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {subMenu ? (
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select3-label"
                sx={{ color: "primary.text" }}
              >
                Modelo
              </InputLabel>
              <Select
                labelId="demo-simple-select3-label"
                id="demo-simple-select3"
                value={subSelect}
                label="Modelo"
                onChange={handleChangeSelect3}
                sx={{
                  backgroundColor: "primary.fondoInputs",
                  borderRadius: "5px",
                  color: "primary.text",
                }}
              >
                <MenuItem value="Seleccione una opcion" disabled>
                  Seleccione una opcion
                </MenuItem>
                {subItemsModelos.map((elemento, index) => (
                  <MenuItem key={index} value={elemento.txt}>
                    {elemento.vistaLista}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <div></div>
          )}

          <div className="d-flex ip-mascara-gateway">
            <div className="contenedor-ip der">
              <p className={props.tema ? "darkMode" : "lightMode"}>
                Direccion IP
              </p>
              <MaskedInput
                {...propsMask}
                className={
                  props.tema
                    ? "input-ip text-aligned"
                    : "input-ip-dark text-aligned"
                }
                placeholder="192.1.1.2"
                id="direccion-ip"
              />
            </div>
            <div className="contenedor-ip">
              <p className={props.tema ? "darkMode" : "lightMode"}>
                Máscara de Red
              </p>
              <MaskedInput
                {...propsMask}
                className={
                  props.tema
                    ? "input-ip text-aligned"
                    : "input-ip-dark text-aligned"
                }
                placeholder="255.255.255.0"
                id="mascara-red"
              />
            </div>
            <div className="contenedor-ip izq">
              <p className={props.tema ? "darkMode " : "lightMode"}>Gateway</p>
              <MaskedInput
                {...propsMask}
                className={
                  props.tema
                    ? "input-ip text-aligned"
                    : "input-ip-dark text-aligned"
                }
                placeholder="192.168.0.1"
                id="gateway"
              />
            </div>
          </div>

          <div className="d-flex w-100 justify-content-around">
            {menuBiom ? (
              menuBiom2 ? (
                <div className="d-flex">
                  <InputLabel
                    className="text-left ml-2 mt-1"
                    sx={{ color: "primary.text" }}
                  >
                    Biometria
                  </InputLabel>
                  <Switch
                    id="bio"
                    checked={checkedBio}
                    onChange={handleChangeBio}
                  ></Switch>
                </div>
              ) : (
                <div className="no-mostrar"></div>
              )
            ) : (
              <div className="no-mostrar"> </div>
            )}

            {menuJitter ? (
              <div className="d-flex">
                <InputLabel
                  className="text-left ml-2 mt-1"
                  sx={{ color: "primary.text" }}
                >
                  Jitter
                </InputLabel>
                <Switch
                  id="jitt"
                  checked={checkedJitter}
                  onChange={handleChangeJitter}
                ></Switch>
              </div>
            ) : (
              <div className="no-mostrar"></div>
            )}
          </div>
          <div className="d-flex justify-content-evenly">
            <Button variant="contained" onClick={setearConfig}>
              Setear
            </Button>

            {/* <Button variant="contained" onClick={importar} className="hidden">
              Importar
            </Button> */}
          </div>
        </div>
      </div>

      {/*¨*************************************************************************************************************/}

      <div id="resumen" className="d-flex">
        <div className="text-left p-4 d-flex flex-column justify-content-around w-100">
          <Typography
            variant="h5"
            color="primary.textPrimary"
            className="negrita"
          >
            Resumen
          </Typography>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <Typography variant="h6" color="primary.textPrimary">
                Nombre
              </Typography>
              <div
                id="nombre-terminal"
                className={
                  props.tema ? "darkMode resumen" : "lightMode resumen"
                }
              ></div>
            </div>

            <div className="d-flex flex-column mr-4 width-fijo">
              <Typography variant="h6" color="primary.textPrimary">
                Banco
              </Typography>
              <div
                id="banco"
                className={
                  props.tema ? "darkMode resumen" : "lightMode resumen"
                }
              ></div>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <Typography variant="h6" color="primary.textPrimary">
                Cajero
              </Typography>
              <div
                id="cajero"
                className={
                  props.tema ? "darkMode resumen" : "lightMode resumen"
                }
              ></div>
            </div>
            <div className="d-flex flex-column mr-4 width-fijo">
              <Typography variant="h6" color="primary.textPrimary">
                Vendor
              </Typography>
              <div
                id="vendor"
                className={
                  props.tema ? "darkMode resumen" : "lightMode resumen"
                }
              ></div>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <Typography variant="h6" color="primary.textPrimary">
                Direccion IP
              </Typography>
              <div
                id="direccion"
                className={
                  props.tema ? "darkMode resumen" : "lightMode resumen"
                }
              ></div>
              <div className="margen-top-personalizado">
                <Typography variant="h6" color="primary.textPrimary">
                  Máscara de red
                </Typography>
                <div
                  id="mascara"
                  className={
                    props.tema ? "darkMode resumen" : "lightMode resumen"
                  }
                ></div>
              </div>
            </div>

            <div className="d-flex flex-column width-fijo mr-4">
              {subMenu ? (
                <div className="d-flex flex-column margen-bot-personalizado width-fijo">
                  <Typography variant="h6" color="primary.textPrimary">
                    Modelo
                  </Typography>
                  <div
                    id="modelo"
                    className={
                      props.tema ? "darkMode resumen" : "lightMode resumen"
                    }
                  ></div>
                </div>
              ) : (
                <div className="no-mostrar"></div>
              )}
              <div className="d-flex flex-column  width-fijo">
                <Typography variant="h6" color="primary.textPrimary">
                  Gateway
                </Typography>
                <div
                  id="gateway-r"
                  className={
                    props.tema ? "darkMode resumen" : "lightMode resumen"
                  }
                ></div>
              </div>
            </div>
          </div>

          <div className="d-flex w-100 justify-content-around" id="bio-jitter">
            {menuBiomResumen ? (
              menuBiomResumen2 ? (
                <div className="d-flex flex-column">
                  <Typography
                    variant="h6"
                    color="primary.textPrimary"
                    id="res-bio"
                  >
                    Biometria
                  </Typography>
                  <div
                    id="biometria-r"
                    className={
                      props.tema ? "darkMode resumen" : "lightMode resumen"
                    }
                  ></div>
                </div>
              ) : (
                <div className="no-mostrar"></div>
              )
            ) : (
              <div className="no-mostrar"></div>
            )}
            {menuJitterResumen ? (
              <div className="d-flex flex-column">
                <Typography
                  variant="h6"
                  color="primary.textPrimary"
                  id="res-jit"
                >
                  Jitter
                </Typography>
                <div
                  id="jitter-r"
                  className={
                    props.tema ? "darkMode resumen" : "lightMode resumen"
                  }
                ></div>
              </div>
            ) : (
              <div className="no-mostrar"></div>
            )}
          </div>

          <div className="d-flex justify-content-around">
            {/* <Button variant="outlined" size="large" onClick={exportar} className="hidden">
              EXPORTAR
            </Button> */}

            <Button variant="contained" size="large" onClick={instalar}>
              INSTALAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
