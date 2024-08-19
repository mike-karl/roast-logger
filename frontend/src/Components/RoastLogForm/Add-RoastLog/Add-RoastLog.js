import React from 'react'
import LogTable from '../LogTable';
import RoastDataForm from '../RoastDataForm'
import { useForm, FormProvider} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import *  as z from 'zod';
import RoastLogDataService from '../../../services/roastLog'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const validateNumber = z.number()
.or(z.string().regex(/^$|^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/, { message: 'Expected number, recieved string' }).min(1, {message: 'Required' }).transform(Number))
.refine((n) => n >= 0, { message: 'value was less than 0' });

const schema = z.object({
  bean: z.string().min(1, {message: 'Required' }),
  description: z.string(),
  targetRoastLevel: z.string().min(1, {message: 'Required'}),
  phTemp: validateNumber,
  phTime: z.string().min(1, {message: 'Required'}),
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

const RoastLogForm = () => {
  const methods = useForm({resolver: zodResolver(schema)});

  const {  handleSubmit } = methods;
  const axiosPrivate = useAxiosPrivate();
  const BASE_URL = '/mantraCoffee';
  const controller = new AbortController();
  const onSubmit = async (data) => {
    await new Promise( async (resolve) => {
      await setTimeout(() => {
        console.log(data);
        addRoastLog(data);
        resolve(undefined);
      }, 3000)
    })
  }

  const addRoastLog = async (data) => {
    try {
    const response = await axiosPrivate.post(`${BASE_URL}`, data, {
      withCredentials: true
    })
    console.log(response)
    }
    catch(err) {
      console.log(err);
    } 
  }

  return (
    <FormProvider {...methods} >
      <form onSubmit={handleSubmit(onSubmit)} className="roastLogForm-container" >
        <LogTable />
        <RoastDataForm />
      </form>
    </FormProvider>
  )
}

export default RoastLogForm