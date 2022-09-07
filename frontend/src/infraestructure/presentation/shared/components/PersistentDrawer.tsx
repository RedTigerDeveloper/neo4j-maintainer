import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CategoryIcon from '@mui/icons-material/Category';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { RelationshipForm } from '../../pages/neo4j-maintainer/components/RelationshipForm';
import EntityForm from '../../pages/neo4j-maintainer/components/Neo4jNodeForm';
import { useUiState } from '../../../state/hooks/useUiState';
import { Button, Container, SvgIcon } from '@mui/material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function PersistentDrawer() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [content, setContent] = React.useState('create-node');
  const { dashboardTitle, setDashboardTitle } = useUiState()

  const showContent = (content: string) => (e: any) => {
    if (content === 'create-node') {
      setDashboardTitle('Crear entidad Neo4j')
    } else if (content === 'create-relationship') {
      setDashboardTitle('Crear relación Neo4j')
    } else if (content === 'show-roadmap') {
      setDashboardTitle('Roadmap')
    } else if (content === 'show-config') {
      setDashboardTitle('Configuración')
    } else {
      setDashboardTitle('Developer factory')
    }
    setContent(content)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openNeo4jBrowser = () => {
    window.open('http://localhost:7474/')
  }

  const contentSwitch: any = {
    'create-node': <EntityForm />,
    'create-relationship': <RelationshipForm />,
    'show-roadmap': <div>ROADMAP IS COMING</div>,
    'show-config': <div>Config</div>,
  }

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {dashboardTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={'crear-nodo'} disablePadding onClick={showContent('create-node')} >
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={'Crear Nodo'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'crear-relacion'} disablePadding onClick={showContent('create-relationship')}>
            <ListItemButton>
              <ListItemIcon>
                <DoubleArrowIcon />
              </ListItemIcon>
              <ListItemText primary={'Crear Relación'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'nodos-list'} disablePadding onClick={showContent('show-roadmap')}>
            <ListItemButton>
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary={'Roadmap explorer'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={'config'} disablePadding onClick={showContent('show-config')}>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={'Configuración'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button onClick={() =>openNeo4jBrowser()} size="small" variant="contained" startIcon={<DatabaseIcon />} >ABRIR NEO4J BROWSER</Button>
          </Box>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="md">
          {contentSwitch[content]}
        </Container>
      </Main>
    </Box>
  );
}


function DatabaseIcon({ ...props}) {
  return (
    <SvgIcon  viewBox="0 0 29.26 29.26" {...props}>
      <g>
        <path style={{ fill:"#030104;"}} d="M14.627,15.954c-5.494,0-10.098-1.614-11.355-3.79c-0.221,0.383-0.35,0.781-0.35,1.194v3.561
          c0,2.751,5.242,4.983,11.705,4.983c6.467,0,11.711-2.232,11.711-4.983v-3.561c0-0.413-0.131-0.811-0.354-1.194
          C24.727,14.339,20.127,15.954,14.627,15.954z"/>
        <path style={{ fill:"#030104;"}} d="M14.627,23.31c-5.494,0-10.098-1.616-11.355-3.788c-0.221,0.381-0.35,0.779-0.35,1.191v3.564
          c0,2.752,5.242,4.983,11.705,4.983c6.467,0,11.711-2.23,11.711-4.983v-3.564c0-0.412-0.131-0.81-0.354-1.19
          C24.727,21.694,20.127,23.31,14.627,23.31z"/>
        <path style={{ fill:"#030104;"}} d="M26.018,5.042c-0.23,2.016-5.232,3.629-11.391,3.629c-6.156,0-11.158-1.613-11.387-3.628
          C3.039,5.409,2.922,5.791,2.922,6.184v3.561c0,2.752,5.242,4.983,11.705,4.983c6.467,0,11.711-2.23,11.711-4.983V6.184
          C26.338,5.791,26.219,5.409,26.018,5.042z"/>
        <path style={{ fill:"#030104;"}} d="M14.627,7.541c6.303,0,11.41-1.687,11.41-3.771c0-2.082-5.107-3.77-11.41-3.77
          C8.328,0.001,3.219,1.689,3.219,3.771C3.219,5.854,8.328,7.541,14.627,7.541z"/>
      </g>
    </SvgIcon>
  );
}