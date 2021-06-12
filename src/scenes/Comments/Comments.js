import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { getReportedComments, deleteCommentReport } from '../../actions/product'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

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
    list: {
        width: 500
    },
    commentCard: {
        marginBottom: 10,
        width: 650
    },
    comentario: {
        fontStyle: 'italic'
    },
    commentContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 1
    },
    reportInfoBox: {
        border: '1px solid #f78686',
        borderRadius: 7,
        marginTop: 6,
        padding: 10,
        paddingTop: 2
    }
}));

const Comments = ({
    getReportedComments,
    comentarios,
    deleteCommentReport
}) => {
    const classes = useStyles();
    useEffect(() => {
        getReportedComments()
    }, [])

    async function deleteReport(id){
        await deleteCommentReport(id)
        getReportedComments()
    }

    return (
        <div className={classes.root}>
            <div className={classes.column}>
                <Typography variant="h5" className={classes.title}>
                    Comentarios reportados
                </Typography>
                <div className={classes.list}>
                    {
                        comentarios.map(c => {
                            return (
                                <Card className={classes.commentCard}>
                                    <div className={classes.row}>
                                        <CardContent className={classes.commentContent}>
                                            <div>
                                                <Avatar src={c.imagenAutorComentario} />
                                            </div>
                                            <div>
                                                <Typography variant="body2">
                                                    {c.autorComentario}
                                                </Typography>
                                                <Typography variant="body2" className={classes.comentario}>
                                                    {c.comentario}
                                                </Typography>
                                                <div className={classes.reportInfoBox}>
                                                    <Typography variant="body2" style={{ color: '#f78686', fontSize: 12 }}>
                                                        Detalles del reporte
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {c.detalles}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div>
                                                <Button variant="outlined" style={{marginRight: 5 }} onClick={() => deleteReport(c.id)}>Eliminar comentario</Button>
                                                <Button variant="outlined" onClick={() => deleteReport(c.id)}>Eliminar reporte</Button>
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
    comentarios: state.product.comentariosReportados
})

const mapDispatchToProps = {
    getReportedComments,
    deleteCommentReport
}

const CommentsConnected = connect(mapStateToProps, mapDispatchToProps)(Comments)

export default CommentsConnected
export { Comments }