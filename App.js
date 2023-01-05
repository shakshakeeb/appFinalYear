import React, {Component} from "react";
import { View, Text, SafeAreaView} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {Dialogflow_V2} from "react-native-dialogflow";



import {dialogflowConfig} from "./env";

const botAvatar = require('./assets/images/robot.png')

const BOT = {
  _id: 2,
  name: 'Mr. Robot',
  avatar: botAvatar
};


class App extends Component {
  state = {
    messages: [{_id: 2, text: 'Hello, how can I help you today?', createdAt: new Date(),
     user: BOT}, {_id: 1, text: 'I am Chatbot!', createdAt: new Date(),
    user: BOT}],
    id: 1,
    name: '',
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
  }

  handleGoogleResponse(result) {
    console.log('Received response:', result);  // <-- Add this line
   //console.log(JSON.stringify(result))
  
    // Make sure the result object has a queryResult property
    if (result && result.queryResult) {
      
      // Make sure the queryResult object has a fulfillmentMessages property
      if (result.queryResult.fulfillmentMessages) {
        // Get the first message in the array of fulfillment messages
        let message = result.queryResult.fulfillmentMessages[0];
  
        // Make sure the message has a text property
        if (message && message.text && message.text.text) {
          // Get the text of the message
          let text = message.text.text[0];
  
          // Send the message to the chatbot
          this.sendBotResponse(text);
        }
      }
    }
  }
  
  
  

  sendBotResponse(text){
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT
    }
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  
    let message = messages[0].text;
  
    console.log('Sending request:', message); 
  
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  }
  
  onQuickReply(quickReply){
    console.log('Quick reply:', quickReply);  
  
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.
        messages, quickReply)
    }));
  
    let message = quickReply[0].value;
  
    console.log('Sending request:', message);
  
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    )
  
  }
  
  

  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: "beige"}}>
      
      <GiftedChat
        messages={this.state.messages} 
        onSend={(message) => this.onSend(message)}
        onQuickReply={(quickReply) => this.onQuickReply
        (quickReply)}
        user={{_id: 1}}
        />
      </View>
    );
  }
}


export default App;



  // handleGoogleResponse = (result) => {
  //   if (!result || !result.queryResult) {
  //     // Display an error message if the result or queryResult is undefined
  //     this.setState({ chatbotResponse: 'An error occurred. Please try again.' });
  //     return;
  //   }
  //   // Get the chatbot's response from the result
  //   const chatbotResponse = result.queryResult.fulfillmentMessages[0].text.text[0];
  //   this.setState({ chatbotResponse });
  // };

 
  