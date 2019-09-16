import React, { Component } from 'react';
import {
    Paper,
    Dialog,
    DialogContent,
    withStyles,
    Fab,
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cart from './Cart'
import * as Actions from '../../../store/actions/alerts';
import OrderForm from "./Forms/OrderForm";
import Close from '@material-ui/icons/Close';
import styles from './styles';

function PaperComponent(props) {
    return (
        <Paper {...props} style={{ width: "820px" }} />
    );
}

class CartDialog extends Component {

    state = {
        open: false,
        activeStep: 0,
        completed: false
    };

    handleClose = () => {
        this.props.hideCart();
    };


    handleNext() {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    }

    handlePrevious() {
        if (this.state.activeStep > 0) {
            this.setState({
                activeStep: this.state.activeStep - 1
            })
        }
    }

    cartList = (items) => {
        return items.map(item => {
            return <Cart item={item} />
        });
    }

    handleSiginButton = () => {
        this.props.showAuth(false);
    }

    render() {
        const { classes, items, total, auth } = this.props;
        const { activeStep } = this.state;

        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose.bind(this)}
                    PaperComponent={PaperComponent}
                    maxWidth="lg"
                    scroll="paper"
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogContent style={{ overflow: 'hidden' }}>
                        <div className="flex">
                            <div className="w-3/5 sm-12">
                                <span className={classes.titleText}>{items.length} items in Your Cart</span>
                            </div>
                            <div className="w-1/5 sm-12 flex justify-end">
                                <span className={classes.totalText} onClick={this.handleClose.bind(this)}>Total: £ <span id="cartTotalPriceValue">{total.Price}</span></span>
                            </div>
                            <div className="w-1/5 sm-12 flex justify-end">
                                <Close onClick={this.handleClose.bind(this)} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                        <div className="w-full flex flex-grow flex-col" style={{ height: "450px", overflow: 'auto' }}>
                            {activeStep === 0 ? <div>
                                <div className={`flex mb-4 h-8 ${classes.headerBorderBottom}`}>
                                    <div className="w-3/6">
                                        <span className={classes.headerTitle}>Item</span>
                                    </div>
                                    {/* <div className="w-1/12">
                                        <span className={classes.headerTitle}>Color</span>
                                    </div> */}
                                    <div className="w-1/12">
                                        <span className={classes.headerTitle}>Size</span>
                                    </div>
                                    <div className="w-3/12">
                                        <span className={classes.headerTitle}>Quantity</span>
                                    </div>
                                    <div className="w-2/12">
                                        <span className={classes.headerTitle}>Price</span>
                                    </div>
                                </div>
                                {this.cartList(items)}
                            </div>
                                : <OrderForm />}
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2">
                                <Fab color="primary"
                                    onClick={activeStep === 0 ? this.handleClose.bind(this) : this.handlePrevious.bind(this)}
                                    style={{ borderRadius: 48, height: 48, width: 160 }}
                                    className={classes.cartButton}>
                                    <span
                                        className={classes.submitButtonText}>{activeStep === 0 ? 'Back to Shop' : 'Back'}</span></Fab>
                            </div>
                            <div className="w-1/2 flex justify-end">
                                {!auth.isAuthenticated ?
                                    <Fab color="primary"
                                        onClick={this.handleSiginButton}
                                        style={{ borderRadius: 48, height: 48, width: 160 }}
                                        className={classes.cartButton}><span className={classes.submitButtonText} id="btnCheckout">Sign in</span></Fab>
                                    : items.length > 0 ? <Fab color="primary"
                                        onClick={this.handleNext.bind(this)}
                                        style={{ borderRadius: 48, height: 48, width: 160 }}
                                        className={classes.cartButton}>
                                        {activeStep === 0 ? <span className={classes.submitButtonText} id="btnCheckout">Checkout</span>
                                            : <span className={classes.submitButtonText} id="btnNext">Next</span>}
                                    </Fab> : null
                                }
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        hideCart: Actions.hideCart,
        showAuth: Actions.showAuth,
    }, dispatch);
}

function mapStateToProps({ alerts, cart, auth, customers }) {
    return {
        open: alerts.cart.open,
        items: cart.products,
        total: cart.total,
        auth: customers.auth,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CartDialog));
