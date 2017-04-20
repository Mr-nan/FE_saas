import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import * as  fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import MyButton from '../../../component/MyButton';
const Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');
export default class PlanItem extends PureComponent {
    buttonParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: [],
        childStyle: [],
        opacity: 1,
    }

    render() {
        let movie = this.props.items;
        let movieItems = [];
        let count = 0;
        this.buttonParams.parentStyle.push(styles.parentStyle);
        this.buttonParams.childStyle.push(styles.childStyle)
        if (movie.type === '1') {
            count = 2;
            this.buttonParams.parentStyle.push({borderColor: fontAndColor.COLORB4});
            this.buttonParams.childStyle.push({color: fontAndColor.COLORB4});
            this.buttonParams.content = "库融";
        } else if (movie.type === '2') {
            count = 3;
            this.buttonParams.parentStyle.push({borderColor: fontAndColor.COLORB0});
            this.buttonParams.childStyle.push({color: fontAndColor.COLORB0});
            this.buttonParams.content = "单车";
        } else if (movie.type === '3') {
            count = 2;
            this.buttonParams.parentStyle.push({borderColor: fontAndColor.COLORB1});
            this.buttonParams.childStyle.push({color: fontAndColor.COLORB1});
            this.buttonParams.content = "信用";
        } else if (movie.type === '4') {
            count = 2;
            this.buttonParams.parentStyle.push({borderColor: fontAndColor.COLORB4});
            this.buttonParams.childStyle.push({color: fontAndColor.COLORB4});
            this.buttonParams.content = "库融";
        } else if (movie.type === '5') {
            count = 3;
            this.buttonParams.parentStyle.push({borderColor: fontAndColor.COLORB1});
            this.buttonParams.childStyle.push({color: fontAndColor.COLORB1});
            this.buttonParams.content = "采购";
        }
        movieItems.push(<View key="top" style={{
            flex: 1,
            height: Pixel.getPixel(44),
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: Pixel.getPixel(15),
            marginRight: Pixel.getPixel(15)
        }}>
            <View style={{
                flex: 1,
                height: Pixel.getPixel(44),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
                <MyButton {...this.buttonParams}/>
                <Text style={{
                    marginLeft: Pixel.getPixel(10),
                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                    color: fontAndColor.COLORA0
                }}>{this.props.customerName}</Text>
            </View>
            <View style={{
                flex: 1,
                height: Pixel.getPixel(44),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>
                <Text style={{
                    fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                    color: fontAndColor.COLORA1
                }}>{movie.loan_number}</Text>
            </View>
        </View>);
        movieItems.push(<View key="topLine"
                              style={{
                                  flex: 1,
                                  height: Pixel.getPixel(1),
                                  backgroundColor: fontAndColor.COLORA3,
                                  marginLeft: Pixel.getPixel(15),
                                  marginRight: Pixel.getPixel(15)
                              }}></View>);
        movieItems.push(<View key="center"
                              style={{
                                  flex: 1,
                                  height: Pixel.getPixel(44),
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginLeft: Pixel.getPixel(15),
                                  marginRight: Pixel.getPixel(15)
                              }}>
            <View style={{flex: 1, height: Pixel.getPixel(44), justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={{
                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                    color: fontAndColor.COLORA1
                }}>{movie.loan_mny_str} | {movie.loanperiod_str}</Text>
            </View>
            <View
                style={{flex: 1, height: Pixel.getPixel(44), justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text style={{
                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                    color: fontAndColor.COLORA1
                }}>{movie.channel}</Text>
            </View>
            <View
                style={{flex: 1, height: Pixel.getPixel(44), justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text style={{
                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                    color: fontAndColor.COLORB2
                }}>息={movie.interest}元</Text>
            </View>
        </View>);
        if (count === 3) {
            movieItems.push(<View key="centerLine"
                                  style={{
                                      flex: 1,
                                      height: Pixel.getPixel(1),
                                      backgroundColor: fontAndColor.COLORA3,
                                      marginLeft: Pixel.getPixel(15),
                                      marginRight: Pixel.getPixel(15)
                                  }}></View>);
            movieItems.push(<View key="bottom"
                                  style={{
                                      flex: 1, height: Pixel.getPixel(44), marginLeft: Pixel.getPixel(15),
                                      marginRight: Pixel.getPixel(15), justifyContent: 'center'
                                  }}>
                <Text style={{
                    fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                    color: fontAndColor.COLORA1
                }}>{movie.model_name}</Text>
            </View>);
            movieItems.push(<View key="bottomLine"
                                  style={{
                                      flex: 1,
                                      height: Pixel.getPixel(1),
                                      backgroundColor: fontAndColor.COLORA4
                                  }}></View>);
        } else {
            movieItems.push(<View key="bottomLine"
                                  style={{
                                      flex: 1,
                                      height: Pixel.getPixel(1),
                                      backgroundColor: fontAndColor.COLORA4
                                  }}></View>);
        }
        return (
            <TouchableOpacity activeOpacity={0.8} style={{width: width}} onPress={() => {
                this.props.mOnPress(movie.loan_code,movie.loan_number,movie.plan_id,movie.type);
            }}>
                {movieItems}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    parentStyle: {
        borderWidth: 1,
        borderRadius: 3,
        height: Pixel.getPixel(16),
        width: Pixel.getPixel(34),
        justifyContent: 'center',
        alignItems: 'center'
    },
    childStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    }
});

