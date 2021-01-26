import React, {useState} from 'react';
import {useFetch} from "../../../hooks";
import MaterialTable from "material-table";
import MaterialTableIcons from "../../page_parts/MaterialTableIcons";
import {Alert} from "@material-ui/lab";
import SongService from "../../../services/SongService";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const FileListInput = props => {
    const onFileChange = async event => {
        const data = new FormData();
        data.append('asset', event.target.files[0], event.target.files[0].name);

        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: data
        });
        const fileInfo = await response.json();
        const url = 'http://localhost:3000/uploads/' + fileInfo.filename;

        props.value.push({url, title: ''});
        props.onChange(props.value);
    };

    return (
      <div>
          { props.value ? (
            <table border={1}>
                <thead>
                <tr>
                    <th>Файл</th>
                    <th>Название</th>
                </tr>
                </thead>
                <tbody>
                { props.value.map(item => (
                  <tr key={item.url}>
                      <td>{item.url}</td>
                      <td><input label="Название" value={item.title} /*onChange={props.onChange(props.value)}*/ /></td> 
                  </tr>
                )) }
                </tbody>
            </table>
          ) : null}
          Загрузить:
          <input
            type="file"
            onChange={event => onFileChange(event)}
          />
      </div>
    );
};

const columns = [
    { field: 'title', title: 'Название' },
    { field: 'titleEn', title: 'Название(ENG)' },
    {
        field: 'sheets',
        title: 'Ноты',
        render: row => (
          <div>
              {row.sheets.map(file => (
                <div key={file.url}>
                    <a href={file.url}>{file.title ?? 'Untitled'}</a>
                </div>
              ))}
          </div>
        ),
        editComponent: FileListInput
    },
    // {
    //     field: 'samples',
    //     title: 'MP3',
    //     render: row => (<div>PDF List</div>),
    //     editComponent: FileListInput
    // },
];

export default function Songs() {
    const classes = useStyles();
    const [data, setData, loading] = useFetch("http://localhost:3000/api/songs");
    const [errorMessages, setErrorMessages] = useState([]);

    const validate = data => {
        const errors = [];
        if (data.title === undefined) errors.push('Введите название песни');
        if (data.titleEn === undefined) errors.push('Введите название песни (ENG)');
        if (data.sheets === undefined) errors.push('Выберите PDF файл');
        // if (data.samples === undefined) errors.push('Выберите MP3 файл');
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
                title="Песни"
                loading={loading}
                data={data}
                columns={columns}
                icons={MaterialTableIcons}
                editable={{
                    onRowUpdate: (newData, oldData) => new Promise(resolve => {
                        const errors = validate(newData);
                        if (!errors.length) {
                            setErrorMessages([]);
                            SongService.update(oldData.id, newData).then(() => {
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
                            SongService.create(newData).then(() => {
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
                        SongService.delete(oldData.id).then(() => {
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