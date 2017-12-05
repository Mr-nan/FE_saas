import React, {Component,PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import * as  fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
const {width} = Dimensions.get('window');
let tabName=[];
export default class ChildTabView extends PureComponent {

    constructor(props) {
        super(props);
        tabName=this.props.tabName;
        this.tab=this.props.tab
        this.tabNum=tabName.length;this.state = {
            noPayNum:this.props.noPayNum ,
        };

    }

    freshData=(data)=>{
        console.log('^^^^^^^^^',data);
        this.setState({
            noPayNum: data
        });
    }

    render() {
        let that = this;
        return (<TouchableOpacity  onPress={()=>{
            this.props.goToPages(this.props.i)
        }} style={styles.tab}>
            <View
                style={[{width:Pixel.getPixel(width/(that.tabNum)), height: Pixel.getPixel(38),
                justifyContent: 'center', alignItems: 'center',flexDirection: 'row'}]}>
                <Text allowFontScaling={false}  ref="ttt"
                      style={[this.props.activeTab === this.props.i ? {color: fontAndColor.COLORB0} : {color: fontAndColor.COLORA0},
                        {fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}]}>
                    {tabName[this.props.i]}
                </Text>
                {!this.isEmpty(this.state.noPayNum)&& this.tab==='no-pay' ?<Text allowFontScaling={false}
                        style={[{color: fontAndColor.COLORB2},
                        {fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}]}>{" ("+this.state.noPayNum+")"}</Text>:<View/>}
            </View>
            <View style={[{height: Pixel.getPixel(2)},
                this.props.activeTab === this.props.i ? {backgroundColor: fontAndColor.COLORB0} : {backgroundColor: '#ffffff'}]}>
            </View>
        </TouchableOpacity>);
    }

}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        backgroundColor: '#ffffff',
        width:width/3
    },
    tabs: {
        height: Pixel.getPixel(40),
        flexDirection: 'row',
        borderBottomColor: '#fff',
    },
});

