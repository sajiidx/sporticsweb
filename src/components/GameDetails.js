import React from 'react'
import {View, Text, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function GameDetails({item, index}) {
    return (
        <View style={styles.tableRow}>
                <View style={styles.tableLeftHeader}>
                    <View style={{paddingLeft: 30}}>
                        <MaterialCommunityIcons name={item.icon} color={"grey"} size={26} />
                    </View>
                    <View style={{paddingLeft: 10}}>
                        <Text style={styles.team}>{item.name}</Text>
                    </View>
                </View>
                <View style={styles.tableRightHeader}>
                    <View style={styles.tableCell}>
                        <Text style={styles.tableCellText}>{item.matchesPlayed}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text style={styles.tableCellText}>{item.win}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text style={styles.tableCellText}>{item.loss}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text style={styles.tableCellText}>{item.draw}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text style={styles.tableCellText}>{item.points}</Text>
                    </View>
                </View>
            </View>
    )
}
const styles =StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        padding: 5,
        margin: 5,
    },
    headerText:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    seeall:{
        color: '#999',
    },
    tableHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    tableLeftHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    tableRightHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    tableHeaderText: {
        padding: 5,
        margin: 5,
        fontWeight: 'bold',
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingVertical: 2,
        marginVertical: 2,
        marginHorizontal: 5
    },
    tableCell: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 40,
    },
    tableHeaderCell: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
    },
    tableCellText: {
        padding: 5,
        margin: 5,
        marginHorizontal: 7,
        fontWeight: 'normal',
        fontSize: 14,
    },
    team: {
        fontWeight: 'normal'
    },
    houseLogoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    houseLogo: {
        width: 30,
        height: 30
    }
})

export default GameDetails
