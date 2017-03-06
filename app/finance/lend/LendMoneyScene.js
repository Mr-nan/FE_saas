/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
//图片加文字
//ok

import {width, adapeSize, fontadapeSize, PAGECOLOR} from './component/MethodComponent';
import AllNavigationView from '../../component/AllNavigationView'
import BaseComponent from '../../component/BaseComponent';
import SingelCarScene from './SingelCarScene';
import KurongSence from './KurongSence';
import CGDLendScenes from './CGDLendScenes';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import {confimCarcell} from './ConfimCGDPriceSence'

class TitleImage extends PureComponent {
    // 构造
    render() {
        const {imageSource, title}=this.props;
        return (

            <View style={styles.titleImage}>
                <Image style={styles.image} source={imageSource}/>
                <Text style={styles.text}>{title}</Text>
            </View>
        )
    }
}

class PageItem extends PureComponent {

    render() {
        const {onPress, backImage, title, imageSource}=this.props;
        return (
            <View style={styles.warp}>

                <View style={styles.insertWarp}>

                    <TouchableOpacity style={{alignItems: 'center'}} activeOpacity={0.9} onPress={onPress}>
                        <Image style={styles.backGroundImage} source={backImage}>

                            <TitleImage imageSource={imageSource} title={title}
                                        onPress={this.onPress}/>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

export  default class LendMoneySence extends BaseComponent {
    initFinish = () => {

    }

    dataSource = [
        {
            backImage: require('../../../images/financeImages/backSingle.png'),
            imageSource: require('../../../images/financeImages/singleIcon.png'),
            title: '单车融资',
            key: 'single'
        },
        {
            backImage: require('../../../images/financeImages/backkurong.png'),
            imageSource: require('../../../images/financeImages/kurongIcon.png'),
            title: '库融融资',
            key: 'kurong'
        },
        {
            backImage: require('../../../images/financeImages/backcaigou.png'),
            imageSource: require('../../../images/financeImages/caigouIcon.png'),
            title: '采购融资',
            key: 'caigoudai'
        },
    ]
    navigatorParams = {
        name: 'SingelCarScene',
        component: SingelCarScene,
        params: {customerName:this.props.customerName}
    }

    onPress = (key) => {
        if (key === 'single') {
            this.navigatorParams.name = "SingelCarScene";
            this.navigatorParams.component = SingelCarScene;
        }
        else if (key === 'kurong') {
            this.navigatorParams.name = "KurongSence";
            this.navigatorParams.component = KurongSence;
        }
        else {
            this.navigatorParams.name = "CGDLendScenes";
            this.navigatorParams.component = CGDLendScenes;
        }
        this.toNextPage(this.navigatorParams);
    }

    render() {


        let viewBlob = [];
        this.dataSource.map((item) => {
            viewBlob.push(
                <PageItem
                    key={item.key}
                    backImage={item.backImage}
                    imageSource={item.imageSource}
                    title={item.title}
                    onPress={() => {
                        this.onPress(item.key);
                    }}
                />
            )
        })

        return (

            <View style={{flex: 1}}>

                <ScrollView showsVerticalScrollIndicator={false}
                            style={{marginTop:Pixel.getTitlePixel(64) , backgroundColor: PAGECOLOR.COLORA3, paddingTop: adapeSize(15)} }>
                    {viewBlob}

                </ScrollView>


                <AllNavigationView title="借款" backIconClick={()=> {

                    this.backPage();
                }}/>

            </View>
        )
    }

}

const styles = StyleSheet.create({

    image: {

        width: adapeSize(43),
        height: adapeSize(43),
    },
    text: {
        marginTop: adapeSize(15),
        fontSize: fontadapeSize(15),
        color: 'white',
        backgroundColor: 'transparent'

    },
    titleImage: {

        justifyContent: 'center',
        alignItems: 'center',
    },

    warp: {

        paddingBottom: adapeSize(10),
    },

    insertWarp: {

        backgroundColor: 'white',
        padding: adapeSize(15),

    },
    backGroundImage: {

        justifyContent: 'center',
        borderRadius: adapeSize(5),
        width: width - adapeSize(30),

    }
})