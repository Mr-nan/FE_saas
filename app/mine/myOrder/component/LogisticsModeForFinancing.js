/**
 * Created by hanmeng on 2018/1/8.
 */
import React, {PureComponent} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image
} from  'react-native'

const {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import TagSelectView from "./TagSelectView";
import ChooseModal from "./ChooseModal";
import BaseComponent from "../../../component/BaseComponent";
const Pixel = new PixelUtil();

export default class LogisticsModeForFinancing extends BaseComponent {

    /**
     *  初始化
     * @param props
     **/
    constructor(props) {
        super(props);
        this.tagSelect = [{
            name: '使用物流',
            check: false,
            id: 0
        }, {
            name: '车已在店',
            check: false,
            id: 1
        }];
        this.state = {
            useLogistics: 'al'
        }
    }

    /**
     *  页面 Receive
     * @param nextProps new Props
     **/
    componentWillReceiveProps(nextProps) {

    }

    onTagClick = (dt, index) => {
        //单选
        /*        this.tagSelect.map((data) => {
         data.check = false;
         });
         this.tagSelect[index].check = !this.tagSelect[index].check;
         this.tagRef.refreshData(this.tagSelect);*/
        if (index === 0) {
            // 使用物流  跳转到选择目的地页
        } else {
            // 车已在店
            this.refs.chooseModal.changeShowType(true, '取消', '确定', '选择车已在店需要风控人员后台审核确认，是否继续？',
                null);
        }
    };

    /**
     *  render
     **/
    render() {
        let views = '';
        if (this.state.useLogistics === 'unknown') {  // 未选择
            views =
                <View style={{
                    height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center',
                    paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
                }}>
                    <Text >交车方式</Text>
                    <View style={{flex: 1}}/>
                    <TagSelectView
                        buttonWidth={Pixel.getPixel(80)}
                        textSize={Pixel.getPixel(15)}
                        paddingHorizontal={Pixel.getPixel(8)}
                        ref={(ref) => {
                            this.tagRef = ref;
                        }} onTagClick={this.onTagClick} cellData={this.tagSelect}/>
                </View>
        } else if (this.state.useLogistics === 'logistics') {  // 选择物流
            views =
                <TouchableOpacity
                    onPress={() => {
                        // TODO 跳转到填写运单
                    }}>
                    <View style={{
                        height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center',
                        paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
                    }}>
                        <Text >填写运单</Text>
                        <View style={{flex: 1}}/>
                        <Text style={{color: fontAndColor.COLORB0}}>{this.state.waybillState}</Text>
                        <Image source={require('../../../../images/mainImage/celljiantou.png')}/>
                    </View>
                </TouchableOpacity>
        } else {  // 选择 车已在店
            views =
                <View>
                    <View style={{
                        height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center',
                        paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
                    }}>
                        <Text >车已在店</Text>
                        <View style={{flex: 1}}/>
                        <Text style={{color: fontAndColor.COLORB2}}>审核中</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                    }}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-start',margin: Pixel.getPixel(15)}}>
                            <Text style={{color: fontAndColor.COLORA1,
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>审核地址</Text>
                            <View style={{flex: 1}}/>
                            <Text style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                textAlign: 'right', width: Pixel.getPixel(250)}}>
                                审核中审核中审核中审核中审核中审核中审核中审核中审核中审核中审核中
                            </Text>
                        </View>
                    </View>
                </View>
        }
        return (
            <View style={{backgroundColor: '#ffffff'}}>
                {views}
                <ChooseModal ref='chooseModal' title='提示'
                             negativeButtonStyle={styles.negativeButtonStyle}
                             negativeTextStyle={styles.negativeTextStyle} negativeText='取消'
                             positiveButtonStyle={styles.positiveButtonStyle}
                             positiveTextStyle={styles.positiveTextStyle} positiveText='确定'
                             buttonsMargin={Pixel.getPixel(20)}
                             positiveOperation={() => {
                             }}
                             content=''/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    positiveTextStyle: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: '#ffffff'
    },
    positiveButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Pixel.getPixel(15),
        backgroundColor: fontAndColor.COLORB0,
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    },
    negativeTextStyle: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB0
    },
    negativeButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    }
});