/**
 * Created by hanmeng on 2017/8/3.
 */

import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    RefreshControl,
    Keyboard
} from  'react-native'
import BaseComponent from "../../component/BaseComponent";
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import * as AppUrls from "../../constant/appUrls";
import {request} from "../../utils/RequestUtil";
import LoadMoreFooter from "../../carSource/znComponent/LoadMoreFooter";
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
const Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');

export default class ClientSearchScene extends BaseComponent {

    // 构造
    /**
     *
     * @returns {XML}
     **/
    constructor(props) {
        super(props);
        this.pageNum = 1;
        this.allPage = 1;
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            value: '',
            startSearch: 0
        };
    }

    /**
     *
     * @returns {XML}
     **/
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    /**
     *
     * @returns {XML}
     **/
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    /**
     *
     * @returns {XML}
     **/
    _keyboardDidShow() {
        //alert('Keyboard Shown');
    }

    /**
     *
     * @returns {XML}
     **/
    _keyboardDidHide() {
        //alert('Keyboard Hidden');
    }

    /**
     *
     * @returns {XML}
     **/
    initFinish = () => {
        //this.loadData();
        this.setState({
            renderPlaceholderOnly: 'success'
        });
    }

    /**
     *
     * @returns {XML}
     **/
    dateReversal = (time) => {
        const date = new Date();
        date.setTime(time);
        return (date.getFullYear() + "-" + (this.PrefixInteger(date.getMonth() + 1, 2)) + "-" +
        (this.PrefixInteger(date.getDate(), 2)));
    };

    /**
     *
     * @returns {XML}
     **/
    PrefixInteger = (num, length) => {
        return (Array(length).join('0') + num).slice(-length);
    };

    /**
     *
     * @returns {XML}
     **/
    refreshingData = () => {
        this.orderListData = [];
        this.setState({isRefreshing: true});
        this.loadData();
    };

    /**
     *
     * @returns {XML}
     **/
    startSearch = () => {
        Keyboard.dismiss();
        if (this.state.value === '') {
            this.props.showToast('车辆名称不能为空');
        } else {
            this.setState({
                startSearch: 1,
                renderPlaceholderOnly: 'loading'
            });
            this.loadData();
        }
    };

    /**
     *
     * @returns {XML}
     **/
    renderListFooter = () => {
        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<LoadMoreFooter isLoadAll={this.pageNum >= this.allPage} isCarFoot={false}/>)
        }
    };

    /**
     *
     * @returns {XML}
     **/
    loadData = () => {

    };

    /**
     *
     * @returns {XML}
     **/
    _renderPlaceholderView() {
        return (
            <View style={styles.container}>
                <View style={styles.navigatorView}>
                    <View style={styles.navitgatorContentView}>
                        <TouchableOpacity
                            style={{justifyContent: 'center'}}
                            onPress={this.backPage}>
                            <Image style={styles.backIcon}
                                   source={require('../../../images/mainImage/navigatorBack.png')}/>
                        </TouchableOpacity>
                        <View style={styles.navigatorSousuoView}>
                            <Image style={{marginLeft: Pixel.getPixel(15), marginRight: Pixel.getPixel(10)}}
                                   source={require('../../../images/carSourceImages/sousuoicon.png')}/>
                            <TextInput
                                onChangeText={(text) => this.setState({value: text})}
                                placeholder={"电话、姓名、意向车型"}
                                style={styles.inputStyle}
                                underlineColorAndroid="transparent"

                            />
                        </View>
                        <TouchableOpacity onPress={this.startSearch}>
                            <View style={{
                                marginLeft: Pixel.getPixel(10),
                                width: Pixel.getPixel(50),
                                height: Pixel.getPixel(40),
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text allowFontScaling={false}  style={{
                                    color: 'white',
                                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30)
                                }}>搜索</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.loadView()}
            </View>
        );
    }

    /**
     *
     * @returns {XML}
     **/
    toEnd = () => {
        if (this.orderListData.length && !this.state.isRefreshing) {
            //this.loadMoreData();
        }
    };

    /**
     *
     * @returns {XML}
     **/
    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.navigatorView}>
                        <View style={styles.navitgatorContentView}>
                            <TouchableOpacity
                                style={{justifyContent: 'center'}}
                                onPress={this.backPage}>
                                <Image style={styles.backIcon}
                                       source={require('../../../images/mainImage/navigatorBack.png')}/>
                            </TouchableOpacity>
                            <View style={styles.navigatorSousuoView}>
                                <Image style={{marginLeft: Pixel.getPixel(15), marginRight: Pixel.getPixel(10)}}
                                       source={require('../../../images/carSourceImages/sousuoicon.png')}/>
                                <TextInput
                                    onChangeText={(text) => this.setState({value: text})}
                                    placeholder={"电话、姓名、意向车型"}
                                    style={styles.inputStyle}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <TouchableOpacity onPress={this.startSearch}>
                                <View style={{
                                    marginLeft: Pixel.getPixel(10),
                                    width: Pixel.getPixel(50),
                                    height: Pixel.getPixel(40),
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text allowFontScaling={false}  style={{
                                        color: 'white',
                                        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30)
                                    }}>搜索</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getPixel(14)}}
                              dataSource={this.state.dataSource}
                              renderRow={this._renderRow}
                              removeClippedSubviews={false}
                              enableEmptySections={true}
                              renderSeparator={this._renderSeperator}
                              renderFooter={this.state.startSearch === 0 ? null : this.renderListFooter}
                              onEndReached={this.state.startSearch === 0 ? null : this.toEnd}
                              refreshControl={this.state.startSearch === 0 ? null :
                                  <RefreshControl
                                      refreshing={this.state.isRefreshing}
                                      onRefresh={this.refreshingData}
                                      tintColor={[fontAndColor.COLORB0]}
                                      colors={[fontAndColor.COLORB0]}
                                  />
                              }/>
                </View>
            )
        }
    }

    /**
     *
     * @returns {XML}
     **/
    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(10)}}/>
        )
    }

    /**
     *
     * @returns {XML}
     **/
    _renderRow = (rowData, selectionID, rowID) => {

    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    },
    backIcon: {

        marginLeft: Pixel.getPixel(12),
        height: Pixel.getPixel(20),
        width: Pixel.getPixel(20),
    },
    checkedContentView: {

        backgroundColor: fontAndColor.COLORA3,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'space-between',
        flexWrap: 'wrap',
    },

    checkedContentItem: {

        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: Pixel.getPixel(20),
        paddingHorizontal: Pixel.getPixel(5),
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(5),
        marginBottom: Pixel.getPixel(5),
        borderRadius: 4,
    },
    checkedItemText: {
        color: fontAndColor.COLORA0,
        fontSize: fontAndColor.CONTENTFONT,
    },
    checkedDeleteImg: {
        width: Pixel.getPixel(10),
        height: Pixel.getPixel(10),
        marginLeft: Pixel.getPixel(5),
    },
    checkedDelectView: {
        height: Pixel.getPixel(20),
        width: Pixel.getPixel(50),
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: fontAndColor.COLORA2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Pixel.getPixel(10),
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(10),
    },
    checkedDelectText: {
        color: fontAndColor.COLORA2,
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT),
    },
    carCell: {
        height: Pixel.getPixel(110),
    },
    navigatorView: {
        top: 0,
        height: Pixel.getTitlePixel(64),
        backgroundColor: fontAndColor.COLORB0,
        flexDirection: 'row'
    },
    navitgatorContentView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: Pixel.getTitlePixel(20),
        height: Pixel.getPixel(44),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: fontAndColor.COLORB0
    },
    navigatorLoactionView: {
        flexDirection: 'row',
        width: Pixel.getPixel(85),
        alignItems: 'center'
    },
    navigatorSousuoView: {
        height: Pixel.getPixel(27),
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        width: width - Pixel.getPixel(100),
        flexDirection: 'row'
    },
    navigatorText: {
        marginLeft: Pixel.getPixel(6),
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),

    },
    navigatorSousuoText: {

        color: fontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),

    },
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    image: {
        marginLeft: Pixel.getPixel(15),
        width: Pixel.getPixel(120),
        height: Pixel.getPixel(80),
        resizeMode: 'stretch'
    },
    carDescribeTitle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1
    },
    carDescribe: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA0
    },
    rowTitleLine: {
        alignItems: 'center',
        height: Pixel.getPixel(40),
        justifyContent: 'flex-start',
        flexDirection: 'row',
        //marginTop: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)
    },
    rowView: {
        height: Pixel.getPixel(186),
        backgroundColor: 'white'
    },
    rowTitleText: {
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        color: fontAndColor.COLORA0,
    },
    rowTitleState: {
        alignItems: 'flex-end',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB2,
        marginRight: Pixel.getPixel(15)
    },
    inputStyle: {
        flex: 1,
        //backgroundColor: 'transparent',
        marginLeft: Pixel.getPixel(5),
        textAlign: 'left',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA2,
        padding: 0
    }
});
