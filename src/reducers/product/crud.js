import { Actions } from '../../actions/product'
import { fullfilled, rejected, pending } from '../utils'

const getPendingProductsFullfilled = (state, { payload }) => {
    var productos = []
    if(payload.docs.length){
        payload.docs.forEach((doc) => {
            var producto = doc.data()
            productos.push({...producto, id: doc.id})
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
            productos.push({...producto, id: doc.id})
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
            comentarios.push({...comentario, id: doc.id})
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

const getReportedProductFullfilled = (state, { payload }) => {
    var producto = payload.data()
    return {
        ...state,
        reportedProduct: producto
    }
}

const getReviewProductFullfilled = (state, { payload }) => {
    var producto = payload.data()
    return {
        ...state,
        reviewProduct: producto
    }
}

const getCommentsFromReportedProductFullfilled = (state, { payload }) => {
    var comentarios = []
    if(payload.docs.length){
        payload.docs.forEach((doc) => {
            var comentario = doc.data()
            comentarios.push({...comentario, id: doc.id})
        })
    }
    return {
        ...state,
        reportedProduct: {
            ...state.reportedProduct,
            comentarios: comentarios
        }
    }
}

const getReportsFromProductFullfilled = (state, { payload }) => {
    var reportes = []
    if(payload.docs.length){
        payload.docs.forEach((doc) => {
            var reporte = doc.data()
            reportes.push({...reporte, id: doc.id})
        })
    }
    return {
        ...state,
        reportedProduct: {
            ...state.reportedProduct,
            reportes: reportes
        }
    }
}

const Crud = {
    [fullfilled(Actions.GET_PENDING_PRODUCTS)]: getPendingProductsFullfilled,
    [fullfilled(Actions.GET_REPORTED_PRODUCTS)]: getReportedProductsFullfilled,
    [fullfilled(Actions.GET_REPORTED_COMMENTS)]: getReportedCommentsFullfilled,
    [fullfilled(Actions.GET_REPORTED_PRODUCT)]: getReportedProductFullfilled,
    [fullfilled(Actions.GET_REVIEW_PRODUCT)]: getReviewProductFullfilled,
    [fullfilled(Actions.GET_COMMENTS_FROM_REPORTED_PRODUCT)]: getCommentsFromReportedProductFullfilled,
    [fullfilled(Actions.GET_REPORTS_FROM_PRODUCT)]: getReportsFromProductFullfilled
}

export default Crud