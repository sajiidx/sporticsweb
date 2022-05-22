import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import Games from '../components/Games.js'
import LiveScore from '../components/LiveScore.js'
import Posts from '../components/Posts.js'
import { GlobalStyles } from '../styles/index.js'

import {
  loadUser,
  loadGames,
  loadMatches,
  loadNews,
  loadTeams,
  loadHouses,
  fetchRecentMatches
 } from '../redux/actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserDetails from '../components/UserDetails.js';

export function Home(props) {
    React.useEffect(()=>{
        props.loadUser();
        props.loadGames();
        props.loadMatches();
        props.loadNews();
        props.loadTeams();
        props.loadHouses();
        props.fetchRecentMatches(4);
    },[]);
    return (
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style = {styles.container}>
                <Posts navigation={props.navigation} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20
    },
})

const mapDispatchProps = (dispatch) => bindActionCreators({
  loadUser,
  loadGames,
  loadMatches,
  loadNews,
  loadTeams,
  loadHouses,
  fetchRecentMatches
}, dispatch);
export default connect(null, mapDispatchProps)(Home);