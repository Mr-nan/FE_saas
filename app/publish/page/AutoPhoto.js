/**
 * Created by Administrator on 2017/2/10.
 */
import React,{ Component} from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet,
    InteractionManager,
    TouchableOpacity
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import AllNavigationView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import ImageSource from '../component/ImageSource';

const { width,height } = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const photo = require('../../../images/publish/photo.png');
const photoMask = require('../../../images/publish/photo-mask.png');


export default class AutoPhoto extends Component{

    constructor(props){
        super(props);
        this.takePhoto ="";
        this.state ={
            hasPhoto:false,
            renderPlaceholderOnly: true
        }
    }

    componentWillMount(){

    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    componentWillUnmount(){

    }

    _renderPlaceholderView = ()=>{
        return(<Image style={[styles.img,{height:height-this.props.barHeight}]} source={background} />);
    };

    _labelPress = ()=>{
        this.imageSource.openModal();
    };

    _rePhoto = ()=>{
        this.imageSource.openModal();
    };

    _onBack = ()=>{

    };

    render(){
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return(
            <View style={styles.container}>
                <ImageSource ref={(modal) => {this.imageSource = modal}}/>
                <Image style={[styles.img,{height:height-this.props.barHeight}]} source={background}>
                    <AllNavigationView
                        backIconClick={this._onBack}
                        title='拍摄车辆照片'
                        wrapStyle={styles.wrapStyle}/>
                    {
                        this.state.hasPhoto
                            ? <Image style={styles.photoContainer} source={photo}>
                                <Image style={styles.hasPhotoContainer} source={photoMask}>
                                    <Text style={styles.photoLabel}>左前45°照</Text>
                                    <View style={styles.fillSpace}/>
                                    <TouchableOpacity
                                        onPress={this._rePhoto}
                                        activeOpacity={0.6}>
                                        <Text style={styles.rephotoLabel}>重拍</Text>
                                    </TouchableOpacity>
                                </Image>
                            </Image>
                            : <TouchableOpacity
                                onPress={this._labelPress}
                                activeOpacity={0.6}>
                                <Image style={styles.photoContainer} source={photo}>
                                    <View style={styles.noPhotoContainer}>
                                        <Text style={styles.noPhoto}>请拍摄左前45°照</Text>
                                    </View>
                                </Image>
                            </TouchableOpacity>

                    }
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
    wrapStyle:{
        backgroundColor:'transparent'
    }
});