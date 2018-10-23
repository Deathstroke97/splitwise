//App

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { AppRegistry, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import AddFriends from './components/AddFriends';
import Event from './components/Event';
import Friend from './components/Friend';
import { Toolbar, ToolbarContent } from 'react-native-paper';

import HistoryPage from './components/HistoryPage';

let involvedFriends = [];
let whoPay = {};
let description = '';
let amount = 0;
let paymentStoriesOfFriend = [];


export default class App extends Component {
  state = {
    friends: [
      {
        name: 'you',
        id: -1,
        owe: 0,
        isOwed: 0,
        total: 0,
        history: [],
        paymentStories: [],
      },
      
    ],
    currentPage: 'Home',
    touchedFriend : null,
  };

  setInvolvedFriends = included => {
    involvedFriends = included;
  };

  setWhoPaid = friend => {
    whoPay = friend;
  };

  setDescription = desc => {
    description = desc;
  };
  setAmount = cost => {
    amount = cost;
  };
  setTouchedFriend = friend => {
    console.log('Touched: now ', friend);
    //touchedFriend = friend;
    this.setState({touchedFriend: friend});
  }

  setCurrentHistory = history => {
    //console.log('history')
    paymentStoriesOfFriend = history;
    this.changePage('History');
  };

  bill = (iDsOfInvolvedFriends, whoPay, description, amount) => {
    const each = Number(parseFloat((amount / iDsOfInvolvedFriends.length)).toFixed());
    console.log(each);
    
    console.log('Check total: ' + this.state.friends[0].total);

    const newFriends = this.state.friends.map(friend => {
      const has =
        iDsOfInvolvedFriends.findIndex(
          involvedFriend => involvedFriend === friend.id
        ) !== -1;

      if (!has) {
        return friend;
      }

      const isEqualNames = friend.name === whoPay.name;
      const paymentStory = {event : description, cost: each, whoPaid: whoPay, total: amount - each}
      
      return {
        ...friend,
        owe: !isEqualNames ? parseFloat(friend.owe - each) : friend.owe,
        total: isEqualNames
          ? parseFloat(0 - amount)
          : parseFloat(friend.total - each),

        history: [...friend.history, description],

        isOwed: isEqualNames
          ? parseFloat(friend.isOwed + (iDsOfInvolvedFriends.length - 1) * each)
          : friend.isOwed,
        paymentStories: [...friend.paymentStories, paymentStory],

      };
    });
    
    this.setState({friends: newFriends, currentPage: 'Home'}, () => {
      console.log('here');
      
    })
  
  }

  handleAddFriend = newFriend => {
    
    if (newFriend !== '') {
      const friend = {
        name: newFriend,
        owe: 0,
        isOwed: 0,
        total: 0,
        id: new Date().getTime(),
        history: [],
        paymentStories : [],
      };

      this.setState({
        friends: [...this.state.friends, friend],
      });
    }
  };

  changePage = newPage => {
    this.setState({ currentPage: newPage });
  };

  render() {
    console.log('Friends:', this.state.friends);

    return (
      <View style={{ flex: 1 }}>
        {this.state.currentPage === 'Home' && (
          <View style={{ flex: 1 }}>
            //working
            <View style={{ flex: 1 }}>
              <Toolbar>
                <ToolbarContent title="SplitWise" />
              </Toolbar>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center' }}>you owe</Text>
                <Text style={{ textAlign: 'center' }}>
                  {this.state.friends[0].owe} tg
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center' }}>you are owed</Text>
                <Text style={{ textAlign: 'center' }}>
                  {this.state.friends[0].isOwed} tg
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center' }}>total</Text>
                <Text style={{ textAlign: 'center' }}>
                  {this.state.friends[0].total} tg
                </Text>
              </View>
            </View>
            <View
              style={{ borderBottomColor: 'black', borderBottomWidth: 4 }}
            />
            <View
              style={{
                flex: 2,
                alignSelf: 'stretch',
                width: 800,
                height: 800,
              }}>
              {this.state.friends.length == 0 ? (
                <Text>'you do not have any friends'</Text>
              ) : (
                this.state.friends.map((friend) => {
                 // if (friend.name != 'you') {
                    return(
                      <Friend
                          onPress={this.setCurrentHistory}
                          setWhichFriendTouched = {this.setTouchedFriend}
                          adventure={friend.paymentStories}
                          friend={friend}
                          friends = {this.state.friends}
                        />
                    )
                 // }
                }) 
              )})}
            </View>
            <View
              style={{
                flex: 0.5,
                alignSelf: 'center',
                //marginTop: 30,
                backgroundColor: 'blue',
              }}>
              <TouchableOpacity
                onPress={screen => this.changePage('AddFriends')}
                style={styles.addButton}>
                <Text>+Add friends on splitwise</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 3 }} />
            <TouchableOpacity
              onPress={screen => this.changePage('Event')}
              style={styles.addButton}>
              <Text>Create Event</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.currentPage === 'AddFriends' && (
          <AddFriends
            onSwitchPage={this.changePage}
            addFriend={this.handleAddFriend}
          />
        )}
        {this.state.currentPage == 'History' && (
          <HistoryPage data={paymentStoriesOfFriend} onSwitchPage={this.changePage} friend = {this.state.touchedFriend} />
        )}    

        {this.state.currentPage === 'Event' && (
          <Event
            onSwitchPage={this.changePage}
            friends={this.state.friends}
            ids={this.state.ids}
            includeInvolvedFriends={this.setInvolvedFriends}
            whoPay={this.setWhoPaid}
            description={this.setDescription}
            amount={this.setAmount}
            createBill={() =>
              this.bill(involvedFriends, whoPay, description, amount)
            }
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
