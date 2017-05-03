/**
 * Created by Administrator on 2017/2/13.
 */
import React,{ Component } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    NativeModules
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');
export default class ImageSource extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    _cancelClick = ()=>{
        this.setState({
            modalVisible: false
        });
    };

    openModal = (cameraClick,galleryClick)=>{
        this.name = '';
        this.setState({
            modalVisible: true,
        });
    };

    render(){
        return(
            <Modal
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}>
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={()=>{this._cancelClick();this.cameraClick();}}>
                            <View style={styles.btnContainer}>
                                <Text style={styles.fontMain}>拍摄</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.splitLine}/>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={()=>{this._cancelClick();this.galleryClick();}}>
                            <View style={styles.btnContainer}>
                                <Text style={styles.fontMain}>从手机相册选择</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.splitView}/>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={()=>{this._cancelClick()}}>
                            <View style={styles.btnContainer}>
                                <Text style={styles.fontMain}>取消</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
    cameraClick=()=>{
        NativeModules.CustomCamera.takePic().then((response) => {
            // console.log("============>>>>>>>>>");
            // console.log(response.data);
            console.log('11111');
        }, (error) => {

        })
    }

    galleryClick=()=>{
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
                console.log('22222');
            }
        });
    }

}

const styles = StyleSheet.create({
    container:{
        width:width,
        flex:1,
        backgroundColor:'rgba(0,0,0,0.3)',
        justifyContent:'flex-end'
    },
    contentContainer:{
        backgroundColor:fontAndColor.COLORA3
    },
    btnContainer:{
        width:width,
        height:Pixel.getPixel(44),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF'
    },
    fontMain:{
        color:'#000000',
        fontSize:Pixel.getFontPixel(15)
    },
    splitLine:{
        borderColor:fontAndColor.COLORA4,
        borderWidth:0.5
    },
    splitView:{
        width:width,
        height:Pixel.getPixel(10),
        backgroundColor:'transparent'
    }
});


