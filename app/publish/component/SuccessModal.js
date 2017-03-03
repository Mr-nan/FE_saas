/**
 * Created by Administrator on 2017/2/13.
 */
import React,{ Component } from 'react';
import {
    View,
    Text,
    Image,
    Modal,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');
const imgLogo = require('../../../images/publish/success.png');

export default class SuccessModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    _okClick = ()=>{
        this.setState({
            modalVisible: false
        });
        this.props.okClick();
    };

    openModal = ()=>{
        this.setState({
            modalVisible: true
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
                        <Image style={styles.imgLogo} source={imgLogo}/>
                        <Text style={styles.fontMain}>发布成功</Text>
                        <Text style={styles.fontHint}>您可以到我的/车源中查看车辆状态</Text>
                        <View style={styles.fillSpace}/>
                        <TouchableOpacity
                            activeOpacity={0.2}
                            onPress={()=>{this._okClick()}}>
                            <View style={styles.okBtn}>
                                <Text style={styles.okText}>确定</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        backgroundColor:'rgba(0,0,0,0.3)',
        alignItems:'center'
    },
    contentContainer:{
        width:Pixel.getPixel(260),
        height:Pixel.getPixel(310),
        borderRadius:Pixel.getPixel(2),
        marginTop:Pixel.getPixel(157),
        alignItems:'center',
        backgroundColor:'#FFFFFF'
    },
    imgLogo:{
        marginTop:Pixel.getPixel(28),
        width:Pixel.getPixel(142),
        height:Pixel.getPixel(112)
    },
    fontMain:{
        marginTop:Pixel.getPixel(28),
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(20)
    },
    fontHint:{
        marginTop:Pixel.getPixel(8),
        color:fontAndColor.COLORA1,
        fontSize:Pixel.getFontPixel(14)
    },
    okBtn:{
        width:Pixel.getPixel(230),
        height:Pixel.getPixel(40),
        backgroundColor:fontAndColor.COLORB0,
        borderRadius:Pixel.getPixel(2),
        alignItems:'center',
        justifyContent:'center',
        marginBottom:Pixel.getPixel(17)
    },
    okText:{
        fontSize:Pixel.getFontPixel(15),
        color:'#FFFFFF'
    },
    fillSpace:{
        flex:1
    }
});


