import React from 'react';

interface MobileMenuProps {
  visible?: boolean;
}

//styles
const options:string = "px-3 text-center text-white hover:underline"
const menuBar:string = "bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex"
const optionBar :string = "flex flex-col gap-4"

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={menuBar}>
      <div className={optionBar}>
        <div className={options}>
          Home
        </div>
        <div className={options}>
          Series
        </div>
        <div className={options}>
          Films
        </div>
        <div className={options}>
          New & Popular
        </div>
        <div className={options}>
          My List
        </div>
        <div className={options}>
          Browse by Languages
        </div>
      </div>
    </div>
  )
}

export default MobileMenu;
