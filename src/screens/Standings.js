import React from 'react'
import { View, Text, StyleSheet,Image, ScrollView } from 'react-native'
import  LiveScore from '../components/LiveScore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HouseStandingsTable from '../components/HouseStandingsTable';

import {
    loadHouses,
    loadTeams
 } from '../redux/actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export function Standings(props) {
    return (
        <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.left}>
                    <View style={styles.logoContainer}>
                        <Image source={require("../assests/sportics_logo.jpg")} style={styles.logo} />
                    </View>
                    <View style={styles.eventContainer}>
                        <Text style={styles.titlecontainer}>League of Glory</Text>
                        <Text style={styles.titlecontainer}>2021</Text>
                    </View>
                </View>
                
                <View style={styles.right}>
                     <MaterialCommunityIcons name="dots-horizontal" color ={"black"} size={30} />
                </View>
            </View>
            <HouseStandingsTable/>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 80,
        padding: 20,
    },
    headerContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        padding: 10
    },
    left:{
        flex:1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',

    },
    right:{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems: 'center',
    },
    titlecontainer:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    eventContainer:{
        marginLeft:5,
    },
    logoContainer:{
        marginRight: 5,
    },
    logo:{
        width: 65,
        height: 65,

    }
})

const mapDispatchProps = (dispatch) => bindActionCreators({
    loadHouses,
    loadTeams
}, dispatch);
export default connect(null, mapDispatchProps)(Standings);