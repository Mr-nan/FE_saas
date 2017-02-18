/**
 * Created by Administrator on 2017/2/10.
 */
import React,{ Component} from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';

const { width,height } = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const photo = require('../../../images/publish/photo.png');
const photoMask = require('../../../images/publish/photo-mask.png');

export default class AutoPhoto extends Component{

    constructor(props){
        super(props);
        this.state ={
            hasPhoto:false
        }
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
        return(
            <View style={styles.container}>
                <Image style={[styles.img,{height:height-this.props.barHeight}]} source={background}>
                    <Image style={styles.photoContainer} source={photo}>
                        {
                            this.state.hasPhoto
                                ? <Image style={styles.hasPhotoContainer} source={photoMask}>
                                    <Text style={styles.photoLabel}>左前45°照</Text>
                                    <View style={styles.fillSpace}/>
                                    <Text style={styles.rephotoLabel}>重拍</Text>
                                </Image>
                                : <View style={styles.noPhotoContainer}>
                                    <Text style={styles.noPhoto}>请拍摄左前45°照</Text>
                                </View>
                        }
                    </Image>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width:width,
        backgroundColor:'transparent'
    },
    img:{
        width:width,
        backgroundColor:'transparent',
        alignItems:'center'
    },
    photoContainer:{
        marginTop:230,
        width:160,
        height:120,
        justifyContent:'flex-end',
    },
    noPhotoContainer:{
        alignItems:'center',
        marginBottom:30
    },
    noPhoto:{
        fontSize:14,
        color:'#FFFFFF',
    },
    hasPhotoContainer:{
        flexDirection:'row',
        alignItems:'center',
        padding:10
    },
    photoLabel:{
        fontSize:12,
        color:'#FFFFFF'
    },
    rephotoLabel:{
        fontSize:12,
        color:fontAndColor.COLORB1
    },
    fillSpace:{
        flex:1
    },

});