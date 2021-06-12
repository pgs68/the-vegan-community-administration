import {
    TypeActionsCrud,
    getPendingProducts,
    getReportedProducts,
    getReportedComments,
    deleteCommentReport
} from './crud'

const Actions = {
    ...TypeActionsCrud
}

export {
    Actions,
    getPendingProducts,
    getReportedProducts,
    getReportedComments,
    deleteCommentReport
}