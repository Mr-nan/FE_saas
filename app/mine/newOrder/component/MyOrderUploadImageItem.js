/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import ImagePicker from "react-native-image-picker";
import * as ImageUpload from "../../../utils/ImageUpload";
import * as MyUrl from "../../../constant/appUrls";
let Platform = require('Platform');
const IS_ANDROID = Platform.OS === 'android';
export  default class MyOrderUploadImageItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{width:width,height:Pixel.getPixel(107),backgroundColor:'#fff', flexDirection:'row',
            marginTop:Pixel.getPixel(10)}}>
            <View style={{flex:1,justifyContent:'center'}}>
                <Text style={{fontSize:Pixel.getPixel(14),color:'#666',marginLeft:Pixel.getPixel(15)}}>{this.props.name}</Text>
            </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                    {this.props.isNull(this.props.icon)?
                        <TouchableOpacity onPress={()=>{
                            this.selectPhotoTapped();
                        }}>
                            <Image style={{width:Pixel.getPixel(79),height:Pixel.getPixel(59),marginRight:Pixel.getPixel(15)}}
                                   source={require('../../../../images/neworder/tianjia.png')}/>
                        </TouchableOpacity>:<TouchableOpacity onPress={()=>{
                            this.props.openImage(this.props.image);
                        }} style={{width:Pixel.getPixel(88),height:Pixel.getPixel(68),
                        justifyContent:'flex-end',alignItems:'flex-end',marginRight:Pixel.getPixel(15)}}>
                            <Image style={{width:Pixel.getPixel(79),height:Pixel.getPixel(59)}}
                                   source={{uri:this.props.icon}}/>
                            <TouchableOpacity onPress={()=>{
                                this.selectPhotoTapped();
                            }} style={{position:'absolute',top:0,left:0}}>
                                <Image style={{width:Pixel.getPixel(18),height:Pixel.getPixel(18)}}
                                       source={require('../../../../images/neworder/xiugaitpian.png')}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    }

                </View>
            </View>
        );
    }

    selectPhotoTapped = () => {
        const options = {
            //弹出框选项
            title: '请选择',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            allowsEditing: false,
            noData: false,
            quality: 0.7,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };
        if (IS_ANDROID) {
            options.maxWidth = 1080;
            options.maxHeight = 1920;
            options.quality = 0.9;
        }
        // if(id=='buyer_seller_vehicle'){
        //     this.props.openModal(()=>{this.openCamera()},()=>{this.openPicker()});
        // }else{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {

            } else {
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                //     let news = {...this.state.childMovie};
                //     news.list.push({url: response.uri});
                //     this.setState({
                //         childMovie: news
                //     });
                this._uploadPicture(response);
                // console.log('aaaaaaaaaaaaaaaaaaaaa'+response.data);
            }
        });
        // }
    }

    _uploadPicture = (responses) => {
        this.props.showModal(true);
        let params = {
            file: 'data:image/jpeg;base64,' + encodeURI(responses.data).replace(/\+/g, '%2B')
        };
        ImageUpload.request(MyUrl.INDEX_UPLOAD, 'Post', params).then(
            (response) => {
                this.props.showModal(false);
                if (response.mycode === 1) {
                    // this.selectSource = {uri: response.mjson.data.url};
                    // console.log(response);
                    this.props.showToast('上传成功')
                    console.log(response.mjson);
                    this.props.callBack(response.mjson.data.file_id,response.mjson.data.img_url,response.mjson.data.icon);
                    // let news = {...this.state.childMovie};
                    // let fileid = response.mjson.data.file_id;
                    // news.list.push({url: response.mjson.data.url, fileId: fileid});
                    // this.props.results.push({
                    //     code: this.props.items.code,
                    //     code_id: this.props.items.id,
                    //     file_id: response.mjson.data.file_id
                    // });
                    // this.setState({
                    //     childMovie: news
                    // });

                    // this.setState({
                    //     hasPhoto:true
                    // });
                    //
                    // let left ={
                    //     name : 'left_anterior',
                    //     file_id : response.mjson.data.file_id,
                    //     url: response.mjson.data.url,
                    // };
                    // this.pictures = [];
                    // this.pictures.push(left);
                    //
                    // SQLite.changeData(
                    //     'UPDATE publishCar SET pictures = ? WHERE vin = ?',
                    //     [ JSON.stringify(this.pictures), this.props.carData.vin]);
                    // this.props.closeLoading();
                } else {
                    // this.props.closeLoading();
                    this.props.showToast('上传失败')
                }

            }, (error) => {
                this.props.showModal(false);

                // this.props.closeLoading();
                this.props.showToast(JSON.stringify(error));
                // console.log(JSON.stringify(error));
            });
    };

}
const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        height: Pixel.getPixel(70),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderColor: '#00000000'
    }
})