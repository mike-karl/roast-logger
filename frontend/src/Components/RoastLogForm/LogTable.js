import { TempController } from './TempController';
import React from "react";
import { useState, useEffect } from 'react'
import { useFormContext, useFieldArray} from "react-hook-form";
import Stopwatch from './Stopwatch';
import TimeTempTable from './TimeTempTable';


    function LogTable() {
        const [elapsedTime, setElapsedTime] = useState(0);
        const [isRunning, setIsRunning] = useState(false);
        const [temperature, setTemperature] = useState(510)
        const [isOpen, setIsOpen] = useState(false);
        const [isResetPopup, setIsResetPopup] = useState(false);
        const [currentTime, setCurrentTime] = useState(0);


        const { register,  control, onSubmit, handleSubmit } = useFormContext({});
        const {
            fields,
            append, 
            remove,
          } = useFieldArray({
            control,
            name: "roastProfile.tempOverTime"
          });

          // This creates an accurate stopwatch that does not drift over time. And appends data every 30 seconds.
        useEffect(() => {

          // Every 30 seconds appends new data to the useFieldArray hook.
          const logTemperatures = () => {
            if (elapsedTime % 30 === 0 && isRunning) {
            append({ time: formatTime(elapsedTime), temp: temperature})
            console.log("Appended: " + temperature);

            }
          }

          // Timer Logic
                let interval = null;
                if (isRunning === true) {
                    interval = setInterval(() => {
                      if (elapsedTime % 30 === 0 && isRunning) {
                        logTemperatures();
                      } 
                        setCurrentTime(t => t + 1000);
                        setElapsedTime(elapsedTime => elapsedTime + 1);
                    }, 1000 - (Date.now() - currentTime) )
                    
                } 
                return () => {
                    clearInterval(interval)
                    
                }
        }, [isRunning, currentTime, elapsedTime, append, temperature]) 
      
        function toggleIsRunning(event) {
          event.preventDefault();
          if (isRunning === false) {
            setIsRunning(true);
            setCurrentTime(Date.now())
          }
          if (isRunning === true) {
            togglePopup();
          }
        }

        // Format elapsedTime to mm:ss format for display
        const formatTime = (time) => {
            let minutes = Math.floor(time / 60);
            let seconds = time - minutes * 60;
            let formattedTime;
            if (minutes < 10) {
            seconds >= 10 ? formattedTime = '0' + minutes + ':' + seconds : formattedTime = '0' + minutes + ':0' + seconds;
                return formattedTime;
            } else {
                seconds >= 10 ? formattedTime = minutes + ':' + seconds : formattedTime = minutes + ':0' + seconds;
                return formattedTime;
            }
        }

        // Toggles whether the popup component should render and what popup type should render (reset popup or finish popup).
        const togglePopup = () => {
            if (isResetPopup === true) {
                setIsResetPopup(!isResetPopup)
            }
            setIsOpen(!isOpen)
        }

        // stops the timer from running
        const handleFinish = () => {
            setIsOpen( !isOpen );
            setIsRunning(false);
        }

        // sets temperature value
        const handleTemperature = (e) => {
            e.preventDefault();
            setTemperature(e.target.value);
        }

        // resets the the timer as awell as the logged timeTempTable data.
        const handleReset = () => {
            if (isOpen) {
            togglePopup();
            setIsRunning(false);
            setElapsedTime(0);
            remove()
            setIsResetPopup(!isResetPopup);
        }
        if (!isOpen) {
            setIsResetPopup(!isResetPopup);
            togglePopup();
        }
        }

      return (
      <div className="logTable-container">
        <h1 className='logTable-item'>Roast Timer</h1>
        <Stopwatch 
        formatTime={formatTime} 
        elapsedTime={elapsedTime} 
        toggleIsRunning={toggleIsRunning} 
        handleReset={handleReset} 
        isOpen={isOpen} 
        isResetPopup={isResetPopup} 
        togglePopup={togglePopup} 
        handleFinish={handleFinish}
        isRunning={isRunning} 
         />

        <TempController 
        handleTemperature={handleTemperature} 
        temperature={temperature}  />

        <TimeTempTable 
        fields={fields} 
        register={register} 
        onSubmit={onSubmit}
        handleSubmit={handleSubmit} 
         /> 
      </div>
    )}
    
    export default LogTable;