import { useState } from 'react';

function Input({
  type = 'text',
  label,
  id,
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  disabled = false,
  required = false,
  className = '',
  icon,
  fullWidth = false,
  helperText,
}) {
  const [focused, setFocused] = useState(false);
  
  const baseClasses = `
    block px-4 py-2 w-full
    border rounded-md
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
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          className={`
            ${baseClasses}
            ${stateClasses}
            ${icon ? 'pl-10' : ''}
          `}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-app-error' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

export default Input;