import React from "react";
import {Component} from "react"


export default class GetData extends Component{
    constructor(props) {
        super(props);
        this.state = {
            candleData: [],
            isLoaded: false
        }
    }

    componentDidMount(){
        fetch('https://api.binance.com/api/v3/klines?symbol=BTCEUR&interval=5m')
            .then(response => response.json())
            .then(data => this.setState({candleData: [...data], isLoaded: true}));
    }



    candleColor(data){
        let candles=[];
        data.forEach((element, index)=> {
            if(element[1]>element[4]){
                candles[index]='red';
            }
            else{
                candles[index]='green';
            }
        });
        return candles;
    }
    render(){
        if (!this.state.isLoaded){
            return(<p>Cargando datos...</p>)
        }
        else{
            return(<p>{this.candleColor(this.state.candleData)}</p>)
        }

    }
}
