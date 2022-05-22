import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width

function Game({item, navigation}) {
    if(screenWidth <= 763){
        return (
            <View style={mstyles.container}>
                <TouchableOpacity style={mstyles.touchable} onPress={()=> navigation.navigate("Game", { game: item })}>
                    <MaterialCommunityIcons name={item.icon} color ={"grey"} size={30} />
                    <Text style={mstyles.name}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchable} onPress={()=> navigation.navigate("Game", { game: item })}>
                <MaterialCommunityIcons name={item.icon} color ={"grey"} size={30} />
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 5,

        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1,
        
        shadowColor: '#ddd',
        shadowRadius: 5,
    },
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1/7,
        backgroundColor: '#FFFFFF',
        margin: 5,

        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1,
        
        shadowColor: '#ddd',
        shadowRadius: 5,
    },
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default Game;
