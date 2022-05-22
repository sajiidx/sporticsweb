import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, Button, TouchableOpacity, Dimensions} from 'react-native'
import Games from './Games.js'
import LiveScore from './LiveScore.js'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  logout
 } from '../redux/actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
export function FeedHeader(props) {
    const [user, setUser] = useState(null);
    React.useEffect(()=>{
        setUser(props.user);
    },[props.user, props.recentmatches]);
    if(user == null){
         return (
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', height: screenHeight}}>
                <ActivityIndicator size={"small"} color='#000' />
            </View>
        )
    }

    if(screenWidth <= 763){
        return (
            <View style = {mstyles.container}>
                <View style={mstyles.headerContainer}>
                    <Text style = {mstyles.headerLine}>Sportics</Text>
                    <View style={mstyles.textInputContainer}>
                        <TouchableOpacity onPressIn={(e) => props.navigation.navigate("Search")} style={mstyles.searchBar}>
                            <Text style={{color: '#999'}}>Search</Text>
                        </TouchableOpacity>
                        {(user == null)?(
                            <View style={{padding: 20}}>
                                <ActivityIndicator size="small" color={"black"} />
                            </View>
                        ):(
                            <TouchableOpacity onPress={() => props.logout()} style={mstyles.buttonContainer}>
                                <MaterialCommunityIcons name={"exit-to-app"} size={26} color={"black"}  />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <Games navigation={props.navigation} />
                <View style={mstyles.liveMatchesHeader}>
                    <Text style={mstyles.livematches}>Recent Matches</Text>
                    <Text style={mstyles.viewall}>View All</Text>
                </View>
                <View style={{flex: 1}}>
                    <FlatList
                        data={props.recentmatches}
                        renderItem={({item, index}) => <LiveScore item={item} />}
                        keyExtractor={(item, index) => 'F' + index.toString()}
                        listKey={(item, index) => 'F' + index.toString()}
                    />
                </View>
                <View style={mstyles.latestNewsHeader}>
                    <Text style={mstyles.latestNews}>Latest News</Text>
                </View>
            </View>
        )
    }
    return (
        <View style = {styles.container}>
            <View style={styles.headerContainer}>
                <Text style = {styles.headerLine}>Sportics</Text>
                <View style={styles.textInputContainer}>
                    <TouchableOpacity onPressIn={(e) => props.navigation.navigate("Search")} style={styles.searchBar}>
                        <Text style={{color: '#999'}}>Search</Text>
                    </TouchableOpacity>
                    {(user == null)?(
                        <View style={{padding: 20}}>
                            <ActivityIndicator size="small" color={"black"} />
                        </View>
                    ):(
                        <TouchableOpacity onPress={() => props.logout()} style={styles.buttonContainer}>
                            <MaterialCommunityIcons name={"exit-to-app"} size={26} color={"black"}  />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <Games navigation={props.navigation} />
            <View style={styles.liveMatchesHeader}>
                <Text style={styles.livematches}>Recent Matches</Text>
                <Text style={styles.viewall}>View All</Text>
            </View>
            <View style={{flex: 1}}>
                <FlatList
                    data={props.recentmatches}
                    renderItem={({item, index}) => <LiveScore item={item} />}
                    keyExtractor={(item, index) => 'F' + index.toString()}
                    listKey={(item, index) => 'F' + index.toString()}
                    numColumns={2}
                />
            </View>
            <View style={styles.latestNewsHeader}>
                <Text style={styles.latestNews}>Latest News</Text>
            </View>
        </View>
    )
}

const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    headerContainer: {
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLine: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    textInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainer: {
        marginLeft: 15,
    },
    searchBar: {
        minWidth: 150,
        padding: 10,

        borderRadius: 5,
        backgroundColor: '#FFFFFF',

        shadowColor: '#ddd',
        shadowRadius: 5,  
    },
    liveMatchesHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        marginBottom: 10,
    },
    livematches: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewall: {
        color: '#999',
    },
    latestNewsHeader: {
        marginTop: 20,
        paddingHorizontal: 5,
    },
    latestNews: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    headerContainer: {
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLine: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    textInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainer: {
        marginLeft: 15,
    },
    searchBar: {
        minWidth: 150,
        padding: 10,

        borderRadius: 5,
        backgroundColor: '#FFFFFF',

        shadowColor: '#ddd',
        shadowRadius: 5,  
    },
    liveMatchesHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        marginBottom: 10,
    },
    livematches: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewall: {
        color: '#999',
    },
    latestNewsHeader: {
        marginTop: 20,
        paddingHorizontal: 5,
    },
    latestNews: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

const mapStateToProps = (store) => ({
  user: store.user.currentUser,
  recentmatches: store.houses.recentmatches
})
const mapDispatchProps = (dispatch) => bindActionCreators({
  logout
}, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(FeedHeader);
