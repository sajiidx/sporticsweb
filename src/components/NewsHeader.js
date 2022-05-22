import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { getMeta } from '../functions'

export default function NewsHeader(props) {
    const [news, setNEWS] = useState(props.news)
    const [dimension, setDimension] = useState({})

    

    useEffect(() => {
        getMeta(news.image, (width, height) => setDimension(width, height))
        setNEWS(news)
    }, [props.news])

    return (
        <View style={styles.container}>
            <View style={styles.highlights}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{news.title}</Text>
                </View>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>{news.subtitle}</Text>
                </View>
            </View>
            <View style={styles.visuals}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: news.image }} style={styles.image}/>
                </View>
                <View style={styles.captionContainer}>
                    <Text style={styles.caption}>{news.caption}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    highlights: {
        marginVertical: 5
    },
    titleContainer: {
        marginVertical: 5
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000'
    },
    subtitleContainer: {
        marginVertical: 5
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#333',
    },
    visuals: {
        marginVertical: 5,
        justifyContent: 'center',
        alignItems:'center'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 800,
        height: 500,
    },
    captionContainer: {

    },
    caption: {
        fontSize: 13,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#333'
    }
})
