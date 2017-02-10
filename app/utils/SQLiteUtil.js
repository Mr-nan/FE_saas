import React from 'react';
import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
var database_name = "xifan.db";
var database_version = "1.0";
var database_displayname = "MySQLite";
var database_size = -1;
var db;
const Collection_TABLE_NAME = "Collection";//收藏表

const SQLite = React.createClass({

    render(){
        return null;
    },
    componentWillUnmount(){
        if(db){
            this._successCB('close');
            db.close();
        }else {
            console.log("SQLiteStorage not open");
        }
    },
    open(){
        db = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            ()=>{
                this._successCB('open');
            },
            (err)=>{
                this._errorCB('open',err);
            });
    },
    createTable(){
        if (!db) {
            this.open();
        }
        //创建收藏表
        db.transaction((tx)=> {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + Collection_TABLE_NAME + '(' +
                'id INTEGER PRIMARY KEY NOT NULL,' +
                'name VARCHAR,' +
                'actor VARCHAR,' +
                'time VARCHAR,' +
                'pic VARCHAR,' +
                'url VARCHAR,' +
                'title VARCHAR'
                + ');'
                , [], ()=> {
                    this._successCB('executeSql');
                }, (err)=> {
                    this._errorCB('executeSql', err);
                });
        }, (err)=> {
            this._errorCB('transaction', err);
        }, ()=> {
            this._successCB('transaction');
        })
    },
    close(){
        if(db){
            this._successCB('close');
            db.close();
        }else {
            console.log("SQLiteStorage not open");
        }
        db = null;
    },
    _successCB(name){
        console.log("SQLiteStorage "+name+" success");
    },
    _errorCB(name, err){
        console.log("SQLiteStorage "+name+" error:"+err);
    }
});

module.exports = SQLite;