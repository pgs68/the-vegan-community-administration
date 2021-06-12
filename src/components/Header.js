import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { logout } from '../common/firebaseFunctions'


const useStyles = makeStyles(() => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const Header = ({
    userLogged,
    userLoggedChange
}) => {
    const classes = useStyles();
    const [openUserOptions, setOpenUserOptions] = useState(false)

    return (
        <>
            <AppBar position="sticky">
                <Toolbar className={classes.toolbar} >
                    <div />
                    <Typography variant="h6"> TheVeganCommunity </Typography>
                    <IconButton edge="end" color="inherit">
                        {userLogged && (
                            <div>
                                <AccountCircle 
                                    onClick={() => setOpenUserOptions(true)}
                                />
                                <Menu
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openUserOptions}
                                    onClose={() => setOpenUserOptions(false)}
                                    
                                >
                                    <MenuItem onClick={() => {
                                        setOpenUserOptions(false)
                                        logout(userLoggedChange)
                                    }}> 
                                        Cerrar sesión 
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header