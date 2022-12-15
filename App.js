import React, {Component} from "react";
import { View, Text, SafeAreaView} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const botAvatar = require('./assets/images/robot.png')

const BOT = {
  _id: 2,
  name: 'Mr. Robot',
  avatar: botAvatar
};


class App extends Component {
  state = {
    messages: [{_id: 1, text: 'Hi', createdAt: new Date()
  , user: BOT}],
    id: 1,
    name: '',
  };


  render() {
    return (
      <View style={{flex: 1, backgroundColor: "#fff"}}>
      
      <GiftedChat
        messages={this.state.messages} 
        onSend={(message) => this.onSend(message)}
        onQuickReply={(quickReply) => this.onQuickReply
        (quickReply)}
        user={{_id:1}}
        />
      </View>
    );
  }
}


export default App;