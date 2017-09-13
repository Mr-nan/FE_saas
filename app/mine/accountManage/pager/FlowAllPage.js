/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import {request} from '../../../utils/RequestUtil';
import * as Urls from '../../../constant/appUrls';
import StorageUtil from "../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../constant/storageKeyNames";
import BaseComponent from '../../../component/BaseComponent';
export  default class FlowAllPage extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态

        this.state = {
            renderPlaceholderOnly: 'blank',
            source: [],
            time: ''
        };
    }

    componentDidMount() {
        //InteractionManager.runAfterInteractions(() => {
        this.setState({renderPlaceholderOnly: 'loading'});
        this.initFinish();
        // });
    }

    initFinish = () => {
        this.getData();
    }

    getData = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    enter_base_ids: datas.company_base_id,
                    child_type: '1',

                };
                request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
                    .then((response) => {
                            this.getFlowData(datas.company_base_id, response.mjson.data.account.account_open_type);
                        },
                        (error) => {
                            this.setState({
                                renderPlaceholderOnly: 'error',
                            });
                        });
            } else {
                this.setState({
                    renderPlaceholderOnly: 'error',
                });
            }
        })
    }

    getFlowData = (id, type) => {
        let maps = {
            create_time: this.state.time,
            enter_base_id: id,
            transfer_type: this.props.transfer_type,
            user_type: type
        };
        request(Urls.ACCOUNT_PAYLOG, 'Post', maps)
            .then((response) => {
                    if (response.mjson.data == null || response.mjson.data.length <= 0) {
                        this.setState({
                            renderPlaceholderOnly: 'null',
                        });
                    } else {
                        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({
                            renderPlaceholderOnly: 'success',
                            source: ds.cloneWithRows(response.mjson.data)
                        });
                    }
                },
                (error) => {
                    if (error.mycode == '-2100045') {
                        this.setState({
                            renderPlaceholderOnly: 'null',
                        });
                    } else {
                        this.setState({
                            renderPlaceholderOnly: 'error',
                        });
                    }
                });
    }

    changeTime = (time) => {
        this.setState({
            time: time,
            renderPlaceholderOnly: 'loading'
        });
        this.getData();
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <ListView
                    removeClippedSubviews={false}
                    style={{marginTop:Pixel.getPixel(1)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        return (
            <View style={{
                    flex:1,
                    flexDirection:'column',
                    backgroundColor:'#ffffff',
                    paddingLeft:Pixel.getPixel(15),
                    paddingRight:Pixel.getPixel(15),
                    height:Pixel.getPixel(74),
                }}>
                <View
                    style={{flex:1,flexDirection:'row',height:Pixel.getPixel(37),alignItems:'center',paddingTop:Pixel.getPixel(5)}}>
                    <Text allowFontScaling={false} style={styles.leftText}>{movie.operate_name}</Text>
                    <Text allowFontScaling={false} style={styles.text}>{movie.amount}</Text>
                    <Text allowFontScaling={false} style={styles.rightText}>{movie.create_time}</Text>
                </View>
                <View
                    style={{flex:1,flexDirection:'row',height:Pixel.getPixel(37),alignItems:'center',paddingBottom:Pixel.getPixel(5)}}>
                    <Text allowFontScaling={false} style={styles.leftText}>{'向"锋之行"账户'}</Text>
                    <Text allowFontScaling={false} style={styles.text}>{"转账"}</Text>
                    <Text allowFontScaling={false} style={[styles.rightText,{color:'#fa5741'}]}>{''}</Text>
                </View>
            </View>
        )
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={{width:width,height:Pixel.getPixel(1),backgroundColor:fontAndColor.COLORA3}}
                  key={sectionId + rowId}>
            </View>
        )
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}

            </View>
        );
    }


}
const styles = StyleSheet.create({
    leftText: {
        color: '#000',
        fontSize: Pixel.getFontPixel(14),
        minWidth: Pixel.getPixel(100),
    },
    text: {
        color: '#000',
        fontSize: Pixel.getFontPixel(14),
        marginLeft: Pixel.getPixel(10)
    },
    rightText: {
        color: '#000',
        fontSize: Pixel.getFontPixel(14),
        flex: 1,
        textAlign: 'right',
    },
})