import React, {useState} from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import FeedHeader from './FeedHeader';
import Post from './Post';

const screenWidth = Dimensions.get('window').width

function Posts(props) {
    const [news, setNews] = useState(props.news)
    React.useEffect(()=>{
        setNews(props.news);
    },[props.news])
    if(screenWidth <= 763){
        return (
            <View style={mstyles.container}>
                <FlatList
                    data={news}
                    renderItem={({item}) => (<Post item={item} navigation={props.navigation} />)}
                    keyExtractor={(item, index) => 'P' + index.toString()}
                    listKey={(item, index) => 'P' + index.toString()}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={<FeedHeader navigation={props.navigation} />}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={news}
                renderItem={({item}) => (<Post item={item} navigation={props.navigation} />)}
                keyExtractor={(item, index) => 'P' + index.toString()}
                listKey={(item, index) => 'P' + index.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={<FeedHeader navigation={props.navigation} />}
                numColumns={2}
            />
        </View>
        
    )
}
const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
const mapStateToProps = (store) => ({
    games: store.houses.games,
    news: store.houses.news
})
export default connect(mapStateToProps, null)(Posts);
