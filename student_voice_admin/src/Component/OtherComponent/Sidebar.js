import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList
}from "react-icons/fa";

import {MdManageAccounts} from 'react-icons/md'

export default function Sidebar({children}) {

  const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);

    const menuItem=[
      {
          path:"/",
          name:"Dashboard",
          icon:<FaTh/>
      },
      {
          path:"/about",
          name:"User Management",
          icon:<MdManageAccounts />
      },
      {
          path:"/analytics",
          name:"Analytics",
          icon:<FaRegChartBar/>
      },
      {
          path:"/comment",
          name:"Comment",
          icon:<FaCommentAlt/>
      },
      {
          path:"/product",
          name:"Product",
          icon:<FaShoppingBag/>
      },
      {
          path:"/productList",
          name:"Product List",
          icon:<FaThList/>
      }
  ]
  return (
    <div className='sidebar-container'>
       <div className={`sidebar-container-bar ${isOpen ? `w-17rem` : `w-4rem`}`}>
            <div className="sidebar-container-bar-top">
                <h1 style={{display: isOpen ? "block" : "none"}} className="sidebar-container-bar-top-logo">Logo</h1>
                <div className={`sidebar-container-bar-top-bar-icon ${isOpen ? `ml-8` : `ml-0`} `}>
                  <FaBars onClick={toggle}/>
                </div>
            </div>
            {
                menuItem.map((item, index)=>(
                    <NavLink to={item.path} key={index} className="sidebar-container-bar-link" activeclassName="sidebar-container-bar-active">
                        <div className="sidebar-container-bar-link-icon">{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className="sidebar-container-bar-link-text">{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        <main>{children}</main>
    </div>
  )
}
