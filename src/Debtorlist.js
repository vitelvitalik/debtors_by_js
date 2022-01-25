import React, { Component } from 'react'
import { Debtor } from './Debtor';

export default class Debtorlist extends Component {
    constructor(props) {
        super(props);

        this.state = [];
    }

    addDebtor() {
        // this.setState (, debtor])
    }
    render() {
        return (
            <div>
              <Debtor />
              {listDebtors.map(function (debtor) {
                <tr>
                  <td>{Debtor.name}</td>
                  <td>{Debtor.summ}</td>
                  <td>
                    <input
                      name="returned"
                      type="checkbox"
                      id={Debtor.id}
                      checked={Debtor.returned}
                      onChange={} />
                  </td>
                  <td>
                    <button onClick={deleteDebtor}>Удалить</button>
                  </td>
                </tr>
              })}
            </div>
        )
    }
}