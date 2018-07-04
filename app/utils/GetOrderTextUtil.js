import React, {Component} from 'react';
import {

} from 'react-native';
import MyOrderInfoTitleLeftItem from "../mine/newOrder/component/MyOrderInfoTitleLeftItem";

export default class GetOrderTextUtil {

    static getTitle (type) {

      if(type==1){
         return <MyOrderInfoTitleLeftItem/>
      }

    }

}
