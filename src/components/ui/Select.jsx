import { useState } from 'react';

function Select({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Seleccionar...',
  disabled = false,
  required = false,
  error = '',
  fullWidth = false,
  className = '',
  helperText = '',
}) {
  const [focused, setFocused] = useState(false);

  const baseClasses = `
    block w-full px-4 py-2
    rounded-md border
    appearance-none
    bg-white
    transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
  `;

  const stateClasses = error
    ? "border-app-error focus:border-app-error focus:ring-app-error/20 text-app-error"
    : focused
      ? "border-app-primary focus:border-app-primary focus:ring-app-primary/20"
      : "border-gray-300 focus:border-app-primary";
  
  const widthClasses = fullWidth ? "w-full" : "";

  // Clase para agregar la flecha de dropdown
  const arrowClasses = "bg-no-repeat bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22M6 8l4 4 4-4%22/%3E%3C/svg%3E')] bg-[center_right_1rem] bg-[length:1.5em_1.5em]";

  return (
    <div className={`${widthClasses} ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-1 ${error ? 'text-app-error' : 'text-gray-700'}`}
        >
          {label}
          {required && <span className="text-app-error ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            ${baseClasses}
            ${stateClasses}
            ${arrowClasses}
          `}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-app-error' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

export default Select;