import mysql = require('mysql');
import { connect } from 'http2';

export default class MySQL {

    private static _instance: MySQL;

    conn: mysql.Connection;
    connectado: boolean = false;

    constructor() {
        console.log('Clase inicializada');

        this.conn = mysql.createConnection({
            host     : 'localhost',
            port     : 8889,
            user     : 'node_user',
            password : 'root',
            database : 'node_db'
          });
        
        this.conectarDB();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this());
    }

    static ejecutarQuery(query:string, callback: Function) {
        this.instance.conn.query(query, (err, results:Object[], fields) => {
            if(err) {
                console.log("Error en query:");
                console.log(err);                
                return callback(err);
            }

            if( results.length === 0) {
                callback('El registro solicitado no existe');
            }else {
                callback(null, results);
            }
        });
    }

    private conectarDB() {
        this.conn.connect( (err: mysql.MysqlError) => {
            if(err) {
                console.log(err.message);
                return;
            }

            this.connectado = true;
            console.log('Base de datos online');
        });

    }


}