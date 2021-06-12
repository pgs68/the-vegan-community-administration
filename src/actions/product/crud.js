import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const TypeActionsCrud = {
    GET_PENDING_PRODUCTS: 'GET_PENDING_PRODUCTS',
    GET_REPORTED_PRODUCTS: 'GET_REPORTED_PRODUCTS',
    GET_REPORTED_COMMENTS: 'GET_REPORTED_COMMENTS'
}

const getPendingProducts = () => ({
    type: TypeActionsCrud.GET_PENDING_PRODUCTS,
    payload: firebase.firestore().collection("productos").where('estado', '==', 'pendienteRevision').get()
})

const getReportedProducts = () => ({
    type: TypeActionsCrud.GET_REPORTED_PRODUCTS,
    payload: firebase.firestore().collection("productos").where('reportado', '==', true).get()
})

const getReportedComments = () => ({
    type: TypeActionsCrud.GET_REPORTED_COMMENTS,
    payload: firebase.firestore().collection("reportes").where('tipo', '==', 'comentario').get()
})

export {
    TypeActionsCrud,
    getPendingProducts,
    getReportedProducts,
    getReportedComments
}