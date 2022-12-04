import { Switch, Route, useRouteMatch } from "react-router-dom";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Button } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import ArticleIcon from "@mui/icons-material/Article";
import { Installer } from "./Installer";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";

const drawerWidth = 240;

const lightMode = createTheme({
  palette: {
    primary: {
      main: "#43a047",
      color: "#000000",
      bg: "#FFFFFF",
      bgtotal: "#FFFFFF",
      text: "#000000",
      textPrimary: "#898989",
      fondoInputs: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    },
  },
});

const darkMode = createTheme({
  palette: {
    primary: {
      main: "#43a047",
      color: "#FFFFFF",
      bg: "#363636",
      bgtotal: "#787878",
      text: "#FFFFFF",
      textPrimary: "#cccccc",
      fondoInputs: "#333333",
      input: {
        "&::placeholder": {
          color: "red",
        },
      },
    },
    secondary: {
      main: "#000000",
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 220,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleDark = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 220,
  bgcolor: "#363636 !important",
  color: "white !important",
  boxShadow: 24,
  p: 4,
};

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 220,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleModalDark = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 220,
  bgcolor: "#363636 !important",
  color: "white !important",
  boxShadow: 24,
  p: 4,
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const InstallMenu = () => {
  var filename = "C:/Install/Chain/";

  let { path } = useRouteMatch();
  const [modoDev, setModoDev] = React.useState(false);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const [openModalDev, setOpenModalDev] = React.useState(false);
  const handleDevClose = () => setOpenModalDev(false);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setModoDev(false);
  };

  const [openAbout, setOpenAbout] = React.useState(false);
  const handleOpenAbout = () => setOpenAbout(true);
  const handleCloseAbout = () => setOpenAbout(false);

  const [colorMode, setColorMode] = React.useState(true);

  const modoDesarrollador = () => {
    var password = document.getElementById("password").value;
    if (password === "ncrPS12345") {
      document.getElementById("msg-error").style.visibility = "hidden";
      if (!modoDev) {
        setOpenModalDev(true);
        setOpenModal(false);
      } else {
        setOpenModal(false);
        Swal.fire({
          title: "Error!",
          text: "Ya existe una configuracion previa.",
          icon: "error",
          confirmButtonText: "Volver",
          customClass: {
            popup: colorMode ? '' : "swal-fire-dark-content",
            title: colorMode ? '' : "swal-fire-dark-text",
            htmlContainer: colorMode ? '' : "swal-fire-dark-text",
          }
        });
      }
    } else {
      document.getElementById("msg-error").style.visibility = "visible";
    }
  };

  const seteoModoDev = () => {
    setOpenModalDev(false);
    var arraySeteoModoDev = [];
    var sinDominioBanelco = document.getElementById("sin-dominio-banelco")
      .checked
      ? "sinDominio"
      : "";
    var sinAOT = document.getElementById("sin-aot").checked ? "sinAOT" : "";
    var sinAppBanelco = document.getElementById("sin-app-banelco").checked
      ? "noAppBanelco"
      : "";
    arraySeteoModoDev = [
      sinDominioBanelco,
      sinAOT,
      sinAppBanelco,
    ];
    Swal.fire({
      title: "Estas seguro?",
      text: "No podra revertir los cambios de esta configuracion luego.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      customClass: {
        popup: colorMode ? '' : "swal-fire-dark-content",
        title: colorMode ? '' : "swal-fire-dark-text",
        htmlContainer: colorMode ? '' : "swal-fire-dark-text",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Configurado!",
          text: "Su seteo se ha realizado correctamente.",
          icon: "success",
          customClass: {
            popup: colorMode ? '' : "swal-fire-dark-content",
            title: colorMode ? '' : "swal-fire-dark-text",
            htmlContainer: colorMode ? '' : "swal-fire-dark-text",
          }
        });
        confirmarConfigDev(arraySeteoModoDev);
      } else {
        return;
      }
    });
  };

  const confirmarConfigDev = (arrayDev) => {
    arrayDev.forEach((element) => {
      if (element !== "") {
        crearTXT(filename + element + ".txt");
      }
    });

    setModoDev(true);
  };

  const crearTXT = (txtACrear) => {
    console.log("entre en crearTXT");
    window.electron.crearFile(txtACrear);
  };

  return (
    <ThemeProvider theme={colorMode ? lightMode : darkMode}>
      <div className="grey">
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Menu Instalador ATM
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem disabled={false} button onClick={handleOpenAbout}>
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary="Sobre NCR" />
              </ListItem>
              <ListItem disabled={false} button onClick={handleOpenModal}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Menu de Desarrollo" />
              </ListItem>
              <ListItem
                disabled={false}
                button
                onClick={() => setColorMode(!colorMode)}
              >
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary="Modo Color" />
              </ListItem>
              <Modal
                className="rounded"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openModal}>
                  <Box sx={colorMode ? style : styleDark} className="rounded-lg">
                    <div className="d-flex flex-column">
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Desarrollador
                      </Typography>
                      <TextField
                        id="password"
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        className="mt-3"
                        InputLabelProps={
                          colorMode
                            ? { className: "darkMode", shrink: true }
                            : { className: "lightMode", shrink: true }
                        }
                        inputProps={
                          colorMode
                            ? { className: "darkMode" }
                            : { className: "lightMode" }
                        }
                      ></TextField>
                      <div className="error" id="msg-error">
                        La contraseña ingresada no es valida.
                      </div>
                      <Button
                        variant="contained"
                        className="w30 mt-2"
                        onClick={modoDesarrollador}
                      >
                        Siguiente
                      </Button>
                    </div>
                  </Box>
                </Fade>
              </Modal>
              <Modal
                className="rounded"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openAbout}
                onClose={handleCloseAbout}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openAbout}>
                  <Box sx={colorMode ? style : styleDark} className="rounded-lg">
                    <div className="d-flex flex-column">
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Sobre NCR
                      </Typography>
                      <Divider />
                      <Typography sx={{ margin: "20px" }}>
                        Este instalador fue hecho por NCR, su uso o distribucion
                        debe ser autorizado. Desarrollado e implementado por PS
                        Arg.
                      </Typography>
                    </div>
                  </Box>
                </Fade>
              </Modal>

              {/************************************************* MODAL DEV *****************************************************/}

              <Modal
                className="rounded"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalDev}
                onClose={handleDevClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openModalDev}>
                  <Box sx={colorMode ? styleModal : styleModalDark} className="rounded-lg">
                    <div className="d-flex flex-column">
                      <FormGroup>
                        <div className="d-flex wrap">
                          <div className="w-50">
                            <FormControlLabel
                              control={<Checkbox id="sin-dominio-banelco" style={{color: colorMode ? "" : "white"}}/>}
                              label="Sin Ingresar a dominio (Banelco)"
                            />
                            <FormControlLabel
                              control={<Checkbox id="sin-aot" style={{color: colorMode ? "" : "white"}}/>}
                              label="Instalar sin AOT"
                            />
                          </div>
                          <div className="w-50">
                            <FormControlLabel
                              control={<Checkbox id="sin-app-banelco" style={{color: colorMode ? "" : "white"}}/>}
                              label="Sin Apps Banelco"
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <Button
                        variant="contained"
                        className="w30 mt-2"
                        onClick={seteoModoDev}
                      >
                        Confirmar
                      </Button>
                    </div>
                  </Box>
                </Fade>
              </Modal>
            </List>
            <Divider />
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, bgcolor: "primary.bgtotal" }}
          >
            <DrawerHeader />
            <Switch>
              <Route path={path} exact>
                <Box
                  className="fondo"
                  id="box-contenedor"
                  sx={{
                    bgcolor: "primary.bg",
                    text: "primary.text",
                  }}
                >
                  <Installer tema={colorMode}></Installer>
                </Box>
              </Route>
              <Route path={`${path}/about`}>
                <Typography>Modal de Informacion</Typography>
              </Route>
              <Route path={`${path}/development`}>
                <Typography>Menu de desarrollador</Typography>
              </Route>
            </Switch>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};
export default InstallMenu;
