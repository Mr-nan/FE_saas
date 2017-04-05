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
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import  PurchasePickerChildItem from './PurchasePickerChildItem';
import ImagePicker from "react-native-image-picker";
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
        if (this.state.childMovie.list.length > 0) {
            let length = 0;
            if (this.state.childMovie.list.length < 8) {
                length = this.state.childMovie.list.length + 1;
            } else {
                length = this.state.childMovie.list.length;
            }
            for (let i = 0; i < length; i++) {
                movieItems.push(
                    <PurchasePickerChildItem
                        imgUrl={this.state.childMovie.list[i]} showOnPress={() => {
                    }} deleteOnPress={(index) => {
                        let news = {...this.state.childMovie};
                        news.list.splice(index, 1);
                        this.setState({childMovie: news});
                    }} allLength={this.state.childMovie.list.length} key={i} index={i} mOnPress={(index) => {
                        if (this.state.childMovie.list.length < 8) {
                            this.selectPhotoTapped('addPicker')
                        }
                    }}/>)
            }
        } else {
            movieItems.push(<PurchasePickerChildItem allLength={this.state.childMovie.list.length} key={0} index={0}
                                                     mOnPress={(index) => {

                                                         this.selectPhotoTapped('addPicker')
                                                     }}/>)
        }

        return (
            <View style={styles.parentView}>
                <View style={{width: width, marginTop: Pixel.getPixel(15), flexDirection: 'row'}}>
                    <Text style={{fontSize: fontAndColor.BUTTONFONT30, color: fontAndColor.COLORB2}}>*</Text>
                    <Text style={{fontSize: fontAndColor.BUTTONFONT30, color: fontAndColor.COLORA0}}>{movie.name}</Text>
                </View>
                <View style={{width: width, marginTop: Pixel.getPixel(7), flexDirection: 'row', flexWrap: 'wrap'}}>
                    {movieItems}
                </View>
            </View>
        );
    }

    selectPhotoTapped = (id) => {
        const options = {
            //弹出框选项
            title: '请选择',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            allowsEditing: true,
            noData: true,
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
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
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                if (id === 'addPicker') {
                    let news = {...this.state.childMovie};
                    news.list.push({url: response.uri});
                    this.setState({
                        childMovie: news
                    });
                }
            }
        });
    }

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