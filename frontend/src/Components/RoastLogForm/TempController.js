import React from "react";
export function TempController({ handleTemperature, temperature }) {
  return (
    <div className="temp-controller logTable-item">
      <label htmlFor="temp-range">
        Set Temperature:{" "}
        <input
          className="temp-input"
          type="number"
          onChange={handleTemperature}
          step="10"
          value={temperature}
          min="300"
          max="800"
          required
        />
        <span className="validity"></span>
      </label>
    </div>
  );
}
