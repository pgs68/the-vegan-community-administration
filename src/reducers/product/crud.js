import { Actions } from '../../actions/product'
import { fullfilled, rejected, pending } from '../utils'

const getPendingProductsFullfilled = (state, { payload }) => {
    var productos = []
    if(payload.docs.length){
        payload.docs.forEach((doc) => {
            var producto = doc.data()
            productos.push(producto)
        })
        return {
            ...state,
            productosPendientes: productos
        }
    } else {
        return {
            ...state,
            error: payload
        }
    }
}

const getReportedProductsFullfilled = (state, { payload }) => {
    var productos = []
    if(payload.docs.length){
        payload.docs.forEach((doc) => {
            var producto = doc.data()
            productos.push(producto)
        })
        return {
            ...state,
            productosReportados: productos
        }
    } else {
        return {
            ...state,
            error: payload
        }
    }
}

const getReportedCommentsFullfilled = (state, { payload }) => {
    var comentarios = []
    if(payload.docs.length){
        payload.docs.forEach((doc) => {
            var comentario = doc.data()
            comentarios.push(comentario)
        })
        return {
            ...state,
            comentariosReportados: comentarios
        }
    } else {
        return {
            ...state,
            error: payload
        }
    }
}

const Crud = {
    [fullfilled(Actions.GET_PENDING_PRODUCTS)]: getPendingProductsFullfilled,
    [fullfilled(Actions.GET_REPORTED_PRODUCTS)]: getReportedProductsFullfilled,
    [fullfilled(Actions.GET_REPORTED_COMMENTS)]: getReportedCommentsFullfilled
}

export default Crud