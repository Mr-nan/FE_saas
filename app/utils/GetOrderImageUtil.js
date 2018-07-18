import React, {Component} from 'react';
import {

} from 'react-native';
import GetOrderTextUtil from './GetOrderTextUtil';
export default class GetOrderImageUtil {

    static getTitle (type,from) {
        type =  GetOrderTextUtil.getStatus(type,from);
      if(type==1){
         return require('../../images/neworder/daizhifu.png')
      }else if(type==2){
          return require('../../images/neworder/yidingjia.png')
      }else if(type==3){
          return require('../../images/neworder/yidingjia.png')
      }else if(type==4){
          return require('../../images/neworder/dingjinchenggong.png')
      }else if(type==5){
          return require('../../images/neworder/shenghezhong.png')
      }else if(type==6){
          return require('../../images/neworder/shenghezhong.png')
      }else if(type==7){
          return require('../../images/neworder/shenghezhong.png')
      }else if(type==8){
          return require('../../images/neworder/weikuanzhifuchenggong.png')
      }else if(type==9){
          return require('../../images/neworder/quankuanyifu.png')
      }else if(type==21){
          return require('../../images/neworder/qingqueding.png')
      }else if(type==22){
          return require('../../images/neworder/daizhifu.png')
      }else if(type==23){
          return require('../../images/neworder/yishoudingjing.png')
      }else if(type==24){
          return require('../../images/neworder/yishoudingjing.png')
      }else if(type==25){
          return require('../../images/neworder/quankuanyifu.png')
      }

    }

}
