import React, {useEffect, useState} from 'react';
import {useFetch} from "../../../hooks";
import MaterialTable from "material-table";
import MaterialTableIcons from "../../page_parts/MaterialTableIcons";
import SongListService from "../../../services/SongListService";
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import TitleWithBack from "../../page_parts/TitleWithBack";

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

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
      onChange={(event, value) => {
        props.onChange(value ? value.map(v => v._id) : []);
      }}
    />
  );
}

const SongSelect = props => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/songs/`)
      .then(response => response.json())
      .then(data => {
        setSongs(data);
        setLoading(false);
      })
  }, []);

  return (
    <Autocomplete
      options={songs}
      getOptionLabel={(option) => option.title}
      getOptionSelected={(option, value) => option.title === value.title}
      renderInput={params => <TextField {...params} label="Выберите песни" variant="outlined" />}
      style={{ width: 240 }}
      loading={loading}
      multiple={true}
      onChange={(event, value) => {
        props.onChange(value ? value.map(v => v._id) : []);
      }}
    />
  );
}

const columns = [
  {
    field: 'songs',
    title: 'Песни',
    render: row => row.songs.map(song => song.title).join(', '),
    editComponent: SongSelect,
  },
  {
    field: 'members',
    title: 'Участники',
    render: row => row.members.map(member => member.name).join(', '),
    editComponent: MemberSelect,
  },
  { 
    field: 'date', 
    title: 'Дата',
    type: 'date',
  },
  { field: 'note', title: 'Заметки' },
];

const Alert = props => {
  return <MuiAlert elevation={6} variant="standard" {...props} />;
}

export default function SongList() {
  const [data, setData, loading] = useFetch("http://localhost:3000/api/song-list");
  const [errorMessages, setErrorMessages] = useState([]);
  const [open, setOpen] = React.useState(false);

  const showAlert = (errors) => {
    setOpen(true);
    setErrorMessages(errors);
  };

  const validate = data => {
    const errors = [];
    if (!data.songs) errors.push('Выберите песни');
    if (!data.date) errors.push('Выберите дату');
    return errors;
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <div>
        {errorMessages.length > 0 &&
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >          
           <Alert onClose={handleClose} severity="error">
             {errorMessages.map((msg, i) => <div key={i}>{msg}</div>)} 
           </Alert> 
        </Snackbar>
        }
      </div>
      <div style={{ height: '300px', width: '100%', minWidth: '620px', maxWidth: '1200px' }}>
        <MaterialTable
          title={React.createElement(TitleWithBack, {title: 'Репертуар'})}
          loading={loading}
          columns={columns}
          data={data}
          icons={MaterialTableIcons}
          editable={{
            onRowUpdate: (newData, oldData) => new Promise((resolve, reject)=> {
              const errors = validate(newData);
              console.log(errors);
              if (!errors.length) {
                showAlert([]);
                SongListService.update(oldData.id, newData).then(response => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = response.data;
                  setData([...dataUpdate]);
                  resolve();
                }).catch(() => {
                  console.log('erroe');
                  showAlert(['Не удалось сохранить изменения. Обратитесь к администратору!'])
                  reject();
                });
              } else {
                showAlert(errors);
                resovle();
              }
            }),
            onRowAdd: newData => new Promise(resolve => {
              const errors = validate(newData);
              if (!errors.length) {
                showAlert([]);
                SongListService.create(newData).then(response => {
                  const dataToAdd = [...data];
                  dataToAdd.push(response.data);
                  setData(dataToAdd);
                  resolve();
                }).catch(() => {
                  showAlert(['Не удалось сохранить изменения. Обратитесь к администратору!']);
                  reject();
                });
              } else {
                showAlert(errors);
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
                showAlert(['Не удалось удалить запись. Обратитесь к администратору!']);
                reject();
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