/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class MarvelMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchView}>
          <Text style={styles.header}>
            Marvel
          </Text>
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={(text) => this.setState({text})}
          />
        </View>
        <View>
          <Text style={styles.welcome}>
            Learn about your favorite <Text style={styles.marvel}>Marvel</Text> characters 
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'black',
  },
  welcome: {
    color: '#f0141e',
    fontFamily: 'Bebas',
    fontSize: 15,
    margin: 10,
    paddingTop: 20,
    textAlign: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#f0141e',
    marginBottom: 5,
    fontFamily: 'Bebas'
  },
  marvel: {
    color: 'white'
  },
  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20
  },
  header: {
    color: '#f0141e',
    fontFamily: 'Bebas',
    alignSelf: 'flex-start',
    fontSize: 20
  },
  searchBar: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    fontFamily: 'Bebas',
    height: 30,
    width: 100,
    paddingLeft: 5
  }
});

AppRegistry.registerComponent('MarvelMobile', () => MarvelMobile);
