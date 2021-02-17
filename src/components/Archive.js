import React from 'react'
import {useFetch} from "../hooks";
import MaterialTable from "material-table";
import TitleWithBack from "./page_parts/TitleWithBack";

const columns = [
  { field: 'title', title: 'Название' },
  { field: 'titleEn', title: 'Название(Eng)' },
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
  },
  {
    field: 'samples',
    title: 'MP3',
    render: row => (
      <div>
          {row.samples.map(file => (
            <div key={file.url}>
              <a href={file.url}>{file.title ?? 'Untitled'}</a>
            </div>
          ))}
      </div>
    ),
  },
];

export default function Archive() {
  const [data, loading] = useFetch("http://localhost:3000/api/songs");

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <MaterialTable
        title={React.createElement(TitleWithBack, {title: 'Архив'})}
        loading={loading}
        data={data}
        columns={columns}
      />
    </div>
  );
}