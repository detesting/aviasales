import React from 'react';
import { Radio } from 'antd';
import { useDispatch } from 'react-redux';

import { setCheap, setFast } from '../../store/tabsSlice';

import './Tabs.css';

export default function Tabs() {
  const dispatch = useDispatch();
  const changeTabs = (e) => {
    if (e.target.value === 'cheap') {
      dispatch(setCheap());
    } else if (e.target.value === 'fast') {
      dispatch(setFast());
    }
  };
  return (
    <div className="main__tabs">
      <Radio.Group defaultValue="cheap" buttonStyle="solid" onChange={(e) => changeTabs(e)}>
        <Radio.Button value="cheap" style={{ width: 251, height: 50 }}>
          Самый дешевый
        </Radio.Button>
        <Radio.Button value="fast" style={{ width: 251, height: 50 }}>
          Самый быстрый
        </Radio.Button>
      </Radio.Group>
    </div>
  );
}
