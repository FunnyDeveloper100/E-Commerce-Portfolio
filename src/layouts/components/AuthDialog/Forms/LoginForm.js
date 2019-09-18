import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, InputAdornment, withStyles } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/VpnKey';
import { TextFieldFormsy } from '../../../../components/Formsy';
import Formsy from 'formsy-react';
import styles from './styles';
import './styles.css';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import systemConfig from '../../../../config/system';
import * as Actions from '../../../../store/actions';


class LoginForm extends Component {

    form = React.createRef();

    constructor(props) {
        super(props);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { canSubmit: false };
    }

    onSubmit(formdata) {
        this.props.dispatch(Actions.loginCustomerAction(formdata))
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    responseGoogle = (response) => {
        console.log(response.tokenId);
        if (response.tokenId) {
            this.props.dispatch(Actions.hideAuth());
        }
    }

    responseFacebook = (response) => {
        console.log(response);
        if (response.status==='success')
            this.props.dispatch(Actions.hideAuth());
    }

    render() {

        const { isSuccess } = this.props;

        if (isSuccess) {
            this.props.dispatch(Actions.hideAuth());
        }

        return (
            <div className="w-full flex flex-row justify-center">
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="bg-white shadow-md rounded px-8 pt-6 mt-6 pb-8 mb-4"
                    id="signInForm"
                >
                    <TextFieldFormsy
                        className="w-full mb-4"
                        type="email"
                        name="email"
                        label="Email"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><EmailIcon className="text-20" color="action" /></InputAdornment>
                        }}
                        variant="outlined"
                        helperText=''
                        required
                    />

                    <TextFieldFormsy
                        className="w-full mb-4"
                        type="password"
                        name="password"
                        label="Password"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><PasswordIcon className="text-20"
                                color="action" /></InputAdornment>
                        }}
                        variant="outlined"
                        helperText=''
                        required
                    />

                    <div className="buttonsHolder">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="w-full logInBtn"
                            aria-label="LOG IN"
                            value="legacy"
                            id="btnFormSignIn"
                        >
                            Log In
                      </Button>

                        <div>- or -</div>

                        <div className="socialButtonsHolder">
                            <div>
                                <FacebookLogin
                                    appId="352854622106208"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={this.responseFacebook}
                                    cssClass="w-full btnFacebook"
                                />
                            </div>
                            <div>
                                <GoogleLogin
                                    clientId={systemConfig.google_client_id}
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    className="w-full btnGoogle"
                                    buttonText="Login with Google"
                                />
                            </div>
                        </div>
                    </div>

                </Formsy>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        customer: state.customers.auth.customer,
        error: state.customers.auth.error,
        isSuccess: state.customers.auth.isSuccess,
    }
}

export default withStyles(styles)(connect(mapStateToProps)(LoginForm));
