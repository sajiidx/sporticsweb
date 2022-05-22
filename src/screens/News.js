import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList, Dimensions } from 'react-native'
import NewsHeader from '../components/NewsHeader'

const screenWidth = Dimensions.get('window').width

export default function News(props) {
    const [news, setNEWS] = useState(null)
    const [dateString, setDateString] = useState('')
    
    useEffect(() => {
        setNEWS(props.route.params.news)
        setDateString( new Date(props.route.params.news.creation.seconds*1000).toUTCString() );
    }, [props.route.params.news])

    if(!news){
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={26} color={'#000'} />
            </View>
        )
    }
    if(screenWidth <= 763){
        return (
            <View style={mstyles.container}>
                <FlatList
                    data={news.description}
                    renderItem={({item}) => <Text style={mstyles.text}>{item}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => <NewsHeader news={news} />}
                    ListFooterComponent={() => (<View style={mstyles.footer}>
                        <Text style={mstyles.footertext}>{dateString}</Text>
                        <Text style={mstyles.footertext}>|</Text>
                        <Text style={mstyles.footertext}>{news.related}</Text>
                    </View>)}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={news.description}
                renderItem={({item}) => <Text style={styles.text}>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => <NewsHeader news={news} />}
                ListFooterComponent={() => (<View style={styles.footer}>
                    <Text style={styles.footertext}>{dateString}</Text>
                    <Text style={styles.footertext}>|</Text>
                    <Text style={styles.footertext}>{news.related}</Text>
                </View>)}
            />
        </View>
    )
}

const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    text: {
        marginVertical: 10,
        fontSize: 18,
        fontWeight: '500',
    },
    footer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    footertext: {
        marginVertical: 10,
        marginEnd: 10,
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: '20%',
        backgroundColor: '#fff'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    text: {
        marginVertical: 10,
        fontSize: 18,
        fontWeight: '500',
    },
    footer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    footertext: {
        marginVertical: 10,
        marginEnd: 10,
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    }
})
