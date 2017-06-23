import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

import Grid from 'react-native-grid-component';

export default class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [], // 列表的数据
      page: 1,
      refreshing: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: '系列'
    };
  };
  componentDidMount() {
    this.makeRemoteRequest();
  }
  // 发请求
  makeRemoteRequest = () => {
    const url = `https://algori.tech/api/series`;
    this.setState({ refreshing: true });
    // 没有做空检测，先不管了，如果请求是 200 正常，但是完全是空的，这种没处理  
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          data: res,
          isLoading: false,
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({isLoading: false, refreshing: true });
        console.log('2Networking fail or result is empty'); 
      });
  };

  _renderItem = (data, i) => 
      <TouchableOpacity key={i} style={{flex: 1, flexDirection: 'row'}} onPress = {() => this.props.navigation.navigate('CategoryList', {serie_id: data.id, serie_title:data.title})}>
        <View style={styles.container} >
        <Image style={styles.image} source={{uri:data.image}}>
          <View style={styles.overlay}/>
          <View style={styles.overlayTextView}>
              <Text style={styles.text}>{data.title}</Text>
          </View>
        </Image>
      </View>
      </TouchableOpacity>


  render() {
    const { navigate } = this.props.navigation;
    return (
      <Grid
        style={styles.list}
        renderItem={this._renderItem}
        data={this.state.data}
        itemsPerRow={2}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    height: 160,
    margin: 1,
  },
  list: {
    flex: 1
  },
  image:{
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontWeight: "bold",
    fontSize: 16,
    color: 'white',
  },
  overlayTextView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.3
  }
});