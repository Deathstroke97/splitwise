import React, { Component } from 'react';
import R from 'ramda';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { TextInput, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import InvolvedElement from './InvolvedElement';
import PaidList from './PaidList';

let temp = 0;
class Event extends React.Component {
  state = {
    chosen: [],
    amount: 0,
    description: '',
    involvedFriends: [-1],
    whoPay: {},
  };

  handleChangeAmount = num => {
    this.props.amount(num);
  };
  setWhoPay = friend => {
    this.props.whoPay(friend);
  };

  handleChangeDescription = desc => {
    this.props.description(desc);
  };

  makeBill = () => {
    this.props.includeInvolvedFriends(this.state.involvedFriends);
    this.props.createBill(
      this.state.involvedFriends,
      this.state.whoPay,
      this.state.description,
      this.state.amount
    );
    // this.props.onSwitchPage('Home');
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header}>Add a bill</Text>
          </View>

          <View style={{ alignItems: 'left', padding: 15, flex: 3 }}>
            <Text style={{ color: 'gray' }}>Involved friends</Text>
            {this.props.friends.length == 0 ? (
              <Text>'you do not have any friends'</Text>
            ) : (
              <View
                style={{
                  flex: 2,
                  alignSelf: 'stretch',
                  
                }}>
                <FlatList
                  data={this.props.friends}
                  extraData={this.state.involvedFriends}
                  renderItem={({ item }) => {
                    if (item.name != 'you') {
                      return (
                        <InvolvedElement
                          element={item}
                          friends={this.props.friends}
                          checked={
                            this.state.involvedFriends.indexOf(item.id) !== -1
                          }
                          onCheck={() => {
                            this.setState(prevState => {
                              const alreadyInvolved =
                                prevState.involvedFriends.indexOf(item.id) !==
                                -1;

                              if (alreadyInvolved) {
                                console.log(
                                  'alreadyInvolved',
                                  R.without(
                                    [item.id],
                                    prevState.involvedFriends
                                  )
                                );
                              } else {
                                console.log('!alreadyInvolved', [
                                  ...prevState.involvedFriends,
                                  item.id,
                                ]);
                              }

                              return {
                                involvedFriends: alreadyInvolved
                                  ? R.without(
                                      [item.id],
                                      prevState.involvedFriends
                                    )
                                  : [...prevState.involvedFriends, item.id],
                              };
                            });
                          }}
                        />
                      );
                    }
                  }}
                  keyExtractor={(item, index) => {
                    return index;
                  }}
                />
                //
              </View>
            )}
            keyExtractor={(item, index) => {
              return index;
            }}
            /> )}
          </View>

          <View style={{ alignItems: 'left', padding: 15, flex: 3 }}>
            <Text style={{ color: 'gray' }}>Who paid? </Text>
            {this.props.friends.length == 0 ? (
              <Text>'you do not have any friends'</Text>
            ) : (
              <View
                style={{
                  flex: 2,
                  alignSelf: 'stretch',
                }}>
                <View />
                <FlatList
                  extraData={this.state.involvedFriends}
                  data={this.state.involvedFriends}
                  renderItem={({ item }) => {
                    const friend = this.props.friends.find(
                      friend => item === friend.id || item == -1
                    );

                    return (
                      <PaidList element={friend} whoPay={this.setWhoPay} />
                    );
                  }}
                  keyExtractor={(item, index) => {
                    return index;
                  }}
                />
                //
              </View>
            )}
            keyExtractor={(item, index) => {
              return index;
            }}
            /> )}
          </View>

          <View style={{ flex: 3 }}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Amount"
              placeholderTextColor="#333987"
              autoCapitalize="none"
              onChangeText={this.handleChangeAmount}
            />

            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Description"
              placeholderTextColor="#333987"
              autoCapitalize="none"
              onChangeText={this.handleChangeDescription}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.makeBill}>
              <Text style={styles.submitButtonText}> Save </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    flex: 1,
  },
  header: {
    flex: 1,
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: '#333987',
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 0,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#333987',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#333987', 
    padding: 10,
    margin: 15,
    height: 40,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  submitButtonText: {
    color: 'white',
  },
});
export default Event;
