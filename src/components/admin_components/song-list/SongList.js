import React, {useEffect, useState} from 'react';
import {useFetch} from "../../../hooks";
import MaterialTable from "material-table";
import MaterialTableIcons from "../../page_parts/MaterialTableIcons";
import SongListService from "../../../services/SongListService";
import {Alert, Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";

const MemberSelect = props => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/members/`)
      .then(response => response.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
  }, []);

  return (
    <Autocomplete
      options={members}
      getOptionLabel={(option) => option.name}
      getOptionSelected={(option, value) => option.name === value.name}
      renderInput={params => <TextField {...params} label="Выберите участников" variant="outlined" />}
      style={{ width: 240 }}
      loading={loading}
      multiple={true}
      onChange={value => {
        props.onChange(value ? value.map(v => v._id) : []);
      }}
    />
  );
}

const columns = [
  // {
  //   field: 'songs',
  //   title: 'Песни',
  //   render: row => (<div> МП3 </div>),
  //   editComponent: SongSelect
  // },
  {
    field: 'members',
    title: 'Участники',
    render: row => row.members.map(member => member.name).join(', '),
    editComponent: MemberSelect
  },
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
          title="Репертуар"
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
