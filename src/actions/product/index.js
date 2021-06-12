import {
    TypeActionsCrud,
    getPendingProducts,
    getReportedProducts
} from './crud'

const Actions = {
    ...TypeActionsCrud
}

export {
    Actions,
    getPendingProducts,
    getReportedProducts
}