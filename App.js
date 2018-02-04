import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator,
  ListView,
  Image,
  Linking } from 'react-native';

const API_BASE_URI = 'http://food2fork.com/api/';
const API_KEY = 'f2b644656f8e3be14149734e17bc007a';
const URL = API_BASE_URI + `/search?key=` + API_KEY;

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.recipes),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator 
            color = '#bc2b78'
            size = "large"
            style = {styles.activityIndicator}
          />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View style={{ marginBottom: 15, borderWidth: 1, borderColor: '#ccc' }}>
            <Image
              style={{width: '100%', height: 250}}
              source={{uri: rowData.image_url}}
            />
            <Text 
              style={{padding: 10, fontWeight: 'bold', fontSize: 24, color: '#000'}}
              onPress={() => Linking.openURL(rowData.source_url)}>
              {rowData.title}
            </Text>
            <Text style={{padding: 10, fontSize: 16, color: '#ccc'}}>By: {rowData.publisher}</Text>
          </View>
          }
        />
      </View>
    );

  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={{
          flexDirection: 'row',
          padding: 20,
        }}>
        <Recipe />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
  },
});

