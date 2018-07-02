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

        this.delectAllSelect=computed(()=>{

            if(this.shoppingData.length<=0){
                return false;
            }

            let tmpAllSelect = true;
            for(let shopData of this.shoppingData){
                for (let cityData of shopData.list){
                    if(!cityData.delectSelect){
                        tmpAllSelect = false;
                        break;
                    }
                }
            }
            return tmpAllSelect;
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

    @action
    selectCar(shopIndex,cityIndex,carIndex){
        for(let shopI=0;shopI<this.shoppingData.length;shopI++){
            let shopData = this.shoppingData[shopI];
            for(let cityI=0;cityI<shopData.list.length;cityI++){
                let cityData = shopData.list[cityI];
                for (let carI=0;carI<cityData.carList.length;carI++){
                   let carData =  cityData.carList[carI];
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

    @action
    allDelectSelect(){

        let allSelect = this.delectAllSelect.get();
        for(let shopI=0;shopI<this.shoppingData.length;shopI++){
            let shopData = this.shoppingData[shopI];
            for(let cityI=0;cityI<shopData.list.length;cityI++){
                let cityData = shopData.list[cityI];

                cityData.delectSelect = !allSelect;

                for (let carData of cityData.carList){
                    carData.delectSelect = !allSelect;
                }

            }
        }
    }

    @action
    delectSelectCity(shopIndex,cityIndex){

        for(let shopI=0;shopI<this.shoppingData.length;shopI++){
            let shopData = this.shoppingData[shopI];
            for(let cityI=0;cityI<shopData.list.length;cityI++){
                let cityData = shopData.list[cityI];
                if(shopIndex == shopI && cityIndex == cityI){
                    cityData.delectSelect = !cityData.delectSelect;
                }
                for (let carData of cityData.carList){
                    carData.delectSelect = cityData.delectSelect;
                }

            }
        }
    }

    @action
    delectSelectCar(shopIndex,cityIndex,carIndex){


        for(let shopI=0;shopI<this.shoppingData.length;shopI++){
            let shopData = this.shoppingData[shopI];
            for(let cityI=0;cityI<shopData.list.length;cityI++){
                let cityData = shopData.list[cityI];
                for (let carI=0;carI<cityData.carList.length;carI++){
                   let carData =  cityData.carList[carI];
                    if(shopIndex == shopI && cityIndex == cityI){
                        if(carIndex ==carI){
                            carData.delectSelect = !carData.delectSelect;
                        }
                    }
                }
            }
        }
        this.isCityDelectSelect(shopIndex,cityIndex);
    }


    isCityDelectSelect(shopIndex,cityIndex){

        if(shopIndex>=this.shoppingData.length){
            return;
        }

        let shopData = this.shoppingData[shopIndex];

        if(cityIndex>=shopData.list.length){
            return;
        }

        let cityData = shopData.list[cityIndex];
        let tmpCitySelect = true;
        for (let carData of cityData.carList){
            if(!carData.delectSelect){
                tmpCitySelect = false;
                break;
            }
        }
        cityData.delectSelect = tmpCitySelect;

    }



    isCitySelect(shopIndex,cityIndex){
        if(shopIndex>=this.shoppingData.length){
            return;
        }
        let shopData = this.shoppingData[shopIndex];
        if(cityIndex>=shopData.list.length){
            return;
        }
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


    @action
    delectCar(shopIndex,cityIndex,carIndex,action){

        console.log(shopIndex,cityIndex,carIndex);
        let shopData = this.shoppingData[shopIndex];
        let cityData = shopData.list[cityIndex];

        if(carIndex<cityData.carList.length){
            cityData.carList.splice(carIndex,1);
        }

        if(cityData.carList.length<=0){
            shopData.list.splice(cityIndex,1);
        }

        if(shopData.list.length<=0 ){
            this.shoppingData.splice(shopIndex,1);
        }

        this.isCitySelect(shopIndex,cityIndex);
        this.isCityDelectSelect(shopIndex,cityIndex);

        action && action();

    }






}

export  default  new CarShoppingData();