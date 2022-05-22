import React, { Component } from 'react'
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { login } from '../redux/actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.userLogin = this.userLogin.bind(this);
    }
    userLogin(){
        this.props.login(this.state.username, this.state.password)
    }
    render() {
        if(this.props.loading){
            return(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                    <ActivityIndicator size='large' color="black" />
                </View>
            )
        }
        return (
            <View style = {styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assests/sportics_logo.jpg')} style={styles.logo}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder="Username" onChangeText={(username)=>this.setState({username: username})} />
                    <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={(password)=>this.setState({password: password})} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Login" disabled={this.props.loading} onPress={()=>{
                        this.userLogin();}
                        } color={'black'} />
                </View>
                <View style={styles.createAccount}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("SignUp")}>
                        <Text style={styles.signup}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 200,
    },
    inputContainer: {
        width: '90%',
        padding: 10,
    },
    textInput: {
        padding: 10,
        margin: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
    },
    buttonContainer: {
        width: '25%',
        marginVertical: 10,
    },
    createAccount: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signup: {
        color: 'blue',
    }
});

const mapDispatchProps = (dispatch) => bindActionCreators({
    login
}, dispatch);
const mapStateToProps = (store) => ({
    loading: store.user.loading
})
export default connect(mapStateToProps, mapDispatchProps)(Login);