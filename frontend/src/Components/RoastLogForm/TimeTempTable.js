import React from 'react'

const TimeTempTable = ({fields, register}) => {
    const [isDisabled, setIsDisabled] = React.useState(true);

    const handleClick = (e) => {
        e.preventDefault();
        setIsDisabled(!isDisabled)
    }
    const disabledStyle = isDisabled ? { filter: 'brightness(95%)'} : { filter: 'none'}
  return (
    <>  
        <table className="TimeTempTable logTable-item">
          <thead className="tableHeader" >
            {fields.length > 0 &&
            <tr>
              <th>Time</th>
              <th>Temperature</th>
            </tr>}
          </thead>
          <tbody className="tableBody">
            { fields.map((row, index) => (
                  <tr key={row.id} className='tableRow'>
                    <td className='timeData'><input className='form-input' style={disabledStyle} {...register(`roastProfile.tempOverTime.${index}.time`)}  readOnly disabled={isDisabled} /></td>
                    <td className='tempData'><input className='form-input' style={disabledStyle}{...register(`roastProfile.tempOverTime.${index}.temp`)}  onBlur={handleClick} disabled={isDisabled} /></td>
                  </tr>
                  ))
            }
          </tbody>
        </table>
        { fields.length > 0 && 
        <button className="primaryBtn"onClick={handleClick}>{isDisabled ? 'Edit' : 'Done'}</button>}
        
    </>)
}

export default TimeTempTable