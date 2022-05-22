import React from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import Game from './Game';
const screenWidth = Dimensions.get('window').width
function Games(props) {
    if(screenWidth <= 763){
        return (
            <View style={mstyles.container}>
                <FlatList
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={props.games}
                    renderItem={({item}) => (<Game item={item} navigation={props.navigation} />)}
                    keyExtractor={(item, index) => 'G' + index.toString()}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={props.games}
                renderItem={({item}) => (<Game item={item} navigation={props.navigation} />)}
                keyExtractor={(item, index) => 'G' + index.toString()}
                listKey={(item, index) => 'G' + index.toString()}
                numColumns={7}
            />
        </View>
    )
}

const mstyles = StyleSheet.create({
    container: {
        paddingVertical: 15,
    }
})

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
    }
})

const mapStateToProps = (store) => ({
    games: store.houses.games
})
export default connect(mapStateToProps, null)(Games);
