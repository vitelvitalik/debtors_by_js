import React, {Component} from 'react'
import {Debtorlist} from './Debtorlist';



export class Debtor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            summ: "",
            oldSumm: 0,
            returned: false,
        };

    }

    // ввод задолжника
    doInput = (e) => {
        console.log(this.state);
       // если данные вводятся в поле сумма, то дублируем их в oldSumm
        if ([e.target.name] == 'summ') {
            this.state[e.target.name] = Number(e.target.value);
            this.state.oldSumm = Number(e.target.value);

            // иначе просто обновляем debtor
        } else {
            this.state[e.target.name] = e.target.value;
        }
    };

    add = () => {
        const list = new Debtorlist();
        list.addDebtor(this.state)
    };



    render() {
        return (
        <div>
            <label> Фамилия И.О. </label>
            <input
                name="name"
                type="text"
                placeholder="обязательно..."
                value={this.props.name}
                onChange={this.doInput}
            />
            <label> Сумма </label>
            <input
                name="summ"
                type="number"
                min="0"
                value={this.props.summ}
                placeholder="обязательно..."
                onChange={this.doInput}
            />
            <button onClick={this.add}>Добавить</button>
        </div>
        )
    }
}