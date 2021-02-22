// import React, { useState } from "react";
// import CssBaseline from '@material-ui/core/CssBaseline';
// import '../styles/App.css';
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar } from "react-modern-calendar-datepicker";
import React, {useEffect, useState} from 'react';
import {useFetch} from "../hooks";
import MaterialTable from "material-table";
import MaterialTableIcons from "./page_parts/MaterialTableIcons";
import SongListService from "../services/SongListService";
import {Alert, Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import TitleWithBack from "./page_parts/TitleWithBack";

export default function Home() {

// const MemberSelect = props => {
//   const [loading, setLoading] = useState(true);
//   const [members, setMembers] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:3000/api/members/`)
//       .then(response => response.json())
//       .then(data => {
//         setMembers(data);
//         setLoading(false);
//       })
//   }, []);

//   return (
//     <Autocomplete
//       options={members}
//       getOptionLabel={(option) => option.name}
//       getOptionSelected={(option, value) => option.name === value.name}
//       renderInput={params => <TextField {...params} label="Выберите участников" variant="outlined" />}
//       style={{ width: 240 }}
//       loading={loading}
//       multiple={true}
//       onChange={(event, value) => {
//         props.onChange(value ? value.map(v => v._id) : []);
//       }}
//     />
//   );
// }

// const SongSelect = props => {
//   const [loading, setLoading] = useState(true);
//   const [songs, setSongs] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:3000/api/songs/`)
//       .then(response => response.json())
//       .then(data => {
//         setSongs(data);
//         setLoading(false);
//       })
//   }, []);

//   return (
//     <Autocomplete
//       options={songs}
//       getOptionLabel={(option) => option.title}
//       getOptionSelected={(option, value) => option.title === value.title}
//       renderInput={params => <TextField {...params} label="Выберите песни" variant="outlined" />}
//       style={{ width: 240 }}
//       loading={loading}
//       multiple={true}
//       onChange={(event, value) => {
//         props.onChange(value ? value.map(v => v._id) : []);
//       }}
//     />
//   );
// }

const columns = [
  {
    field: 'songs',
    title: 'Песни',
    render: row => row.songs.map(song => song.title).join(', '),
    // editComponent: SongSelect,
  },
  {
    field: 'members',
    title: 'Участники',
    render: row => row.members.map(member => member.name).join(', '),
    // editComponent: MemberSelect,
  },
  { 
    field: 'date', 
    title: 'Дата',
    type: 'date',
  },
  { field: 'note', title: 'Заметки' },
];

  const [data, setData, loading] = useFetch("http://localhost:3000/api/song-list");
  const [errorMessages, setErrorMessages] = useState([]);

  return (
      <div style={{ height: '300px', width: '100%', minWidth: '620px', maxWidth: '1200px' }}>
        <MaterialTable
          title={React.createElement(TitleWithBack, {title: 'Репертуар'})}
          loading={loading}
          data={data}
          columns={columns}
        />
      </div>
  );


  // const defaultValue = {
  //   year: 2021,
  //   month: 2,
  //   day: 25,
  // };

  // const [selectedDate, setSelectedDate] = useState(defaultValue);
  // return(
  //   <div> 
  //     <CssBaseline />
  //     <Calendar
  //       value={selectedDate}
  //       onChange={setSelectedDate}
  //       shouldHighlightWeekends
  //       customDaysClassName={[
  //         { year: 2021, month: 2, day: 4,  className: 'purpleDay' },
  //         { year: 2021, month: 2, day: 12, className: 'orangeDay' },
  //         { year: 2021, month: 2, day: 18, className: 'yellowDay' },
  //       ]}
  //     />
  //   </div>
  // )
}
