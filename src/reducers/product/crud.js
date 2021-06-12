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

const Crud = {
    [fullfilled(Actions.GET_PENDING_PRODUCTS)]: getPendingProductsFullfilled,
    [fullfilled(Actions.GET_REPORTED_PRODUCTS)]: getReportedProductsFullfilled
}

export default Crud