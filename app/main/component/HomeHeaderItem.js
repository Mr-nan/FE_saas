/**
 * Created by yujinzhong on 2017/2/7.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';


/*
 * 获取字体型号,和颜色的文件
 **/
import * as fontAndClolr from '../../constant/fontAndColor';

/*
* 获取屏幕的宽和高
**/
const {width, height} = Dimensions.get('window');

export default class HomeHeaderItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected : false
        }
    }




    render() {
        return (
            <View style={styles.container}>

                    <Image
                        source ={ this.props.functionImage }
                        style={styles.imageStyle}
                    />
                <View style={styles.titleStytle} >
                <Text style={styles.functionTitleStytle}>{this.props.functionTitle }</Text>
                <Text style={styles.describeTitleStytle}>{this.props.describeTitle }</Text>
                </View>


            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width:width/2.0,
        height:75,
        backgroundColor:'red',
        borderWidth:0.5,
        borderColor:'gray'

    },
    imageStyle:{


        width:46,
        height:46,
        marginLeft:5
    },
    titleStytle:{

        justifyContent: 'center',
        marginLeft:11,


    },
    functionTitleStytle:{

        marginBottom:7,
        fontSize:fontAndClolr.LITTLEFONT,
        color:fontAndClolr.COLORA0,

    },
    describeTitleStytle:{
        fontSize:fontAndClolr.CONTENTFONT,
        color:fontAndClolr.COLORA0,

    },



});