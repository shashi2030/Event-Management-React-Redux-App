import React, { Component } from 'react';
import Grid from '../../Common/Grid/Grid';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { userActions } from '../../../services/users.actions';
import { vendorActions } from '../../../services/vendor.actions';
import { itemActions } from '../../../services/item.actions';
require('./eventpopup.css');

/**
 * Define Constant of Table column Definition
 */
const colDefUser = {
    "id": { "label": "ID", 'sort': false, "display": true },
    "username": { "label": "User Name", 'sort': true, "display": true },
    "buildingname": { "label": "Building Name", 'sort': true, "display": true },
    "flatno": { "label": "Flat No", 'sort': true, "display": true }
}

/**
 * Define Constant of Table column Definition
 */
const colDefVendor = {
    "id": { "label": "ID", 'sort': false, "display": true },
    "vendortype": { "label": "Vendor Type", 'sort': true, "display": true },
    "name": { "label": "Vendor Name", 'sort': true, "display": true },
    "contact": { "label": "Contact No.", 'sort': true, "display": true },
    "email": { "label": "Email", 'sort': true, "display": true },
    "items": { "label": "Items", 'sort': true, "display": true },
    "description": { "label": "Description", 'sort': true, "display": true }
}

class EventPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        switch (this.props.type) {
            case 'members':
                this.userAPICall();
                break;
            case 'vendor':
                this.vendorAPICall();
                break;
            default:

        }
    }

    /**
     * Description: userAPICall function to fetch all user data based on parameter
     * @param  {null}
     * @return {null}
     */
    userAPICall = () => {
        let data = {
            filterId: this.createIdString()
        }
        userActions
            .listUser(data)
            .then(response => {
                this.setState({
                    data: response.data,
                    colDef: colDefUser
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * Description: vendorAPICall function to fetch all vendor data based on parameter
     * @param  {null}
     * @return {null}
     */
    vendorAPICall = () => {
        let data = {
            filterId: this.createIdString()
        }
        vendorActions
            .listVendor(data)
            .then(response => {
                this.setState({
                    data: response.data,
                    colDef: colDefVendor
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * Description: itemAPICall function to fetch all item data based on parameter
     * @param  {null}
     * @return {null}
     */
    itemAPICall = (id) => {
        let data = {
            filterId: id
        }
        itemActions
            .listItem(data)
            .then(response => {
                this.setState({
                    itemList: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    createIdString = () => {
        let data = this.props.data;
        let output = '';
        if (this.props.type === 'members') {
            for(let i = 0;i < data.length-1;i++){
                output += 'id=' + data[i] + '&'
            }
            output+='id=' +data[data.length-1];
            
        } else if (this.props.type === 'vendor') {
            for(let i = 0;i < data.length-1;i++){
                output += 'id=' + data[i].id + '&'
            }
            output+='id=' + data[data.length-1].id;
        }
        return output;
    }

    popupAction = (id,val,index) => {
        let actualItems = this.state.data[index].items;
        let output = '';
        for(let i = 0; i < actualItems.length-1;i++){
            output += 'id=' + actualItems[i].id + '&'
        }
        output+='id=' +actualItems[actualItems.length-1].id;
        this.itemAPICall(output)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.popupOpen} className="modal-dialog modal-dialog-centered modal-xl">
                    <ModalHeader toggle={this.toggle}>{this.props.heading}</ModalHeader>
                    <ModalBody>
                        <div className="table-grid">
                            <Grid
                                data={this.state.data}
                                colDef={this.state.colDef}
                                popupAction={this.popupAction}
                            />
                        </div>
                        <ul className="item-list-popup">
                        {
                            this.state.itemList && this.state.itemList.map((val,ind)=>{
                                return <li key={ind}>{val.name}</li>
                            })
                        }
                        </ul>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.closeEventPopup}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}
export default EventPopup;