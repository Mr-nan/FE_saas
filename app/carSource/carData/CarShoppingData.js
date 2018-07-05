/**
 * Created by zhengnan on 2018/6/29.
 */


import {observable,computed,action} from 'mobx';

class CarShoppingData {

    @observable shoppingData = [];
    @observable delectAllSelect = false; //删除全选
    @observable sumPrice = 0;
    @observable sumNumber = 0;
    @observable isEdit = false; // 是否为编辑状态

    constructor(){
        this.isEdit = false;
        this.sumNumber=computed(()=>{
            let sumNumber = 0;
            for(let shopData of this.shoppingData){
                for(let cityData of shopData.new_cars){
                    for(let carData of cityData.cars){
                        if(carData.select){
                            sumNumber+=carData.car_count;
                        }
                    }
                }
            }
            return sumNumber;


        });

        this.sumPrice=computed(()=>{
            let sumPrice = 0;
            for(let shopData of this.shoppingData){
                for(let cityData of shopData.new_cars){
                    for(let carData of cityData.cars){
                        if(carData.select){
                            sumPrice+=carData.car_count * carData.dealer_price;
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
                for (let cityData of shopData.new_cars){
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
        let cityData = shopData.new_cars[cityIndex];
        let carData = cityData.cars[carIndex];

        if(carData.car_count< carData.stock){
            carData.car_count+=1;
        }


    };

    @action // -1
    minus(shopIndex,cityIndex,carIndex){

        let shopData = this.shoppingData[shopIndex];
        let cityData = shopData.new_cars[cityIndex];
        let carData = cityData.cars[carIndex];
        if(carData.car_count>1){
            carData.car_count-=1;
        }
    };

    @action // 选中城市
    selectCity(shopIndex,cityIndex){

        for(let shopI=0;shopI<this.shoppingData.length;shopI++){
            let shopData = this.shoppingData[shopI];

           for(let cityI=0;cityI<shopData.new_cars.length;cityI++){

               let cityData = shopData.new_cars[cityI];
               if(shopIndex == shopI && cityIndex == cityI){
                   cityData.select = !cityData.select;
               }else {
                   cityData.select = false;
               }

               for (let carData of cityData.cars){
                   carData.select = cityData.select;
               }

           }
        }

    };

    @action   // 选中单个车辆
    selectCar(shopIndex,cityIndex,carIndex){
        for(let shopI=0;shopI<this.shoppingData.length;shopI++){
            let shopData = this.shoppingData[shopI];
            for(let cityI=0;cityI<shopData.new_cars.length;cityI++){
                let cityData = shopData.new_cars[cityI];
                for (let carI=0;carI<cityData.cars.length;carI++){
                   let carData =  cityData.cars[carI];
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
    };

    @action  // 选中全部删除
    allDelectSelect(){

        let allSelect = this.delectAllSelect.get();
        for(let shopI=0;shopI<this.shoppingData.length;shopI++){
            let shopData = this.shoppingData[shopI];
            for(let cityI=0;cityI<shopData.new_cars.length;cityI++){
                let cityData = shopData.new_cars[cityI];

                cityData.delectSelect = !allSelect;

                for (let carData of cityData.cars){
                    carData.delectSelect = !allSelect;
                }

            }
        }
    };

    @action // 选中要删除的城市
    delectSelectCity(shopIndex,cityIndex){

        for(let shopI=0;shopI<this.shoppingData.length;shopI++){
            let shopData = this.shoppingData[shopI];
            for(let cityI=0;cityI<shopData.new_cars.length;cityI++){
                let cityData = shopData.new_cars[cityI];
                if(shopIndex == shopI && cityIndex == cityI){
                    cityData.delectSelect = !cityData.delectSelect;
                }
                for (let carData of cityData.cars){
                    carData.delectSelect = cityData.delectSelect;
                }

            }
        }
    };

    @action   // 选中要删除的车辆
    delectSelectCar(shopIndex,cityIndex,carIndex){

        for(let shopI=0;shopI<this.shoppingData.length;shopI++){
            let shopData = this.shoppingData[shopI];
            for(let cityI=0;cityI<shopData.new_cars.length;cityI++){
                let cityData = shopData.new_cars[cityI];
                for (let carI=0;carI<cityData.cars.length;carI++){
                   let carData =  cityData.cars[carI];
                    if(shopIndex == shopI && cityIndex == cityI){
                        if(carIndex ==carI){
                            carData.delectSelect = !carData.delectSelect;
                        }
                    }
                }
            }
        }
        this.isCityDelectSelect(shopIndex,cityIndex);
    };


    // 二级删除选中状态
    isCityDelectSelect(shopIndex,cityIndex){

        if(shopIndex>=this.shoppingData.length){
            return;
        }

        let shopData = this.shoppingData[shopIndex];

        if(cityIndex>=shopData.new_cars.length){
            return;
        }

        let cityData = shopData.new_cars[cityIndex];
        let tmpCitySelect = true;
        for (let carData of cityData.cars){
            if(!carData.delectSelect){
                tmpCitySelect = false;
                break;
            }
        }
        cityData.delectSelect = tmpCitySelect;

    }


    // 二级选中状态
    isCitySelect(shopIndex,cityIndex){
        if(shopIndex>=this.shoppingData.length){
            return;
        }
        let shopData = this.shoppingData[shopIndex];
        if(cityIndex>=shopData.new_cars.length){
            return;
        }
        let cityData = shopData.new_cars[cityIndex];
        let tmpCitySelect = true;
        for (let carData of cityData.cars){
           if(!carData.select){
               tmpCitySelect = false;
               break;
           }
        }
        cityData.select = tmpCitySelect;
    }


    @action  // 删除单项
    delectCar(shopIndex,cityIndex,carIndex,action){

        let shopData = this.shoppingData[shopIndex];
        let cityData = shopData.new_cars[cityIndex];

        if(carIndex<cityData.cars.length){
            cityData.carList.splice(carIndex,1);
        }

        if(cityData.cars.length<=0){
            shopData.list.splice(cityIndex,1);
        }

        this.shoppingData = this.shoppingData.filter(e=>(e.new_cars.length>0));

        this.isCitySelect(shopIndex,cityIndex);
        this.isCityDelectSelect(shopIndex,cityIndex);

        action && action();

    };

    @action  // 选择删除按钮
    delectAction(action){

        if(this.delectAllSelect.get()){
            this.shoppingData = [];
        }else {

            for(let shopData of this.shoppingData){
                for(let cityData of  shopData.new_cars){
                    cityData.cars = cityData.cars.filter(e=>(e.delectSelect!=true));
                }

                shopData.new_cars = shopData.new_cars.filter(e=>(e.delectSelect!=true || e.carList.length>0))
            }
            this.shoppingData = this.shoppingData.filter(e=>(e.new_cars.length>0));

        }

        action && action();

    }
}

export  default  new CarShoppingData();