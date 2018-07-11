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
      }else if(type==21){
          return require('../../images/neworder/qingqueding.png')
      }

    }

}
