import React from 'react'

interface UserNavProps {
  userName: string;
}

const UserNav = ({
  userName
}: UserNavProps): JSX.Element => {
  return (
    <div>
      {userName}
    </div>
  )
}

export default UserNav;
