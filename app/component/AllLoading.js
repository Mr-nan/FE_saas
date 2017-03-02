import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StatusBar,
    Modal,
    Image,
    Text
} from 'react-native';

export default class AllLoading extends Component {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShow: false,
        };
    }

    changeShowType = (value) => {
        this.setState({
            isShow: value
        });
    }

    render() {
        return (
            <Modal
                ref='loadingModal'
                animationType={"slide"}
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => {}}
            >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:100,height:100}} source={require('../../images/setDataLoading.gif')}/>
                </View>
            </Modal>
        );
    }
}