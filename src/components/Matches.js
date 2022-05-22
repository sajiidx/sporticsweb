import React, {useState} from 'react'
import { Text, FlatList, View} from 'react-native'
import Match from './Match'
import { connect } from 'react-redux';
import { getDate } from '../functions';

function Matches(props) {
    const [matches, setMatches] = useState(props.matches.filter((match)=> getDate(match.startTime.seconds) == props.FlatListselectedDate));
    React.useEffect(()=>{
        setMatches(props.matches.filter((match)=> getDate(match.startTime.seconds) == props.selectedDate))
    },[props.selectedDate])
    if(matches.length == 0){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>No Match On This Day</Text>
            </View>
        )
    }
    return (
        <View styles={{padding: 10}}>
            <FlatList
                data={matches}
                renderItem={({item, index}) => (<Match selectedDate={props.selectedDate} match={item} index={index} />)}
                keyExtractor={(item, index) => 'M' + index.toString()}
                listKey={(item, index) => 'M' + index.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const mapStateToProps = (store) => ({
    games: store.houses.games,
    matches: store.houses.matches,
    houses: store.houses.houses,
    teams: store.houses.teams
})
export default connect(mapStateToProps, null)(Matches);