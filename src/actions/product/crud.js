import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const TypeActionsCrud = {
    GET_PENDING_PRODUCTS: 'GET_PENDING_PRODUCTS',
    GET_REPORTED_PRODUCTS: 'GET_REPORTED_PRODUCTS',
    GET_REPORTED_COMMENTS: 'GET_REPORTED_COMMENTS',
    DELETE_COMMENT_REPORT: 'DELETE_COMMENT_REPORT',
    GET_REPORTED_PRODUCT: 'GET_REPORTED_PRODUCT',
    GET_REVIEW_PRODUCT: 'GET_REVIEW_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT'
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

const deleteCommentReport = (idReport) => ({
    type: TypeActionsCrud.DELETE_COMMENT_REPORT,
    payload: firebase.firestore().collection("reportes").doc(idReport).delete()
})

const getReportedProduct = (idProduct) => ({
    type: TypeActionsCrud.GET_REPORTED_PRODUCT,
    payload: firebase.firestore().collection("productos").doc(idProduct).get()
})

const getReviewProduct = (idProduct) => ({
    type: TypeActionsCrud.GET_REVIEW_PRODUCT,
    payload: firebase.firestore().collection("productos").doc(idProduct).get()
})

const deleteProduct = (idProduct) => ({
    type: TypeActionsCrud.DELETE_PRODUCT,
    payload: firebase.firestore().collection("productos").doc(idProduct).delete()
})

export {
    TypeActionsCrud,
    getPendingProducts,
    getReportedProducts,
    getReportedComments,
    deleteCommentReport,
    getReportedProduct,
    getReviewProduct,
    deleteProduct
}