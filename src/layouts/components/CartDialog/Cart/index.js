/**
 * Implement functionality for Cart
 */
import {Fab, SvgIcon, withStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import systemConfig from "../../../../config/system";
import styles from './styles';
import * as cartActions from '../../../../store/actions/cart';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
        }
    }

    handleAddProduct =  () => {
        this.props.addOneProduct(this.state.item);
        this.forceUpdate();
    }

    handleSubtract = () => {
        this.props.substractProduct(this.state.item);
        this.forceUpdate();
    }

    handelRemoveIcon = () => {
        this.props.removeProduct(this.state.item);
        this.forceUpdate();
    }

    componentWillMount() {

    }

    render() {
        const {classes} = this.props;
        return (
            <div id="cart">
                    <div className="flex mb-4">
                        <div className="w-2/12">
                            <img className="w-full" src={systemConfig.imageBaseUrl + this.state.item.thumbnail}
                                    alt="Product"/>
                        </div>
                        <div className="w-4/12 pl-6 cart-item">
                            <div className="w-full">
                                <span className={`cart-item-title ${classes.nameText}`}>{this.state.item.name}</span>
                            </div>
                            <div className="w-full pt-2">
                                <span className={classes.productCodeText}>{this.state.item.description}</span>
                            </div>
                            <div className="w-full pt-2 cart-item-remove" style={{cursor: "pointer" }} onClick={this.handelRemoveIcon}>
                                    <span>
                                    <SvgIcon classes={classes.removeIcon} color="primary">
                                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                                    </SvgIcon>
                                    <span
                                        className={classes.removeText}> Remove</span></span>

                            </div>
                        </div>
                        {/* <div className="w-1/12 ">
                            <span className={`cart-item-color ${classes.sizeText}`}>{this.state.item.color}</span>
                        </div> */}
                        <div className="w-1/12 ">
                            <span className={`cart-item-size ${classes.sizeText}`}>{this.state.item.size}</span>
                        </div>
                        <div className="w-3/12 h-8">
                            <div className="flex flex-row">
                                <Fab size="small" aria-label="Subtract" className={classes.addRemoveIcon}>
                                    <SubtractIcon onClick={this.handleSubtract}/>
                                </Fab>

                                <div
                                    className="shadow appearance-none border rounded w-16 text-gray-700 rounded-full text-center mx-2">
                                    <span
                                        className={classes.addRemoveText} name="cart-item-quantity">{this.state.item.quantity}</span>
                                </div>

                                <Fab size="small" aria-label="Add" className={`increase-cart-quantity ${classes.addRemoveIcon}`}>
                                    <AddIcon onClick={this.handleAddProduct}/>
                                </Fab>
                            </div>
                        </div>
                        <div className="w-2/12">
                            <span className={`cart-item-price ${classes.priceText}`}>£ <span>{Math.round(this.state.item.price * this.state.item.quantity)}</span></span>
                        </div>
                    </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addOneProduct: cartActions.addOneProduct,
        addProduct: cartActions.addProduct,
        substractProduct: cartActions.substractProduct,
        removeProduct: cartActions.removeProduct,
    }, dispatch);
}

function mapStateToProps({ cart}) {
    return {
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Cart));

