import {
    TypeActionsCrud,
    getPendingProducts,
    getReportedProducts,
    getReportedComments,
    deleteCommentReport,
    getReportedProduct,
    getReviewProduct,
    deleteProduct
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
    deleteProduct
}