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
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import Grid from '../component/Grid';
import AllNavigationView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();

const {width,height} = Dimensions.get('window');
const background = require('../../../images/publish/background.png');

export default class AutoEmission extends Component {

    constructor(props) {
        super(props);
        this.viewData = [
            {title: '国Ⅱ', selected: false,index:0},
            {title: '欧Ⅳ', selected: false,index:1},
            {title: '国Ⅲ', selected: false,index:2},
            {title: '欧Ⅴ', selected: true,index:3},
            {title: '国Ⅳ', selected: false,index:4},
            {title: '欧Ⅵ', selected: false,index:5},
            {title: '国Ⅴ', selected: false,index:6},
            {title: '欧Ⅲ', selected: false,index:7},
            {title: '京Ⅴ', selected: false,index:8},
            {title: '欧Ⅱ', selected: false,index:9},
            {title: 'OBD', selected: false,index:10},
            {title: '欧Ⅰ', selected: false,index:11},
        ];
        this.state = {
            dataSource: this.viewData,
            renderPlaceholderOnly: true
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    componentWillUnmount() {

    }

    _labelPress = (i) => {
        this.viewData.map((data,index)=>{
            if(data.title !== ''){
                data.selected = (i === index);
            }
        });
        this.interiorGrid.refresh(this.viewData);
    };

    _renderItem = (data, i) => {
        if (data.selected === true) {
            return (
                <TouchableOpacity
                    key={data.index}
                    style={styles.selectItem}
                    activeOpacity={0.6}
                    onPress={()=>{this._labelPress(data.index)}}
                >
                    <View >
                        <Text style={styles.selectText}>
                            {data.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        } else if (data.selected === false) {
            return (
                <TouchableOpacity
                    key={data.index}
                    style={styles.defaultItem}
                    activeOpacity={0.6}
                    onPress={()=>{this._labelPress(data.index)}}
                >
                    <View >
                        <Text style={styles.defaultText}>
                            {data.title}
                        </Text>
                    </View>
                </TouchableOpacity>

            );
        } else {
            return (
                <View key={i} style={styles.emptyItem}>

                </View>
            );
        }
    };

    _renderPlaceholderView = ()=>{
        return(<Image style={[styles.img,{height:height-this.props.barHeight}]} source={background} />);
    };

    _onBack = ()=>{
        this.props.onBack();
    };

    _renderRihtFootView = ()=>{
        return(
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{}}>
                <Text style={styles.rightTitleText}>完成</Text>
            </TouchableOpacity>
        );
    };

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }

        return (
        <View style={styles.container}>
            <Image style={[styles.imgContainer,{height:height-this.props.barHeight}]} source={background}>
                <AllNavigationView
                    backIconClick={this._onBack}
                    title='选择排放标准'
                    wrapStyle={styles.wrapStyle}
                    renderRihtFootView={this._renderRihtFootView} />
                <Grid
                    ref = {(grid)=>{this.interiorGrid = grid}}
                    style={styles.girdContainer}
                    renderItem={this._renderItem}
                    data={this.state.dataSource}
                    itemsPerRow={2}
                />
            </Image>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: 'transparent',
    },
    imgContainer:{
        width: width,
        backgroundColor: 'transparent',
        paddingTop:  Pixel.getPixel(121),
        paddingHorizontal:  Pixel.getPixel(43)
    },
    girdContainer: {
        flex: 1
    },
    defaultItem: {
        height:  Pixel.getPixel(41),
        width:  Pixel.getPixel(132),
        marginTop: Pixel.getPixel(10),
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius:  Pixel.getPixel(20),
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    defaultText: {
        fontSize: Pixel.getFontPixel(15),
        color: '#FFFFFF'
    },
    selectItem: {
        height:  Pixel.getPixel(41),
        width:  Pixel.getPixel(132),
        marginTop: Pixel.getPixel(10),
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius:  Pixel.getPixel(20),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectText: {
        fontSize: Pixel.getFontPixel(15),
        color: fontAndColor.COLORB1
    },
    emptyItem: {
        height:  Pixel.getPixel(41),
        width:  Pixel.getPixel(132),
        marginTop: Pixel.getPixel(10),
        backgroundColor: 'transparent'
    },
    wrapStyle:{
        backgroundColor:'transparent'
    },
    rightTitleText: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
        textAlign: 'right',
        backgroundColor: 'transparent'
    }
});