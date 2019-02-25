/**
 * Summary : View User
 * Description: View User
 * @link: /viewuser
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Label } from 'reactstrap';
import { Layout } from '../../Common/Layout/Layout';
import BreadCrumb from '../../Common/Breadcrumb/Breadcrumb';
import { connect } from 'react-redux';
import * as actionItem  from '../../../actions/item.actions';


/**
 * @name ViewItem
 * @extends React.Component
 */
class ViewItem extends Component {
    /**
     * Description: Call Get User on Page Load
     * @param  {null}
     * @return {null}
     */
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getItem(id)
    }

    /**
     * Description: handleback got to Back on User List 
     * @param  {null}
     * @return {null}
     */
    handleback = () => {
        this.props.history.push('/listusers');
    }

    /**
     * Description: Go to the edit user page based on the click of user
     * @param {null}
     * @return {null}
     */
    itemEdit = () => {
        const id = this.props.match.params.id;
        this.props.history.push('/edititem/' + id);
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const { id, name, description} = this.props.viewItem;
        const breadcrumbdata = [
            {
                "id": "home",
                "active": false,
                "label": "Home",
                "link": true,
                "href": "/home"
            },
            {
                "id": "listusers",
                "active": false,
                "label": "User List",
                "link": true,
                "href": "/listusers"
            },
            {
                "id": "viewuser",
                "active": true,
                "label": "View User",
                "link": false
            }
        ]
        return (
            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>View User</h1>
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Form onSubmit={this.itemEdit}>
                            <FormGroup row>
                                <Label for="userid" sm={3}>Item Id</Label>
                                <Col sm={9}>
                                    <p>{id}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={3}>Name</Label>
                                <Col sm={9}>
                                    <p>{name}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" sm={3}>Description</Label>
                                <Col sm={9}>
                                    <p>{description}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={{ size: 9, offset: 3 }}>
                                    <Button type="button" onClick={this.itemEdit} color="primary">Edit</Button>{' '}
                                    <Button type="button" onClick={this.handleback} color="secondary">Cancel</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        viewItem: state.viewItem
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getItem: (id) => dispatch(actionItem.getItem(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewItem);