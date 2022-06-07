import React from 'react'

import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import './comments.css'

const comments = () => {
  return (
    <ul>
        {/* <Comment /> */}
        <li>
            <div className='commentWrap'>
                <div className='avatarWrap'>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                </div>
                <div className='commentBox'>
                    <div className='commentHeader'>
                        <h6>Display Name</h6>
                        <span>time since</span>
                    </div>
                    <div className='commentBody'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                    </div>
                </div>
            </div>
        </li>
    </ul>
  )
}

export default comments