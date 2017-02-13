import React from 'react';
import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
var database_name = "saas.db";
var database_version = "1.0";
var database_displayname = "MySQLite";
var database_size = -1;
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
            {name:"mydata",createFromLocation:'~data/mydata.db'},
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
        //创建收藏表
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + Collection_TABLE_NAME + '(' +
                'name VARCHAR'
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
    selectData(sql){
        if (!db) {
            this.open();
        }
        db.executeSql(sql, [], function (rs) {
            for (let i = 0; i < rs.rows.length; i++) {
                console.log('Record count (expected to be 2): ' + rs.rows.item(i).name);
            }
        }, function (error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
        });
    },
    /**
     * from @zhaojian
     * 插入数据
     * params:插入语句
     **/
    insertData(sql, array){
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