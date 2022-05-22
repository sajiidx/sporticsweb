import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
// import {VictoryBar,VictoryChart, VictoryTheme, VictoryPolarAxis} from 'victory-native';


export function Statistics(props) {
    const [activeSections, setActiveSections] = useState([]);
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
    if(data.length == 0){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                <ActivityIndicator size="large" color="black" />
            </View>
        )
    }
    return (
        <ScrollView style={{flex: 1, backgroundColor: "#fff"}}>
        <View style={styles.container}>
            <Accordion
                sections={data}
                activeSections={activeSections}
                containerStyle={{overflow: 'hidden'}}
                renderHeader={(section) => {
                    return (
                    <View style={styles.header}>
                        <View style={styles.houseContainer}>
                            <View style={styles.logoContainer}>
                                <Image source={section.logo} style={styles.logo}/>
                            </View>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.headerText}>  {section.title}</Text>
                            </View>
                        </View>
                        <View style={styles.pointContainer}>
                            <Text style={styles.points}>{section.points}</Text>
                        </View>
                    </View>
                    );
                }}
                renderContent={(section) => {
                    return (
                        <View>
                        <View style={styles.contentContainer}>
                            {/* <View style={styles.chartContainer}>
                                <VictoryChart polar
                                    theme={VictoryTheme.material}
                                    >
                                    {
                                        props.games.map((d, i) => {
                                        return (
                                            <VictoryPolarAxis dependentAxis
                                            key={i}
                                            label={d.name}
                                            labelPlacement="perpendicular"
                                            style={{ tickLabels: { fill: "none" } }}
                                            axisValue={d.name}
                                            />
                                        );
                                        })
                                    }
                                    <VictoryBar
                                        style={{ data: { fill: "maroon", width: 25 } }}
                                        data={props.games.map((d, i) => {
                                            const score = props.teams.filter(t => t.gid == d.id && t.hid==section.id)[0];
                                            let y = 0.0;
                                            if(score != undefined) {
                                                if(score.matchesPlayed != 0)
                                                    y = score.win / score.matchesPlayed;
                                            }
                                            return {
                                                x: d.name, y: y
                                            }
                                        })}
                                    />
                                    </VictoryChart>
                                <VictoryChart domainPadding={{ x: 15 }}>
                                    <VictoryBar
                                        data={props.games.map((d, i) => {
                                            const score = props.teams.filter(t => t.gid == d.id && t.hid==section.id)[0];
                                            let y = 0.5;
                                            if(score != undefined) {
                                                y = score.win;
                                            }
                                            return {
                                                x: d.name, y: y
                                            }
                                        })}
                                        style={{
                                        data: { fill: "purple", width: 12 }
                                        }}
                                    />
                                </VictoryChart>
                            </View> */}
                        </View>
                        </View>
                    );
                }}

                onChange={(section) => {
                    setActiveSections(section)
                }}
                underlayColor={"#ddd"}
                expandMultiple={false}
            />
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        marginHorizontal: 15,

        borderRadius: 5,

        shadowColor: '#ddd',
        shadowRadius: 2,  
    },
    houseContainer: {
        flex: 0.5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
    },
    pointsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    points: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    contentContainer: {
    },
    chartContainer: {
    }
})

const mapStateToProps = (store) => ({
    houses: store.houses.houses,
    games: store.houses.games,
    teams: store.houses.teams
})
export default connect(mapStateToProps, null)(Statistics);

//https://snack.expo.dev/@meher/react-native-calendars-example