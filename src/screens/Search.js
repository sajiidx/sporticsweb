import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase/compat'
import SearchedNews from '../components/SearchedNews';

function Search(props) {
    const [search, setSearch] = useState('');
    const [ms, setMS] = useState([])

    useEffect(() => {
        let matchingStrings = [];
        props.news.map(ns => ns.description).forEach((list, index) => {
            try{
                list.forEach((paragraph) => {
                    if (paragraph.toLocaleLowerCase().search(search.toLocaleLowerCase()) > -1) {
                        matchingStrings.push(props.news[index])
                        throw "break"
                    }
                    
                })
            }catch(err){
                console.log(err)
            }
        })
        setMS(matchingStrings)
        console.log(ms);
    }, [search])

    return (
        <View style={styles.container}>
            <View>
                <TextInput style={styles.searchBar} placeholder='Search' value={search} onChangeText={(value) => setSearch(value)} />
            </View>
            <View>
                <FlatList
                    data={ms}
                    renderItem={({item}) => <SearchedNews news={item} navigation={props.navigation}/>}
                    keyExtractor={(item, index) => 'N' + index.toString()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    searchBar: {
        padding: 10,
        color: '#999'
    }
})

const mapStateToProps = (store) => ({
    news: store.houses.news
})
export default connect(mapStateToProps, null)(Search);
