import React, {useState} from 'react'
import type { DatePickerProps, TimePickerProps } from 'antd';
import { DatePicker, Select, Space} from 'antd';

const { Option } = Select;

type PickerType = 'time' | 'date';

const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType;
  onChange: TimePickerProps['onChange'] | DatePickerProps['onChange'];
}) => {
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};

const DatePickerm = () => {
  const [type, setType] = useState<PickerType>('time');

  return (
    <div>
      <Space>
      <Select value={type} onChange={setType}>
        <Option value="date">Ngày</Option>
        <Option value="week">Tuần</Option>
        <Option value="month">Tháng</Option>
      </Select>
      <PickerWithType type={type} onChange={(value) => console.log(value)} />
    </Space>
        
    </div>
  )
}

export default DatePickerm