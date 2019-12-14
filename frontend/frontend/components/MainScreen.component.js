import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, ScrollView ,Dimensions,SafeAreaView, Keyboard} from "react-native";
import Constants from 'expo-constants';
import axios from "axios";

const { height } = Dimensions.get("screen");
export default class Mainscreen extends Component {
  constructor() {
    super();
    this.state = {
      opinions: [],
      addopinion: {
        hashtag: "",
        content: ""
      }
    };
    this.handlesubmit = this.handlesubmit.bind(this);
  }
  async componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://192.168.43.226:8000/opsharing")
      .then(res => {
        // console.log(res.data)
        this.setState({ opinions: res.data });
        console.log("this.state.todos : ");
        console.log(this.state.opinions);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  handlesubmit() {
  
    
    const addop = {
      hashtag: this.state.addopinion.hashtag,
      content: this.state.addopinion.content
    };
    console.log(addop);
    axios
      .post("http://192.168.43.226:8000/opsharing/", addop)
      .then(res => {
          console.log(res);
        this.refreshList();
        
    })
      .catch(function(error) {
        console.log(error);
      });
      this.setState(prevstate => ({
        addopinion: {
          ...prevstate.addopinion,
          hashtag: "",
          content: ""
        }
      }))
      Keyboard.dismiss();
  }

  render() {
    return (
      <View style={{flex:1,marginTop:Constants.statusBarHeight+25}}>
      <View style={{ height:height * 0.30,flexDirection: "column",alignItems: "center",justifyContent: "center"}}>
        <Text style={{fontSize:50,color:'pink'}}>Share opinions</Text>
        <View style={{position:"relative",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
          <View style={{width: "50%",height: 50,alignItems: "center",justifyContent: "center" }}>
            <TextInput
            placeholder = "#HashTag"
              style={{ borderBottomWidth: 1, width: "100%" ,borderBottomColor:'pink'}}
              multiline={true}
              numberOfLines={2}
              defaultValue={this.state.addopinion.hashtag}
              onChangeText={text =>
                this.setState(prevstate => ({
                  addopinion: {
                    ...prevstate.addopinion,
                    hashtag: text
                  }
                }))
              }
              />
          </View>
        
        </View>
        <View style={{position:"relative",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
          <View style={{width: "50%",height: 50,alignItems: "center",justifyContent: "center" }}>
            <TextInput
            placeholder = "Your comment"
              style={{ borderBottomWidth: 1, width: "100%" ,borderBottomColor:'pink'}}
              multiline={true}
              numberOfLines={2}
              defaultValue={this.state.addopinion.content}
              onChangeText={text =>
                this.setState(prevstate => ({
                  addopinion: {
                    ...prevstate.addopinion,
                    content: text
                  }
                }))
              }
              />
          </View>
        
        </View>
        <View
            style={{
              width: "25%",
              height: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
            >
            <Button
              color="pink"
              title="Add opinion"
              onPress={this.handlesubmit}
              />
          </View>
              </View>
              <ScrollView style={{ height:height * 0.75 , flexDirection:"column"}}>

<View >
        {this.state.opinions.map((item,index) => {
          return (
            <View
            key={index}
            style={{flexDirection: "column",alignItems: "center",justifyContent: "center"}}>
              <View
                style={{flex:1,height: 50,alignItems: "center",justifyContent: "center"}}>
                <Text style={{color:"dodgerblue",fontWeight:'500',fontFamily: 'sans-serif-condensed',letterSpacing:3}}>#{item.hashtag}</Text>
              </View>
              <View
                style={{width:"75%",height: 50,alignItems: "center",justifyContent: "center"}}>
                <Text style={{color:"black",fontWeight:'500',fontFamily: 'sans-serif-condensed',letterSpacing:3}}>{item.content}</Text>
              </View>
          
              <View
                style={{width: "20%",height: 50,alignItems: "center",justifyContent: "center"}}>
              </View>
            </View>
          );
        })}
        </View>
        </ScrollView>
  </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  items: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});