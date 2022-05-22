import React, {useState} from 'react'
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import Row from './Row';

export function HouseStandingsTable(props) {
    const [data, setData] = useState([]);
    React.useEffect(()=>{
        setData(props.houses.map((house) => {
            let houseStats = props.teams.filter((team) => team.hid == house.id);
            let total = {matchesPlayed: 0,win: 0,loss: 0,draw: 0,points: 0}
            for(var i = 0; i< houseStats.length; i++){
                total.win += houseStats[i].win;
                total.loss += houseStats[i].loss;
                total.matchesPlayed += houseStats[i].matchesPlayed;
                total.draw += houseStats[i].draw;
                total.points += houseStats[i].points;
            }
            return {
                ...house,
                ...total
            }
        }));
    },[props.teams, props.houses])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Standings</Text>
                <Text style={styles.seeall}>View All</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <View style={styles.tableLeftHeader}>
                        <Text style={styles.tableHeaderText}>House</Text>
                    </View>
                    <View style={styles.tableRightHeader}>
                        <View style={styles.tableHeaderCell}>
                            <Text style={styles.tableHeaderText}>MP</Text>
                        </View>
                        <View style={styles.tableHeaderCell}>
                            <Text style={styles.tableHeaderText}>W</Text>
                        </View>
                        <View style={styles.tableHeaderCell}>
                            <Text style={styles.tableHeaderText}>L</Text>
                        </View>
                        <View style={styles.tableHeaderCell}>
                            <Text style={styles.tableHeaderText}>D</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.tableHeaderText}>Pts</Text>
                        </View>

                    </View>
                </View>
                {(data.length == 0)?(
                    <View>
                        <ActivityIndicator size="large" color="black" />
                    </View>
                ):(
                    <View>
                        <FlatList
                            data={data.sort((a, b) => a.points < b.points)}
                            renderItem={({item, index}) => (<Row item={item} index={index} teams={props.teams} games={props.games} /> )}
                            keyExtractor={(item, index) => 'S' + index.toString()}
                            listKey={(item, index) => 'S' + index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                )}
                
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

const mapStateToProps = (store) => ({
    houses: store.houses.houses,
    teams: store.houses.teams,
    games: store.houses.games
})
export default connect(mapStateToProps, null)(HouseStandingsTable);