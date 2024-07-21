import { Input } from 'antd';
const InputD = (props) => {
  return (
    <Input status={props.status}  placeholder={props.placeholder} onChange={props.onChange} />
  )
}

export default InputD