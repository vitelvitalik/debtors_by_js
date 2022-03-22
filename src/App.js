import './App.css';
import React, {Component} from 'react'
import {useEffect, useState} from "react";
import {Debtor} from './Debtor';
import {Debtorlist} from './Debtorlist';
import {
    Link,
    Router,
    Route,
    Switch,
    Redirect,
    withRouter
  } from "react-router-dom"


  class App extends Component {

    // const [listDebtors, setListDebtors] = useState(function () {
    //     const readListDebtors = localStorage.getItem("listDebtors");
    //     console.log("читается масив: ");
    //     console.log(JSON.parse(readListDebtors));
    //     return (readListDebtors ? JSON.parse(readListDebtors) : []);
    // });
    //
    // const [debtor, setDebtor] = useState(
    //     {
    //         name: "",
    //         summ: "",
    //         oldSumm: 0,
    //         returned: false,
    //     });


    // useEffect(function () {
    //         localStorage.setItem("listDebtors", JSON.stringify(listDebtors));
    //         console.log("Массив сохранен");
    //         console.log("Значение listDebtors: ");
    //         console.log(listDebtors)
    //     }
    // );
    //
    // // ввод задолженника
    // function doInput(e) {
    //     // если данные вводятся в поле сумма, то дублируем их в oldSumm
    //     if ([e.target.name] == 'summ') {
    //         setDebtor({...debtor, [e.target.name]: Number(e.target.value), oldSumm: Number(e.target.value)});
    //
    //         // иначе просто обновляем debtor
    //     } else {
    //         setDebtor({...debtor, [e.target.name]: e.target.value});
    //     }
    // }
    //
    // //возврат долга
    // function doReturn(e) {
    //     // определим переменную индекса элемента списка
    //     var index = listDebtors.findIndex(item => item.id + '' === e.target.id);
    //
    //     // определим текущее состояние признака возврата
    //     var returned = listDebtors[index].debtor.returned;
    //
    //     // определим сумму задолженности
    //     var oldSumm = listDebtors[index].debtor.oldSumm;
    //     var summ = listDebtors[index].debtor.summ;
    //
    //     // инвертируем признак возврата
    //     listDebtors[index].debtor.returned = !returned;
    //
    //     // по признаку возврата изменяем сумму задолженности - 0 либо старая сумма
    //     if (returned == false) {
    //         listDebtors[index].debtor.summ = 0;
    //         listDebtors[listDebtors.length - 1].total -= summ;
    //     } else {
    //         listDebtors[index].debtor.summ = oldSumm;
    //         listDebtors[listDebtors.length - 1].total += oldSumm;
    //     }
    //     setListDebtors([...listDebtors]);
    // }
    //
    //
    // function addDebtor(e) {
    //
    //     if (debtor.summ == "") {
    //         window.alert("Необходимо указать сумму")
    //     } else if (debtor.name == "") {
    //         window.alert("Необходимо указать Ф.И.О. должника")
    //     } else {
    //
    //         // устанавливаем переменную итоговой суммы
    //         var totalSumm = Number(debtor.summ);
    //
    //         // если список не пустой
    //         if (listDebtors.length > 0) {
    //
    //             // определяем id  последнего элемента
    //             var oldId = listDebtors[listDebtors.length - 1].id;
    //
    //             // считаем итоговую сумму всего списка
    //             listDebtors.forEach(debtors => {
    //                 totalSumm += Number(debtors.debtor.summ)
    //             });
    //
    //             // обнуляем итоговую сумму total у всех элементов
    //             listDebtors.forEach(debtors => {
    //                 debtors.total = 0
    //             });
    //
    //             // устанавливаем новому элементу списка oldId+1, итоговую сумму и обновляем список
    //             setListDebtors([...listDebtors, {id: oldId + 1, total: totalSumm, debtor}]);
    //
    //             // иначе начинаем нумерацию id с 1
    //         } else {
    //             setListDebtors([...listDebtors, {id: 1, total: totalSumm, debtor}]);
    //         }
    //
    //         // обнулим должника // проверка гит
    //         setDebtor({
    //             name: "",
    //             summ: "",
    //             oldSumm: 0,
    //             returned: false
    //         });
    //     }
    // }
    //
    // function deleteDebtor(e) {
    //     // определим имя удаляемого должника
    //     var delDebtor = listDebtors[listDebtors.findIndex(item => item.id + '' === e.target.id)].debtor;
    //
    //     // запрос на подтверждение удаления
    //     var result = window.confirm(`Вы действительно хотите удалить должника "${delDebtor.name}" ?`);
    //
    //     // устанавливаем переменную итоговой суммы
    //     var totalSummDel = 0;
    //
    //     // если ответ положительный, то удаляем
    //     if (result === true) {
    //         switch (listDebtors.length) {
    //             case 1: {
    //                 setListDebtors([]);
    //                 break;
    //             }
    //             default: {
    //                 listDebtors.splice(listDebtors.findIndex(item => item.id + '' === e.target.id), 1);
    //
    //                 // вычисляем итоговую сумму
    //                 listDebtors.forEach(debtors => {
    //                     totalSummDel += Number(debtors.debtor.summ)
    //                 });
    //
    //                 // меняем значение итоговой суммы у последнего в списке
    //                 listDebtors[listDebtors.length - 1].total = totalSummDel;
    //                 setListDebtors([...listDebtors]);
    //                 break;
    //             }
    //         }
    //     }
    // }
    //
    // function deleteList() {
    //     var result = window.confirm(`Вы действительно хотите удалить всех должников ?`);
    //     if (result === true) {
    //         setListDebtors([]);
    //     }
    // }
render (){
    const { history } = this.props
    return (

        <div className="App">
            <header className="App-header">
                <h3>Учёт задолженностей</h3>
            </header>
            <body>
            <Switch>
            {/* <Link to="/">Список должников</Link>
            <Link to="/addDebtor">Добавить должника</Link> */}

            <Route history={history} path="/" component={Debtorlist} />
            <Route history={history} path="/addDebtor" component={Debtor} />
            <Redirect from='/' to='/addDebtor'/>
            </Switch>
            </body>
        </div>
    );
}
  }

export default withRouter(App);