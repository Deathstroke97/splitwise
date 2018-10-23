import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { TextInput, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';

class InvolvedElement extends React.Component {
  state = {
    checked: false,
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={styles.text}>{this.props.element.name}</Text>
        </View>
        <View style={{ alignItems: 'right' }}>
          <CheckBox checked={this.props.checked} onPress={this.props.onCheck} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    padding: 10,
  },
});
export default InvolvedElement;
