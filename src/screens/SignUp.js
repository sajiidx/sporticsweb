import React, { Component } from 'react'
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import { signup } from '../redux/actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            fname: '',
            lname: '',
            dept: '',
            batch: 2018,
            gender: '',
            age: 18,

            email: '',
            password: '',
        }
        this.userSignUp = this.userSignUp.bind(this);
    }
    userSignUp(){
        this.props.signup(this.state.email, this.state.password, this.state);
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
            <ScrollView style = {styles.container}>
                <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="NU-ID" onChangeText={(id)=>this.setState({id: id})} />
                <View style={styles.pairInputContainer}>
                    <TextInput style={{...styles.textInput, flex: 1}} placeholder="First Name" onChangeText={(fname)=>this.setState({fname: fname})} />
                    <TextInput style={{...styles.textInput, flex: 1}} placeholder="Last Name" onChangeText={(lname)=>this.setState({lname: lname})} />
                </View>
                <View style={styles.pairInputContainer}>
                    <TextInput style={{...styles.textInput, flex: 1}} placeholder="Department" onChangeText={(dept)=>this.setState({dept: dept})} />
                    <TextInput style={{...styles.textInput, flex: 1}} placeholder="Batch" onChangeText={(batch)=>this.setState({batch: batch})} />
                </View>
                <TextInput style={styles.textInput} placeholder="Gender" onChangeText={(gender) => this.setState({gender: gender})} />
                <TextInput style={styles.textInput} placeholder="Age" onChangeText={(age)=>this.setState({age: age})} />
                <TextInput style={styles.textInput} placeholder="Email" onChangeText={(email)=>this.setState({email: email})} />
                <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={(password)=>this.setState({password: password})} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Sign Up" disabled={this.props.loading} onPress={()=>{
                        this.userSignUp();
                        }} color={'black'} />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        padding: 10,
    },
    pairInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInput: {
        padding: 10,
        margin: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
    },
    buttonContainer: {
        marginVertical: 20,
        paddingHorizontal: 150,
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
    signup
}, dispatch);

const mapStateToProps = (store) => ({
    loading: store.user.loading
})

export default connect(mapStateToProps, mapDispatchProps)(SignUp);