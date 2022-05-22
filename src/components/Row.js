import React, {useState, useEffect} from 'react'
import {View, Text, Image, Button, StyleSheet, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import GameDetails from './GameDetails';

function Row({item, index, teams, games}) {
    const [hideDetails, setHideDetails] = useState(true);
    const [stats, setStats] = useState([]);
    useEffect(()=>{
        setStats(games.map((game, index) => {
            let gameStats = teams.filter((team) => team.hid == item.id && team.gid == game.id);
            let total = {matchesPlayed: 0,win: 0,loss: 0,draw: 0,points: 0}
            for(var i = 0; i< gameStats.length; i++){
                total.win += gameStats[i].win;
                total.loss += gameStats[i].loss;
                total.matchesPlayed += gameStats[i].matchesPlayed;
                total.draw += gameStats[i].draw;
                total.points += gameStats[i].points;
            }
            return {
                ...game,
                ...total
            }
        }));
    },[item, teams])
    return (
        <ScrollView>
            <TouchableOpacity style={styles.tableRow} onPress={() => setHideDetails(!hideDetails)}>
                <View style={styles.tableLeftHeader}>
                    <View>
                        <Text style={styles.team}>{index + 1}    </Text>
                    </View>
                    <View style={styles.houseLogoContainer}>
                        <Image source={item.logo} style={styles.houseLogo} />
                    </View>
                    <View>
                        <Text style={styles.team}>   {item.title}</Text>
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
            </TouchableOpacity>
            {(!hideDetails)?(
                <FlatList
                    data={stats}
                    renderItem={({item, index}) => (<GameDetails item={item} index={index} /> )}
                    keyExtractor={(item, index) => 'R' + index.toString()}
                    listKey={(item, index) => 'R' + index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            ):(
                <View></View>
            )}
            
        </ScrollView>
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

export default Row
