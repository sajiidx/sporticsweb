import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import Match from '../components/Match';
import Matches from '../components/Matches';
import { getDate } from '../functions';

export function CalendarView(props) {
    const [matches, setMatches] = useState(props.matches.filter((match)=> getDate(match.startTime.seconds) == selectedDate));
    const [selectedDate, setSelectedDate] = useState("2021-12-21");
    const [markedDates, setMarkedDates] = useState([])
    
    React.useEffect(()=>{
        if(props.matches.length != 0){
            setMarkedDates(props.matches.reduce((result, curr, index, array)=> ({
                ...result,
                [getDate(curr.startTime.seconds)]: {marked: true, dotColor: 'red'}
            }),{}));
        }
    },[props.matches, matches, selectedDate])
    return (
        <View style={styles.container}>
            <Calendar
                minDate={'2010-05-10'}
                maxDate={'2100-05-30'}
                onDayPress={async day => {
                    setSelectedDate(day.dateString);
                    setMatches(props.matches.filter((match)=> {
                        return getDate(match.startTime.seconds) == selectedDate
                    }));
                }}
                monthFormat={'MMM yyyy'}
                onMonthChange={month => {
                    console.log('month changed', month);
                }}
                hideExtraDays={true}
                hideArrows={false}
                disableMonthChange={false}
                firstDay={1}
                markedDates={{
                    ...markedDates,
                    [selectedDate]: {selected: true, selectedColor: 'black'},
                }}
            />
            <Matches selectedDate={selectedDate} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    matches: {
        margin: 10,
        padding: 10,
    }
})

const mapStateToProps = (store) => ({
    games: store.houses.games,
    matches: store.houses.matches,
    houses: store.houses.houses,
    teams: store.houses.teams
})
export default connect(mapStateToProps, null)(CalendarView);

//https://snack.expo.dev/@meher/react-native-calendars-example