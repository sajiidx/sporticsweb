import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import Match from '../components/Match';
import Post from '../components/Post';

const screenWidth = Dimensions.get('window').width

export function Game(props) {
    if(props.teams.length == 0 || props.matches.length == 0 || props.games.length == 0){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                <Text>No Results Found!</Text>
            </View>
        )
    }
    console.log(props);
    const [game, setGame] = useState(props.route.params.game);
    const [matches, setMatches] = useState(props.matches.filter(m =>{
        if(props.teams.includes(t => game.id == t.gid))
            return (m.teamAID == props.teams.filter(t => game.id == t.gid)[0].id);
        }));
    React.useEffect(()=>{
        try{
            setMatches(props.matches.filter(m => m.teamAID == props.teams.filter(t => game.id == t.gid)[0].id));
        }catch(error){
            console.log(error)
        }
    },[])
    if(screenWidth <= 763){
        return (
            <View style={{flex: 1, padding: 10, backgroundColor: "#fff"}}>
                <View style={mstyles.sectionHeaderContainer}>
                    <Text style={mstyles.sectionHeader}>{game.name.toLocaleUpperCase()}'s Matches</Text>
                </View>
                <View>
                    <FlatList
                        data={matches}
                        renderItem={({item, index}) => (<Match match={item} index={index} />)}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                                <Text>No Results Found!</Text>
                            </View>
                        )}
                    />
                </View>
                <View style={mstyles.sectionHeaderContainer}>
                    <Text style={mstyles.sectionHeader}>{game.name.toLocaleUpperCase()}'s News</Text>
                </View>
                <View>
                    <FlatList
                        data={props.news.filter((news) => news.related.toLowerCase() == game.name.toLowerCase())}
                        renderItem={({item}) => <Post item={item} navigation={props.navigation} />}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                                <Text>No Results Found!</Text>
                            </View>
                        )}
                    />
                </View>
                
            </View>
        )
    }
    return (
        <View style={{flex: 1, padding: 10, backgroundColor: "#fff"}}>
            <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeader}>{game.name.toLocaleUpperCase()}'s Matches</Text>
            </View>
            <View>
                <FlatList
                    data={matches}
                    renderItem={({item, index}) => (<Match match={item} index={index} />)}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                            <Text>No Results Found!</Text>
                        </View>
                    )}
                    numColumns={2}
                />
            </View>
            <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeader}>{game.name.toLocaleUpperCase()}'s News</Text>
            </View>
            <View>
                <FlatList
                    data={props.news.filter((news) => news.related.toLowerCase() == game.name.toLowerCase())}
                    renderItem={({item}) => <Post item={item} navigation={props.navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                            <Text>No Results Found!</Text>
                        </View>
                    )}
                    numColumns={2}
                />
            </View>
            
        </View>
    )
}

const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionHeaderContainer: {
        padding: 20
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionHeaderContainer: {
        padding: 20
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})
const mapStateToProps = (store) => ({
    games: store.houses.games,
    matches: store.houses.matches,
    houses: store.houses.houses,
    teams: store.houses.teams,
    news: store.houses.news
})
export default connect(mapStateToProps, null)(Game);
