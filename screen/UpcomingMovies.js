import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ActivityIndicator, Image, Modal, TouchableOpacity } from 'react-native';

const  HOME_URL = "https://image.tmdb.org/t/p/w300/";

export default class UpcomingMovies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ModalVisibleStatus: false,
      TempImageURL: ''
    }
  }

  componentDidMount() {
    return fetch('https://api.themoviedb.org/3/list/1?api_key=7556b6f69948e852d8550e6dac0fe0af&language=en-US')
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson.items);
        this.setState({
          isLoading: false,
          dataSource: responseJson.items
        }, function () {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ShowModalFunction(visible, imageURL) {
    this.setState({
      ModalVisibleStatus: visible,
      TempImageURL: imageURL
    });

  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) =>
            <View style={{ flex: 1, flexDirection: 'column', margin: 4, padding: 2}}>
              <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.backdrop_path)} >
                <Image style={styles.imageThumbnail} source={{ uri: HOME_URL + item.backdrop_path }} />
              </TouchableOpacity>
              <Text style={styles.title}>
                    {item.title}
                  </Text>
            </View>
          }
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 5,
    minWidth: 170,
    maxWidth: 250,
    height: 200,
    maxHeight:300,
    borderRadius: 8
  },
  mainImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain'
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  TouchableOpacity_Style: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: 'absolute'
  }, title: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    margin: 1,
  },
});