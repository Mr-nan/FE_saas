import React from 'react';
import {
    PixelRatio,
    Platform,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
const PixelUtil = React.createClass({

    render(){
        return null;
    },
    getPixel(px){

        if (Platform.OS === 'android') {
            return Math.round((px / 375.0) * width);
        } else {
            return Math.round((px / 375.0) * width);
        }
    },
    getFontPixel(px){
        if (Platform.OS === 'android') {
            return Math.round((px / 375.0) * width);
        } else {
            return Math.round((px / 375.0) * width);

        }
    },
    getTitlePixel(px){
        if (Platform.OS === 'android') {
            return Math.round(((px - 20) / 375.0) * width);
        } else {
            if(height>=812){

                return Math.round(((px + 24) / 375.0) * width);
            }


            return Math.round((px / 375.0) * width);


        }
    },

    getBottomPixel(px){
        if (Platform.OS === 'android') {
            return Math.round(((px + 20) / 375.0) * width);
        } else {
            if(height>=812){
                return Math.round(((px + 34) / 375.0) * width);
            }
            return Math.round((px / 375.0) * width);
        }
    },
    getStatusStr (stateCode){
        if (stateCode !== '') {
            let tempTitle = []
            if (stateCode == '10') {
                tempTitle = ['评估监管中']
            } else if (stateCode == '20') {
                tempTitle = ['审核中']
            } else if (stateCode == '30') {
                tempTitle = ['渠道审核中']
            }else if (stateCode == '40') {
                tempTitle = ['待签合同']
            }else if (stateCode == '50') {
                tempTitle = ['待确认借据']
            }else if (stateCode == '60') {
                tempTitle = ['处理中']
            }else if (stateCode == '70') {
                tempTitle = ['已放款']
            }else if (stateCode == '80') {
                tempTitle = ['已还清']
            }else if (stateCode == '21') {
                tempTitle = ['审核未通过']
            }else if (stateCode == '0') {
                tempTitle = ['已取消']
            }
            return tempTitle;
        }
    },
    getStatusColor (stateCode){
        if (stateCode !== '') {
            let tempTitle = ['#999999','#999999']
            if (stateCode == '10') {
                // tempTitle = ['评估监管中']
                tempTitle = ['#05C5C2','#05C5C2']
            } else if (stateCode == '20') {
                // tempTitle = ['审核中']
                tempTitle = ['#05C5C2','#05C5C2']
            } else if (stateCode == '30') {
                // tempTitle = ['渠道审核中']
                tempTitle = ['#05C5C2','#05C5C2']
            }else if (stateCode == '40') {
                // tempTitle = ['待签合同']
                tempTitle = ['#05C5C2','#05C5C2']
            }else if (stateCode == '50') {
                // tempTitle = ['待确认借据']
                tempTitle = ['#05C5C2','#05C5C2']
            }else if (stateCode == '60') {
                tempTitle = ['#FA5741','#FA5741']
            }else if (stateCode == '70') {
                // tempTitle = ['已放款']
                tempTitle = ['#05C5C2','#05C5C2']
            }else if (stateCode == '80') {
                // tempTitle = ['已还清']
                tempTitle = ['#05C5C2','#05C5C2']
            }else if (stateCode == '21') {
                // tempTitle = ['审核未通过']
                tempTitle = ['#05C5C2','#05C5C2']
            }else if (stateCode == '0') {
                // tempTitle = ['已取消']
                tempTitle = ['#999999','#999999']
            }
            return tempTitle;
        }
    },
    getProductStr (stateCode){
        if (stateCode !== '') {
            let tempTitle = ['0']
            if (stateCode == '1') {
                tempTitle = ['1']
            } else if (stateCode == '2') {
                tempTitle = ['单']
            } else if (stateCode == '3') {
                tempTitle = ['信']
            }else if (stateCode == '4') {
                tempTitle = ['库']
            }else if (stateCode == '5') {
                tempTitle = ['采']
            }else if (stateCode == '6') {
                tempTitle = ['订']
            }else if (stateCode == '7') {
                tempTitle = ['应']
            }else if (stateCode == '8') {
                tempTitle = ['车']
            }
            return tempTitle;
        }
    },
    getProductColor (stateCode){
        if (stateCode !== '') {
            let tempTitle = '#2f9bfa'
            if (stateCode == '1') {
                tempTitle = '#2f9bfa'
            } else if (stateCode == '2') {
                tempTitle = '#05c5c2'
            } else if (stateCode == '3') {
                tempTitle = '#8db7f7'
            }else if (stateCode == '4') {
                tempTitle = '#2f9bfa'
            }else if (stateCode == '5') {
                tempTitle = '#FA5741'
            }else if (stateCode == '6') {
                tempTitle = '#3AC87E'
            }else if (stateCode == '7') {
                tempTitle = '#FF902F'
            }else if (stateCode == '8') {
                tempTitle = '#FFBD2F'
            }
            return tempTitle;
        }
    }

});

module.exports = PixelUtil;