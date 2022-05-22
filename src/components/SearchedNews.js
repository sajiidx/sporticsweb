import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import { timeDifference } from '../functions'

const screenWidth = Dimensions.get('window').width

export default function SearchedNews({news, navigation}) {
    if(screenWidth <= 560){
        return (
            <View style={mstyles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("News", {news})}>
                    <View style={mstyles.detailsContainer}>
                        <View style={mstyles.imageContainer}>
                            <Image source={{uri: news.image}} style={mstyles.image} />
                        </View>
                        <View style={mstyles.textContiainer}>
                            <View>
                                <Text style={mstyles.title}>{news.title}</Text>
                                <Text style={mstyles.subtitle}>{news.subtitle}</Text>
                            </View>
                            <View style={mstyles.metaContainer}>
                                <View>
                                    <Text style={mstyles.fadedText}>{timeDifference(new Date(), new Date(news.creation.seconds*1000))}</Text>
                                </View>
                                <View>
                                    <Text style={mstyles.fadedText}>{news.related}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("News", {news})}>
                <View style={styles.detailsContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: news.image}} style={styles.image} />
                    </View>
                    <View style={styles.textContiainer}>
                        <View>
                            <Text style={styles.title}>{news.title}</Text>
                            <Text style={styles.subtitle}>{news.subtitle}</Text>
                        </View>
                        <View style={styles.metaContainer}>
                            <View>
                                <Text style={styles.fadedText}>{timeDifference(new Date(), new Date(news.creation.seconds*1000))}</Text>
                            </View>
                            <View>
                                <Text style={styles.fadedText}>{news.related}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
  )
}

const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        margin: 5
    },
    detailsContainer: {
        display: 'flex',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 200
    },
    textContiainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    metaContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 14,
        fontWeight: '800'
    },
    subtitle: {
        fontSize: 11,
        fontWeight: '300',
        color: '#333',
        fontStyle: 'italic'
    },
    fadedText: {
        color: '#999'
    },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        margin: 5
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 100
    },
    textContiainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    metaContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        fontStyle: 'italic'
    },
    fadedText: {
        color: '#999'
    },
})
