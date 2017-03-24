import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Animated,
    Image,
    Modal,
    Easing
} from 'react-native';

export default class LoddingAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.show}
                onRequestClose={() => {
                }}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: 60, height: 60}} source={require('../../../images/setDataLoading.gif')}/>
                </View>
            </Modal>
        );
    }

    setShow = (flag) => {
        this.setState({
            show: flag,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
});
