import React from "react";
import PropTypes from "prop-types";
import { withStyles, InputBase, Badge, Drawer, Hidden, IconButton, Button, Toolbar, AppBar } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/icons/Menu';
import {
    NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles';
import * as alertActions from "../../../../store/actions/alerts";
import * as departmentsActions from "../../../../store/actions/departments";
import * as categoryActions from "../../../../store/actions/category";
import * as productActions from "../../../../store/actions/products";
import * as filterActions from '../../../../store/actions/filters'
import './style.css';

class NavBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mobileOpen: false,
        }
    }

    componentWillMount() {
        this.props.getAllCategories();
        this.props.getAllDepartments();
    }
    
    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

    handleCategorySelect = (eventKey) => {
        this.props.updateFilterAction({
            category_id: eventKey,
            page: 1,
            offset: 0,
            limit: 9
        })

        this.props.getProductsInCategory({
            ...this.props.filters,
            category_id: eventKey,
            page: 1,
            limit: 9,
            description_length: 120
        });
    }

    handleDepartmentSelect = (event) => {
        const name = event.target.text;
        const department = this.props.departments.find(department => {
            return department.name === name
        })

        if (!department)
            return 0;
        this.props.updateFilterAction({
            department_id: department.department_id,
            category_id: null,
            page: 1,
            offset: 0,
            limit: 9
        })

        this.props.getProductsInDepartment({
            ...this.props.filters,
            department_id: department.department_id,
            page: 1,
            limit: 9,
            description_length: 120
        });
    }

    handleSearch = (event) => {
        const query_string = event.target.value ? event.target.value : null;
        this.props.updateFilterAction({
            department_id: null,
            category_id: null,
            query_string: query_string,
            page: 1,
            offset: 0,
            limit: 9
        })
        this.props.getAllProducts({
            department_id: null,
            category_id: null,
            query_string: query_string,
            page: 1,
            offset: 0,
            limit: 9
        })
    }

    componentDidMount() {
        window.addEventListener('scroll', (event) => {
            const scrollpos = window.scrollY;
            if (scrollpos > 10) {
                this.setState({
                    activeClass: 'is-scrolled'
                })
            } else {
                this.setState({
                    activeClass: 'is-ontop'
                })
            }
        });
    }

    navDropdowns = (departments, categories) => {
        if (departments) {
            return departments.map((department, index) => {
                return <NavDropdown
                    key={index}
                    title={department.name}
                    className="department navDropdown"
                    onClick={this.handleDepartmentSelect}
                >
                    {
                        categories &&
                        categories.map((category, index) => {
                            if (department.department_id === category.department_id) {
                                return <NavDropdown.Item
                                    key={index}
                                    className="category"
                                    eventKey={category.category_id}
                                    value={category.id}
                                    onSelect={this.handleCategorySelect}
                                >
                                    {category.name}
                                </NavDropdown.Item>
                            }
                            return null;
                        })
                    }
                </NavDropdown>
            });
        }
    }

    render() {

        const {
            classes,
            brand,
            total,
            departments,
            categories,
        } = this.props;

        const brandComponent =
            <Link to={'/'} className={classes.brand}>
                {brand}
            </Link>

        return (
            <div>
                <AppBar className={`mainHeaderHolder ${classes.navBar + ' ' + this.state.activeClass}`}>
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.flex}>
                            {brandComponent}
                        </div>
                        <Hidden mdDown>
                            <div className={`departments categories ${classes.linksContainer}`}>
                                {
                                    this.navDropdowns(departments, categories)
                                }
                            </div>
                        </Hidden>
                        <Hidden mdDown>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    onChange={this.handleSearch}
                                    placeholder="Search…"
                                    name="search"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
                        </Hidden>
                        <Hidden mdDown>
                            <div className={classes.iconContainer} onClick={() => { this.props.showCart() }}>
                                <Badge classes={{
                                    badge: classes.badge
                                }}
                                    id="menuCartQuantity"
                                    badgeContent={total.Quantity}
                                    color="primary">
                                    <img alt="Shopping Cart Icon" src="/assets/icons/shopping-cart-white.svg" />
                                </Badge>
                            </div>
                        </Hidden>
                        <Hidden mdUp>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle.bind(this)}
                            >
                                <Menu />
                            </IconButton>
                        </Hidden>
                    </Toolbar>
                    <Hidden mdUp implementation="css">
                        <Drawer
                            variant="temporary"
                            anchor={"right"}
                            className="py-12"
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle.bind(this)}
                        >
                            <Button classes={{
                                root: classes.button
                            }}>
                                <Link to={`/department/1`} className={classes.navDrawerLink} >
                                    Regional
                                    </Link>
                            </Button>
                        </Drawer>
                    </Hidden>
                </AppBar>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark"
    ]),
    brand: PropTypes.string.isRequired,
    fixed: PropTypes.bool,
    absolute: PropTypes.bool
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showCart: alertActions.showCart,
        getAllProducts: productActions.getAllProducts,
        getAllCategories: categoryActions.getAllCategories,
        getAllDepartments: departmentsActions.getAllDepartments,
        getProductsInCategory: productActions.getProductsInCategory,
        getProductsInDepartment: productActions.getProductsInDepartment,
        getProductsSearch: productActions.getProductsSearch,
        updateFilterAction: filterActions.updateFilters,
    }, dispatch);
}

function mapStateToProps({cart, departments, category, filters}) {
    return {
        total: cart.total,
        departments: departments.departments,
        categories: category.categories.rows,
        filters: filters,
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(NavBar));
