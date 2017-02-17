/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
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
const {width, height} = Dimensions.get('window');
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();
import BaseComponent from '../component/BaseComponent';
class TitleImage extends Component {
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

class PageItem extends Component {

    render() {
        const {onPress, backImage, title}=this.props;
        return (
            <View style={styles.warp}>

                <View style={styles.insertWarp}>

                    <TouchableOpacity style={{alignItems: 'center'}} activeOpacity={0.9} onPress={onPress}>
                        <Image style={styles.backGroundImage} source={backImage}>

                            <TitleImage imageSource={this.props.imageSource} title={title}
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
            backImage: require('../../images/financeImages/backSingle.png'),
            imageSource: require('../../images/financeImages/singleIcon.png'),
            title: '单车融资',
            key: 'single'
        },
        {
            backImage: require('../../images/financeImages/backkurong.png'),
            imageSource: require('../../images/financeImages/kurongIcon.png'),
            title: '库存融资',
            key: 'kurong'
        },
        {
            backImage: require('../../images/financeImages/backcaigou.png'),
            imageSource: require('../../images/financeImages/caigouIcon.png'),
            title: '采购融资',
            key: 'caigoudai'
        }
    ]

    onPress = (key) => {

        alert(key);
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

            <ScrollView showsVerticalScrollIndicator={false}
                        style={{marginTop: 44, backgroundColor: '#f0eff5', paddingTop: 15} }>
                {viewBlob}
            </ScrollView>

        )
    }


}

const styles = StyleSheet.create({

    image: {

        width: 43,
        height: 43,
    },
    text: {
        marginTop: 15,
        fontSize: 15,
        color: 'white',
        backgroundColor: 'transparent'

    },
    titleImage: {

        justifyContent: 'center',
        alignItems: 'center',
    },

    warp: {
        height: Pixel.getPixel(170),
        paddingBottom: 10,
    },

    insertWarp: {

        backgroundColor: 'white',
        padding: 15

    },
    backGroundImage: {

        justifyContent: 'center',
        borderRadius: 5,
        width: width - 30,

    }
})