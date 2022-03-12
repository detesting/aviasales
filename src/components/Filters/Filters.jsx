import React from 'react';
import { Checkbox, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { changeOption, changeAll } from '../../store/filtersSlice';
import './Filters.css';

export default function Filters() {
  const options = useSelector((state) => state.filters.options);
  const value = useSelector((state) => state.filters.value);
  const checkAll = useSelector((state) => state.filters.all);

  const dispatch = useDispatch();
  return (
    <div className="filters">
      <Card style={{ width: 232 }} className="filters__card">
        <div className="filters__header">Количество пересадок</div>
        <Checkbox checked={checkAll} className="check_all" onChange={() => dispatch(changeAll())}>
          Все
        </Checkbox>
        <Checkbox.Group
          options={options}
          value={value}
          onChange={(checkedValue) => dispatch(changeOption({ checkedValue }))}
        />
      </Card>
    </div>
  );
}
