import React from "react";
import { useFormContext } from "react-hook-form";
const RoastDataForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext({});

  return (
    <div className="form-group">
      <h1 className="fg-header">Roast Data</h1>
      <div className="fg-item">
        <label htmlFor="bean">Select Coffee Bean: </label>
        <select
          className="form-select"
          {...register("bean")}
          name="bean"
          id="bean"
          disabled={isSubmitting}
        >
          <option value="" placeholder="Select Coffee Bean" hidden>
            Select Coffee Bean
          </option>
          <option value="Ethiopia Misty Valley Grade 1 Yirgacheffe Natural">
            Ethiopia Misty Valley Grade 1 Yirgacheffe Natural
          </option>
          <option value="Organic Sumatra Mandheling FTO Wet Hulled">
            Organic Sumatra Mandheling FTO Wet Hulled
          </option>
          <option value="Brazil Daterra CHC Reserve Espresso ">
            Brazil Daterra CHC Reserve Espresso{" "}
          </option>
          <option value="Decaf Organic Sumatra Mandheling FTO SWP">
            Organic Sumatra Mandheling FTO SWP
          </option>
        </select>
        {errors["bean"] && (
          <span className="error-message">✖{errors["bean"].message}</span>
        )}
      </div>
      <div className="fg-item fg-left">
        <label htmlFor="description">Description: </label>
        <input
          className="form-input"
          {...register("description")}
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          disabled={isSubmitting}
        />
        {errors["description"] && (
          <span className="error-message">
            ✖ {errors["description"].message}
          </span>
        )}
      </div>
      <div className="fg-item fg-right">
        <label htmlFor="targetRoastLevel">Target Roast Level: </label>
        <select
          className="form-select"
          {...register("targetRoastLevel")}
          name="targetRoastLevel"
          id="targetRoastLevel"
          disabled={isSubmitting}
        >
          <option value="" hidden>
            Select Roast Level
          </option>
          <option value="City">City</option>
          <option value="City +">City +</option>
          <option value="Full City">Full City</option>
          <option value="Full City +">Full City +</option>
          <option value="Vienna">Vienna</option>
          <option value="French">French</option>
          <option value="Italian">Italian</option>
        </select>
        {errors["targetRoastLevel"] && (
          <span className="error-message">
            ✖ {errors["targetRoastLevel"].message}
          </span>
        )}
      </div>
      <div className="fg-item fg-left">
        <label htmlFor="phTemp">Pre-Heat Temp: </label>
        <input
          className="form-input"
          {...register("phTemp")}
          type="text"
          name="phTemp"
          id="phTemp"
          placeholder="°F"
          disabled={isSubmitting}
        />
        {errors["phTemp"] && (
          <span className="error-message">✖ {errors["phTemp"].message}</span>
        )}
      </div>
      <div className="fg-item fg-right">
        <label htmlFor="phTime">Pre-Heat Time: </label>
        <input
          className="form-input"
          {...register("phTime")}
          type="text"
          name="phTime"
          id="phTime"
          placeholder="mins."
          disabled={isSubmitting}
        />
        {errors["phTime"] && (
          <span className="error-message">✖ {errors["phTime"].message}</span>
        )}
      </div>
      <div className="fg-item fg-left">
        <label htmlFor="roastProfile.startWeight">Start Weight: </label>
        <input
          className="form-input"
          {...register("roastProfile.startWeight")}
          type="text"
          name="roastProfile.startWeight"
          id="startWeight"
          placeholder="(g)"
          disabled={isSubmitting}
        />
        {errors.roastProfile?.["startWeight"] && (
          <span className="error-message">
            ✖ {errors.roastProfile?.["startWeight"].message}
          </span>
        )}
      </div>
      <div className="fg-item fg-right">
        <label htmlFor="startWeight">End Weight: </label>
        <input
          className="form-input"
          {...register("roastProfile.endWeight")}
          type="text"
          name="roastProfile.endWeight"
          id="endWeight"
          placeholder="(g)"
          disabled={isSubmitting}
        />
        {errors.roastProfile?.["endWeight"] && (
          <span className="error-message">
            ✖ {errors.roastProfile?.["endWeight"].message}
          </span>
        )}
      </div>
      <div className="fg-item fg-left">
        <label htmlFor="roastProfile.firstCrack">First Crack: </label>
        <input
          className="form-input"
          {...register("roastProfile.firstCrack")}
          type="text"
          name="roastProfile.firstCrack"
          id="firstCrack"
          placeholder="mm:ss"
          disabled={isSubmitting}
        />
        {errors.roastProfile?.["firstCrack"] && (
          <span className="error-message">
            ✖ {errors.roastProfile?.["firstCrack"].message}
          </span>
        )}
      </div>
      <div className="fg-item fg-right">
        <label htmlFor="roastProfile.rollingFirstCrack">
          Rolling First Crack:{" "}
        </label>
        <input
          className="form-input"
          {...register("roastProfile.rollingFirstCrack")}
          type="text"
          name="roastProfile.rollingFirstCrack"
          id="rollingFirstCrack"
          placeholder="mm:ss"
          disabled={isSubmitting}
        />
        {errors.roastProfile?.["rollingFirstCrack"] && (
          <span className="error-message">
            ✖ {errors.roastProfile?.["rollingFirstCrack"].message}
          </span>
        )}
      </div>
      <div className="fg-item fg-left">
        <label htmlFor="roastProfile.secondCrack">Second Crack: </label>
        <input
          className="form-input"
          {...register("roastProfile.secondCrack")}
          name="roastProfile.secondCrack"
          id="secondCrack"
          placeholder="mm:ss"
          disabled={isSubmitting}
        />
        {errors.roastProfile?.["secondCrack"] && (
          <span className="error-message">
            ✖ {errors.roastProfile?.["secondCrack"].message}
          </span>
        )}
      </div>
      <div className="fg-item fg-right">
        <label htmlFor="roastProfile.totalRoastTime">Total Roast Time: </label>
        <input
          className="form-input"
          {...register("roastProfile.totalRoastTime")}
          name="roastProfile.totalRoastTime"
          id="totalRoastTime"
          placeholder="mm:ss"
          disabled={isSubmitting}
        />
        {errors.roastProfile?.["totalRoastTime"] && (
          <span className="error-message">
            ✖ {errors.roastProfile?.["totalRoastTime"].message}
          </span>
        )}
      </div>
      <div className="fg-item fg-left">
        <label htmlFor="roastProfile.color">Color: </label>
        <select
          className="form-select"
          {...register("roastProfile.color")}
          name="roastProfile.color"
          id="color"
          disabled={isSubmitting}
        >
          <option value="" hidden>
            Select Color
          </option>
          <option value="Light Brown">Light Brown</option>
          <option value="Light - Medium Brown">Light - Medium Brown</option>
          <option value="Medium Brown">Brown</option>
          <option value="Medium - Dark Brown">Medium - Dark Brown</option>
          <option value="Dark Brown">Dark Brown</option>
          <option value="Dark Brown - Black">Dark Brown - Black</option>
          <option value="Black">Black</option>
        </select>
        {errors.roastProfile?.["color"] && (
          <span className="error-message">
            ✖ {errors.roastProfile?.["color"].message}
          </span>
        )}
      </div>
      <div className="fg-item fg-right">
        <label htmlFor="roastProfile.roastLevel">Roast Level: </label>
        <select
          className="form-select"
          {...register("roastProfile.roastLevel")}
          name="roastProfile.roastLevel"
          id="roastLevel"
          disabled={isSubmitting}
        >
          <option value="" hidden>
            Select Roast Level
          </option>
          <option value="City">City</option>
          <option value="City +">City +</option>
          <option value="Full City">Full City</option>
          <option value="Full City +">Full City +</option>
          <option value="Vienna">Vienna</option>
          <option value="French">French</option>
          <option value="Italian">Italian</option>
        </select>
        {errors.roastProfile?.["roastLevel"] && (
          <span className="error-message">
            ✖ {errors.roastProfile?.["roastLevel"].message}
          </span>
        )}
      </div>
      <div className="fg-item fg-notes">
        <label htmlFor="roastProfile.roastNotes">Roast Notes: </label>
        <textarea
          className="form-select"
          {...register("roastProfile.roastNotes")}
          name="roastProfile.roastNotes"
          id="roastNotes"
          placeholder="Don't Forget to take notes!"
          disabled={isSubmitting}
        />
        {errors.roastProfile?.["roastNotes"] && (
          <span className="error-message">
            ✖ {errors.roastProfile?.["roastNotes"].message}
          </span>
        )}
      </div>
      <input
        className="fg-item primaryBtn"
        type="submit"
        disabled={isSubmitting}
      />
    </div>
  );
};

export default RoastDataForm;
