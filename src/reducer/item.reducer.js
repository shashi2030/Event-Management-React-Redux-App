import { ACTION } from '../constants/action.constant';

const initialState = {
    data: "",
    currentPage: 1,
    countPerPage: 5,
    confirmDeleteId: null,
    alertMessage: "",
    alertVisible: false,
    modal: false,
    totalListData: null
}
export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.ITEM_LIST:
            if (action.payload) {
                state = {
                    ...state,
                    totalListData: parseInt(action.payload.headers['x-total-count']),
                    itemData: action.payload.data
                }
            } else {
                // fecthedData.data = action.payload.message;
            }
            return state;
        case ACTION.ITEM_POPUP_OPEN:
            state = {
                ...state,
                modal: true,
                alertMessage: "",
                alertVisible: false,
                confirmDeleteId: action.confirmDeleteId
            }
            return state;
        case ACTION.DELETE_ITEM:
            let itemData = [...state.itemData];
            itemData.splice(getItemIndex(state.itemData, action.itemId), 1);
            if (itemData.length === 0) {
                console.log('no data');
            }
            state = {
                ...state,
                modal: false,
                alertMessage: "Delete Item Successfully",
                alertVisible: true,
                itemData: [...itemData]
            }
            return state;
        case ACTION.CLOSE_MODAL:
            state = {
                ...state,
                modal: false
            }
            return state;
        case ACTION.CLOSE_ALERT:
            state = {
                ...state,
                alertVisible: false
            }
            return state;
        case ACTION.NEXT_PAGE:
        state = {
            ...state,
            currentPage: state.currentPage + 1,
            itemData: action.payload.data
        }
            return state;

        case ACTION.PREV_PAGE:
            state = {
                ...state,
                currentPage: state.currentPage - 1,
                itemData: action.payload.data
            }
            return state;
        case ACTION.PAGING_CLICK:
            state = {
                ...state,
                currentPage: action.currentId,
                itemData: action.payload.data
            }
            return state;
        default:
    }
    return state
}


const getItemIndex = (items, id) => {
    return items.findIndex(item => {
        return id === item.id
    })
}
