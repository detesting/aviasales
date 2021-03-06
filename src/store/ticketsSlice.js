import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// https://aviasales-test-api.kata.academy
//https://front-test.beta.aviasales.ru
async function findTickets(id) {
  let { data } = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`);
  return data;
}

export const getTickets = createAsyncThunk('tickets/getTickets', async function getTicketsAll() {
  let { data: searchID } = await axios.get('https://front-test.beta.aviasales.ru/search');
  let data = await findTickets(searchID.searchId);
  try {
    while (!data.stop) {
      let newData = await findTickets(searchID.searchId);
      data.tickets.push(...newData.tickets);
      data.stop = newData.stop;
    }
  } catch (e) {
    return data.tickets;
  }
  return data.tickets;
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loading: false,
    error: false,
    countTickets: 5,
  },
  reducers: {
    addFiveTickets(state) {
      state.countTickets += 5;
    },
  },
  extraReducers: {
    [getTickets.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getTickets.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.tickets.push(...action.payload);
    },
    [getTickets.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { addFiveTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
