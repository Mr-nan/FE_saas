/**
 * Created by Administrator on 2017/2/10.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity
}from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';

const {width,height} = Dimensions.get('window');
const background = require('../../../images/publish/background.png');


export default class AutoType extends Component {

    constructor(props) {
        super(props);
        this.viewData = [
            {
                title: '新车',
                selected: false
            },
            {
                title: '二手车',
                selected: true
            },
            {
                title: '平行进口车',
                selected: false
            },
        ];

        this.state = {
            dataSource: this.viewData
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    _labelPress = (i) => {
        this.viewData.map((data,index)=>{
            data.selected = (i === index);
        });
        this.setState((prevState, props) => ({
            dataSource: this.viewData
        }));
    };

    _renderItem = () => {
        return (
            this.state.dataSource.map((data, i) => {
                if (data.selected) {
                    return (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.6}
                            style={[styles.selectContainer,styles.contentAlign]}
                            onPress={()=>{this._labelPress(i)}}>
                            <View >
                                <Text style={styles.selectText}>{data.title}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                } else {
                    return (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.6}
                            style={[styles.circleContainer,styles.contentAlign]}
                            onPress={()=>{this._labelPress(i)}}>
                            <View >
                                <Text style={styles.unselectText}>{data.title}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }
            })
        );
    };

    render() {
        return (
        <View style={styles.container}>
            <Image style={[styles.imgContainer,{height:height-this.props.barHeight}]} source={background}>
                {this._renderItem()}
            </Image>
        </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: 'transparent'
    },
    imgContainer: {
        width: width,
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingTop: 169
    },
    contentAlign: {
        marginTop: 40
    },
    circleContainer: {
        width: 210,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    unselectText: {
        fontSize: 15,
        color: '#FFFFFF'
    },
    selectText: {
        fontSize: 15,
        color: fontAndColor.COLORB0
    },
    selectContainer: {
        width: 210,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 22,
        backgroundColor: '#FFFFFF'
    }
});