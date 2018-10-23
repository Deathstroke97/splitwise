import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { TextInput, TouchableOpacity } from 'react-native';
import { Toolbar, ToolbarContent } from 'react-native-paper';

class AddFriends extends React.Component {
  state = {
    friend: '',
  };
  handleChangeText = text => {
    this.setState({ friend: text });
  };

  handleAddFriend = () => {
    this.props.addFriend(this.state.friend);
    this.props.onSwitchPage('Home');
  };
  render() {
    return (
      <View>
        <Toolbar>
          <ToolbarContent title="Add a friend" />
        </Toolbar>

        <TextInput
          style={styles.textInput}
          value={this.state.friend}
          onChangeText={this.handleChangeText}
        />

        <TouchableOpacity
          onPress={this.handleAddFriend}
          style={styles.addButton}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  addButton: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  textInput: {
    marginTop: 40,
    height: 44,
    borderColor: 'black',
    borderWidth: 1,
  },
});
export default AddFriends;
