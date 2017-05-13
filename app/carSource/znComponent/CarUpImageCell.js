/**
 * Created by zhengnan on 2017/5/13.
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
    ListView,
    NativeModules
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as ImageUpload from '../../utils/ImageUpload';
import * as fontAndColor from '../../constant/fontAndColor';
import  PurchasePickerChildItem from '../../finance/component/PurchasePickerChildItem';
import ImagePicker from "react-native-image-picker";
import * as MyUrl from '../../constant/appUrls';

export  default class PurchasePickerItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            childMovie: this.props.childList
        };
    }

    render() {
        let movie = this.props.items;
        let movieItems = [];
        // if (this.state.childMovie.list.length > 0)
        // {
        //     let length = 0;
        //     if (this.state.childMovie.list.length < 8) {
        //         length = this.state.childMovie.list.length + 1;
        //     } else {
        //         length = this.state.childMovie.list.length;
        //     }
        //     for (let i = 0; i < length; i++) {
        //         movieItems.push(
        //             <PurchasePickerChildItem
        //                 fileId={this.state.childMovie.list[i]}
        //                 imgUrl={this.state.childMovie.list[i]} showOnPress={() => {
        //             }} deleteOnPress={(index,fileId) => {
        //                 let news = {...this.state.childMovie};
        //                 news.list.splice(index, 1);
        //                 for(let i = 0;i<=this.props.results.length;i++){
        //                     if(this.props.results[i].file_id==fileId){
        //                         this.props.results.splice(i,1);
        //                         break;
        //                     }
        //                 }
        //                 this.setState({childMovie: news});
        //             }} allLength={this.state.childMovie.list.length} key={i} index={i} mOnPress={(index) => {
        //                 if (this.state.childMovie.list.length < 8) {
        //                     this.selectPhotoTapped(movie.code)
        //                 }
        //             }}/>)
        //     }
        // } else {
            movieItems.push(<PurchasePickerChildItem allLength={this.state.childMovie.length} key={0} index={0}
                                                     mOnPress={(index) => {
                                                         this.selectPhotoTapped(movie.code)
                                                     }}/>)
        // }

        return (
            <View style={styles.parentView}>
                <View style={{width: width, marginTop: Pixel.getPixel(15), flexDirection: 'row'}}>
                    {movie.explain!='1'?<Text style={{fontSize: fontAndColor.BUTTONFONT30, color: fontAndColor.COLORB2}}>*</Text>:<View/>}
                    <Text style={{fontSize: fontAndColor.BUTTONFONT30, color: fontAndColor.COLORA0}}>{movie.title}</Text>
                    <Text style={{fontSize: fontAndColor.BUTTONFONT30, color: fontAndColor.COLORA1}}>({movie.subTitle})</Text>
                </View>
                <View style={{width: width, marginTop: Pixel.getPixel(7), flexDirection: 'row', flexWrap: 'wrap'}}>
                    {movieItems}
                </View>
            </View>
        );
    }

    selectPhotoTapped =(id) => {
        const options = {
            //弹出框选项
            title: '请选择',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            allowsEditing: false,
            noData: false,
            quality: 1.0,
            maxWidth: 480,
            maxHeight: 800,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };
            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {

                } else if (response.error) {

                } else if (response.customButton) {

                } else {

                    this._uploadPicture(response);
                }
            });
        }

    openPicker=()=>{
        const options = {
            //弹出框选项
            title: '请选择',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            allowsEditing: false,
            noData: false,
            quality: 1.0,
            maxWidth: 480,
            maxHeight: 800,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {}
            else if (response.error) {}
            else if (response.customButton) {}
            else {
                this._uploadPicture(response);
            }
        });
    }

    openCamera=()=>{
        NativeModules.CustomCamera.takePic().then((response) => {
            this._uploadPicture(response);
        }, (error) => {

        })
    }

    _uploadPicture = (responses)=>{
        this.props.showModal(true);
        let params ={
            file:'data:image/jpeg;base64,' + encodeURI(responses.data).replace(/\+/g,'%2B')
        };
        ImageUpload.request(MyUrl.INDEX_UPLOAD,'Post',params).then(
            (response)=>{
                this.props.showModal(false);
                if(response.mycode === 1){
                    // this.selectSource = {uri: response.mjson.data.url};
                    console.log(response);
                    this.props.showToast('上传成功')
                    // console.log(response.mjson.data.url);
                    let news = {...this.state.childMovie};
                    let fileid =   response.mjson.data.file_id;
                    news.list.push({url: response.mjson.data.url,fileId:fileid});
                    // this.props.results.push({code:this.props.items.code,code_id:this.props.items.id,file_id:response.mjson.data.file_id});
                    this.setState({
                        childMovie: news
                    });
                }else {
                    // this.props.closeLoading();
                    this.props.showToast('上传失败')
                }
            },(error)=>{
                this.props.showModal(false);
                // this.props.closeLoading();
                this.props.showToast(JSON.stringify(error));
                // console.log(JSON.stringify(error));
            });
    };

}
const styles = StyleSheet.create({
    parentView: {
        width: width,
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        paddingBottom: Pixel.getPixel(10)
    }
})