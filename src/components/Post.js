import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { timeDifference } from '../functions';

const screenWidth = Dimensions.get("window").width



function Post({item, navigation}) {
    if(screenWidth <= 763){
        return (
            <TouchableOpacity style={mstyles.container} onPress={() => navigation.navigate("News", {news: item})}>
                <View style={mstyles.imageContainer}>
                    <Image source={{uri: item.image}} style={mstyles.image} />
                </View>
                <View style={mstyles.textContainer}>
                    <Text style={mstyles.title}>{item.title}</Text>
                    <Text style={mstyles.subtitle}>{item.subtitle}</Text>
                    <View style={mstyles.textFooter}>
                        <View>
                            <Text style={mstyles.time}>{timeDifference(new Date(), new Date(item.creation.seconds * 1000))}</Text>
                        </View>
                        <View>
                            <Text style={mstyles.relatedto}>{item.related}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("News", {news: item})}>
            <View style={styles.imageContainer}>
                <Image source={{uri: item.image}} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <View style={styles.textFooter}>
                    <View>
                        <Text style={styles.time}>{timeDifference(new Date(), new Date(item.creation.seconds * 1000))}</Text>
                    </View>
                    <View>
                        <Text style={styles.relatedto}>{item.related}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',

        marginHorizontal: 25,
        marginVertical: 10,
        overflow: 'hidden',

        shadowColor: '#ddd',
        shadowRadius: 5,
        borderRadius: 5  
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        fontStyle: 'italic'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: "100%",
        height: 300,
    },
    textContainer: {
    },
    textFooter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        color: '#999'
    },
    relatedto: {
        color: '#999'
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1/2,
        padding: 20,
        backgroundColor: '#FFFFFF',

        marginHorizontal: 25,
        marginVertical: 10,
        overflow: 'hidden',

        shadowColor: '#ddd',
        shadowRadius: 5,
        borderRadius: 5  
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        fontStyle: 'italic'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: "100%",
        height: 400,
    },
    textContainer: {
    },
    textFooter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        color: '#999'
    },
    relatedto: {
        color: '#999'
    }
})

export default Post;
