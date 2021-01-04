import React, {useState} from 'react';
import {useFetch} from "../../../hooks";
import MaterialTable from "material-table";
import MaterialTableIcons from "../../page_parts/MaterialTableIcons";
import {Alert} from "@material-ui/lab";
import SongListService from "../../../services/SongListService";

const columns = [
  // { field: 'songs', title: 'Ноты' },
  // { field: 'members', title: 'Запись' },
  { field: 'date', title: 'Дата' },
  { field: 'note', title: 'Заметки' },
];

export default function SongList() {
  const [data, setData, loading] = useFetch("http://localhost:3000/api/song-list");
  const [errorMessages, setErrorMessages] = useState([]);

  const validate = data => {
    const errors = [];
    // if (data.songs === undefined) errors.push('Выберите песни');
    // if (data.members === undefined) errors.push('Выберите участников');
    if (data.date === undefined) errors.push('Выберите дату');
    return errors;
  };

  return (
    <div>
      <div>
        {errorMessages.length > 0 &&
        <Alert severity="error">
          {errorMessages.map((msg, i) => <div key={i}>{msg}</div>)}
        </Alert>
        }
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        <MaterialTable
          title="Список песен"
          loading={loading}
          data={data}
          columns={columns}
          icons={MaterialTableIcons}
          editable={{
            onRowUpdate: (newData, oldData) => new Promise(resolve => {
              const errors = validate(newData);
              if (!errors.length) {
                setErrorMessages([]);
                SongListService.update(oldData.id, newData).then(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
                  resolve();
                }).catch(() => {
                  setErrorMessages(['Не удалось сохранить изменения. Обратитесь к администратору!']);
                  resolve();
                });
              } else {
                setErrorMessages(errors);
                resolve();
              }
            }),
            onRowAdd: newData => new Promise(resolve => {
              const errors = validate(newData);
              if (!errors.length) {
                setErrorMessages([]);
                SongListService.create(newData).then(() => {
                  const dataToAdd = [...data];
                  dataToAdd.push(newData);
                  setData(dataToAdd);
                  resolve();
                }).catch(() => {
                  setErrorMessages(['Не удалось сохранить изменения. Обратитесь к администратору!']);
                  resolve();
                });
              } else {
                setErrorMessages(errors);
                resolve();
              }
            }),
            onRowDelete: (oldData) => new Promise((resolve) => {
              SongListService.delete(oldData.id).then(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
              }).catch(error => {
                setErrorMessages(['Не удалось удалить запись. Обратитесь к администратору!']);
                resolve();
              });
            }),
          }}
          options={{
            paging: false,
            actionsColumnIndex: -1,
          }}
          localization={{ body: { editRow: { deleteText: 'Вы уверены, что хотите удалить эту запись?' } } }}
        />
      </div>
    </div>
  );
}
