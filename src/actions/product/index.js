import {
    TypeActionsCrud,
    getPendingProducts,
    getReportedProducts,
    getReportedComments
} from './crud'

const Actions = {
    ...TypeActionsCrud
}

export {
    Actions,
    getPendingProducts,
    getReportedProducts,
    getReportedComments
}