import React, { useState, useEffect } from 'react';
import { Button, Typography, Divider, Input, Table } from '@douyinfe/semi-ui';
import { IconRefresh2, IconTreeTriangleRight } from '@douyinfe/semi-icons';

function App() {
  const { Title } = Typography;
  const [selected, setSelected] = useState('');
  const [dishes, setDishes] = useState([]);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0);
  const columns = [
    {
      title: '菜名',
      dataIndex: 'name',
    },
    {
      title: '权重',
      dataIndex: 'weight',
    }
  ];

  useEffect(() => {
    const storedDishes = localStorage.getItem('dishes');
    if (storedDishes) {
      setDishes(JSON.parse(storedDishes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dishes', JSON.stringify(dishes));
  }, [dishes]);

  function addDish() {
    setDishes(prevDishes => [...prevDishes, { name, weight: +weight }]);
  }

  function pickDish() {
    const totalWeight = dishes.reduce((sum, dish) => sum + dish.weight, 0);
    const random = Math.floor(Math.random() * totalWeight);
    let curr = 0;
    for (let i = 0; i < dishes.length; i++) {
      curr += dishes[i].weight;
      if (curr > random) {
        setSelected(dishes[i].name);
        break;
      }
    }
  }

  return (
    <div>
      <div style={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '200px',
        paddingBottom: '50px',
      } }>
        <Title style={ { margin: '8px 0' } } >今天吃什么呢？点一下试试！</Title>
        <Button icon={ <IconRefresh2 extra-large spin /> } onClick={ pickDish } size='large' style={ {
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
        } } />
      </div>

      { selected && <div>今天要吃 { selected }</div> }

      <Divider margin='12px' />
      <div style={ {
        width: '40vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '8px',
        paddingLeft: '30vw',
        paddingRight: '30vw',
      } }>
        <Input prefix={ <IconTreeTriangleRight /> } placeholder="菜名" value={ name } onChange={ value => setName(value) } showClear></Input>
        <Input prefix={ <IconTreeTriangleRight /> } placeholder="权重" value={ weight } onChange={ value => setWeight(value) } showClear></Input>
        <Button onClick={ () => addDish() }>添加菜单</Button>
      </div>
      { dishes.length > 0 && <div>
        <Divider margin='12px' />
        <Table
          columns={ columns }
          dataSource={ dishes }
          pagination={ false }
          emptyText="暂无数据"
        />
      </div> }
    </div>
  );
}

export default App;
