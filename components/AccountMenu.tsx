import { signOut } from 'next-auth/react';
import React from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();

  if (!visible) {
    return null;
  }

  // Styles
  const AccountMenuBox:string = "bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex"
  const currentUserName:string ="text-white text-sm group-hover/item:underline"
  const userImg:string = "w-8 rounded-md"
  const signOutLink:string="px-3 text-center text-white text-sm hover:underline"
  const firstBox:string = "flex flex-col gap-3 "
  const itemsOnFirstBox:string = "px-3 group/item flex flex-row gap-3 items-center w-full"
  const divider :string = "bg-gray-600 border-0 h-px my-4"

  return (
    <div className={AccountMenuBox}>
      <div className={firstBox}>
        <div className={itemsOnFirstBox}>
          <img className={userImg} src="/images/default-blue.png" alt="" />
          <p className={currentUserName}>{currentUser?.name}</p>
        </div>
      </div>
      <hr className={divider} />
      <div onClick={() => signOut()} className={signOutLink}>
        Sign out of Netflix
      </div>
    </div>
  )
}

export default AccountMenu;
