import { useState } from 'react';
import './App.css';

function App() {
  //原始資料，先以物件方式呈現，並加上是否為編輯中
  const originaldata = [
    {
      id: 1,
      name: '珍珠奶茶',
      description: '香濃奶茶搭配QQ珍珠',
      price: 50,
      storage: 20,
      isEdit: false
    },
    {
      id: 2,
      name: '冬瓜檸檬',
      description: '清新冬瓜配上新鮮檸檬',
      price: 45,
      storage: 18,
      isEdit: false
    },
    {
      id: 3,
      name: '翡翠檸檬',
      description: '綠茶與檸檬的完美結合',
      price: 55,
      storage: 34,
      isEdit: false
    },
    {
      id: 4,
      name: '四季春茶',
      description: '香醇四季春茶，回甘無比',
      price: 45,
      storage: 10,
      isEdit: false
    },
    {
      id: 5,
      name: '阿薩姆奶茶',
      description: '阿薩姆紅茶搭配香醇鮮奶',
      price: 50,
      storage: 25,
      isEdit: false
    },
    {
      id: 6,
      name: '檸檬冰茶',
      description: '檸檬與冰茶的清新組合',
      price: 45,
      storage: 20,
      isEdit: false
    },
    {
      id: 7,
      name: '芒果綠茶',
      description: '芒果與綠茶的獨特風味',
      price: 55,
      storage: 18,
      isEdit: false
    },
    {
      id: 8,
      name: '抹茶拿鐵',
      description: '抹茶與鮮奶的絕配',
      price: 60,
      storage: 20,
      isEdit: false
    }
  ];
  const [alldata, setAllData] = useState(originaldata);
  const [currentEdit, setCurrentEdit] = useState('');

  //切換是否為編輯模式
  function toggleIsEdit(id) {
    const targetItem = alldata.find(item => item.id == id);
    setCurrentEdit(targetItem.name);

    const newData = alldata.map(item => {
      if (item.id == id) {
        return {
          ...item,
          isEdit: !item.isEdit
        };
      }
      return item;
    });
    setAllData(newData);
  }

  //修改資料
  function toggleChange(id, change) {
    const newData = alldata.map(item => {
      if (item.id == id) {
        return {
          ...item,

          storage: item.storage + change > 0 ? item.storage + change : 0
        };
      }
      return item;
    });
    setAllData(newData);
  }

  //點任何地方放棄編輯
  function handleBlur(id) {
    const newData = alldata.map(item => {
      if (item.id == id) {
        return {
          ...item,
          isEdit: false
        };
      }
      return item;
    });
    setAllData(newData);
  }

  //如果編輯中，按下 Enter 鍵儲存編輯，ESC 停止編輯(並修改資料)。
  function handleKeyDown(id, event) {
    if (event.target.value.length > 0 && event.target.value.length <= 15) {
      if (event.key === 'Enter') {
        const newData = alldata.map(item => {
          if (item.id == id) {
            return {
              ...item,
              name: event.target.value,
              isEdit: !item.isEdit
            };
          }
          return item;
        });
        setAllData(newData);
        setCurrentEdit('');
      }
    }

    if (event.key === 'Escape') {
      const newData = alldata.map(item => {
        if (item.id == id) {
          return {
            ...item,
            isEdit: !item.isEdit
          };
        }
        return item;
      });
      setAllData(newData);
      setCurrentEdit('');
    }
  }

  // Return
  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope='col'>品項</th>
            <th scope='col'>描述</th>
            <th scope='col'>價格</th>
            <th scope='col'>庫存</th>
          </tr>
        </thead>
        <tbody>
          {alldata.map(item => {
            return (
              <tr key={item.id}>
                <td>
                  <span
                    id='name'
                    onDoubleClick={() => toggleIsEdit(item.id, 'name')}>
                    {item.isEdit ? (
                      <input
                        type='text'
                        value={currentEdit}
                        onKeyDown={event => handleKeyDown(item.id, event)}
                        onChange={event => setCurrentEdit(event.target.value)}
                        onBlur={() => handleBlur(item.id)}
                        autoFocus
                      />
                    ) : (
                      item.name
                    )}
                  </span>
                </td>
                <td>
                  <span id='description'>{item.description}</span>
                </td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => toggleChange(item.id, -1)}>-</button>
                  <span id='storage'>{item.storage}</span>
                  <button onClick={() => toggleChange(item.id, 1)}>+</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
