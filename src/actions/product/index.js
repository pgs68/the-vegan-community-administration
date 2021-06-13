import {
    TypeActionsCrud,
    getPendingProducts,
    getReportedProducts,
    getReportedComments,
    deleteCommentReport,
    getReportedProduct,
    getReviewProduct,
    deleteProduct,
    editProduct
} from './crud'

const Actions = {
    ...TypeActionsCrud
}

export {
    Actions,
    getPendingProducts,
    getReportedProducts,
    getReportedComments,
    deleteCommentReport,
    getReportedProduct,
    getReviewProduct,
    deleteProduct,
    editProduct
}