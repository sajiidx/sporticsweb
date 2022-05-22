import React, {useState} from 'react'
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native'

import {
  logout
 } from '../redux/actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function UserDetails(props) {
    const [user, setUser] = useState(props.user);
    React.useEffect(()=>{
        setUser(props.user);
    },[props.user]);
    if(user != null){
         return (
            <View style = {styles.container}>
                <Text>Hello, {props.user.id}</Text>
                <View>
                    <Button title="Logout" color={"black"} onPress={() => props.logout()} />
                </View>
            </View>
        )
    }
    return (
      <View style = {styles.container}>
            <ActivityIndicator size="small" color={"black"} />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (store) => ({
  user: store.user.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({
  logout
}, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(UserDetails);
