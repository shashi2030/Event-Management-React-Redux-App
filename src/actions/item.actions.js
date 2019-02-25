import {itemActions} from '../services/item.actions';
import {ACTION} from '../constants/action.constant';

export const setItemList = (data) =>{
    return{
        type:ACTION.ITEM_LIST,
        payload:data
    }
}
export const fetchDataFailed = (error) =>{
    return{
        type:ACTION.FETCH_DATA_FAILED
    }
}
export const itemList = data =>{    
    return dispatch =>{
        itemActions.listItem(data)
            .then(response => {
                dispatch(setItemList(response))
            })
            .catch(error => {
                dispatch(fetchDataFailed())
            });
    }
}

/* delete item */
export const deleteItemResult= (id) =>{
    return{
        type:ACTION.DELETE_ITEM,
        itemId:id
    }
}
export const deleteItem = id =>{
    return dispatch =>{
        itemActions.deleteItem(id)
        .then(response => {
            dispatch(deleteItemResult(id))
        })
        .catch(error => {
           //dispatch(fetchDataFailed())
        });
    }
}

export const deleteItemPopup = (id,index)=>{
    return{
        type:ACTION.ITEM_POPUP_OPEN,
        confirmDeleteId:id
    }
}

export const closeModal = () =>{
    return{
        type:ACTION.CLOSE_MODAL
    }
}

export const closeAlert = () =>{
    return{
        type:ACTION.CLOSE_ALERT
    }
}

export const nextpageclicked =(data,id)=>{
    return{
        type:ACTION.NEXT_PAGE,
        currentId:id,
        payload:data
    }
}
export const nextPage = (id,countPerpage) =>{
    let data = {
        pageNo: id,
        pageLimit: countPerpage
    }
    return dispatch =>{
        itemActions.listItem(data)
            .then(response => {
                dispatch(nextpageclicked(response,id))
            })
            .catch(error => {
                dispatch(fetchDataFailed())
            });
    }    
}
export const prevpageclicked =(data,id)=>{
    return{
        type:ACTION.PREV_PAGE,
        currentId:id,
        payload:data
    }
}
export const prevPage = (id,countPerpage) =>{
    let data = {
        pageNo: id,
        pageLimit: countPerpage
    }
    return dispatch =>{
        itemActions.listItem(data)
            .then(response => {
                dispatch(prevpageclicked(response,id))
            })
            .catch(error => {
                dispatch(fetchDataFailed())
            });
    }    
}

export const pagingclicked =(data,id)=>{
    return{
        type:ACTION.PAGING_CLICK,
        currentId:id,
        payload:data
    }
}
export const pagingClick = (id,countPerpage) =>{
    let data = {
        pageNo: id,
        pageLimit: countPerpage
    }
    return dispatch =>{
        itemActions.listItem(data)
            .then(response => {
                dispatch(pagingclicked(response,id))
            })
            .catch(error => {
                dispatch(fetchDataFailed())
            });
    }    
}

/* get items */
export const viewItemData = (data) =>{
    return{
        type:ACTION.VIEW_ITEM,
        payload:data
    }
}
export const getItem = (id) =>{
    return dispatch =>{
        itemActions.viewItem(id)
            .then(response => {
                dispatch(viewItemData(response.data))
            })
            .catch(error => {
                dispatch(fetchDataFailed())
            });
    }   
}

export const edititemdata = (data) =>{
    return{
        type:ACTION.EDIT_ITEM,
        payload:data
    }
}

/* edit items */
export const editItem = (id, itemdata) =>{
    return dispatch =>{
        itemActions.editItem(id, itemdata)
            .then(response => {
                console.log(response)
                dispatch(edititemdata(itemdata))
            })
            .catch(error => {
                dispatch(fetchDataFailed())
            });
    }   
}


