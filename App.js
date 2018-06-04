import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import UpcomingMovies from './screen/UpcomingMovies';
import NowPlaying from './screen/NowPlaying';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from 'react-native-material-color';


const TABBAR_ICON_SIZE = 30;
export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safaArea}>
        <AppTopBarNavigator/>
      </SafeAreaView>
    );
  }
}

 const AppTopBarNavigator =  createMaterialTopTabNavigator({
  UpcomingMovies: {
      screen: UpcomingMovies,
      navigationOptions: { 
        tabBarIcon: ({tintColor}) => (
          <Icon name = "ios-filing-outline" color={tintColor} size={TABBAR_ICON_SIZE} />
        )
      }
   },
   NowPlaying: {
    screen: NowPlaying,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
          <Icon name = "ios-film-outline" color={tintColor} size={TABBAR_ICON_SIZE} />
      )
    }
  }
}, 
{
  initialRouteName: 'NowPlaying',
  order: ['NowPlaying', 'UpcomingMovies'],
  tabBarOptions: {
    activeTintColor: 'orange',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: '#f2f2f2'
    },
    showIcon: true,
  }
})


const styles = StyleSheet.create({
  safaArea: {flex:1,  backgroundColor: '#f2f2f2'}
});
