import React from 'react'
import { useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Popup from '../Popup'
import Missing from '../Missing'


const validateNumber = z.number()
.or(z.string().regex(/^$|^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/, { message: 'Expected number, recieved string' }).min(1, {message: 'Required' }).transform(Number))
.refine((n) => n >= 0, { message: 'value was less than 0' });

const schema = z.object({
  bean: z.string().min(1, {message: 'Required' }),
  description: z.string(),
  targetRoastLevel: z.string().min(1, {message: 'Required'}),
  phTemp: validateNumber,
  phTime: validateNumber,
  roastProfile: z.object({
    tempOverTime: z.array( z.object({
      time: z.string(),
      temp: validateNumber,
    })),
    startWeight: validateNumber,
    endWeight: validateNumber,
    firstCrack: z.string().min(1, {message: 'Required'}).regex(/^(([0]?[0-5][0-9]|[0-9]):([0-5][0-9]))$/, {message: 'mm:ss format required'}),
    rollingFirstCrack: z.string().min(1, {message: 'Required'}).regex(/^(([0]?[0-5][0-9]|[0-9]):([0-5][0-9]))$/, {message: 'mm:ss format required'}),
    secondCrack: z.string().min(1, {message: 'Required'}).regex(/^(([0]?[0-5][0-9]|[0-9]):([0-5][0-9]))$/, {message: 'mm:ss format required'}),
    totalRoastTime: z.string().min(1, {message: 'Required'}).regex(/^(([0]?[0-5][0-9]|[0-9]):([0-5][0-9]))$/, {message: 'mm:ss format required'}),
    color: z.string().min(1, {message: 'Required'}),
    roastLevel: z.string().min(1, {message: 'Required'}),
    roastNotes: z.string()
  })
})

function RoastLog(props) {

    const [roastLog, setRoastLog] = useState(null);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeletePopup, setIsDeletePopup] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true)

    const axiosPrivate = useAxiosPrivate();
    const BASE_URL = '/mantraCoffee';

    const controller = new AbortController();

    const preLoadedValues = roastLog
    let params = useParams();
    
    const formatDate = () => {
      const roastDate = new Date(roastLog.roastDate).toLocaleDateString();
      return roastDate
    }
    


    const onPageLoad = async (id) => {
      await new Promise( async (resolve) => {
        await setTimeout(() => {
          console.log(id)
          reset(roastLog);
          resolve(undefined);
        }, 1000)
      })
    }

     const getRoastLog = async (id) => {
        try {
          setError(null);
          const response = await axiosPrivate.get(`${BASE_URL}/${id}`, {
            withCredentials: true
          })
          console.log(response)
          setRoastLog(response.data)
        } catch(e) {
          console.error(e)
          setError(e);
        }
    }

    useEffect(() => {
      getRoastLog(params.id)
      
    }, [params.id])

    useEffect(() => {
      reset(roastLog)
    }, [roastLog])
    
    const deleteRoastLog = async (roastId) => {
      try {
        const response = await axiosPrivate.delete(`${BASE_URL}/${roastId}`, {
          withCredentials: true
        })
        setRoastLog(response)
        } catch (e) { 
              console.log(e);
          }
      }

    const onSubmit = async (data) => {
      if (isSubmitting) setIsDisabled(true)
      await new Promise( async (resolve) => {
        await setTimeout(() => {
          console.log(data);
          updateRoastLog(roastLog._id, data);
          window.location.reload();
          resolve(undefined);
        }, 1000)
      })
    }

    const updateRoastLog = async (roastId, data) => {
      try {
      const response = axiosPrivate.patch(`${BASE_URL}/${roastId}`, data, {
        withCredentials: true
      })
          console.log(response)
    } catch(e)  {
          console.log(e);
        } 
    }

    const handleUpdate = () => {
      updateRoastLog(roastLog._id);
      togglePopup();
      setIsDeletePopup(!isDeletePopup);
      reset();
    }

    const handleDelete = () => {
      deleteRoastLog(roastLog._id) 
      togglePopup();
      setIsDeleted(!isDeleted)
    }

    const togglePopup = () => {
        setIsOpen( !isOpen );
    }

    const handleEdit = () => {
      setIsDisabled(!isDisabled);
      setIsDeletePopup(!isDeletePopup);
    }

    const { register, handleSubmit, isSubmitting, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) , defaultValues: preLoadedValues});

  return (
    <>
    {roastLog === null && error === null ?
    <div>
      Loading...
    </div>
    : roastLog === null && error ?
      <Missing  />
    : isDeleted ? 
    <div className='alertDeleted center'>
      <h1 className="center" >Roast Log has been deleted!</h1>
      <Link className="primaryBtn linkBtn" to="/">Home</Link>
      <Link className="primaryBtn linkBtn" to="/mantraCoffee/add-roast-log">Log New Roast!</Link>
    </div> 
      :
     <div className="editable-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className='editable-form-group' >
          <h1 className="fg-header">Roast Data</h1>
          <div className="fg-item">
            <label htmlFor="bean">Select Coffee Bean: </label>
            <select className='form-select' {...register("bean")} name="bean" id="bean" disabled={isDisabled} >
                <option value="" placeholder='Select Coffee Bean' hidden>Select Coffee Bean</option>
                <option value="Ethiopia Misty Valley Grade 1 Yirgacheffe Natural">Ethiopia Misty Valley Grade 1 Yirgacheffe Natural</option>
                <option value="Organic Sumatra Mandheling FTO Wet Hulled">Organic Sumatra Mandheling FTO Wet Hulled</option>
                <option value="Brazil Daterra CHC Reserve Espresso ">Brazil Daterra CHC Reserve Espresso </option>
                <option value="Decaf Organic Sumatra Mandheling FTO SWP">Organic Sumatra Mandheling FTO SWP</option>
            </select>
            {errors['bean'] && <span className='error-message'>✖{errors['bean'].message}</span>}
          </div>
          <div className="fg-item fg-left">
          <label htmlFor="description">Description: </label>
            <input className='form-input' {...register("description")} type="text" name='description' id='description' placeholder='Description' disabled={isDisabled}/>
            {errors['description'] && <span className='error-message'>✖ {errors['description'].message}</span>}
          </div>
          <div className="fg-item fg-right">
          <label htmlFor="targetRoastLevel">Target Roast Level: </label>
          <select className='form-select' {...register('targetRoastLevel')} name="targetRoastLevel" id="targetRoastLevel" disabled={isDisabled}>
              <option value="" hidden>Select Roast Level</option>
              <option value="City">City</option>
              <option value="City +">City +</option>
              <option value="Full City">Full City</option>
              <option value="Full City +">Full City +</option>
              <option value="Vienna">Vienna</option>
              <option value="French">French</option>
              <option value="Italian">Italian</option>
            </select>
            {errors['targetRoastLevel'] && <span className='error-message'>✖ {errors['targetRoastLevel'].message}</span>}
          </div>
          <div className="fg-item fg-left">
          <label htmlFor="phTemp">Pre-Heat Temp: </label>
            <input className='form-input' {...register("phTemp")} type="text" name='phTemp' id='phTemp' placeholder='°F' disabled={isDisabled}/>
            {errors['phTemp'] && <span className='error-message'>✖ {errors['phTemp'].message}</span>}
          </div>
          <div className="fg-item fg-right">
            <label htmlFor="phTime">Pre-Heat Time: </label>
            <input className='form-input' {...register("phTime")} type="text" name='phTime' id='phTime' placeholder='mm:ss' disabled={isDisabled}/>
            {errors['phTime'] && <span className='error-message'>✖ {errors['phTime'].message}</span>}
          </div>
          <div className='fg-item fg-left'>
            <label htmlFor="startWeight">Start Weight: </label>
            <input className='form-input' {...register("roastProfile.startWeight")} type="text" name="roastProfile.startWeight" id="startWeight" placeholder="(g)" disabled={isDisabled}/>
            {errors.roastProfile?.['startWeight'] && <span className='error-message'>✖ {errors.roastProfile?.['startWeight'].message}</span>}
          </div>
          <div className='fg-item fg-right'>
            <label htmlFor="endWeight">End Weight: </label>
            <input className='form-input' {...register("roastProfile.endWeight")} type="text" name='roastProfile.endWeight' id='endWeight' placeholder="(g)" disabled={isDisabled}/>
            {errors.roastProfile?.['endWeight'] && <span className='error-message'>✖ {errors.roastProfile?.['endWeight'].message}</span>}
          </div> 
          <div className='fg-item fg-left'>
            <label htmlFor="firstCrack">First Crack: </label>
            <input className='form-input' {...register("roastProfile.firstCrack")} type="text" name="roastProfile.firstCrack" id="firstCrack" placeholder='mm:ss' disabled={isDisabled}/>
            {errors.roastProfile?.['firstCrack'] && <span className='error-message'>✖ {errors.roastProfile?.['firstCrack'].message}</span>}
          </div>
          <div className='fg-item fg-right'>
            <label htmlFor="rollingFirstCrack">Rolling First Crack: </label>
            <input className='form-input' {...register("roastProfile.rollingFirstCrack")} type="text" name="roastProfile.rollingFirstCrack" id="rollingFirstCrack" placeholder='mm:ss' disabled={isDisabled}/>
            {errors.roastProfile?.['rollingFirstCrack'] && <span className='error-message'>✖ {errors.roastProfile?.['rollingFirstCrack'].message}</span>}
          </div>
          <div className='fg-item fg-left'>
            <label htmlFor="secondCrack">Second Crack: </label>
            <input className='form-input' {...register("roastProfile.secondCrack")} name='roastProfile.secondCrack' id='secondCrack' placeholder='mm:ss' disabled={isDisabled}/>
            {errors.roastProfile?.['secondCrack'] && <span className='error-message'>✖ {errors.roastProfile?.['secondCrack'].message}</span>}
          </div>
          <div className='fg-item fg-right'>
            <label htmlFor="totalRoastTime">Total Roast Time: </label>
            <input className='form-input' {...register("roastProfile.totalRoastTime")} name='roastProfile.totalRoastTime' id='totalRoastTime' placeholder='mm:ss' disabled={isDisabled}/>
            {errors.roastProfile?.['totalRoastTime'] && <span className='error-message'>✖ {errors.roastProfile?.['totalRoastTime'].message}</span>}
          </div>
          <div className='fg-item fg-left'>
            <label htmlFor="color">Color: </label>
            <select className='form-select' {...register("roastProfile.color")}  name="roastProfile.color" id="color" disabled={isDisabled}>
              <option value="" hidden>Select Color</option>
              <option value="Light Brown">Light Brown</option>
              <option value="Light - Medium Brown">Light - Medium Brown</option>
              <option value="Medium Brown">Brown</option>
              <option value="Medium - Dark Brown">Medium - Dark Brown</option>
              <option value="Dark Brown">Dark Brown</option>
              <option value="Dark Brown - Black">Dark Brown - Black</option>
              <option value="Black">Black</option>
            </select>
            {errors.roastProfile?.['color'] && <span className='error-message'>✖ {errors.roastProfile?.['color'].message}</span>}
          </div>
          <div className='fg-item fg-right'>
            <label htmlFor="roastLevel">Roast Level: </label>
            <select className='form-select' {...register('roastProfile.roastLevel')} name="roastProfile.roastLevel" id="roastLevel" disabled={isDisabled}>
              <option value="" hidden>Select Roast Level</option>
              <option value="City">City</option>
              <option value="City +">City +</option>
              <option value="Full City">Full City</option>
              <option value="Full City +">Full City +</option>
              <option value="Vienna">Vienna</option>
              <option value="French">French</option>
              <option value="Italian">Italian</option>
            </select>
            {errors.roastProfile?.['roastLevel'] && <span className='error-message'>✖ {errors.roastProfile?.['roastLevel'].message}</span>}
          </div>
          <div className='fg-item fg-notes'>
            <label htmlFor="roastNotes">Roast Notes: </label>
            <textarea {...register("roastProfile.roastNotes")} name='roastProfile.roastNotes' id='roastNotes' placeholder="Don't Forget to take notes!" disabled={isDisabled}/>
            {errors.roastProfile?.['roastNotes'] && <span className='error-message'>✖ {errors.roastProfile?.['roastNotes'].message}</span>}
          </div>
          <div className="fg-item">
            <h3 id="roastDate">Roast Date: {formatDate()}</h3>
          </div>
        

        {isDisabled ? 
        <div className='btn-container'>
          <button className='primaryBtn space-between' type="button" onClick={handleEdit} >Edit</button>
          <button className='primaryBtn space-between' type="button" onClick={togglePopup}>Delete</button>
        </div> : 
        <div className="btn-container">
          <button className='primaryBtn space-between' type='button' onClick={() => {reset(); setIsDisabled(!isDisabled); setIsDeletePopup(!isDeletePopup);}} >Cancel</button>
          <button className='primaryBtn space-between' type="button" onClick={togglePopup}>Update</button>
        </div>
        }
        
        {isOpen &&  <Popup content={
            <>
              {isDeletePopup ?
              <>
                <b>Warning! You are about DELETE this Roast Log!</b>
                <p>If you do not wish to DELETE this roast log click CANCEL. To confirm DELETION click delete.</p>
                <button className='primaryBtn' type="button" onClick={togglePopup}>Cancel</button>
                <button className='primaryBtn' type="button" onClick={handleDelete}>Delete</button>
              </>:
              <>
                <b>Warning! You are about UPDATE this Roast Log!</b>
                <p>Once UPDATED all previous data will be replaced with the current form values. If you do not wish to UPDATE click CANCEL. To UPDATE click UPDATE.</p>
                <button className='primaryBtn' type="button" onClick={togglePopup}>Cancel</button>
                <input className='primaryBtn' type="submit" disabled={isDisabled} value='Update' />
              </>}
            </>}
                    handleClose={togglePopup}
                    />}
      </form> 
    </div> 
    }</>
  )
}

export default RoastLog