import { useState } from 'react';


export default function ToggleSwitch() {
  const [checked, setChecked] = useState(false)
  
  const onToggleSwitchChange = () => {
    setChecked(!checked);
  }
  
  return (
    <div className='ToggleSwitch ToggleSwitch__rounded'>
      <div className='ToggleSwitch__wrapper'>
        <div className={`Slider ${checked && 'isChecked'}`} onClick={onToggleSwitchChange}></div>
      </div>
    </div>
  );
}