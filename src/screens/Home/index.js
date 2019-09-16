/**
 * 
 * if a user select a department and category in the navigation menu
 * - Filter should display Department and category dynamically when a user select a department and category
 *  on the navigation bar
 * - Filter should dynamically dislay attribute values like Size and Color from backend
 * - Price on the Price slider should change as the user slide through in the Filter
 * - Implement functionalities for search in the Nav bar and filter bar
 * - Implement funtionality for reset on filter component
 * - Implement pagination for products
 *
 */
import React, { Component } from 'react'
import {
    withStyles,
    Paper,
    Radio,
    Checkbox,
    Button,
    Fab,
    TextField
} from '@material-ui/core';
import { Slider } from 'material-ui-slider';
import withWidth from '@material-ui/core/withWidth';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Close from '@material-ui/icons/Close';
import Pagination from "material-ui-flat-pagination";
import * as productActions from '../../store/actions/products'
import * as filterActions from '../../store/actions/filters'
import styles from './styles';
import { Container, Section } from '../../components/Layout';
import ListProduct from '../../components/ListProduct';
import Banner from '../../components/Banner';
import SubscribeBar from '../../components/SubscribeBar';
import './styles.css';

class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                color: null,
                sizes: {},
                price_range: [10, 30],
            },
            query_string: null,
        }
    }

    loadProducts = (payload) => {
        this.props.getAllProducts(payload);
    }

    handlePageButtonClick = (offset, page) => {
        this.props.updateFilterAction({
            offset: offset,
            page: page,
        })

        this.loadProducts({
            ...this.props.filters,
            page: page
        });
    }

    handleColorRadioButton = (event) => {
        const color = event.target.value;
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                color: color,
            }
        }))
    }

    handleSizeCheckBox = (event) => {
        let sizes = this.state.filters.sizes;
        sizes[event.target.value] = event.target.checked;
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                sizes: sizes
            }
        }))
    }

    handlePriceSlider = (value, event) => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                price_range: value
            }
        }))
    }

    handleSearchTextField = event => {
        this.setState({
            query_string: event.target.value
        })
    }

    updateFilter = () => {
        this.props.updateFilterAction({
                filters: this.state.filters, 
                query_string: this.state.query_string,
                page: 1
            }
        )
        this.loadProducts({
            ...this.props.filters,
            filters: this.state.filters,
            query_string: this.state.query_string,
            page: 1
        });
    }

    resetFilters = () => {
        this.setState({
            filters: {
                color: '',
                sizes: {},
                price_range: [10, 30],
            },
            query_string: null,
        })
        this.props.updateFilterAction({filters: null, query_string: null})
        
        this.loadProducts({
            ...this.props.filters,
            filters: null,
            query_string: null,
            page: 1
        });
    }

    componentWillMount() {
        this.props.getAllProducts({
            page: this.props.filters.page,
            limit: this.props.filters.limit,
            description_length: 120
        });
    }

    render() {

        const { classes, products, total, isLoading, filters, categories, departments } = this.props;

        let currentProducts = products;
        const loading = isLoading && !total;
        const { category_id, department_id } = filters;
        const category = category_id ? categories.find(c => {
            return c.category_id === category_id
        }) : null;
        const department = department_id ? departments.find(d => {
            return d.department_id === department_id
        }) : null;

        return (
            !loading && <div className={classes.root}>
                <Container>
                    <Section>
                        <div className="flex mb-4 contentHolder">
                            <div className="w-1/4 filterSection">
                                <Paper className={classes.controlContainer} elevation={1}>
                                    { (category_id || department_id) && 
                                        <div className={classes.filterBlock}>
                                            <div className={classes.titleContainer}>
                                                <span className={classes.controlsTopTitle}>
                                                    Filter Items
                                                </span>
                                            </div>
                                            <div className={classes.filterItems}>
                                                <div className="py-1">
                                                    <span className={classes.isGrey}>Category: </span>
                                                    <span>{department ? department.name : null}</span>
                                                </div>
                                                <div className="py-1 pb-2">
                                                    <span className={classes.isGrey}>Department: </span>
                                                    <span>{category ? category.name : null}</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    
                                    <div className={classes.filterBodyContainer}>
                                        <div className={classes.colorBlock}>
                                            <div className={classes.titleContainer}>
                                                <span className={classes.controlsTitle}>
                                                    Color
                                              </span>
                                            </div>
                                            <div className={classes.colorRadiosContainer}>
                                                <Radio
                                                    checked={this.state.filters.color === '#6eb2fb'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 0, color: '#6eb2fb' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#6eb2fb"
                                                    name="filter-color-radio-button"
                                                    aria-label="A"
                                                />
                                                <Radio
                                                    checked={this.state.filters.color === '#00d3ca'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 0, color: '#00d3ca' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#00d3ca"
                                                    name="filter-color-radio-button"
                                                    aria-label="B"
                                                />
                                                <Radio
                                                    checked={this.state.filters.color === '#f62f5e'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 0, color: '#f62f5e' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#f62f5e"
                                                    name="filter-color-radio-button"
                                                    aria-label="C"
                                                />
                                                <Radio
                                                    checked={this.state.filters.color === '#fe5c07'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 0, color: '#fe5c07' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#fe5c07"
                                                    name="filter-color-radio-button"
                                                    aria-label="D"
                                                />
                                                <Radio
                                                    checked={this.state.filters.color === '#f8e71c'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 0, color: '#f8e71c' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#f8e71c"
                                                    name="filter-color-radio-button"
                                                    aria-label="E"
                                                />
                                                <Radio
                                                    checked={this.state.filters.color === '#7ed321'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 0, color: '#7ed321' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#7ed321"
                                                    name="filter-color-radio-button"
                                                    aria-label="F"
                                                />
                                                <Radio
                                                    checked={this.state.filters.color === '#9013fe'}
                                                    onChange={this.handleColorRadioButton}
                                                    style={{ padding: 0, color: '#9013fe' }}
                                                    size="small"
                                                    icon={<FiberManualRecord />}
                                                    value="#9013fe"
                                                    name="filter-color-radio-button"
                                                    aria-label="G"
                                                />
                                            </div>
                                        </div>
                                        <div className={classes.sizesBlock}>
                                            <div className={classes.titleContainer}>
                                                <span className={classes.controlsTitle}>
                                                    Size
                                      </span>
                                            </div>
                                            <div className={classes.sizeCheckboxes}>
                                                <Checkbox
                                                    checked={this.state.filters.sizes['XS'] ? true : false}
                                                    onChange={this.handleSizeCheckBox}
                                                    style={{ padding: 0 }}
                                                    checkedIcon={<div className={classes.sizeCheckboxChecked}>XS</div>}
                                                    icon={<div className={classes.sizeCheckboxUnchecked}>XS</div>}
                                                    value="XS" />
                                                <Checkbox
                                                    checked={this.state.filters.sizes.S  ? true : false}
                                                    onChange={this.handleSizeCheckBox}
                                                    style={{ padding: 0 }}
                                                    checkedIcon={<div className={classes.sizeCheckboxChecked}>S</div>}
                                                    icon={<div className={classes.sizeCheckboxUnchecked}>S</div>}
                                                    value="S" />
                                                <Checkbox
                                                    checked={this.state.filters.sizes.M  ? true : false}
                                                    onChange={this.handleSizeCheckBox}
                                                    style={{ padding: 0 }}
                                                    checkedIcon={<div className={classes.sizeCheckboxChecked}>M</div>}
                                                    icon={<div className={classes.sizeCheckboxUnchecked}>M</div>}
                                                    value="M" />
                                                <Checkbox
                                                    checked={this.state.filters.sizes.L  ? true : false}
                                                    onChange={this.handleSizeCheckBox}
                                                    style={{ padding: 0 }}
                                                    checkedIcon={<div className={classes.sizeCheckboxChecked}>L</div>}
                                                    icon={<div className={classes.sizeCheckboxUnchecked}>L</div>}
                                                    value="L" />
                                                <Checkbox
                                                    checked={this.state.filters.sizes.XL  ? true : false}
                                                    onChange={this.handleSizeCheckBox}
                                                    style={{ padding: 0 }}
                                                    checkedIcon={<div className={classes.sizeCheckboxChecked}>XL</div>}
                                                    icon={<div className={classes.sizeCheckboxUnchecked}>XL</div>}
                                                    value="XL" />
                                            </div>
                                        </div>
                                        <div className={classes.sliderBlock}>
                                            <div className={classes.titleContainer}>
                                                <span className={classes.controlsTitle}>
                                                    Price Range
                                              </span>
                                            </div>
                                            <div className={classes.sliderContainer}>
                                                <Slider 
                                                    onChange={this.handlePriceSlider}
                                                    color="#f62f5e" 
                                                    defaultValue={[10, 30]}
                                                    min={0}
                                                    max={500}
                                                    value={this.state.filters.price_range}
                                                    range
                                                />
                                            </div>
                                            <div style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                height: "24px"
                                            }}>
                                                <div className={classes.rangesText}>{`£ ` + this.state.filters.price_range[0]}</div>
                                                <div style={{ flexGrow: 1 }} />
                                                <div className={classes.rangesText}>{`£ ` + this.state.filters.price_range[1]}</div>
                                            </div>
                                        </div>
                                        <div className={classes.searchBlock}>
                                            <div className={classes.titleContainer}>
                                                <span className={classes.controlsTitle}>
                                                    Search keyword
                                                  </span>
                                            </div>
                                            <div className={classes.searchContainer}>
                                                <TextField
                                                    inputProps={{
                                                        className: classes.filterSearchInput,
                                                    }}
                                                    onChange={this.handleSearchTextField}
                                                    placeholder="Enter a keyword to search..."
                                                    margin="dense"
                                                    variant="outlined"
                                                    name="search"
                                                    value={this.state.query_string ? this.state.query_string : ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.footerBlock}>
                                        <Fab color="primary" size="small" className={classes.coloredButton}
                                            style={{ borderRadius: 24, height: 35, width: 90 }}
                                            onClick={this.updateFilter}><span
                                                className={classes.submitButtonText}>Apply</span></Fab>

                                        <Button className={classes.clearText} onClick={this.resetFilters}>
                                            <Close className={classes.boldIcon} />
                                            <span>Reset</span>
                                        </Button>
                                    </div>
                                </Paper>
                            </div>
                            <div className="w-3/4">
                                <div className="flex justify-center">
                                    <Pagination
                                        limit={this.props.filters.limit}
                                        offset={this.props.filters.offset}
                                        total={total ? total : 0}
                                        onClick={(event, offset, page) => this.handlePageButtonClick(offset, page)}
                                        size='small'
                                        otherPageColor='default'
                                    />
                                </div>
                                <div className=" flex flex-wrap ml-6 productsSection">
                                    {currentProducts.map((product, index) => (
                                        <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 mb-4">
                                            <ListProduct product={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Section>
                    <Section>
                        <Banner />
                    </Section>
                    <Section>
                        <SubscribeBar />
                    </Section>
                </Container>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllProducts: productActions.getAllProducts,
        getProductsInCategory: productActions.getProductsInCategory,
        getProductsInDepartment: productActions.getProductsInDepartment,
        updateFilterAction: filterActions.updateFilters,
    }, dispatch);
}

function mapStateToProps({ products, category, departments, filters }) {
    return {
        total: products.all.data.count,
        products: products.all.data.rows,
        isLoading: products.all.isLoading,
        departments: departments.departments,
        categories: category.categories.rows,
        filters: filters,
    }
}

export default withWidth()(
    withStyles(styles, { withTheme: true })(withRouter(
        connect(mapStateToProps, mapDispatchToProps)(Home))
    )
);
