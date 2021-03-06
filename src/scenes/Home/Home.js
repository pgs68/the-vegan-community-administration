import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { 
    getPendingProducts, 
    getReportedProducts, 
    getReviewProduct, 
    getReportedProduct, 
    deleteProduct, 
    getCommentsFromReportedProduct,
    getReportsFromProduct 
} from '../../actions/product'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorIcon from '@material-ui/icons/Error';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(() => ({
    root:{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
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
    productCard: {
        marginBottom: 10,
        width: 650
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

const Home = ({
    getPendingProducts,
    getReportedProducts,
    productosPendientes,
    productosReportados,
    getReviewProduct,
    getReportedProduct,
    getCommentsFromReportedProduct,
    getReportsFromProduct,
    deleteProduct
}) => {
    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        getPendingProducts()
        getReportedProducts()
    }, [])

    async function clickDeleteProduct(idProduct){
        await deleteProduct(idProduct)
        getPendingProducts()
        getReportedProducts()
    }

    async function clickReportedProduct(idProduct){
        await getReportedProduct(idProduct)
        await getCommentsFromReportedProduct(idProduct)
        await getReportsFromProduct(idProduct)
        history.push('reportedProduct')
    }
    return (
        <div className={classes.root}>
            <div className={classes.column}>
                <Typography variant="h5" className={classes.title}>
                    Productos pendientes de revisi??n
                </Typography>
                <div className={classes.list}>
                    {
                        productosPendientes.map(p => {
                            var supermarketsText = ''
                            p.supermercados.map(s => {
                                if(p.supermercados.indexOf(s) === (p.supermercados.length - 1)){
                                    supermarketsText += s
                                } else {
                                    supermarketsText += (s + ', ')
                                }
                            })
                            return (
                                <Card className={classes.productCard}>
                                    <div className={classes.row}>
                                        <img src={p.fotoPrincipal} style={{ width: 200 }}/>
                                        <CardContent>
                                            <Typography component="h6" variant="h6">
                                                {p.nombre}
                                            </Typography>
                                            <Typography variant="body2">
                                                {supermarketsText}
                                            </Typography>
                                            <Typography variant="body2">
                                                {p.precio}???
                                            </Typography>
                                            <div className="buttonsProductCard">
                                                <Button 
                                                    variant="outlined" 
                                                    onClick={() => {
                                                        getReviewProduct(p.id)
                                                        history.push('reviewProduct')
                                                    }}
                                                >Ver detalles</Button>
                                                <Button 
                                                    variant="outlined" 
                                                    endIcon={<DeleteIcon />}
                                                    onClick={() => {
                                                        clickDeleteProduct(p.id)
                                                        
                                                    }}
                                                >Eliminar</Button>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
                <Typography variant="h5" className={classes.title}>
                    Productos reportados
                </Typography>
                <div className={classes.list}>
                    {
                        productosReportados.map(p => {
                            console.log(p)
                            var supermarketsText = ''
                            p.supermercados.map(s => {
                                if(p.supermercados.indexOf(s) === (p.supermercados.length - 1)){
                                    supermarketsText += s
                                } else {
                                    supermarketsText += (s + ', ')
                                }
                            })
                            return (
                                <Card className={classes.productCard}>
                                    <div className={classes.row}>
                                        <img src={p.fotoPrincipal} style={{ width: 200 }}/>
                                        <CardContent>
                                            <Typography component="h6" variant="h6">
                                                {p.nombre}
                                            </Typography>
                                            <Typography variant="body2">
                                                {supermarketsText}
                                            </Typography>
                                            <Typography variant="body2">
                                                {p.precio}???
                                            </Typography>
                                            <div className={classes.numReportsRow}>
                                                <ErrorIcon fontSize="small" />
                                                <Typography variant="body1">
                                                    {p.vecesReportado} reportes
                                                </Typography>
                                            </div>
                                            
                                            <div className="buttonsProductCard">
                                                <Button 
                                                    variant="outlined"
                                                    onClick={() => {
                                                        clickReportedProduct(p.id)
                                                    }}
                                                >Ver detalles</Button>
                                                <Button 
                                                    variant="outlined" 
                                                    endIcon={<DeleteIcon />}
                                                    onClick={() => {
                                                        clickDeleteProduct(p.id)
                                                        
                                                    }}
                                                >Eliminar</Button>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    productosPendientes: state.product.productosPendientes,
    productosReportados: state.product.productosReportados
})

const mapDispatchToProps = {
    getPendingProducts,
    getReportedProducts,
    getReviewProduct,
    getReportedProduct,
    deleteProduct,
    getCommentsFromReportedProduct,
    getReportsFromProduct,
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeConnected
export { Home }