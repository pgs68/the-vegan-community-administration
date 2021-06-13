import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(() => ({
    root:{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
    },
    productCard: {
        marginBottom: 10,
        width: 850
    },
    row:{
        display: 'flex',
        flexDirection: 'row'
    },
    column:{
        display: 'flex',
        flexDirection: 'column'
    },
    title:{
        textAlign: 'center',
        marginBottom: 15
    },
    form: {
        width: 400,
        margin: 10,
    },
    list: {
        width: 500
    },
    buttonsProductCard: {
        display: 'flex',
        flexDirection: 'row'
    },
    numReportsRow: {
        display: 'flex',
        alignItems: 'center'
    }
}));

const ReviewProduct = ({
    product
}) => {
    const classes = useStyles();
    var supermarketsText = ''
    product.supermercados.map(s => {
        if(product.supermercados.indexOf(s) === (product.supermercados.length - 1)){
            supermarketsText += s
        } else {
            supermarketsText += (s + ', ')
        }
    })
    return(
        <div className={classes.root}>
            <div className={classes.column}>
                <Card className={classes.productCard}>
                    {
                        product !== null && (
                            <div className={classes.row}>
                            <div className={classes.column}>
                                <img src={product.fotoPrincipal} style={{ width: 400 }}/>
                                <img src={product.detalles.fotoIngredientes} style={{ width: 400 }}/>
                            </div>
                            <div className={classes.column} style={{marginLeft: 10}}>
                                <Typography component="h5" variant="h5">
                                    {product.nombre}
                                </Typography>
                                <Divider />
                                <Typography variant="body2">
                                    Supermercados: {supermarketsText}
                                </Typography>
                                <Typography variant="body2">
                                    Precio: {product.precio}€
                                </Typography>
                                <Typography variant="body2">
                                    Categoria: {product.vegano ? 'Vegano': 'Vegetariano'}
                                </Typography>
                                <div>
                                    <Button
                                        variant="outlined"
                                        endIcon={<CheckIcon />}
                                    >
                                        Aceptar
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        endIcon={<CloseIcon />} 
                                    >
                                        Rechazar
                                    </Button>
                                </div>
                            </div>
                    </div>
                        )
                    }
                    
                </Card>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    product: state.product.reviewProduct
})

const mapDispatchToProps = {

}

const ReviewProductConnected = connect(mapStateToProps, mapDispatchToProps)(ReviewProduct)

export default ReviewProductConnected
export { ReviewProduct }