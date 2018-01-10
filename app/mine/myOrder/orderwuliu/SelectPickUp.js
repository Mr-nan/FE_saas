import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity, Dimensions, Image,
} from 'react-native';
import BaseComponent from '../../../component/BaseComponent';
import NavigatorView from '../../../component/AllNavigationView';

const {width} = Dimensions.get('window');
import * as FontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import MyButton from "../../../component/MyButton";
import AddressManage from './AddressManage';

const selected_icon = require('../../../../images/selected_icon.png');
const no_select_icon = require('../../../../images/no_select_icon.png');
const Pixel = new PixelUtil();
let accountInfo = [{name: '张大大', tel: '13000000001', isSelect: true}, {name: '李小小', tel: '13000000001', isSelect: false}]
export default class SelectPickUp extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: false,
            accountInfo:accountInfo
        }
    }

    initFinish() {
        this.setState({
            renderPlaceholderOnly: 'success'
        });
    }

    itemClick=(index)=>{
        accountInfo.map((data)=>{
            data.isSelect=false;
        })
        accountInfo[index].isSelect=true;
        this.setState({
            accountInfo:accountInfo
        });

    }

    _renderItem = () => {
        return (
            <View style={{flex: 1}}>

                <View style={{
                    backgroundColor: 'white',
                    paddingHorizontal: Pixel.getPixel(15)
                }}>
                    {
                        this.state.accountInfo.map((data, index) => {
                            return (
                                <TouchableOpacity key={index + 'accountInfo'} activeOpacity={0.8} onPress={() => {
                                    this.itemClick(index);
                                }}>
                                    <View style={styles.content_title_text_wrap}>
                                        <Image source={data.isSelect ? selected_icon : no_select_icon} style={{marginRight:Pixel.getPixel(15)}}/>
                                        <Text style={styles.content_title_text}>{data.name}</Text>
                                        <Text style={styles.content_base_Right}>{data.tel}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>

                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'确定'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={() => {
                              this.toNextPage({
                                      name: 'AddressManage',
                                      component: AddressManage,
                                      params: {}
                                  }
                              );
                          }}/>
            </View>
        );

    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>
                {this.loadView()}
                <NavigatorView title='选择提车人' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <View style={{flex: 1, marginTop: Pixel.getTitlePixel(65),}}>
                    {
                        this._renderItem()
                    }
                </View>
                <NavigatorView title='选择提车人' backIconClick={this.backPage}/>
            </View>)
        }

    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: FontAndColor.all_background,
        flex: 1,
    },
    content_title_wrap: {
        height: Pixel.getPixel(51),
        backgroundColor: FontAndColor.all_background,
    },
    content_title_text_wrap: {
        height: Pixel.getPixel(45),
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORA4,
        backgroundColor: 'white'
    },
    content_title_text: {
        flex: 1,
        fontSize: Pixel.getFontPixel(14),
        color: 'black',
    },
    content_base_wrap: {
        height: Pixel.getPixel(46),
        minHeight: Pixel.getPixel(46),
        backgroundColor: 'white'
    },
    content_base_text_wrap: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORA4,
        marginHorizontal: Pixel.getPixel(15)
    },
    content_base_Right: {
        fontSize: Pixel.getFontPixel(14),
        color: 'black',
        textAlign: 'right'
    },
    image: {
        marginLeft: Pixel.getPixel(10),
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15)
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
});
