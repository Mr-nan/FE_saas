/**
 * Created by zhengnan on 2018/8/23.
 *
 * 微信分享
 *
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
} from 'react-native';

import *as weChat from 'react-native-wechat';
import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';

const Pixel = new PixelUtil();
var ScreenWidth = Dimensions.get('window').width;
export default class ZNSharedView extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isVisible: false,
        };
    }

    isVisible = (visible,sharedData) => {

        if(this.state.isVisible == visible) return;
        this.sharedData = sharedData;
        this.setState({
            isVisible: visible,
        });
    }


    // 分享好友
    sharedWechatSession = (sharedData) => {

        if(!sharedData){ console.log('请传入分享数据');return;}

        weChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    weChat.shareToSession({
                        type: 'news',
                        title: sharedData.title,
                        description: sharedData.content,
                        webpageUrl: sharedData.url,
                        thumbImage: sharedData.image,

                    }).then((resp)=>{

                        this.props.sharedSucceedAction && this.props.sharedSucceedAction();
                        console.log('分享成功');

                    },(error) => {
                        this.props.sharedFaultAction && this.props.sharedFaultAction('分享失败');

                    })
                } else {
                    this.props.sharedFaultAction && this.props.sharedFaultAction('没安装微信');
                }
            });


    }

    // 分享朋友圈
    sharedWechatTimeline = (sharedData) => {

        if(!sharedData){ console.log('请传入分享数据');return;}
        weChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    weChat.shareToTimeline({
                        type: 'news',
                        title: sharedData.title,
                        description: sharedData.content,
                        webpageUrl: sharedData.url,
                        thumbImage: sharedData.image,
                    }).then((resp)=>{

                        this.props.sharedSucceedAction && this.props.sharedSucceedAction();

                    },(error) => {
                        this.props.sharedFaultAction && this.props.sharedFaultAction('分享失败');

                    })

                } else {
                    this.props.sharedFaultAction && this.props.sharedFaultAction('没安装微信');
                }
            });

    }




    render() {

        return (
            <Modal
                visible={this.state.isVisible}
                transparent={true}
                onRequestClose={() => {
                    this.isVisible(false)
                }}
                animationType={'fade'}>
                <View style={styles.sharedContaier}>
                    <View style={styles.sharedView}>
                        <View style={{flexDirection: 'row',paddingVertical:Pixel.getPixel(15)}}>
                            <TouchableOpacity style={styles.sharedItemView}
                                              onPress={() => {
                                                  this.sharedWechatSession(this.sharedData);
                                                  this.isVisible(false);
                                              }}>
                                <View style={styles.sharedImageBack}>
                                    <Image source={require('../../images/carSourceImages/shared_wx.png')}/>
                                </View>
                                <Text allowFontScaling={false}  style={styles.sharedText}>微信好友</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sharedItemView}
                                              onPress={() => {
                                                  this.sharedWechatTimeline(this.sharedData);
                                                  this.isVisible(false);
                                              }}>
                                <View style={styles.sharedImageBack}>
                                    <Image source={require('../../images/carSourceImages/shared_friend.png')}/>
                                </View>
                                <Text allowFontScaling={false}  style={styles.sharedText}>朋友圈</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity  style={{justifyContent:'center',alignItems:'center',borderTopWidth:Pixel.getPixel(1),borderTopColor:fontAndColor.COLORA3,height:Pixel.getPixel(44),
                            width:ScreenWidth
                        }} activeOpacity={1}  onPress={() => {this.isVisible(false)}}>
                            <Text style={styles.sharedViewHeadText}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    sharedContaier: {
        flex: 1,
        backgroundColor: 'rgba(1,1,1,0.5)',
    },
    sharedView: {
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    sharedViewHead: {
        height: Pixel.getPixel(44),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: ScreenWidth
    },
    sharedViewHeadText: {

        color: fontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
    sharedImageBack:{
        backgroundColor:fontAndColor.COLORB9,
        borderRadius:Pixel.getPixel(10),
        width:Pixel.getPixel(50),
        height:Pixel.getPixel(50),
        justifyContent:'center',
        alignItems:'center'
    },
    sharedItemView: {

        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Pixel.getPixel(20),
        marginRight: Pixel.getPixel(20),
        marginTop: Pixel.getPixel(10),
        marginBottom: Pixel.getPixel(10),
    },
    sharedText: {
        color: fontAndColor.COLORA1,
        textAlign: 'center',
        marginTop: Pixel.getPixel(10),
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    },
})