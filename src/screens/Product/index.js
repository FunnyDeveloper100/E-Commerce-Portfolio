import React, { Component } from 'react'
import {
    withStyles,
    Radio,
    Checkbox,
    Fab, CircularProgress, Hidden, Link
} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import StarRatings from 'react-star-ratings';
import classNames from "classnames";
import { Carousel } from 'react-responsive-carousel';
import systemConfig from '../../config/system';
import * as productActions from '../../store/actions/product';
import * as alertActions from '../../store/actions/alerts';
import * as cartActions from '../../store/actions/cart';
import styles from './styles';
import { Container, Section } from '../../components/Layout';
import Review from '../../components/Review';
import ReviewForm from './ReviewForm';


class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: null,
            sizes: {},
            quantity: 1,
        }
    }

    substractQuantity = () => {
        this.setState(prevState => ({
            quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1
        }))
    }

    addQuantity = () => {
        this.setState(prevState => ({
            quantity: prevState.quantity + 1
        }))
    }

    handleColorRadioButton = (event) => {
        const color = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            color: color,
        }))
    }

    handleSizeCheckBox = (event) => {
        let sizes = this.state.sizes;
        sizes[event.target.value] = event.target.checked;
        this.setState(prevState => ({
            ...prevState,
            sizes: sizes
        }))
    }

    handleAddCart = () => {
        const { product } = this.props;
        let cart_item = this.state;
        if (cart_item.quantity > 0 && product.product_id) {
            cart_item.price = parseFloat(product.discounted_price) > 0 ? parseFloat(product.discounted_price) : parseFloat(product.price);
            cart_item.product_id = product.product_id;
            cart_item.name = product.name;
            cart_item.description = product.description;
            cart_item.thumbnail = product.thumbnail;
            this.props.addProduct(cart_item);
        }
    }

    componentWillMount() {
        const { match: { params } } = this.props;

        this.props.getSingleProduct({
            product_id: params.id
        });
        this.props.getProductDetails({
            product_id: params.id
        });
        this.props.getProductLocations({
            product_id: params.id
        });
        this.props.getProductReviews({
            product_id: params.id
        })

        this.setState({
            product_id: params.id,
        })
    }

    reviewsList = (reviews) => {
        return reviews.map((r, index) => {
            return <Review
                key={index}
                rating={r.rating}
                name={r.name}
                review={r.review}
            />
        });
    }

    render() {
        const { classes, product, loading, locations, locationsLoading, reviews, reviewsLoading, auth, match: { params } } = this.props;

        const isLoading = loading || !product.image || locationsLoading || reviewsLoading;
        const isDiscounted = parseFloat(product.discounted_price) > 0;

        return (
            <div className={classes.root}>
                <Container className="product-details">
                    {isLoading ? <Section>
                        <div className="flex flex-wrap shadow flex justify-center py-24 bg-white">
                            <CircularProgress size={40} color="primary" />
                        </div>
                    </Section> :
                        <div>
                            <Section>
                                <div className="flex flex-wrap shadow bg-white">
                                    <div
                                        className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center align-middle pt-10">
                                        <Carousel showArrows={true} showIndicators={false} showStatus={false}>
                                            <div className={classes.carouselImageContainer}>
                                                <img src={`${systemConfig.imageBaseUrl}${product.image}`} alt="Product" />
                                            </div>
                                            <div className={classes.carouselImageContainer}>
                                                <img src={`${systemConfig.imageBaseUrl}${product.image_2}`} alt="Product" />
                                            </div>
                                        </Carousel>
                                    </div>
                                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-10">
                                        <div className={`w-full h-8 ${classes.breadcrumbsText}`}>
                                            Home <span className="ml-4" /> • <span
                                                className="ml-4" /> {locations[0].department_name} <span
                                                className="ml-4" /> • <span className="ml-4" /> {locations[0].category_name}
                                        </div>
                                        <div className="w-full h-8 mt-2">
                                            <StarRatings
                                                rating={reviews ? reviews.rating : 0}
                                                starRatedColor="#ffc94f"
                                                starEmptyColor="#eeeeee"
                                                starHoverColor="#ffc94f"
                                                starDimension="20px"
                                                starSpacing="1px"
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                        </div>
                                        <div className="w-full h-8">
                                            <span className={`product-details-title ${classes.productTitleText}`}>
                                                {product.name}
                                            </span>
                                        </div>
                                        <div className="w-full mt-4">
                                            <span className={classes.productPrice}>
                                                <span className={classNames({
                                                    [classes.strikeThrough]: isDiscounted
                                                })}>£ {product.price}</span>{isDiscounted &&
                                                    <span> | £ {product.discounted_price}</span>}
                                            </span>
                                        </div>
                                        <div className="w-full my-8">
                                            <div className="w-full mb-2">
                                                <span className={classes.lightTitle}> Colour </span>
                                            </div>
                                            <div>
                                                <Radio
                                                    checked={this.state.color === '#6eb2fb'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 2, color: '#6eb2fb' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#6eb2fb"
                                                    name="radio-button-demo"
                                                    aria-label="blue"
                                                    className="product-details-color"
                                                />
                                                <Radio
                                                    checked={this.state.color === '#00d3ca'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 2, color: '#00d3ca' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#00d3ca"
                                                    name="radio-button-demo"
                                                    aria-label="cyan"
                                                    className="product-details-color"
                                                />
                                                <Radio
                                                    checked={this.state.color === '#f62f5e'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 2, color: '#f62f5e' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#f62f5e"
                                                    name="radio-button-demo"
                                                    aria-label="red"
                                                    className="product-details-color"
                                                />
                                                <Radio
                                                    checked={this.state.color === '#fe5c07'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 2, color: '#fe5c07' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#fe5c07"
                                                    name="radio-button-demo"
                                                    aria-label="orange"
                                                    className="product-details-color"
                                                />
                                                <Radio
                                                    checked={this.state.color === '#f8e71c'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 2, color: '#f8e71c' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#f8e71c"
                                                    name="radio-button-demo"
                                                    aria-label="yellow"
                                                    className="product-details-color"
                                                />
                                                <Radio
                                                    checked={this.state.color === '#7ed321'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 2, color: '#7ed321' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#7ed321"
                                                    name="radio-button-demo"
                                                    aria-label="green"
                                                    className="product-details-color"
                                                />
                                                <Radio
                                                    checked={this.state.color === '#9013fe'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 2, color: '#9013fe' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#9013fe"
                                                    name="radio-button-demo"
                                                    aria-label="purple"
                                                    className="product-details-color"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full my-8">
                                            <div className="w-full mb-2">
                                                <span className={classes.lightTitle}> Size </span>
                                            </div>
                                            <div>
                                            <Checkbox
                                                    checked={this.state.sizes['XS'] ? true : false}
                                                    onChange={this.handleSizeCheckBox}
                                                    style={{ padding: 0 }}
                                                    checkedIcon={<div className={classes.sizeCheckboxChecked}>XS</div>}
                                                    icon={<div className={classes.sizeCheckboxUnchecked}>XS</div>}
                                                    value="XS" />
                                                <Checkbox
                                                    checked={this.state.sizes.S  ? true : false}
                                                    onChange={this.handleSizeCheckBox}
                                                    style={{ padding: 0 }}
                                                    checkedIcon={<div className={classes.sizeCheckboxChecked}>S</div>}
                                                    icon={<div className={classes.sizeCheckboxUnchecked}>S</div>}
                                                    value="S" />
                                                <Checkbox
                                                    checked={this.state.sizes.M  ? true : false}
                                                    onChange={this.handleSizeCheckBox}
                                                    style={{ padding: 0 }}
                                                    checkedIcon={<div className={classes.sizeCheckboxChecked}>M</div>}
                                                    icon={<div className={classes.sizeCheckboxUnchecked}>M</div>}
                                                    value="M" />
                                                <Checkbox
                                                    checked={this.state.sizes.L  ? true : false}
                                                    onChange={this.handleSizeCheckBox}
                                                    style={{ padding: 0 }}
                                                    checkedIcon={<div className={classes.sizeCheckboxChecked}>L</div>}
                                                    icon={<div className={classes.sizeCheckboxUnchecked}>L</div>}
                                                    value="L" />
                                                <Checkbox
                                                    checked={this.state.sizes.XL  ? true : false}
                                                    onChange={this.handleSizeCheckBox}
                                                    style={{ padding: 0 }}
                                                    checkedIcon={<div className={classes.sizeCheckboxChecked}>XL</div>}
                                                    icon={<div className={classes.sizeCheckboxUnchecked}>XL</div>}
                                                    value="XL" />
                                                <Checkbox
                                                    checked={this.state.sizes.XXL  ? true : false}
                                                    onChange={this.handleSizeCheckBox}
                                                    style={{ padding: 0 }}
                                                    checkedIcon={<div className={classes.sizeCheckboxChecked}>XXL</div>}
                                                    icon={<div className={classes.sizeCheckboxUnchecked}>XXL</div>}
                                                    value="XXL" />
                                            </div>
                                        </div>
                                        <div className="w-full my-8 flex flex-row">
                                            <Fab size="small" aria-label="Subtract" className={classes.addRemoveIcon}
                                            >
                                                <SubtractIcon
                                                    onClick={this.substractQuantity}
                                                />
                                            </Fab>

                                            <div
                                                className="shadow appearance-none border w-12 text-gray-700 rounded-full text-center mx-2">
                                                <span className={classes.addRemoveText} name="product-details-quantity">{this.state.quantity}</span>
                                            </div>

                                            <Fab size="small" aria-label="Add" className={`increase-quantity ${classes.addRemoveIcon}`}
                                            >
                                                <AddIcon
                                                    onClick={this.addQuantity}
                                                />
                                            </Fab>
                                        </div>
                                        <div className="w-full my-8 flex flex-row">
                                            <div className="relative">
                                                <Fab 
                                                    color="primary" 
                                                    size="large" 
                                                    id="btnCart"
                                                    onClick={this.handleAddCart}
                                                    style={{ borderRadius: 60, height: 60, width: 220 }}>
                                                    <span className={classes.submitButtonText}>Add to Cart</span></Fab>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Hidden >
                                        <div className="flex flex-wrap px-32 bg-white py-4">
                                            <div className="w-full flex">
                                                <span className={classes.reviewTitleText}>
                                                    Product Reviews
                                            </span>
                                            </div>
                                            {
                                                this.reviewsList(reviews)
                                            }
                                        </div>
                                    </Hidden>
                                    <Hidden > 
                                    {
                                        auth.isAuthenticated ? 
                                            <div className="flex flex-wrap px-32 pt-4 bg-white">
                                                <div className="w-full flex">
                                                    <span className={classes.reviewTitleText}>
                                                        Add a review
                                                    </span>
                                                </div>
                                                <ReviewForm productId={params.id} />
                                            </div>
                                        : <div className="w-full flex justify-center align-middle py-8" >
                                            <Link onClick={() => { this.props.showAuth(false) }} color={'primary'} style={{ cursor: "pointer", color: 'red' }}>Log In</Link> <span className="ml-2">to Add a Review.</span>
                                            </div>
                                    }
                                    </Hidden>
                                </div>
                                
                            </Section>
                        </div>
                    }
                </Container>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getSingleProduct: productActions.getSingleProduct,
        getProductDetails: productActions.getProductDetails,
        getProductLocations: productActions.getProductLocations,
        getProductReviews: productActions.getProductReviews,
        addProduct: cartActions.addProduct,
        removeProduct: cartActions.removeProduct,
        showAuth: alertActions.showAuth
    }, dispatch);
}

function mapStateToProps({ product, cart, customers }) {
    return {
        product: product.item.data,
        loading: product.item.isLoading,
        locations: product.locations.data,
        locationsLoading: product.locations.isLoading,
        reviews: product.reviews.data,
        reviewsLoading: product.reviews.isLoading,
        auth: customers.auth,
    }
}

export default withWidth()(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(Product))));
