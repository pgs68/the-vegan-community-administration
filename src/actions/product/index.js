import {
    TypeActionsCrud,
    getPendingProducts,
    getReportedProducts,
    getReportedComments,
    deleteCommentReport,
    getReportedProduct,
    getReviewProduct,
    deleteProduct,
    editProduct,
    getCommentsFromReportedProduct,
    getReportsFromProduct,
    deleteCommentFromProduct,
    deleteReportFromProduct
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
    editProduct,
    getCommentsFromReportedProduct,
    getReportsFromProduct,
    deleteCommentFromProduct,
    deleteReportFromProduct
}