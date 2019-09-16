import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Button, withStyles} from '@material-ui/core';
import StarRatings from "react-star-ratings";
import {TextFieldFormsy} from '../../components/Formsy';
import Formsy from 'formsy-react';
import styles from './styles';
import * as productActions from '../../store/actions/product';

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            productId: props.productId
        }
    }

    form = React.createRef();

    handleStarRating = (rating) => {
        this.setState({
            rating: rating
        })
    }

    onSubmit = (formdata) => {
        this.props.createProductReviews({
            product_id: this.state.productId,
            rating: this.state.rating,
            review: formdata.review,
        })
    }
    render() {
        const { classes } = this.props;
        
        return (
            <div className="w-full flex flex-row justify-start">
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="w-full pt-6 mt-6 pb-8 mb-4"
                >
                    <div className="w-full flex mb-4">
                        <div className="w-1/4">
                            <span>Choose a nickname</span>
                        </div>
                        <div className="w-3/4">
                            <TextFieldFormsy
                                className="w-1/2"
                                type="text"
                                name="nickname"
                                variant="outlined"
                                id="review"
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full flex mb-4">
                        <div className="w-1/4">
                            <span>Your review</span>
                        </div>
                        <div className="w-3/4">
                            <TextFieldFormsy
                                className="w-full"
                                type="text"
                                multiline
                                rows={4}
                                name="review"
                                helperText="Your review must be at least 50 charaters"
                                variant="outlined"
                                id="review"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full flex mb-4">
                        <div className="w-1/4">
                            <span>Overall Rating</span>
                        </div>
                        <StarRatings
                            rating={this.state.rating}
                            changeRating={this.handleStarRating}
                            starRatedColor="#ffc94f"
                            starEmptyColor="#EEEEEE"
                            starHoverColor="#ffc94f"
                            starDimension="20px"
                            starSpacing="1px"
                            numberOfStars={5}
                            name='rating'
                            className="review-star"
                        />
                    </div>
                    <div className="w-full flex mb-4">
                        <div className="w-1/4">
                        </div>
                        <div className="w-3/4">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="w-16 rounded-full mx-auto"
                                classes={{
                                    label: classes.label,
                                }}
                                id="addReview"
                                onClick={() => console.log('Review submitted!!')}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </Formsy>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createProductReviews: productActions.createProductReviews
    }, dispatch);
}

function mapStateToProps({products, customers}) {
    return {
        products: products.all.data.rows,
        auth: customers.auth,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));
