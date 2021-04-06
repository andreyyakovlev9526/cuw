import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {useFetch} from "../../../hooks";
import MaterialTable from "material-table";
import MaterialTableIcons from "../../page_parts/MaterialTableIcons";
import DescriptionIcon from '@material-ui/icons/Description';
import {Alert} from "@material-ui/lab";
import SongService from "../../../services/SongService";
import {TextField} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TitleWithBack from "../../page_parts/TitleWithBack";

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

        const newValue = props.value ?? [];
        newValue.push({url, title: ''});
        props.onChange(newValue);
    };

    const onTitleChange = (event, item) => {
        item.title = event.currentTarget.value;
        props.onChange(props.value);
    };

    const inputId = 'file-list-' + Math.random().toString(36).substring(7);

    return (
        <div>
            { props.value ? (
              <TableContainer>
                <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Файл</TableCell>
                        <TableCell>Название</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    { props.value.map(item => (
                        <TableRow key={item.url}>
                            <TableCell>
                                <a href={item.url}><DescriptionIcon /></a>
                            </TableCell>
                            <TableCell>
                              <TextField 
                                label="Название" 
                                value={item.title ? item.title : ''} 
                                onChange={(event) => onTitleChange(event, item)} 
                              />
                            </TableCell>
                        </TableRow>
                    )) }
                    </TableBody>
                </Table>
                </TableContainer>
            ) : null}
            <input
                style={{ display: 'none' }}
                id={inputId}
                type="file"
                onChange={event => onFileChange(event)}
            />
            <label htmlFor={inputId}>
                <Button color="primary" component="span">
                    Загрузить
                </Button>
            </label>

            {/*<div style={{marginTop: '3%'}}> */}
            {/*  <input style={{display: 'none', marginTop: '20px'}}*/}
            {/*    id="buttonFile"*/}
            {/*    onChange={event => onFileChange(event)}*/}
            {/*    type="file"*/}
            {/*    // accept=".pdf"*/}
            {/*  />*/}
            {/*  <label htmlFor="buttonFile">*/}
            {/*    <Button variant="contained" color="primary" component="span">*/}
            {/*      Загрузить*/}
            {/*    </Button>*/}
            {/*  </label>*/}
            {/*</div>*/}
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
                {row.sheets && row.sheets.map(file => (
                    <div key={file.url}>
                        <a href={file.url}>{file.title ?? 'Untitled'}</a>
                    </div>
                ))}
            </div>
        ),
        editComponent: FileListInput
    },
    {
        field: 'samples',
        title: 'MP3',
        render: row => (
          <div>
              {row.samples && row.samples.map(file => (
                  <div key={file.url}>
                      <a href={file.url}>{file.title ?? 'Untitled'}</a>
                  </div>
              ))}
         </div>
        ),
        editComponent: FileListInput
    },
];

export default function Songs() {
    
    const [data, setData, loading] = useFetch("http://localhost:3000/api/songs");
    const [errorMessages, setErrorMessages] = useState([]);

    const validate = data => {
        const errors = [];
        if (data.title === undefined) errors.push('Введите название песни');
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
                    title={React.createElement(TitleWithBack, {title: 'Песни'})}
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