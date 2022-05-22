//react:
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
//stacks:
import AuthStack from './src/stacks/AuthStack';
import HomeStack from './src/stacks/HomeStack';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk));

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {firebaseConfig} from './src/config/index';

import Game from './src/screens/Game';
import News from './src/screens/News';
import Search from './src/screens/Search';

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    });
  }
  render(){
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('./src/assests/sportics_logo.jpg')} style={{width: 100, height: 100}} />
        </View>
      )
    }
    if(!loggedIn){
      return (
        <Provider store={store}>
          <NavigationContainer >
            <AuthStack />
          </NavigationContainer>
        </Provider>
      )
    }
    return (
      <Provider store={store}>
          <NavigationContainer >
          <Stack.Navigator>
              <Stack.Screen name="HomeStack" component={HomeStack} options={{headerShown: false}} />
              <Stack.Screen name="Game" component={Game} />
              <Stack.Screen name="News" component={News} />
              <Stack.Screen name="Search" component={Search} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
    )
  }
}