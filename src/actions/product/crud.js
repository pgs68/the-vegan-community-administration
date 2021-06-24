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
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    EDIT_PRODUCT: 'EDIT_PRODUCT',
    GET_COMMENTS_FROM_REPORTED_PRODUCT: 'GET_COMMENTS_FROM_REPORTED_PRODUCT',
    GET_REPORTS_FROM_PRODUCT: 'GET_REPORTS_FROM_PRODUCT',
    DELETE_COMMENT_FROM_PRODUCT: 'DELETE_COMMENT_FROM_PRODUCT',
    DELETE_REPORT_FROM_PRODUCT: 'DELETE_REPORT_FROM_PRODUCT'
}

const getPendingProducts = () => ({
    type: TypeActionsCrud.GET_PENDING_PRODUCTS,
    payload: firebase.firestore().collection("productos").where('estado', '==', 'pendienteRevision').get()
})

const getReportedProducts = () => ({
    type: TypeActionsCrud.GET_REPORTED_PRODUCTS,
    payload: firebase.firestore().collection("productos").where('vecesReportado', '>', 0).get()
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

const editProduct = (idProduct, product) => {
    var newProduct = product
    delete newProduct['reportes']
    delete newProduct['comentarios']
    return {
        type: TypeActionsCrud.EDIT_PRODUCT,
        payload: firebase.firestore().collection("productos").doc(idProduct).set(newProduct)
    }
}
    

const getCommentsFromReportedProduct = (codebar) => ({
    type: TypeActionsCrud.GET_COMMENTS_FROM_REPORTED_PRODUCT,
    payload: firebase.firestore().collection("productos/" + codebar + "/comentarios").get()
})

const getReportsFromProduct = (codebar) => ({
    type: TypeActionsCrud.GET_REPORTS_FROM_PRODUCT,
    payload: firebase.firestore().collection("reportes").where("producto", "==", codebar).get()
})

const deleteCommentFromProduct = (idProduct, idComment) => ({
    type: TypeActionsCrud.DELETE_COMMENT_FROM_PRODUCT,
    payload: firebase.firestore().collection("productos/" + idProduct + "/comentarios").doc(idComment).delete()
})

const deleteReportFromProduct = (idReport) => ({
    type: TypeActionsCrud.DELETE_REPORT_FROM_PRODUCT,
    payload: firebase.firestore().collection("reportes").doc(idReport).delete()
})

export {
    TypeActionsCrud,
    getPendingProducts,
    getReportedProducts,
    getReportedComments,
    deleteCommentReport,
    getReportedProduct,
    getReviewProduct,
    deleteProduct,
    getCommentsFromReportedProduct,
    getReportsFromProduct,
    editProduct,
    deleteCommentFromProduct,
    deleteReportFromProduct
}