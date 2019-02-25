import { ACTION } from '../constants/action.constant';

const initialState = {
    id: null,
    name: "",
    description: ""
}
export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.VIEW_ITEM:
            if (action.payload) {
                state = {
                    ...state,
                    ...action.payload
                }
            } else {
                // fecthedData.data = action.payload.message;
            }
            return state;
        
        default:
    }
    return state
}
