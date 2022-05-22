import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { getDate, getTime } from '../functions';

export function Match(props) {
    const [houseA, setHouseA] = useState(null);
    const [houseB, setHouseB] = useState(null)
    const [sports, setSports] = useState(null);

    useEffect(async () => {
        setHouseA(props.houses.filter(h => {
            try {
                return h.id == props.teams.filter(x => x.id == props.match.teamAID)[0].hid;
            } catch(err){
                return false;
            }
        })[0]);
        setHouseB(props.houses.filter(h => {
            try{
                return h.id == props.teams.filter(x => x.id == props.match.teamBID)[0].hid;
            } catch(err){
                return false
            }
        })[0])
        setSports(props.games.filter(g => {
            try{
                return g.id == props.teams.filter(x => x.id == props.match.teamBID)[0].gid
            }catch(err){
                return false
            }
        })[0]);
    }, [props.selectedDate, props.match])

    if(houseA == null || houseB == null){
        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color={"black"} />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.leftTeam}>
                <View style={styles.logoContainer}>
                    <Image source={{uri: houseA.logo}} style={styles.logo}/>
                </View>
                <View style={styles.leftScoreContainer}>
                    <Text style={styles.teamname} numberOfLines={1}>
                    {houseA.title.length < 12
                ? `${houseA.title}`
                : `${houseA.title.substring(0, 12)}...`}</Text>
                </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#999'}}>{sports.name.charAt(0).toUpperCase() + sports.name.slice(1)}</Text>
                <Text style={styles.score}>VS</Text>
                <Text style={{color: '#999'}}>{getDate(props.match.startTime.seconds) +" "+ getTime(props.match.startTime.seconds)}</Text>
            </View>
            <View style={styles.rightTeam}>
                <View style={styles.logoContainer}>
                    <Image source={{uri: houseB.logo}} style={styles.logo}/>
                </View>
                <View style={styles.rightScoreContainer}>
                    <Text style={styles.teamname} numberOfLines={1}>
                    {houseB.title.length < 12
                ? `${houseB.title}`
                : `${houseB.title.substring(0, 12)}...`}</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 5,
        shadowColor: '#ddd',
        shadowRadius: 5,  
        margin: 10,
    },
    leftTeam: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        margin: 5,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    logo: {
        width: 50,
        height: 50,
    },
    leftScoreContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    rightTeam: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        margin: 5,
    },
    rightScoreContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    teamname: {
        fontSize: 18,
        fontWeight: 'normal',
    },
    score: {
        fontSize: 24,
        fontWeight: 'bold',
    }
})

const mapStateToProps = (store) => ({
    games: store.houses.games,
    houses: store.houses.houses,
    teams: store.houses.teams
})
export default connect(mapStateToProps, null)(Match);