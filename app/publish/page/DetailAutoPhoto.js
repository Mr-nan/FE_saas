/**
 * Created by Administrator on 2017/2/10.
 */
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

import Grid from '../component/Grid';

const { width ,height} = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const photo = require('../../../images/publish/photo.png');
const photoMask = require('../../../images/publish/photo-mask.png');

export default class DetailAutoPhoto extends Component{

    constructor(props){
        super(props);
        this.state ={
            dataSource:[
                {
                    title:'左前45°',
                    hasPhoto:false,
                },
                {
                    title:'右后45°',
                    hasPhoto:false,
                },
                {
                    title:'前内饰',
                    hasPhoto:true,
                },
                {
                    title:'后内饰',
                    hasPhoto:false,
                },
                {
                    title:'发动机',
                    hasPhoto:false,
                },
                {
                    title:'仪表盘',
                    hasPhoto:false,
                },
            ]

        }
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    _renderItem = (data,i)=>{
        return(
            <Image key={i} style={styles.photoContainer} source={photo}>
                {
                        data.hasPhoto
                        ? <Image style={styles.hasPhotoContainer} source={photoMask}>
                            <Text style={styles.photoLabel}>{data.title + '照'}</Text>
                            <View style={styles.fillSpace}/>
                            <Text style={styles.rephotoLabel}>重拍</Text>
                        </Image>
                        : <View style={styles.noPhotoContainer}>
                            <Text style={styles.noPhoto}>{data.title}</Text>
                        </View>
                }
            </Image>
        );
    };

    render(){
        return(
            <View style={styles.container}>
                <Image style={[styles.imgContainer,{height:height-this.props.barHeight}]} source={background}>
                    <View style={styles.contentContainer}>
                        <Grid
                            style={styles.girdContainer}
                            renderItem={this._renderItem}
                            data={this.state.dataSource}
                            itemsPerRow={2}
                        />
                    </View>
                </Image>
            </View>
            );
    }

}

const styles = StyleSheet.create({
    container:{
        width:width,
        backgroundColor:'transparent',
    },
    imgContainer:{
        width:width,
        backgroundColor:'transparent',
        alignItems:'center'
    },
    contentContainer:{
        paddingTop:109,
        paddingHorizontal:6,
        justifyContent:'center',
    },
    girdContainer: {
        flex:1
    },
    photoContainer:{
        marginTop:14,
        width:160,
        height:120,
        justifyContent:'flex-end',
        marginHorizontal:4
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