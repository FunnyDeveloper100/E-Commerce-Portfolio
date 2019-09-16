import React, { Component } from 'react';
import { Button, withStyles, MenuItem } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { SelectFormsy, TextFieldFormsy } from '../../../../components/Formsy';
import Formsy from 'formsy-react';
import styles from './styles';
import * as customerActions from '../../../../store/actions/customers';
import * as cartActions from '../../../../store/actions/cart';
import * as alertActions from '../../../../store/actions/alerts';
import system from '../../../../config/system';

class OrderForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false
        }
    }

    disableButton = () => {
        this.setState({ canSubmit: false });
    }

    enableButton = () => {
        this.setState({ canSubmit: true });
    }

    handleSubmit(model) {
        
    }

    handleResponse = (token) => {
        if (token.id) {
            fetch(system.serverBaseUrl + '/stripe/charge', {
                method: 'POST',
                body: JSON.stringify(token),
            }).then(response => {
                response.json().then(data => {
                    if (data.error) {
                        this.props.showToast({message: "payment failed", variant: 'error'})
                    } else {
                        this.props.clearCart();
                        this.props.hideCart();
                        console.log(data);
                        this.props.showToast({message: "payment success", variant: 'success'})
                    }
                })
            })
        } else {
            this.props.showToast({message: 'checkout error', variant: 'error'})
        }
    }

    form = React.createRef();

    render() {

        const { customer, total } = this.props;

        return (
            <div id="delivery" className="w-full flex flex-row justify-center">
                <div className="w-full">
                    <Formsy
                        ref={(form) => this.form = form}
                        onValidSubmit={this.handleSubmit}
                        onValid={this.enableButton}
                        onInvalid={this.disableButton}
                        className="bg-white shadow-md rounded px-4 pt-4 mt-4 pb-6 mb-2"
                    >
                        <div className="flex flex-row justify-between">
                            <TextFieldFormsy
                                className="w-5/12 mb-4"
                                type="text"
                                rows={4}
                                name="first-name"
                                label="First Name"
                                variant="outlined"
                                value={customer ? customer.name : null}
                                required
                            />
                            <TextFieldFormsy
                                className="w-5/12 mb-4"
                                type="text"
                                rows={4}
                                name="last-name"
                                label="Last Name"
                                variant="outlined"
                                value={null}
                                required
                            />
                        </div>
                        <div className="flex flex-row justify-between">
                            <TextFieldFormsy
                                className="w-5/12 mb-4"
                                type="text"
                                rows={4}
                                name="address"
                                label="Address"
                                variant="outlined"
                                value={customer ? customer.address_1 ? customer.address_1 : customer.address_2 : null}
                                required
                            />
                            <TextFieldFormsy
                                className="w-5/12 mb-4"
                                type="text"
                                rows={4}
                                name="city"
                                label="City"
                                variant="outlined"
                                value={customer ? customer.city : null}
                                required
                            />
                        </div>
                        <div className="flex flex-row justify-between">
                            <TextFieldFormsy
                                className="w-5/12  mb-4"
                                type="text"
                                rows={4}
                                name="state"
                                label="State"
                                variant="outlined"
                                value={customer ? customer.region : null}
                                required
                            />
                            <TextFieldFormsy
                                className="w-5/12  mb-4"
                                type="text"
                                rows={4}
                                name="country"
                                label="Country"
                                variant="outlined"
                                value={customer ? customer.country : null}
                                required
                            />
                        </div>
                        <div className="flex flex-row justify-between">
                            <TextFieldFormsy
                                className="w-5/12 mb-2"
                                type="text"
                                rows={4}
                                name="zip"
                                label="Zip Code"
                                variant="outlined"
                                value={customer ? customer.postal_code : null}
                                required
                            />

                            <SelectFormsy
                                name="shipping_id"
                                className="w-5/12 mb-2"
                                label="Shipping Region"
                                id="region"
                                value={customer ? customer.shipping_region_id : null}
                            >
                                <MenuItem value="Select shipping region" className="region-option">Select shipping region</MenuItem>
                            </SelectFormsy>
                        </div>
                        <SelectFormsy
                            name="shipping_id"
                            className="w-5/12 mb-1 flex justify-center"
                            label="Shipping Type"
                            id="type"
                            value={1}
                        >
                            <MenuItem value="Select shipping type" className="type-option">Select shipping Type</MenuItem>
                        </SelectFormsy>
                        <StripeCheckout
                            name="Tshirt Shop"
                            description="Payment description"
                            amount={total.Price * 100}
                            token={this.handleResponse}
                            stripeKey={system.stripeToken}
                            id="stripe-popup"
                        >


                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="w-6/12 mx-auto mt-4 normal-case flex justify-center"
                                aria-label="Make Payment"
                                id="make-payment"
                                value="legacy"
                                disabled={!this.state.canSubmit}
                            >
                                Make Payment
                            </Button>
                        </StripeCheckout>

                    </Formsy>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        hideCart: alertActions.hideCart,
        showCart: alertActions.showCart,
        showToast: alertActions.showToast,
        clearCart: cartActions.clearCart,
        updateCustomerProfile: customerActions.updateCustomerProfileAction,
    }, dispatch);
}

function mapStateToProps({ customers, cart }) {
    return {
        customer: customers.auth.customer,
        total: cart.total
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(OrderForm));
