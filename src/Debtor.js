import React, { Component } from 'react'
import { App } from './App';

export class Debtor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: "",
            summ: "",
            returned: false
            }
    }

    // deleteList() {
    //     var result = window.confirm(`Вы действительно хотите удалить всех должников ?`);
    //     var tmp = result == true? setListDebtors([]) : null;
    //    };
    // render() {
    //     return (
    //         <div>
    //             <button onClick={this.deleteList}>Удалить всех</button>
    //         </div>
    //     )
    // }
}