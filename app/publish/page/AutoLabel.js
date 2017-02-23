/**
 * Created by Administrator on 2017/2/10.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    InteractionManager
} from 'react-native';

import Grid from '../component/Grid';
import * as fontAndColor from '../../constant/fontAndColor';
import AllNavigationView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();

const { width,height } = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const hot = require('../../../images/publish/hot-label.png');

export default class AutoLabel extends Component {

    constructor(props) {
        super(props);
        this.viewData =
            [
                {title: '座椅加热', selected: false,index:0},
                {title: '全景天窗', selected: false,index:1},
                {title: '定速巡航', selected: false,index:2},
                {title: '全时四驱', selected: false,index:3},
                {title: '油电混合', selected: false,index:4},
                {title: '迎宾灯', selected: false,index:5},
                {title: '无钥匙启动', selected: false,index:6},
                {title: '倒车影像', selected: false,index:7},
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
            if(i === index){
                data.selected = !data.selected;
            }
        });
        this.interiorGrid.refresh(this.viewData);
    };

    _renderItem = (data, i) => {
        if (data.selected === true) {
            return (
                <TouchableOpacity
                    key={data.index}
                    style={styles.selectContainer}
                    activeOpacity={0.6}
                    onPress={()=>{this._labelPress(data.index)}}
                >
                <View style={styles.selectItem}>
                    <Text style={styles.selectText}>
                        {data.title}
                    </Text>
                    <Image style={styles.hotLabel} source={hot}/>
                </View>
                </TouchableOpacity>
            );
        } else if (data.selected === false) {
            return (
                <TouchableOpacity
                    key={data.index}
                    style={styles.defaultContainer}
                    activeOpacity={0.6}
                    onPress={()=>{this._labelPress(data.index)}}
                >
                    <View style={styles.defaultItem}>
                        <Text style={styles.defaultText}>
                            {data.title}
                        </Text>
                    </View>
                </TouchableOpacity>

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
                        title='选择热门标签'
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
        paddingTop: Pixel.getPixel(121),
        paddingHorizontal: Pixel.getPixel(43)
    },
    girdContainer: {
        flex: 1,
    },
    defaultContainer: {
        height: Pixel.getPixel(41),
        width: Pixel.getPixel(132),
        marginTop: Pixel.getPixel(10),
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: Pixel.getPixel(20),
        justifyContent: 'center'
    },
    defaultItem: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    defaultText: {
        fontSize: Pixel.getFontPixel(15),
        color: '#FFFFFF'
    },
    selectContainer: {
        height: Pixel.getPixel(41),
        width: Pixel.getPixel(132),
        marginTop: Pixel.getPixel(10),
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: Pixel.getPixel(20),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    selectItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    selectText: {
        fontSize: Pixel.getFontPixel(15),
        color: fontAndColor.COLORB1
    },
    hotLabel: {
        width: Pixel.getPixel(13),
        height: Pixel.getPixel(9),
        marginLeft: Pixel.getPixel(2)
    },
    emptyItem: {
        height: Pixel.getPixel(41),
        width: Pixel.getPixel(132),
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