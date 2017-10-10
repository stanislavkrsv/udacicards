import React , { Component }from 'react';
import { StyleSheet, Text, View, Image, Animated, FlatList, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { Constants } from 'expo'
import { DrawerItems } from 'react-navigation'


class DrawerMenu extends Component {

  render() {
    return(
      <View><View style={{paddingTop: Constants.statusBarHeight, height: 140}}><Text>Hallo</Text></View><DrawerItems {...this.props} /></View>
    )
  }
}

export default DrawerMenu