import React from 'react';
import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
var db;
const Collection_TABLE_NAME = "CarName";//收藏表

const SQLite = React.createClass({

    render(){
        return null;
    },
    componentWillUnmount(){
        if (db) {
            this._successCB('close');
            db.close();
        } else {
            console.log("SQLiteStorage not open");
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
    createTable(sql){
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
    },
    close(){
        if (db) {
            this._successCB('close');
            db.close();
        } else {
            console.log("SQLiteStorage not open");
        }
        db = null;
    },
    _successCB(name){
        console.log("SQLiteStorage " + name + " success");
    },
    _errorCB(name, err){
        console.log("SQLiteStorage " + name + " error:" + err);
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
                console.log('shibai' + error.message);
            }, function () {
                console.log('chenggong');
            }
        );
    }
});

module.exports = SQLite;