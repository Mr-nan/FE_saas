import React, {Component} from 'react';
import {

} from 'react-native';

export default class GetOrderImageUtil {

    static getTitle (type) {

      if(type==1){
         return require('../../images/neworder/daizhifu.png')
      }else if(type==2){
          return require('../../images/neworder/qingqueding.png')
      }

    }

}
