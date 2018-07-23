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
                        <Text style={{color:'#333333',fontSize:Pixel.getFontPixel(14)}}>{rowData.supervision_name}</Text>
                        <Text style={{color:'#999999',fontSize:Pixel.getFontPixel(12)}}>{rowData.supervision_name}</Text>
                    </View>
                        {
                            selectID == rowData.merge_id?
                                <Image source={require('../../../images/mainImage/agreed_sign.png')}/> :
                                <Image source={require('../../../images/mainImage/un_agreed_sign.png')}/>
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