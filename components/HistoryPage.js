import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { TextInput, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { Toolbar, ToolbarContent } from 'react-native-paper';
class HistoryPage extends React.Component {
  // renderItem = ({ item }) => {
  //   <View style={styles.container}>
  //     <View>
  //       <Text style={styles.text}>{item.event}</Text>
  //     </View>
  //     <View>
  //       <Text style={styles.text}>
        
  //         {item.whoPaid.name === this.props.touchedFriend.name
  //           ? 'he lended' + item.cost
  //           : 'he borrowed' + item.cost}
  //       </Text>
  //     </View>
  //   </View>;
  // };

  render() {
    if (this.props.data.length == 0) {
      return (
        <View style={{ marginTop: 100 }}>
          <Text style={{ textAlign: 'center' }}>
            You do not have any bills with that friend
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              this.props.onSwitchPage('Home');
            }}>
            <Text>Go to Home</Text>
          </TouchableOpacity>
        </View>
      );
    }
    //console.log('Touched friend: ', this.props.friend.name);
    //console.log('WHOPAID: ', this.props.data[0].whoPaid.name);
    return (
      <View>
        <Toolbar>
          <ToolbarContent title="History" />
        </Toolbar>
        <FlatList
          data={this.props.data}
          renderItem={({ item }) => {
            // console.log('-', item.whoPaid.name);
            // console.log('+', this.props.friend.name);
            return (<View style={styles.container}>
              <View>
                <Text style = {{fontSize: 20, padding: 10}}>{item.event}</Text>
              </View>
              <View>
                <Text style = {styles.text}>
                  {item.whoPaid.name === this.props.friend.name
                    ? 'he lended ' + item.total + ' tg'
                    : 'he borrowed ' + item.cost + ' tg'}
                </Text>
              </View>
            </View>)
          }}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            this.props.onSwitchPage('Home');
          }}>
          <Text>Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    padding: 10,
    fontSize: 20,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  addButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
export default HistoryPage;
