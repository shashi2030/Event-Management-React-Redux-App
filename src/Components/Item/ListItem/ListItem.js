/**
 * Summary : Edit Item
 * Description: Edit Item
 * @link: /edititem
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { Layout } from '../../Common/Layout/Layout';
import Grid from '../../Common/Grid/Grid';
import BreadCrumb from '../../Common/Breadcrumb/Breadcrumb';
import { AlertBox } from '../../Common/AlertBox/AlertBox';
import { connect } from 'react-redux';
import * as actionItem  from '../../../actions/item.actions';
/**
 * Define Constant of Table column Definition
 */
const colDef = {
    "id": { "label": "ID", 'sort': false, "display": true },
    "name": { "label": "Item Name", 'sort': true, "display": true },
    "description": { "label": "Description", 'sort': true, "display": true },
    "options": {
        "label": "Options", "class": "options", 'sort': true, "display": true, "list": [
            { "action": "view", "label": "View" },
            { "action": "edit", "label": "Edit" },
            { "action": "delete", "label": "Delete" }
        ]
    }
}

/**
 * @name ListItem
 * @extends React.Component
 */
class ListItem extends Component {    
    /**
     * Description: Call itemAPICall function for fetch all item list data
     * @param  {null}
     * @return {null}
     */
    componentDidMount() {
        this.itemAPICall();
    }

    /**
     * Description: itemAPICall function to fetch all item data based on parameter
     * @param  {null}
     * @return {null}
     */
    itemAPICall = () => {
        let data = {
            pageNo: this.props.listitem.currentPage,
            pageLimit: this.props.listitem.countPerPage
        }
        this.props.actionItemlist(data);
    }

    /**
     * Description: Click on Pagination Get the API call for the particular page number data
     * @param  {event} e
     * @return {null}
     */
    pageClick = (e) => {
        this.props.pagingClick(e.target.id,this.props.listitem.countPerPage)
        //this.itemAPICall();
    }

    prevPageClicked = () => {
        console.log(this.props.listitem.countPerPage);
        this.props.prevPage(this.props.listitem.currentPage-1,this.props.listitem.countPerPage)
    }
    nextPageClicked = () => {
        this.props.nextPage(this.props.listitem.currentPage+1,this.props.listitem.countPerPage)
    }

    

    /**
    * Description: Call action function based on click of action button 
    * @param {number} id
    * @param {string} action
    * @param {number} index
    * @return {null}
    */
    actionType = (id, action, index) => {
        switch (action) {
            case 'delete':
            this.props.deleteItemPopup(id,index);
                break;
            case 'edit':
            this.props.history.push('/edititem/' + id);
                break;
            case 'view':
            this.props.history.push('/viewitem/' + id);;
                break;
            default:
        }
    }

    /**
     * Description: Go to the Create Item Page
     * @param {null}
     * @return {null}
     */
    createItem = () => {
        this.props.history.push('/createitem');
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const breadcrumbdata = [
            {
                "id": "home",
                "active": false,
                "label": "Home",
                "link": true,
                "href": "/home"
            },
            {
                "id": "listitem",
                "active": false,
                "label": "Item List",
                "link": false
            }
        ];
        return (

            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>Item List</h1>
                <AlertBox isOpen={this.props.listitem.alertVisible} toggle={this.onDismiss} closeAlert={this.props.closeAlert} message={this.props.listitem.alertMessage} />
                <div className="button-row text-right">
                    <Button type="button" onClick={this.createItem} color="primary">Create Item</Button>
                </div>
                <div className="table-grid">
                    <Grid
                        data={this.props.listitem.itemData}
                        colDef={colDef}
                        currentPage={this.props.listitem.currentPage}
                        countPerPage={this.props.listitem.countPerPage}
                        pagingClick={this.pageClick}
                        totalDataCount={this.props.listitem.totalListData}
                        nextPage={this.nextPageClicked}
                        prevPage={this.prevPageClicked}
                        actionType={this.actionType}
                    />
                </div>
                <Modal isOpen={this.props.listitem.modal} toggle={this.toggle} className="modal-dialog modal-dialog-centered">
                    <ModalHeader toggle={this.toggle}>Do you want to delete</ModalHeader>
                    <ModalFooter className="text-center">
                        <Button color="danger" onClick={()=>this.props.deleteItem(this.props.listitem.confirmDeleteId)}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.props.closeModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Layout>
        )
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {
        listitem: state.itemReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        actionItemlist: (data) => dispatch(actionItem.itemList(data)),
        deleteItemPopup:(id,index)=>dispatch(actionItem.deleteItemPopup(id,index)),
        deleteItem:(id)=>dispatch(actionItem.deleteItem(id)),
        closeModal:()=>dispatch(actionItem.closeModal()),
        closeAlert:()=>dispatch(actionItem.closeAlert()),
        nextPage:(id,countPerpage)=>dispatch(actionItem.nextPage(id,countPerpage)),
        prevPage:(id,countPerpage)=>dispatch(actionItem.prevPage(id,countPerpage)),
        pagingClick:(id,countPerpage)=>dispatch(actionItem.pagingClick(id,countPerpage))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);