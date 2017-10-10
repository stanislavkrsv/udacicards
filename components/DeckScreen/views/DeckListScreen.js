import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { blue, white } from '../../../utils/colors'
import { getBgImage } from '../../../utils/bgImages'


class DeckListScreen extends Component {

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item, index}) => {
    const { navigation } = this.props
    return (
      <TouchableOpacity onPress={()=> navigation.navigate('DeckViewScreen', {index : index, id : item.id, title: item.title})} >
        <ImageBackground resizeMode="repeat"  source={getBgImage(index)}  style={styles.item}>
          <View style={styles.itemTextBlock}>
            <Text style={styles.itemTextTitle}>{item.title}</Text>
            <Text style={styles.itemTextQuantity}>{item.questions.length} cards</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.decks}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue
  },
  list: {
    flex:1
  },
  item: {
    flex: 1,
    minHeight: 120,
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  itemTextBlock: {
    flex: 1,
    alignItems: 'center',
  },
  itemTextTitle: {
     textAlign:'center',
    fontFamily: 'common-font-bold',
    textShadowColor: '#666666',
    textShadowOffset: {
      width: 0,
      height: 1
    },
    textShadowRadius: 2,
    backgroundColor: 'transparent',
    color: white,
    fontSize: 35,
    marginBottom: -8,
    marginTop:0
  },
  itemTextQuantity: {
    backgroundColor: 'transparent',
    color: white,
  }
});


function mapStateToProps({decks}) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckListScreen)