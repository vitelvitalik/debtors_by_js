import React, {Component} from 'react'
import {Debtor} from './Debtor';

export class Debtorlist extends Component {
    // listDebtors = [];

    constructor(props) {
        super(props);

        this.state = {
            listDebtors : []
            // listDebtors : [{id:1, total:4, Debtor:{name:"hfgf", summ:55, oldsumm:55, returned: true}}]
            // listDebtors: function () {
            //     const readListDebtors = localStorage.getItem("listDebtors");
            //     console.log("читается масив: ");
            //     console.log(JSON.parse(readListDebtors));
            //     return (readListDebtors ? JSON.parse(readListDebtors) : []);
            // }
        };
    }

    addDebtor = (Debtor) => {
        console.log(this.state)
        if (Debtor.summ == "") {
            window.alert("Необходимо указать сумму")
        } else if (Debtor.name == "") {
            window.alert("Необходимо указать Ф.И.О. должника")
        } else {

            // устанавливаем переменную итоговой суммы
            let totalSumm = Number(Debtor.summ);

            // если список не пустой
            if (this.state.listDebtors.length > 0) {

                // определяем id  последнего элемента
                const oldId = this.state.listDebtors[this.state.listDebtors.length - 1].id;

                // считаем итоговую сумму всего списка
                this.listDebtors.forEach(debtors => {
                    totalSumm += Number(debtors.Debtor.summ)
                });

                // обнуляем итоговую сумму total у всех элементов
                this.listDebtors.forEach(debtors => {
                    debtors.total = 0
                });

                // устанавливаем новому элементу списка oldId+1, итоговую сумму и обновляем список
                this.setState({listDebtors:this.listDebtors.push({id: oldId + 1, total: totalSumm, Debtor})});

                // иначе начинаем нумерацию id с 1
            } else {
                this.setState({listDebtors: this.listDebtors.push({id: 1, total: totalSumm, Debtor})});
            }

            // обнулим должника
            // Debtor({
            //     name: "",
            //     summ: "",
            //     oldSumm: 0,
            //     returned: false
            // });
        }
    }

    deleteDebtor(e) {
        // определим имя удаляемого должника
        const delDebtor = this.listDebtors[this.listDebtors.findIndex(item => item.id + '' === e.target.id)].Debtor;

        // запрос на подтверждение удаления
        const result = window.confirm(`Вы действительно хотите удалить должника "${delDebtor.name}" ?`);

        // устанавливаем переменную итоговой суммы
        let totalSummDel = 0;

        // если ответ положительный, то удаляем
        if (result === true) {
            switch (this.listDebtors.length) {
                case 1: {
                    this.listDebtors = [];
                    break;
                }
                default: {
                    this.listDebtors.splice(this.listDebtors.findIndex(item => item.id + '' === e.target.id), 1);

                    // вычисляем итоговую сумму
                    this.listDebtors.forEach(debtors => {
                        totalSummDel += Number(debtors.Debtor.summ)
                    });

                    // меняем значение итоговой суммы у последнего в списке
                    this.listDebtors[this.listDebtors.length - 1].total = totalSummDel;
                    break;
                }
            }
        }
    }

    doReturn(e) {
        // определим переменную индекса элемента списка
        const index = this.listDebtors.findIndex(item => item.id + '' === e.target.id);

        // определим текущее состояние признака возврата
        const returned = this.listDebtors[index].Debtor.returned;

        // определим сумму задолженности
        const oldSumm = this.listDebtors[index].Debtor.oldSumm;
        const summ = this.listDebtors[index].Debtor.summ;

        // инвертируем признак возврата
        this.listDebtors[index].Debtor.returned = !returned;

        // по признаку возврата изменяем сумму задолженности - 0 либо старая сумма
        if (returned == false) {
            this.listDebtors[index].Debtor.summ = 0;
            this.listDebtors[this.listDebtors.length - 1].total -= summ;
        } else {
            this.listDebtors[index].debtor.summ = oldSumm;
            this.listDebtors[this.listDebtors.length - 1].total += oldSumm;
        }
    }

    deleteList() {
        let result = window.confirm(`Вы действительно хотите удалить всех должников ?`);
        if (result === true) {
            this.listDebtors = [];
        }
    }


    render() {
        return (
            <div>
                <h2>Список должников</h2>

                <table className='App-table' border="1" cellPadding="7" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>№ п/п</th>
                        <th width="50%">Фамилия И.О.</th>
                        <th>Задолженность</th>
                        <th>Вернул</th>
                        <th>Удаление</th>
                    </tr>
                    </thead>
                    <tbody >
                    {this.state.listDebtors.map(function (debtors) {
                        return (
                            <tr key={"debtorKey" + debtors.id}>
                                <td key="debtorId">{(this.listDebtors.findIndex(item => item.id === debtors.id)) + 1}</td>
                                <td key="{debtorName}" align="left">{debtors.Debtor.name}</td>
                                <td key="{debtorSumm}">{debtors.Debtor.summ}</td>

                                <td key="{debtorReturned}">
                                    <input
                                        key="{debtorReturnedKey}"
                                        name="returned"
                                        type="checkbox"
                                        id={debtors.id}
                                        checked={debtors.Debtor.returned}
                                        onChange={this.doReturn}/>
                                </td>
                                <td key="{debtorDelete}">
                                    <button key="{debtorDelKey}" id={debtors.id} onClick={this.deleteDebtor}>Удалить
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                    <tfoot>

                    <tr>
                        <td></td>
                        <th>ИТОГО:</th>
                        <th>{this.state.listDebtors.length > 0 ? Math.round(this.state.listDebtors[this.state.listDebtors.length - 1].total * 100) / 100 : 0}</th>
                        <td></td>
                        <td>
                            <button onClick={this.deleteList}>Удалить всех</button>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}