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
import  CarImagePickerItemYU from './CarUPImagePickerItemYU';
import ImagePicker from "react-native-image-picker";
import ImageSource from '../../publish/component/ImageSource'
import * as MyUrl from '../../constant/appUrls';

export  default class CarUpImageCellYU extends PureComponent {
    /*
     * 为了延迟调用
     * */
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
    constructor(props) {
        super(props);
	    this.id;
	    this.options;
        this.state = {
            childMovie: this.props.childList
        };
    }

    render() {
        let movie = this.props.items;
        let imageNumber = movie.number;
        let movieItems = [];
        if (this.state.childMovie.length > 0)
        {
            let length = 0;
            if (this.state.childMovie.length < imageNumber ) {
                length = this.state.childMovie.length + 1;
            } else {
                length = this.state.childMovie.length;
            }
            for (let i = 0; i < length; i++) {

                movieItems.push(
                    <CarImagePickerItemYU
                        fileId={this.state.childMovie[i]}
                        imgUrl={this.state.childMovie[i]}
                        showOnPress={() => {}}
                        deleteOnPress={(index,fileId) => {
                            let news =  [];
                            news.push(...this.state.childMovie);
                            news.splice(index, 1);
                            for(let i = 0;i<=this.props.results.length;i++)
                            {
                                if(this.props.results[i].file_id==fileId)
                                {
                                    this.props.results.splice(i,1);
                                    break;
                                }
                            }
                            this.props.retureSaveAction();
                            this.setState({childMovie: news});
                        }}
                        imageNumber = {imageNumber}//imageNumber是限制最大传的照片数
                        allLength={this.state.childMovie.length} key={i} index={i}
                        mOnPress={(index) => {
                            if (this.state.childMovie.length < imageNumber)
                            {
                                this.selectPhotoTapped(movie.code)
                            }
                        }}/>)
            }
        } else {
            movieItems.push(<CarImagePickerItemYU
	            imageNumber = {imageNumber}//imageNumber是限制最大传的照片数
	            allLength={this.state.childMovie.length}
	            key={0} index={0}
	            mOnPress={(index) => {this.selectPhotoTapped(movie.code)}}/>)
        }

        return (
            <View style={styles.parentView}>
                <View style={{width: width, marginTop: Pixel.getPixel(15), flexDirection: 'row'}}>
                    {movie.explain=='1'?<Text allowFontScaling={false}  style={{fontSize: fontAndColor.BUTTONFONT30, color: fontAndColor.COLORB2}}>*</Text>:<View/>}
                    <Text allowFontScaling={false}  style={{fontSize: fontAndColor.BUTTONFONT30, color: fontAndColor.COLORA0}}>{movie.title}</Text>
                    <Text allowFontScaling={false}  style={{fontSize: fontAndColor.BUTTONFONT30, color: fontAndColor.COLORA1}}>({movie.subTitle})</Text>
                </View>
                <View style={{width: width, marginTop: Pixel.getPixel(7), flexDirection: 'row', flexWrap: 'wrap'}}>
                    {movieItems}
                </View>
                <ImageSource

                    galleryClick={this._photoClick}
                    cameraClick={this._cameraClick}
                    ref={(modal) => {
                                     this.imageSource = modal
                                 }}/>
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
	    this.id = id;
	    this.options = options;
	    this._rePhoto(id);

            //
            // ImagePicker.showImagePicker(options, (response) => {
            //     if (response.didCancel) {
            //
            //     } else if (response.error) {
            //
            //     } else if (response.customButton) {
            //
            //     } else {
            //
            //         this._uploadPicture(response);
            //     }
            // });
        }

	_rePhoto = (ID) => {
		this.imageSource.openModal(ID);
	};
    /*
     * 相机点击
     * */
	_cameraClick = (ID) => {
		this.timer = setTimeout(
			() => {
				ImagePicker.launchCamera(this.options, (response) => {
					if (response.didCancel) {
					} else if (response.error) {
					} else if (response.customButton) {
					} else {
						this._uploadPicture(response);
					}
				});
			},
			200
		);


	}

    /*
     * 相册点击
     * */
	_photoClick = (ID) => {
		this.timer = setTimeout(
			() => {
				ImagePicker.launchImageLibrary(this.options, (response) => {
					if (response.didCancel) {
					} else if (response.error) {
					} else if (response.customButton) {
					} else {
						this._uploadPicture(response);
					}
				});
			},
			200
		);

	}
    _uploadPicture = (responses)=>{
        this.props.showModal(true);
        let base64 = encodeURI(responses.data).replace(/\+/g,'%2B');
        let params ={
            file:'data:image/jpeg;base64,' + base64
        };
        ImageUpload.request(MyUrl.INDEX_UPLOAD,'post',params).then(
            (response)=>{
                this.props.showModal(false);
                if(response.mycode === 1){
                    this.props.showToast('上传成功')
                    let news =[];
                    news.push(...this.state.childMovie);
                    news.push({url: response.mjson.data.url,file_id:response.mjson.data.file_id});
                    this.props.results.push({url: response.mjson.data.url,file_id:response.mjson.data.file_id,name:this.props.items.name,});
                    this.props.retureSaveAction();
                    this.setState({
                        childMovie:news,
                    });
                }else {
                    this.props.showToast('上传失败')
                }
            },(error)=>{
                this.props.showModal(false);
                this.props.showToast(JSON.stringify(error));
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