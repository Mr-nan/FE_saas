import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    NativeModules,
    Platform,
    Linking,
    TextInput,
    Animated,
    KeyboardAvoidingView
} from 'react-native'

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../../utils/PixelUtil';

const Pixel = new PixelUtil();
import NavigationBar from '../../../../component/NavigationBar';
import * as fontAndColor from '../../../../constant/fontAndColor';
import BaseComponent from '../../../../component/BaseComponent';
import * as Net from '../../../../utils/RequestUtil';
import * as AppUrls from '../../../../constant/appUrls';
import SaasText from "../../../accountManage/zheshangAccount/component/SaasText";
import MyButton from '../../../../component/MyButton'
import LicenseImageScene from "./LicenseImageScene";
import ImageSourceSample from "../../../../publish/component/ImageSourceSample";
import ImagePicker from "react-native-image-picker";
import * as ImageUpload from '../../../../utils/ImageUpload'
import Result from "./Result";

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

export default class UploadProof extends BaseComponent {


    constructor(props) {
        super(props)

        // file_id:"2335124"
        // icon:"http://zuopeng.img-cn-beijing.aliyuncs.com/Uploads/Oss/201805/04/5aec19c15ee54.jpeg@80h_80w_2e"
        // img_url:"http://zuopeng.img-cn-beijing.aliyuncs.com/Uploads/Oss/201805/04/5aec19c15ee54.jpeg"
        // is_cover:0
        // url:"http://zuopeng.oss-cn-beijing.aliyuncs.com/Uploads/Oss/201805/04/5aec19c15ee54.jpeg"
        this.state={
            images:null
        }

    }


    render() {
        
        
        return (
            <View style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'凭证上传'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />

                <ScrollView>


                    <View
                        style={{
                            backgroundColor: 'white',
                            flexDirection:'row',
                            paddingVertical:Pixel.getPixel(10)

                        }}
                    >
                        
                        <LicenseImageScene
                            image={this.state.images!==null?{uri:this.state.images.icon}:null}
                            ref={'id_front'}
                            onPress={() => {
                                this._rePhoto('legal_picurl')
                            }}
                            onDelete={() => {
                                this.setState({
                                   images:null
                                })
                            }}
                        />


                    </View>

                    <View
                        style={{
                            marginHorizontal: Pixel.getPixel(15),
                            marginTop: Pixel.getPixel(20)

                        }}
                    >
                        <SaasText style={{fontSize: 12, fontWeight: '200', lineHeight: 20}}>友情提示：</SaasText>
                        <SaasText style={{
                            fontSize: 12,
                            fontWeight: '200',
                            color: fontAndColor.COLORA1,
                            lineHeight: 20
                        }}>{"提交后，此运单会进入运单转账审核页中。"}
                        </SaasText>

                    </View>


                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={'提交'}
                        parentStyle={styles.next_parentStyle}
                        childStyle={styles.next_childStyle}
                        mOnPress={() => {

                           this.submit()
                        }}/>

                    <ImageSourceSample

                        galleryClick={this._photoClick}
                        cameraClick={this._cameraClick}
                        ref={(modal) => {
                            this.imageSource = modal
                        }}/>
                </ScrollView>

            </View>)
    }

    submit=()=>{

        if(this.state.images === null){
            this.props.showToast('请上传凭证');
            return;
        }


        this.props.showModal(true)

        let params = {
            company_id:global.companyBaseID,
            voucher:this.state.images.url,
            trans_id:this.props.order.trans_id,

        }

        Net.request(AppUrls.LOGISTICS_ORDER_PROOF, 'post', params).then((response) => {
            this.props.showModal(false)
            this.toNextPage({
                name: 'Result',
                component: Result,
                params: {
                    order:this.props.order,
                    from:'offLine',
                    callBack:this.props.callBack,
                }
            });

        }, (error) => {
            this.props.showModal(false)
            this.props.showToast(error.mjson.msg);

        });

    }


    _rePhoto = (ID) => {
        this.imageSource.openModal('', '', null);

    };
    /*
        * 相机点击
        * */
    _cameraClick = () => {
        this.timer = setTimeout(
            () => {
                ImagePicker.launchCamera(options, (response) => {
                    if (response.didCancel) {
                    } else if (response.error) {
                    } else if (response.customButton) {
                    } else {
                        this.uploadImage(response);
                    }
                });
            },
            200
        );


    }

    /*
     * 相册点击
     * */
    _photoClick = () => {
        this.timer = setTimeout(
            () => {
                ImagePicker.launchImageLibrary(options, (response) => {
                    if (response.didCancel) {
                    } else if (response.error) {
                    } else if (response.customButton) {
                    } else {
                        this.uploadImage(response, this.id);
                    }
                });
            },
            200
        );

    }
    /*
     * 图片上传
     * */
    uploadImage = (response, id) => {
        let params = {
            base64_file: 'data:image/jpeg;base64,' + encodeURI(response.data).replace(/\+/g, '%2B')
        };
        this.props.showModal(true);

    
        ImageUpload.request(AppUrls.AUTH_UPLOAD_FILE, 'Post', params)
            .then((response) => {
                this.props.showModal(false);

                if (response.mycode == 1) {
                    
                    console.log(response.mjson.data)
                    this.setState({
                        images:response.mjson.data,
                    })
                } else {
                    this.props.showToast(response.mjson.msg + "!");
                }
            }, (error) => {
                this.props.showModal(false);

                this.props.showToast("图片上传失败");
            });
    }
}

const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3,
    },
    next_parentStyle: {
        backgroundColor: fontAndColor.COLORB0,
        marginHorizontal: Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Pixel.getPixel(53),
        borderRadius: 2
    },

    next_childStyle: {
        fontSize: 16,
        color: 'white',
        marginVertical: Pixel.getPixel(15)
    }

})