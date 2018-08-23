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
    Dimensions
} from 'react-native';


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

    isVisible = (visible) => {

        this.setState({
            isVisible: visible,
        });
    }



    // 分享好友
    sharedWechatSession = (sharedData) => {
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
                        console.log('分享失败');

                    })
                } else {
                    this.isVisible(false);
                }
            });


    }

    // 分享朋友圈
    sharedWechatTimeline = (sharedData) => {
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
                        console.log('分享成功');

                    },(error) => {
                        console.log('分享失败');

                    })

                } else {
                    this.isVisible(false);
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

                <TouchableOpacity style={styles.sharedContaier} onPress={() => {
                    this.isVisible(false)
                }}>
                    <View style={styles.sharedView}>
                        <View style={{flexDirection: 'row',paddingVertical:Pixel.getPixel(15)}}>
                            <TouchableOpacity style={styles.sharedItemView}
                                              onPress={() => {
                                                  this.sharedWechatSession(this.props.sharedData);
                                                  this.isVisible(false);
                                              }}>
                                <View style={styles.sharedImageBack}>
                                    <Image source={require('../../images/carSourceImages/shared_wx.png')}/>
                                </View>
                                <Text allowFontScaling={false}  style={styles.sharedText}>微信好友</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sharedItemView}
                                              onPress={() => {
                                                  this.sharedWechatTimeline(this.props.sharedData);
                                                  this.isVisible(false);
                                              }}>
                                <View style={styles.sharedImageBack}>
                                    <Image source={require('../../images/carSourceImages/shared_friend.png')}/>
                                </View>
                                <Text allowFontScaling={false}  style={styles.sharedText}>朋友圈</Text>
                            </TouchableOpacity>
                        </View>
                        <View  style={{justifyContent:'center',alignItems:'center',borderTopWidth:Pixel.getPixel(1),borderTopColor:fontAndColor.COLORA3,height:Pixel.getPixel(44),
                            width:ScreenWidth
                        }}>
                            <Text style={styles.sharedViewHeadText}>取消</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

        )
    }

}