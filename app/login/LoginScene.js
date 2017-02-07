import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    TouchableOpacity,
    ListView,
} from 'react-native';
import BaseComponent from '../component/BaseComponent';
import SGListView from 'react-native-sglistview';

export default class LoginScene extends BaseComponent {


    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        };
    }

    onPress = () => {
    }


    render() {
        return (
            <View style={{backgroundColor: '#668800', flex: 1, paddingTop: 20}}>
                <SGListView
                    dataSource={this.state.dataSource} //data source
                    ref={'listview'}
                    initialListSize={10}
                    renderRow={(item) =>
                        <Text>{item}</Text>
                    }
                />
            </View>
        );
    }
}