import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const TypeActionsCrud = {
    GET_PENDING_PRODUCTS: 'GET_PENDING_PRODUCTS',
    GET_REPORTED_PRODUCTS: 'GET_REPORTED_PRODUCTS'
}

const getPendingProducts = () => ({
    type: TypeActionsCrud.GET_PENDING_PRODUCTS,
    payload: firebase.firestore().collection("productos").where('estado', '==', 'pendienteRevision').get()
})

const getReportedProducts = () => ({
    type: TypeActionsCrud.GET_REPORTED_PRODUCTS,
    payload: firebase.firestore().collection("productos").where('reportado', '==', true).get()
})

export {
    TypeActionsCrud,
    getPendingProducts,
    getReportedProducts
}