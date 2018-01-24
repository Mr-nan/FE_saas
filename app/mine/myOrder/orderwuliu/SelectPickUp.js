import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity, Dimensions, Image, ListView,RefreshControl
} from 'react-native';
import BaseComponent from '../../../component/BaseComponent';
import NavigatorView from '../../../component/AllNavigationView';

const {width} = Dimensions.get('window');
import * as FontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import MyButton from "../../../component/MyButton";
import GetCarerManageEditScene from '../../getCarerManage/GetCarerManageEditScene';
import {request} from '../../../utils/RequestUtil';
import * as Urls from '../../../constant/appUrls';

const selected_icon = require('../../../../images/selected_icon.png');
const no_select_icon = require('../../../../images/no_select_icon.png');
const Pixel = new PixelUtil();
let accountInfo = [{name: '张大大', tel: '13000000001', isSelect: true}, {
    name: '李小小',
    tel: '13000000001',
    isSelect: false
}]
let allSouce=[];
export default class SelectPickUp extends BaseComponent {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: false,
            accountInfo: accountInfo,
            dataSource: this.ds.cloneWithRows(accountInfo),
            isRefreshing: false,
        }
    }

    initFinish() {
        //allSouce=[];
        this.getData();
    }
    getData = () => {
        allSouce=[];
        let maps = {
            company_id:global.companyBaseID,
        };
        request(Urls.GET_GETER_LIST, 'Post', maps)
            .then((response) => {
                    this.props.showModal(false);
                    if(response.mycode === 1){
                        accountInfo = [];
                        allSouce.push(...response.mjson.data);
                        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        allSouce.map((data)=>{
                            accountInfo.push({
                                name:data.name,
                                phone:data.phone,
                                isSelect:false
                            });
                        });
                        this.setState({
                            dataSource: ds.cloneWithRows(accountInfo),
                            isRefreshing: false,
                            renderPlaceholderOnly: 'success'
                        });
                    }else {
                        this.setState({renderPlaceholderOnly: 'error'});
                    }
                },
                (error) => {
                    this.props.showModal(false);
                    this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                });
    };

    refreshingData = () => {
        allSouce = [];
        this.setState({isRefreshing: true});
        this.getData();
    };

    allRefresh = () => {
        this.setState({
            renderPlaceholderOnly: 'loading',
        });
        this.getData();
    }

    itemClick = (index) => {
        accountInfo.map((data) => {
            data.isSelect = false;
        })
/*        accountInfo.push({
            name:accountInfo[index].name,
            phone:accountInfo[index].phone
        });*/
        accountInfo[index].isSelect = true;
        this.setState({
            dataSource: this.ds.cloneWithRows(accountInfo),
        });

    }
    _renderRow = (data, s,index) => {
        return (
            <TouchableOpacity key={index + 'accountInfo'} activeOpacity={0.8} onPress={() => {
                this.itemClick(index);
            }}>
                <View style={styles.content_title_text_wrap}>
                    <Image source={data.isSelect ? selected_icon : no_select_icon}
                           style={{marginRight: Pixel.getPixel(15)}}/>
                    <Text style={styles.content_title_text}>{data.name}</Text>
                    <Text style={styles.content_base_Right}>{data.phone}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _renderItem = () => {
        return (
            <View style={{flex: 1}}>

                <View style={{
                    backgroundColor: 'white',
                    paddingHorizontal: Pixel.getPixel(15)
                }}>
                    <ListView
                        dataSource={this.state.dataSource}
                        removeClippedSubviews={false}
                        renderRow={this._renderRow}
                        enableEmptySections={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.refreshingData}
                                tintColor={[FontAndColor.COLORB0]}
                                colors={[FontAndColor.COLORB0]}
                            />
                        }
                    />

                </View>

                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'编辑提车人'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={() => {
                              this.toNextPage({
                                  component:GetCarerManageEditScene,
                                  name:'GetCarerManageEditScene',
                                  params:{item:{},refreshData:this.refreshingData}
                              });
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
                <NavigatorView title='选择提车人' backIconClick={this.backPage} renderRihtFootView={this.renderRightView}/>
            </View>)
        }

    }

    renderRightView = () => {
        return (
            <TouchableOpacity onPress={
                () => {
                    this.backPage();
                    this.props.callBack(callBackInfo);
                }
            }>
                <View style={{
                    marginLeft: Pixel.getPixel(20),
                    width: Pixel.getPixel(80),
                    height: Pixel.getPixel(40),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text allowFontScaling={false}
                          style={{color: 'white', fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT30)}}>完成</Text>
                </View>
            </TouchableOpacity>
        )


    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: FontAndColor.COLORA3,
        flex: 1,
    },
    content_title_wrap: {
        height: Pixel.getPixel(51),
        backgroundColor: FontAndColor.COLORA3,
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
        marginTop: Pixel.getPixel(10),
        position:'absolute',
        bottom:Pixel.getPixel(10),
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
