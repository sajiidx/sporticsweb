import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { getDate, getTime } from '../functions';

const screenWidth = Dimensions.get('window').width

export function LiveScore(props) {
    const [houseA, setHouseA] = useState(null);
    const [houseB, setHouseB] = useState(null)
    const [sports, setSports] = useState(null);

    useEffect(async () => {
        setHouseA(props.houses.filter(h => {
            try {
                return h.id == props.teams.filter(x => x.id == props.item.teamAID)[0].hid;
            } catch(err){
                return false;
            }
        })[0]);
        setHouseB(props.houses.filter(h => {
            try{
                return h.id == props.teams.filter(x => x.id == props.item.teamBID)[0].hid;
            } catch(err){
                return false
            }
        })[0])
        setSports(props.games.filter(g => {
            try{
                return g.id == props.teams.filter(x => x.id == props.item.teamBID)[0].gid
            }catch(err){
                return false
            }
        })[0]);
    }, [props.selectedDate, props.item])
    if(houseA == null || houseB == null){
        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color={"black"} />
            </View>
        )
    }
    if(screenWidth <= 763){
        return (
            <View style={mstyles.container}>
                <View>
                    <Text style={mstyles.fadedText}>{sports.name}</Text>
                </View>
                <View style={mstyles.detailsContainer}>
                    <View style={mstyles.leftTeam}>
                        <View style={mstyles.logoContainer}>
                            <Image source={{uri: houseA.logo}} style={mstyles.logo}/>
                        </View>
                        <View style={mstyles.leftScoreContainer}>
                            <Text style={mstyles.teamname}>{houseA.title}</Text>
                            <Text style={mstyles.score}>{props.item.scoreA | 0}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{...mstyles.score, justifyContent: 'flex-end', alignSelf: 'flex-end'}}>vs</Text>
                    </View>
                    <View style={mstyles.rightTeam}>
                        <View style={mstyles.logoContainer}>
                            <Image source={{uri: houseB.logo}} style={mstyles.logo}/>
                        </View>
                        <View style={mstyles.rightScoreContainer}>
                            <Text style={mstyles.teamname}>{houseB.title}</Text>
                            <Text style={mstyles.score}>{props.item.scoreB | 0}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={mstyles.fadedText}>{getDate(props.item.startTime.seconds) + " " + getTime(props.item.endTime.seconds)}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.fadedText}>{sports.name}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.leftTeam}>
                    <View style={styles.logoContainer}>
                        <Image source={{uri: houseA.logo}} style={styles.logo}/>
                    </View>
                    <View style={styles.leftScoreContainer}>
                        <Text style={styles.teamname}>{houseA.title}</Text>
                        <Text style={styles.score}>{props.item.scoreA | 0}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{...styles.score, justifyContent: 'flex-end', alignSelf: 'flex-end'}}>vs</Text>
                </View>
                <View style={styles.rightTeam}>
                    <View style={styles.logoContainer}>
                        <Image source={{uri: houseB.logo}} style={styles.logo}/>
                    </View>
                    <View style={styles.rightScoreContainer}>
                        <Text style={styles.teamname}>{houseB.title}</Text>
                        <Text style={styles.score}>{props.item.scoreB | 0}</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.fadedText}>{getDate(props.item.startTime.seconds) + " " + getTime(props.item.endTime.seconds)}</Text>
            </View>
        </View>
    )
}


const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        padding: 5,
        shadowColor: '#ddd',
        shadowRadius: 5,
        margin: 5
    },
    detailsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },
    fadedText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#999'
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1/2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        padding: 5,
        shadowColor: '#ddd',
        shadowRadius: 5,
        margin: 5
    },
    detailsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },
    fadedText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#999'
    }
})

const mapStateToProps = (store) => ({
    games: store.houses.games,
    houses: store.houses.houses,
    teams: store.houses.teams
})
export default connect(mapStateToProps, null)(LiveScore);