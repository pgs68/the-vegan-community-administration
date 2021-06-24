import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    deleteProduct,
    deleteCommentFromProduct,
    deleteReportFromProduct,
    editProduct
} from '../../actions/product'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';


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
        flexDirection: 'column',
        justifyContent: 'center'
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
    },
    tabsContainer: {
        flexGrow: 1,
    },
    commentInfo: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    comentario: {
        fontStyle: 'italic'
    },
}));


const ReportedProduct = ({
    reportedProduct,
    deleteProduct,
    deleteCommentFromProduct,
    deleteReportFromProduct,
    editProduct
}) => {
    const classes = useStyles();
    const history = useHistory();
    const [supermarketsText, setSupermarketText] = useState('')
    const [tab, setTab] = useState(-1);
    const [product, setProduct] = useState(reportedProduct)

    useEffect(() => {
        var text = ''
        product !== null && product.supermercados.map(s => 
        {
            if(product.supermercados.indexOf(s) === (product.supermercados.length - 1)){
                text += s
            } else {
                text += (s + ', ')
            }
        })  && setSupermarketText(text)
        setProduct(reportedProduct)
    }, [reportedProduct])

    async function clickDeleteProduct(idProduct){
        await deleteProduct(idProduct)
        history.push('')
    }
    
    async function clickDeleteComment(idComment){
        await deleteCommentFromProduct(product.codebar, idComment)
        setProduct({...product, comentarios: product.comentarios.filter(c => c.id !== idComment)})
    }

    async function clickDeleteReport(idReport){
        editProduct(product.codebar, {...product, vecesReportado: product.vecesReportado - 1})
        deleteReportFromProduct(idReport)
        setProduct({...product, reportes: product.reportes.filter(r => r.id !== idReport)})
    }

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
      };

    return (
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
                            <div className={classes.column} style={{flexGrow: 1}}>
                                <div className={classes.column} style={{marginLeft: 10, marginRight: 10}}>
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
                                            endIcon={<DeleteIcon />}
                                            onClick={() => {
                                                clickDeleteProduct(product.codebar)
                                                
                                            }}
                                        >Eliminar</Button>
                                    </div>
                                </div>
                                
                                <Paper className={classes.root}>
                                    <Tabs
                                        value={tab}
                                        onChange={handleChangeTab}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        centered
                                    >
                                        <Tab label="Comentarios" />
                                        <Tab label="Reportes" />
                                    </Tabs>
                                </Paper>
                                {
                                    tab === 0 &&
                                    <div className={classes.column} style={{marginLeft: 10, marginRight: 10}}>
                                        {product.comentarios.map(c => {
                                            return (
                                                <>
                                                <div className={classes.row} style={{marginTop: 5, marginBottom: 5}}>
                                                    <div className={classes.commentInfo}>
                                                        <div>
                                                            <Avatar src={c.imagenAutor} />
                                                        </div>
                                                        <div>
                                                            <Typography variant="body2">
                                                                {c.autor}
                                                            </Typography>
                                                            <Typography variant="body2" className={classes.comentario}>
                                                                {c.texto}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Button 
                                                            variant="outlined" 
                                                            style={{marginRight: 5 }} 
                                                            onClick={() => clickDeleteComment(c.id)}
                                                        >
                                                            <DeleteIcon />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <Divider />
                                                </>
                                            )
                                        })}
                                    </div>
                                }
                                {
                                    tab === 1 &&
                                    <div className={classes.column} style={{marginLeft: 10, marginRight: 10}}>
                                        {product.reportes.map(r => {
                                            return (
                                                <>
                                                <div className={classes.row} style={{marginTop: 5, marginBottom: 5, alignItems: 'center'}}>
                                                    <div className={classes.commentInfo}>
                                                        <Typography variant="body2">
                                                            {r.detalles}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Button 
                                                            variant="outlined" 
                                                            style={{marginRight: 5 }} 
                                                            onClick={() => clickDeleteReport(r.id)}
                                                        >
                                                            <DeleteIcon />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <Divider />
                                                </>
                                            )
                                        })}
                                    </div>
                                }
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
    reportedProduct: state.product.reportedProduct
})

const mapDispatchToProps = {
    deleteProduct,
    deleteCommentFromProduct,
    deleteReportFromProduct,
    editProduct
}

const ReportedProductConnected = connect(mapStateToProps, mapDispatchToProps)(ReportedProduct)

export default ReportedProductConnected
export { ReportedProduct }