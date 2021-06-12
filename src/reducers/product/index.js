import Crud from './crud'

const initialState = {
    productosPendientes: [],
    productosReportados: [],
    error: false
}

const Managers = {
    ...Crud
}

export default (state = initialState, action = { type: '' }) => {
    const finded = Managers[action.type]
    return finded ? finded(state, action) : { ...state }
}