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
import * as Net from '../../utils/RequestUtil';
import ImagePicker from "react-native-image-picker";

const {width, height} = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const photo = require('../../../images/publish/photo.png');
const photoMask = require('../../../images/publish/photo-mask.png');

const options = {
    //弹出框选项
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    allowsEditing: true,
    noData: false,
    quality: 1.0,
    maxWidth: 480,
    maxHeight: 800,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
};

export default class DetailAutoPhoto extends Component {

    constructor(props) {
        super(props);
        this.viewData = [
            {
                name: 'left_anterior',
                title: '左前45°',
                hasPhoto: false,
                img_url: ''
            },
            {
                name: 'rear_right',
                title: '右后45°',
                hasPhoto: false,
                img_url: ''
            },
            {
                name: 'front_trim',
                title: '前内饰',
                hasPhoto: false,
                img_url: ''
            },
            {
                name: 'rear_trim',
                title: '后内饰',
                hasPhoto: false,
                img_url: ''
            },
            {
                name: 'engine',
                title: '发动机',
                hasPhoto: false,
                img_url: ''
            },
            {
                name: 'dash_board',
                title: '仪表盘',
                hasPhoto: false,
                img_url: ''
            }
        ];
        this.pictures = [];
        if (this.props.carData.pictures !== '') {
            this.pictures = JSON.parse(this.props.carData.pictures);
        }
        for(let i = 0;i < this.pictures.length;i++){
            this.viewData.map((pic)=>{
                if(this.pictures[i].name === pic.name){
                    pic.hasPhoto = true;
                    pic.img_url = this.pictures[i].url;
                }
            })
        }

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

    _labelPress = (viewData) => {
        this.imageSource.openModal(viewData);
    };

    _rePhoto = (viewData) => {
        this.imageSource.openModal(viewData);
    };

    _galleryClick = (viewData) => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {

                let url = 'http://dev.api-gateway.dycd.com/' + 'v1/index/upload';
                let params ={
                    filename : response.fileName,
                    file:'data:image/jpeg;base64,' + encodeURI(response.data).replace(/\+/g,'%2B')
                };

                Net.request(url,'post',params).then(
                    (response)=>{
                        if(viewData.hasPhoto === true){
                            this.pictures.map((pic)=>{
                                if(pic.name === viewData.name){
                                    pic.file_id = response.mjson.data.file_id;
                                    pic.url = response.mjson.data.url;
                                }
                            });
                        }else{
                            let temp ={
                                name : viewData.name,
                                file_id : response.mjson.data.file_id,
                                url: response.mjson.data.url,
                            };
                            this.pictures.push(temp);
                        }

                        for(let i = 0;i < this.pictures.length;i++){
                            this.viewData.map((pic)=>{
                                if(this.pictures[i].name === pic.name){
                                    pic.hasPhoto = true;
                                    pic.img_url = this.pictures[i].url;
                                }
                            })
                        }

                        this.grid.refresh(this.viewData);

                        this.props.sqlUtil.changeData(
                            'UPDATE publishCar SET pictures = ? WHERE vin = ?',
                            [JSON.stringify(this.pictures), this.props.carData.vin]);

                    },(error)=>{
                        console.log(error);
                    });

            }
        });
    };

    _cameraClick = (viewData) => {
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {

                let url = 'http://dev.api-gateway.dycd.com/' + 'v1/index/upload';
                let params ={
                    filename : response.fileName,
                    file:'data:image/jpeg;base64,' + encodeURI(response.data).replace(/\+/g,'%2B')
                };

                Net.request(url,'post',params).then(
                    (response)=>{
                        if(viewData.hasPhoto === true){
                            this.pictures.map((pic)=>{
                                if(pic.name === viewData.name){
                                    pic.file_id = response.mjson.data.file_id;
                                    pic.url = response.mjson.data.url;
                                }
                            });
                        }else{
                            let temp ={
                                name : viewData.name,
                                file_id : response.mjson.data.file_id,
                                url: response.mjson.data.url,
                            };
                            this.pictures.push(temp);
                        }

                        for(let i = 0;i < this.pictures.length;i++){
                            this.viewData.map((pic)=>{
                                if(this.pictures[i].name === pic.name){
                                    pic.hasPhoto = true;
                                    pic.img_url = this.pictures[i].url;
                                }
                            })
                        }

                        this.grid.refresh(this.viewData);

                        this.props.sqlUtil.changeData(
                            'UPDATE publishCar SET pictures = ? WHERE vin = ?',
                            [ JSON.stringify(this.pictures), this.props.carData.vin]);

                    },(error)=>{
                        console.log(error);
                    });

            }
        });
    };

    _renderItem = (data, i) => {
        return (
            data.hasPhoto
                ? <Image key={i} style={styles.photoContainer} source={{uri: data.img_url}}>
                    <Image style={styles.hasPhotoContainer} source={photoMask}>
                        <Text style={styles.photoLabel}>{data.title + '照'}</Text>
                        <View style={styles.fillSpace}/>
                        <TouchableOpacity
                            key={i}
                            onPress={()=>{this._rePhoto(data)}}
                            activeOpacity={0.6}>
                            <Text style={styles.rephotoLabel}>重拍</Text>
                        </TouchableOpacity>
                    </Image>
                </Image>
                : <TouchableOpacity
                    key={i}
                    onPress={()=>{this._labelPress(data)}}
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

    _onBack = () => {
        this.props.onBack();
    };

    _renderRihtFootView = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{this.props.publishData()}}>
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
                <ImageSource
                    galleryClick={this._galleryClick}
                    cameraClick={this._cameraClick}
                    ref={(modal) => {this.imageSource = modal}}/>
                <Image style={[styles.imgContainer,{height:height-this.props.barHeight}]} source={background}>
                    <AllNavigationView
                        backIconClick={this._onBack}
                        title='拍摄车辆照片'
                        wrapStyle={styles.wrapStyle}
                        renderRihtFootView={this._renderRihtFootView}/>
                    <View style={styles.contentContainer}>
                        <Grid
                            ref={(grid)=>{this.grid = grid}}
                            style={styles.girdContainer}
                            renderItem={this._renderItem}
                            data={this.viewData}
                            itemsPerRow={2}/>
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
        marginHorizontal: Pixel.getPixel(5),
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