import React from 'react';
import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
var db;
const Collection_TABLE_NAME = "CarName";//收藏表
const PUBLISH_TABLE_NAME = "publishCar"; //发布编辑
const CAR_TYPE_LIST = 'carTypeList'; // 车型列表

const SQLite = React.createClass({

    render(){
        return null;
    },
    componentWillUnmount(){
        if (db) {
            this._successCB('close');
            db.close();
        } else {
            // console.log("SQLiteStorage not open");
        }

    },
    open(){
        db = SQLiteStorage.openDatabase(
            {name: "mydata", createFromLocation: '~data/mydata.db'},
            () => {
                this._successCB('open');
            },
            (err) => {
                this._errorCB('open', err);
            });
    },
    createTable(){
        if (!db) {
            this.open();
        }
        // //创建收藏表
        // db.transaction((tx) => {
        //     tx.executeSql('CREATE TABLE IF NOT EXISTS ' + Collection_TABLE_NAME + '(' +
        //         'name VARCHAR'
        //         + ');'
        //         , [], () => {
        //             this._successCB('executeSql');
        //         }, (err) => {
        //             this._errorCB('executeSql', err);
        //         });
        // }, (err) => {
        //     this._errorCB('transaction', err);
        // }, () => {
        //     this._successCB('transaction');
        // })

        //创建发布编辑表
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + PUBLISH_TABLE_NAME + '('
                + 'vin VARCHAR(17) PRIMARY KEY NOT NULL,'
                +'model VARCHAR default "",'
                +'pictures VARCHAR default "",'
                +'v_type VARCHAR default "",'
                +'manufacture VARCHAR default "",'
                +'init_reg VARCHAR default "",'
                +'mileage VARCHAR default "",'
                +'plate_number VARCHAR default "",'
                +'emission VARCHAR default "",'
                +'label VARCHAR default "",'
                +'nature_use VARCHAR default "",'
                +'car_color VARCHAR default "",'
                +'trim_color VARCHAR default "",'
                +'transfer_number VARCHAR default "",'
                +'dealer_price VARCHAR default "",'
                +'describe VARCHAR default "",'
                +'modify VARCHAR default ""'
                + ');'
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })

        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + CAR_TYPE_LIST + '('
                +'car_name VARCHAR default ""'
                + ');'
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })

    },
    close(){
        if (db) {
            this._successCB('close');
            db.close();
        } else {
            // console.log("SQLiteStorage not open");
        }
        db = null;
    },
    _successCB(name){
        // console.log("SQLiteStorage " + name + " success");
    },
    _errorCB(name, err){
        // console.log("SQLiteStorage " + name + " error:" + err);
    },
    /**
     * from @zhaojian
     * 查询数据
     * params sql:操作语句 array:参数 callBack:回调
     **/
    selectData(sql, array, callBack){
        if (!db) {
            this.open();
        }
        db.executeSql(sql, array, function (rs) {
            callBack({code:1,result:rs});
        }, function (error) {
            callBack({code:-1,error:error});
        });
    },
    /**
     * from @zhaojian
     * 增删改数据
     * params sql:操作语句 array：参数
     **/
    changeData(sql, array){
        if (!db) {
            this.open();
        }
        db.transaction(
            function (tx) {
                tx.executeSql(sql, array);
            }, function (error) {
                // console.log('shibai' + error.message);
            }, function () {
                // console.log('chenggong');
            }
        );
    }
});

module.exports = SQLite;