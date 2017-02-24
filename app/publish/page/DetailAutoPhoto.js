/**
 * Created by Administrator on 2017/2/10.
 */
/**
 * Created by Administrator on 2017/2/10.
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import AllNavigationView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import ImageSource from '../component/ImageSource';
import Grid from '../component/Grid';

const {width, height} = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const photo = require('../../../images/publish/photo.png');
const photoMask = require('../../../images/publish/photo-mask.png');

export default class DetailAutoPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                {
                    title: '左前45°',
                    hasPhoto: false,
                    img: ''
                },
                {
                    title: '右后45°',
                    hasPhoto: false,
                    img: ''
                },
                {
                    title: '前内饰',
                    hasPhoto: true,
                    img: ''
                },
                {
                    title: '后内饰',
                    hasPhoto: false,
                    img: ''
                },
                {
                    title: '发动机',
                    hasPhoto: false,
                    img: ''
                },
                {
                    title: '仪表盘',
                    hasPhoto: false,
                    img: ''
                },
            ],
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

    _labelPress = () => {
        this.imageSource.openModal();
    };

    _rePhoto = () => {
        this.imageSource.openModal();
    };

    _renderItem = (data, i) => {
        return (
            data.hasPhoto
                ? <Image key={i} style={styles.photoContainer} source={photo}>
                    <Image style={styles.hasPhotoContainer} source={photoMask}>
                        <Text style={styles.photoLabel}>{data.title + '照'}</Text>
                        <View style={styles.fillSpace}/>
                        <TouchableOpacity
                            key={i}
                            onPress={this._rePhoto}
                            activeOpacity={0.6}>
                            <Text style={styles.rephotoLabel}>重拍</Text>
                        </TouchableOpacity>
                    </Image>
                </Image>
                : <TouchableOpacity
                    key={i}
                    onPress={this._labelPress}
                    activeOpacity={0.6}>
                    <Image style={styles.photoContainer} source={photo}>
                        <View style={styles.noPhotoContainer}>
                            <Text style={styles.noPhoto}>{data.title}</Text>
                        </View>
                    </Image>
                </TouchableOpacity>
        );
    };

    _renderPlaceholderView = () => {
        return (<Image style={[styles.img,{height:height-this.props.barHeight}]} source={background}/>);
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
                <ImageSource ref={(modal) => {this.imageSource = modal}}/>
                <Image style={[styles.imgContainer,{height:height-this.props.barHeight}]} source={background}>
                    <AllNavigationView
                        backIconClick={this._onBack}
                        title='拍摄车辆照片'
                        wrapStyle={styles.wrapStyle}
                        renderRihtFootView={this._renderRihtFootView} />
                    <View style={styles.contentContainer}>
                        <Grid
                            style={styles.girdContainer}
                            renderItem={this._renderItem}
                            data={this.state.dataSource}
                            itemsPerRow={2}
                        />
                    </View>
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
    imgContainer: {
        width: width,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    contentContainer: {
        paddingTop: Pixel.getPixel(90),
        justifyContent: 'center'
    },
    girdContainer: {
        flex: 1
    },
    photoContainer: {
        marginTop: Pixel.getPixel(14),
        width: Pixel.getPixel(160),
        height: Pixel.getPixel(120),
        justifyContent: 'flex-end',
        marginHorizontal:Pixel.getPixel(5),
    },
    noPhotoContainer: {
        alignItems: 'center',
        marginBottom: Pixel.getPixel(30)
    },
    noPhoto: {
        fontSize: Pixel.getFontPixel(14),
        color: '#FFFFFF',
    },
    hasPhotoContainer: {
        width: Pixel.getPixel(160),
        flexDirection: 'row',
        alignItems: 'center',
        padding: Pixel.getPixel(10)
    },
    photoLabel: {
        fontSize: Pixel.getFontPixel(12),
        color: '#FFFFFF'
    },
    rephotoLabel: {
        fontSize: Pixel.getFontPixel(12),
        color: fontAndColor.COLORB1
    },
    fillSpace: {
        flex: 1
    },
    wrapStyle: {
        backgroundColor: 'transparent'
    },
    rightTitleText: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
        textAlign: 'right',
        backgroundColor: 'transparent'
    }
});