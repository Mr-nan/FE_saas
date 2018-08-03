import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import PixelUtil            from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAnColor from '../../constant/fontAndColor'

class SelectLoanAmount extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {rowData,selectID,selectIdB} = this.props;
        return (
            <TouchableOpacity
                onPress={()=>selectIdB(rowData.merge_id,rowData.credit_record_id,rowData.supervision_code)}>
                <View style={{flexDirection:'row',paddingBottom:Pixel.getPixel(19),paddingLeft:Pixel.getPixel(15),alignItems:'center',paddingRight:Pixel.getPixel(15),paddingTop:Pixel.getPixel(17),backgroundColor:'#ffffff'}}>
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#333333',fontSize:Pixel.getFontPixel(14),}}>{rowData.credit_maxloanmny_txt}</Text>
                            <Text style={{color:'#FA5741',fontSize:Pixel.getFontPixel(14),backgroundColor:'#fee3e2',borderRadius:Pixel.getPixel(10),paddingTop:0,paddingBottom:0,paddingLeft:Pixel.getPixel(3),paddingRight:Pixel.getPixel(3),textAlign:'center'}}>{rowData.credit_maxloanmny}</Text>
                        </View>
                        <Text style={{color:'#999999',fontSize:Pixel.getFontPixel(12),marginTop:Pixel.getPixel(3)}}>{rowData.supervision_msg}</Text>
                    </View>
                        {
                            selectID == rowData.merge_id + rowData.supervision_code + rowData.credit_record_id ?
                                <Image style={{width:Pixel.getPixel(20),height:Pixel.getPixel(20)}} source={require('../../../images/mainImage/agreed_sign.png')}/> :
                                <Image style={{width:Pixel.getPixel(20),height:Pixel.getPixel(20)}} source={require('../../../images/mainImage/un_agreed_sign.png')}/>
                        }
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    footer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:Pixel.getPixel(60) ,
    },
    footerTitle: {
        marginLeft: Pixel.getPixel(10),
        fontSize: Pixel.getFontPixel(fontAnColor.LITTLEFONT28),
        color: fontAnColor.COLORA2,
    }
})

export default SelectLoanAmount