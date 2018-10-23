import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { TextInput, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';

class Friend extends React.Component {
  state = {};

  history = () => {
    this.props.onPress(this.props.adventure);
    this.props.setWhichFriendTouched(this.props.friend);
   };

  howMuch = () => {
    console.log('You owe: ', this.props.friends[0].owe, ' firend ', this.props.friend.isOwed );
    // console.log(this.props.friend.name, ' isOwed: ', this.props.friend.isOwed );
    if (this.props.friends[0].owe == 0 && this.props.friend.isOwed == 0) {
      return <Text> {'no expenses'} </Text>
    }
    else if (this.props.friends[0].owe - Math.abs(this.props.friend.isOwed) == 0) {
      return <Text> { 'splitted up'} </Text>
    }
    else if (this.props.friends[0].owe - Math.abs(this.props.friend.isOwed)  < 0) {
      return <Text> { 'you owe' + Number(this.props.friends[0].owe)}  </Text>
    }
    else {
      return <Text> { 'you are owed' + Number(this.props.friends[0].isOwed) } </Text>
    }
  }

  render() {
   // console.log('Object YOU:' ,this.props.friends[0] )
   console.log('rerender')
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', width: 24, height: 40 }}
        onPress={this.history}>
        <View style={{ width: 200 }}>
          <Text style={styles.text}>{this.props.friend.name}</Text>
        </View>
        <View style={{ width: 200 }}>
          {this.howMuch()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    padding: 10,
    fontSize: 15,
  },
});

export default Friend;
