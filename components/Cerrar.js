import React from 'react'
import useQuiosco from '../hooks/useQuiosco';

const Cerrar = () => {
  const { handleChangeModal } = useQuiosco();
  return (
    <div className="flex justify-end absolute right-0 top-0 md:static">
      <button
        className='hover:text-red-500 transition-all duration-300'
        onClick={() => {
          handleChangeModal();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export default Cerrar