import './App.css';
import React from 'react';
import { useEffect, useState } from "react";
// import { Debtor } from './Debtor';


function App() {

  const [listDebtors, setListDebtors] = useState(function () {
    const readListDebtors = localStorage.getItem("listDebtors");
    console.log("читается масив: ");
    console.log(JSON.parse(readListDebtors));
    return (readListDebtors ? JSON.parse(readListDebtors) : []);
  });

  const [debtor, setDebtor] = useState(
    {
      name: "",
      summ: "",
      oldSumm: 0,
      returned: false,
    });


  useEffect(function () {
    localStorage.setItem("listDebtors", JSON.stringify(listDebtors));
    console.log("Массив сохранен");
    console.log("Значение listDebtors: ");
    console.log(listDebtors)
  }
  );

  // ввод задолженника 
  function doInput(e) {
    // если данные вводятся в поле сумма, то дублируем их в oldSumm
    if ([e.target.name] == 'summ') {
      setDebtor({ ...debtor, [e.target.name]: Number(e.target.value), oldSumm: Number(e.target.value) });

      // иначе просто обновляем debtor
    } else {
      setDebtor({ ...debtor, [e.target.name]: e.target.value });
    }
  }

  //возврат долга
  function doReturn(e) {
    // определим текущее состояние признака возврата
    var returned = listDebtors[listDebtors.findIndex(item => item.id + '' === e.target.id)].debtor.returned;

    // определим сумму задолженности
    var oldSumm = listDebtors[listDebtors.findIndex(item => item.id + '' === e.target.id)].debtor.oldSumm;
    var summ = listDebtors[listDebtors.findIndex(item => item.id + '' === e.target.id)].debtor.summ;

    // инвертируем признак возврата
    listDebtors[listDebtors.findIndex(item => item.id + '' === e.target.id)].debtor.returned = returned == true ? false : true;

    // по признаку возврата изменяем сумму задолженности - 0 либо старая сумма
    if (returned == false) {
      listDebtors[listDebtors.findIndex(item => item.id + '' === e.target.id)].debtor.summ = 0;
      listDebtors[listDebtors.length - 1].total -= summ;
    } else {
      listDebtors[listDebtors.findIndex(item => item.id + '' === e.target.id)].debtor.summ = oldSumm;
      listDebtors[listDebtors.length - 1].total += oldSumm;
    }
    setListDebtors([...listDebtors]);
  }


  function addDebtor(e) {

    if (debtor.summ == "") {
      window.alert("Необходимо указать сумму")
    } else if (debtor.name == "") {
      window.alert("Необходимо указать Ф.И.О. должника")
    } else {

      // устанавливаем переменную итоговой суммы
      var totalSumm = Number(debtor.summ);

      // если список не пустой
      if (listDebtors.length > 0) {

        // определяем id  последнего элемента
        var oldId = listDebtors[listDebtors.length - 1].id;

        // считаем итоговую сумму всего списка
        listDebtors.forEach(debtors => { totalSumm += Number(debtors.debtor.summ) });

        // обнуляем итоговую сумму total у всех элементов
        listDebtors.forEach(debtors => { debtors.total = 0 });

        // устанавливаем новому элементу списка oldId+1, итоговую сумму и обновляем список
        setListDebtors([...listDebtors, { id: oldId + 1, total: totalSumm, debtor }]);

        // иначе начинаем нумерацию id с 1
      } else {
        setListDebtors([...listDebtors, { id: 1, total: totalSumm, debtor }]);
      }

      // обнулим должника
      setDebtor({
        name: "",
        summ: "",
        oldSumm: 0,
        returned: false
      });
    }
  }

  function deleteDebtor(e) {
    // определим имя удаляемого должника
    var delDebtor = listDebtors[listDebtors.findIndex(item => item.id + '' === e.target.id)].debtor;

    // запрос на подтверждение удаления
    var result = window.confirm(`Вы действительно хотите удалить должника "${delDebtor.name}" ?`);

    // устанавливаем переменную итоговой суммы
    var totalSummDel = 0;

    // если ответ положительный, то удаляем
    if (result === true) {
      switch (listDebtors.length) {
        case 1: {
          setListDebtors([]);
          break;
        }
        default: {
          listDebtors.splice(listDebtors.findIndex(item => item.id + '' === e.target.id), 1);

          // вычисляем итоговую сумму
          listDebtors.forEach(debtors => { totalSummDel += Number(debtors.debtor.summ) });
          
          // меняем значение итоговой суммы у последнего в списке
          listDebtors[listDebtors.length - 1].total = totalSummDel;
          setListDebtors([...listDebtors]);
          break;
        }
      }
    }
  }

  function deleteList() {
    var result = window.confirm(`Вы действительно хотите удалить всех должников ?`);
    if (result === true) {
      setListDebtors([]);
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h3>Учёт задолженностей</h3>
      </header>
      <div className="App-body">
        <div className='debtors'>
          <label>  Фамилия И.О.  </label>
          <input
            name="name"
            type="text"
            placeholder="обязательно..."
            value={debtor.name}
            onChange={doInput}
          />
          <label>  Сумма  </label>
          <input
            name="summ"
            type="number"
            min="0"
            value={debtor.summ}
            placeholder="обязательно..."
            onChange={doInput}
          />
          <button onClick={addDebtor}>Добавить</button>
          <div>
          </div>
        </div>

        <h2>Список должников</h2>

        <table className='App-table' border="1" cellpadding="7" cellspacing="0">
          <thead>
            <tr>
              <th>№ п/п</th>
              <th width="50%">Фамилия И.О.</th>
              <th>Задолженность</th>
              <th>Вернул</th>
              <th>Удаление</th>
            </tr>
          </thead>
          <tbody key="{debtorBody}">
            {listDebtors.map(function (debtors) {
              return (
                <tr key={"debtorKey" + debtors.id}>
                  <td key="{debtorId}">{(listDebtors.findIndex(item => item.id === debtors.id)) + 1}</td>
                  <td key="{debtorName}" align="left">{debtors.debtor.name}</td>
                  <td key="{debtorSumm}">{debtors.debtor.summ}</td>

                  <td key="{debtorReturned}">
                    <input
                      key="{debtorReturnedKey}"
                      name="returned"
                      type="checkbox"
                      id={debtors.id}
                      checked={debtors.debtor.returned}
                      onChange={doReturn} />
                  </td>
                  <td key="{debtorDelete}">
                    <button key="{debtorDelKey}" id={debtors.id} onClick={deleteDebtor}>Удалить</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {/* <tr><td><p /></td></tr> */}
            <tr>
              <td></td>
              <th>ИТОГО:</th>
              <th>{listDebtors.length > 0 ? Math.round(listDebtors[listDebtors.length - 1].total * 100) / 100 : 0}</th>
              <td></td>
              <td><button onClick={deleteList}>Удалить всех</button></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default App;