/**
 * Created by zhengnan on 2018/6/29.
 */


import {observable,computed,action} from 'mobx';

class CarShoppingData {

    @observable shoppingData = [];
    @observable delectAllSelect = false; //删除全选
    @observable sumPrice = 0;
    @observable sumNumber = 0;

    constructor(){
      this.sumNumber=computed(()=>{
          return this.shoppingData.forEach(e=>{
              e.list.forEach(subE=>{
                  subE.carList.reduce((a,b)=>{
                      if(b.select){
                          return a+b.number;
                      }else {
                          return a;
                      }
                  },0)
              })
          })
      });
    }

    @action // 初始化数据
    setShoppingData(data){
        this.shoppingData = data;
    };

    @action // +1
    plus(index){

    }

    @action // -1
    minus(index){

    }





}

export  default  new CarShoppingData()();