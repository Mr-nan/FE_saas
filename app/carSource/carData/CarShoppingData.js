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
            let sumNumber = 0;
            for(let shopData of this.shoppingData){
                for(let cityData of shopData.list){
                    for(let carData of cityData.carList){
                        if(carData.select){
                            sumNumber+=carData.number;
                        }
                    }
                }
            }
            return sumNumber;


        });

        this.sumPrice=computed(()=>{
            let sumPrice = 0;
            for(let shopData of this.shoppingData){
                for(let cityData of shopData.list){
                    for(let carData of cityData.carList){
                        if(carData.select){
                            sumPrice+=carData.number * carData.price;
                        }
                    }
                }
            }
            return sumPrice;

        });
    }

    @action // 初始化数据
    setShoppingData(data){
        this.shoppingData = data;
    };

    @action // +1
    plus(shopIndex,cityIndex,carIndex){
        let shopData = this.shoppingData[shopIndex];
        let cityData = shopData.list[cityIndex];
        let carData = cityData.carList[carIndex];

        if(carData.number< carData.maxNumber){
            carData.number+=1;
        }


    }

    @action // -1
    minus(shopIndex,cityIndex,carIndex){

        let shopData = this.shoppingData[shopIndex];
        let cityData = shopData.list[cityIndex];
        let carData = cityData.carList[carIndex];
        if(carData.number>1){
            carData.number-=1;
        }
    }

    @action
    selectCity(shopIndex,cityIndex){
        for(let shopI=0;shopI<this.shoppingData.length;shopI++){
            let shopData = this.shoppingData[shopI];

           for(let cityI=0;cityI<shopData.list.length;cityI++){

               let cityData = shopData.list[cityI];
               if(shopIndex == shopI && cityIndex == cityI){
                   cityData.select = !cityData.select;
               }else {
                   cityData.select = false;
               }

               for (let carData of cityData.carList){
                   carData.select = cityData.select;
               }

           }
        }

    }

    selectCar(shopIndex,cityIndex,carIndex){
        for(let shopI=0;shopI<this.shoppingData.length;shopI++){
            let shopData = this.shoppingData[shopI];
            for(let cityI=0;cityI<shopData.list.length;cityI++){

                let cityData = shopData.list[cityI];
                for (let carI=0;carI<cityData.carList.length;carI++){
                    carData =  cityData.carList[carI];
                    if(shopIndex == shopI && cityIndex == cityI){

                        if(carIndex ==carI){
                            carData.select = !carData.select;
                        }
                    }else {

                        carData.select = false;
                    }

                }

                cityData.select = false;
            }
        }
        this.isCitySelect(shopIndex,cityIndex);
    }


    isCitySelect(shopIndex,cityIndex){
        let shopData = this.shoppingData[shopIndex];
        let cityData = shopData.list[cityIndex];
        let tmpCitySelect = true;
        for (let carData of cityData.carList){
           if(!carData.select){
               tmpCitySelect = false;
               break;
           }
        }
        cityData.select = tmpCitySelect;


    }





}

export  default  new CarShoppingData();