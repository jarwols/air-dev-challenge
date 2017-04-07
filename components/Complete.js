import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions,
  TouchableOpacity
} from 'react-native';

export default class Complete extends Component {

  constructor(props) {
    super(props); 
  }

  _navigate() {
    this.props.navigator.resetTo({
      name: 'Home'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContent}>Ayy! You did it!</Text> 
        <Text style={{fontSize: 82}}>👍</Text>
        <TouchableOpacity style={styles.footer} onPress={() => this._navigate()}>
          <Text style={styles.prompt}>Do it again!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCA1FD',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContent: {
    fontFamily: 'Gotham Rounded',
    color: 'white',
    fontSize: 32,
    marginBottom: 40
  },
  footer: {
    flex: 0,
    height: 80,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0
  },
  prompt: {
    fontFamily: 'Gotham Rounded',
    fontSize: 22,
    color: '#BCA1FD',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('Complete', () => Complete);
