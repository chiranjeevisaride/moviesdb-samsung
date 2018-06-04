import React, { Component, Fragment } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Constants } from 'expo';


const HOME_URL = "https://image.tmdb.org/t/p/w300/";

export default class NowPlaying extends Component {
  constructor(props) {
    super(props);
    this.fetchMore = this._fetchMore.bind(this);
    this.fetchData = this._fetchData.bind(this);
    this.state = {
      dataSource: null,
      isLoading: true,
      isLoadingMore: false,
      _data: null,
      _dataAfter: '',
      movieDetails: null
    };
  }

  _fetchData(callback) {
    //Limits fetches to 15 so there's lesser items from the get go
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=7556b6f69948e852d8550e6dac0fe0af&page=10`)
      .then(response => response.json())
      .then(callback)
      .catch(error => {
        console.error(error);
      });
  }

  _fetchMore() {
    this.fetchData(responseJson => {
      const data = this.state._data.concat(responseJson.results);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoadingMore: false,
        _data: data,
        _dataAfter: responseJson.results,
      });
    });
  }

  componentDidMount() {
    //Start getting the first batch of data from reddit
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      const data = responseJson.results;
      this.setState({
        dataSource: ds.cloneWithRows(data),
        isLoading: false,
        _data: data,
        _dataAfter: responseJson.results,
      });
    });
  }

  ShowModalFunction(visible, movieDetails) {
    console.log(visible);
    console.log(movieDetails);
    this.setState({
      ModalVisibleStatus: visible,
      movieDetails: movieDetails
    });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <Fragment>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => {
              return (
                <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, rowData)} >
                  <View style={styles.listItem}>
                    <View style={styles.imageWrapper}>
                      <Image
                        style={{ width: 80, height: 80 }}
                        source={{
                          uri: HOME_URL + rowData.poster_path
                        }}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.title}>
                        {rowData.title}
                      </Text>
                      <Text style={styles.rating}>
                        rating: {rowData.vote_average}/ 10
                    </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            onEndReached={() =>
              this.setState({ isLoadingMore: true }, () => this.fetchMore())}
            renderFooter={() => {
              return (
                this.state.isLoadingMore &&
                <View style={{ flex: 1, padding: 10 }}>
                  <ActivityIndicator size="small" />
                </View>
              );
            }}
          />
        </Fragment>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d7da',
    padding: 6,
  },
  imageWrapper: {
    padding: 5,
  },
  title: {
    color: '#E69138',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    margin: 6,
  },
  rating: {
    color: '#E69138',
    fontSize: 13,
    textAlign: 'left',
    paddingTop: 5,
    paddingLeft: 6
  },
  
});
