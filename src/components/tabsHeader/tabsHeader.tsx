import './tabsHeader.css'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import HomeTab from '../homeTab/homeTab'
import Favourite from '../favourite/favourite'
import Recent from '../recent/recent'
import { Route, Routes, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

const TabsHeader = () => {
  const [value, onChange] = useState('')
  const [date, setDate] = useState<any>(new Date())

  // const date = new Date();

  // setInterval(function () {
  //   today();
  // }, 1000);

  // const today = () => {
  //   onChange(
  //     `${date.toLocaleString("en-us", {
  //       weekday: "short",
  //     })} ${date.getDate()}, ${date.toLocaleString("en-us", {
  //       month: "short",
  //     })} ${date.getFullYear()}  ${date.toLocaleString("en-US", {
  //       hour: "numeric",
  //       minute: "numeric",
  //       hour12: true,
  //     })}`
  //   );
  // };

  const today = () => {
    setDate(new Date())
  }

  useEffect(() => {
    const timerId = setInterval(today, 1000)
    return function timeChange() {
      clearInterval(timerId)
    }
  }, [])

  // console.log('{date}', date)

  return (
    <div>
      <div className="tabLinks">
        <div className="tabsSelect">
          <NavLink to="/" className="linkNames">
            HOME
          </NavLink>
          <NavLink to="/fav" className="linkNames">
            FAVOURITE
          </NavLink>
          <NavLink to="/recent" className="linkNames">
            RECENT SEARCH
          </NavLink>
        </div>
        <div className="dateDisplay">
          <div>
            {' '}
            <span>
              {' '}
              {date.toLocaleString('en-us', {
                weekday: 'short',
              })}
              , {date.getDate()}{' '}
              {date.toLocaleString('en-us', {
                month: 'short',
              })}{' '}
              {date.getFullYear()}
              &nbsp;&nbsp;&nbsp;
              {date.toLocaleString('en-US', {
                hour: 'numeric',

                minute: 'numeric',

                hour12: true,
              })}
            </span>
          </div>
        </div>
      </div>
      {/* <TabPanel>
            <h2>
              <HomeTab />
            </h2>
          </TabPanel>
          <TabPanel>
            <h2>
              <Favourite />
            </h2>
          </TabPanel>
          <TabPanel>
            <h2>
              <Recent />
            </h2>
          </TabPanel> */}
      <Routes>
        <Route path="/" element={<HomeTab date={date} />} />
        <Route path="/fav" element={<Favourite />} />{' '}
        <Route path="/recent" element={<Recent />} />
      </Routes>
    </div>
  )
}

export default TabsHeader
