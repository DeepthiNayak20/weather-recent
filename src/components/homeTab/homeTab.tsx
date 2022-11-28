import './homeTab.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Tab, TabList } from 'react-tabs'

import Switch from 'react-switch'
import { addFavalue } from '../../redux/weatherSlice'
import Loading from '../loading/loading'

const HomeTab = ({ date }: any) => {
  const [favHeart, setFavHeart] = useState(false)
  const [favH, setFavH] = useState(false)
  const Data = useSelector((state: any) => state.weatherData.value)
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)

  const term = JSON.parse(localStorage.getItem('search') || '[]')

  const previousData = JSON.parse(localStorage.getItem('fav') || '[]')

  useEffect(() => {
    for (let i = 0; i < previousData.length; i++) {
      if (
        (previousData[i] &&
          previousData[i].location &&
          previousData[i].location.woeid) ===
        (Data && Data.location && Data.location.woeid)
      ) {
        setFavH(true)
        break
      } else {
        setFavH(false)
      }
    }
  })
  const addFav = () => {
    const arr: any[] = []
    previousData.map((user: any, i: number) => {
      if (
        user &&
        user.location &&
        user.location.woeid === Data &&
        Data.location &&
        Data.location.woeid
      ) {
        arr.push('exists')
      }
    })

    if (arr.includes('exists')) {
      alert('already exists')
    } else {
      if (Data !== '' && Data.message !== 'Internal Server Error') {
        previousData.push(Data)
        localStorage.setItem('fav', JSON.stringify(previousData))
        setFavHeart(!favHeart)
      } else {
        alert('Enter correct Data')
      }
    }
  }
  const handleChange = () => {
    setChecked(!checked)
  }
  const removeItem = (location: any) => {
    console.log('abvcxz', location.location.woeid)
    const favourites = JSON.parse(localStorage.getItem('fav') || '[]')
    console.log('woeid', favourites)
    let remId = -1
    for (let i = 0; i < favourites.length; i++) {
      //console.log('id', favourites[i].location.woeid, location.location.woeid)
      if (
        favourites[i] &&
        favourites[i].location &&
        favourites[i].location.woeid === location.location.woeid
      ) {
        remId = i
      }
    }
    favourites.splice(remId, 1)
    console.log('new remId', favourites)
    localStorage.setItem('fav', JSON.stringify(favourites))
    // window.location.reload()
    setFavH(false)
  }

  let icon = ''
  switch (
    Data &&
    Data.current_observation &&
    Data.current_observation.condition.text
  ) {
    case 'Haze':
      icon = 'icon_mostly_sunny_small.png'
      break
    case 'Mostly Sunny':
      icon = 'icon_mostly_sunny_small.png'
      break
    case 'Sunny':
      icon = 'icon_mostly_sunny_small.png'
      break
    case 'Clear':
      icon = 'icon_mostly_sunny_small.png'
      break

    case 'Cloudy':
      icon = 'icon_mostly_cloudy_small.png'
      break
    case 'Partly Cloudy':
      icon = 'icon_partly_cloudy_small.png'
      break
    case 'Mostly Cloudy':
      icon = 'icon_mostly_cloudy_small.png'
      break

    case 'Thunderstorms':
      icon = 'icon_thunderstorm_small.png'
      break

    case 'Rainy':
      icon = 'icon_rain_small.png'
      break
    case 'Sleet':
      icon = 'icon_rain_small.png'
      break
    case ' Showers':
      icon = 'icon_rain_small.png'
      break
    default:
      icon = 'icon_rain_small.png'
      break
  }

  const h = () => {
    dispatch(addFavalue(Data))
    setFavHeart(!favHeart)
  }

  return (
    <div className="weatherContainer">
      {Data &&
      Data.current_observation &&
      Data.current_observation.condition &&
      Data.current_observation.condition.temperature ? (
        <>
          <div className="homeTabContainer">
            <div className="dateMobile">
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
            <div className="locationName">
              {Data && Data.location && Data.location.city},&nbsp;
              {Data && Data.location && Data.location.country}
            </div>
            {!favH ? (
              <div
                className="addFav"
                onClick={() => {
                  addFav()
                }}
              >
                <div className="favImg">
                  <img
                    src={require('../../assets/icon_favourite.png')}
                    alt="img"
                    className="heartImg"
                  />
                </div>
                <div className="favText">Add to favourite</div>
              </div>
            ) : (
              <div
                className="addFav"
                onClick={() => {
                  removeItem(Data)
                }}
              >
                <div className="favImg">
                  <img
                    src={require('../../assets/icon_favourite_Active.png')}
                    alt="img"
                    className="heartImg"
                  />
                </div>
                <div className="favText textColor">Added to favourite</div>
              </div>
            )}

            <div className="weatherDisplay">
              <div className="weatherImg">
                <img
                  src={require(`../../assets/${icon}`)}
                  alt=""
                  className="sunnyImg"
                />
              </div>
              <div className="weatherDegree">
                <div>
                  {checked
                    ? Data &&
                      Data.current_observation &&
                      Data.current_observation.condition &&
                      Data.current_observation.condition.temperature
                    : (
                        (Data &&
                          Data.current_observation &&
                          Data.current_observation.condition &&
                          Data.current_observation.condition.temperature - 32) *
                        (5 / 9)
                      ).toFixed(0)}{' '}
                </div>
                <div className="switchTempature">
                  <Switch
                    borderRadius={4}
                    onChange={handleChange}
                    checked={checked}
                    className="react-switch"
                    offColor="transparent"
                    onColor="transparent"
                    uncheckedHandleIcon={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          fontSize: 18,
                          color: 'red',
                        }}
                      >
                        {'\u00B0'}C
                      </div>
                    }
                    uncheckedIcon={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          fontSize: 18,
                          paddingRight: 2,
                          color: 'white',
                          zIndex: '2',
                        }}
                      >
                        {'\u00B0'}F
                      </div>
                    }
                    checkedIcon={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          fontSize: 18,
                          paddingRight: 2,
                          color: 'white',
                        }}
                      >
                        {'\u00B0'}C
                      </div>
                    }
                    checkedHandleIcon={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          color: 'red',
                          fontSize: 18,
                        }}
                      >
                        {'\u00B0'}F
                      </div>
                    }
                  />
                </div>
              </div>
              <div className="weatherDetail">
                {Data &&
                  Data.current_observation &&
                  Data.current_observation.condition &&
                  Data.current_observation.condition.text}
              </div>
            </div>
          </div>
          <div className="footerContainer">
            <div className="footerItem">
              <div className="footerImg">
                <img
                  src={require('../../assets/icon_temperature_info.png')}
                  alt=""
                  className="footerImage"
                />
              </div>

              <div className="minMax">
                <div className="minMaxTextText">Min-Max</div>
                <div className="minMaxDegree">
                  {Data &&
                    Data.current_observation &&
                    Data.current_observation.condition &&
                    Data.current_observation.condition.temperature - 3}
                  &deg;-{' '}
                  {Data &&
                    Data.current_observation &&
                    Data.current_observation.condition &&
                    Data.current_observation.condition.temperature + 3}
                  &deg;
                </div>
              </div>
            </div>

            <div className="footerItem">
              <div className="footerImg">
                <img
                  src={require('../../assets/icon_precipitation_info.png')}
                  alt=""
                  className="footerImage"
                />
              </div>

              <div className="minMax">
                <div className="minMaxText">Precipitation</div>
                <div className="minMaxDegree">
                  {Data &&
                    Data.current_observation &&
                    Data.current_observation.atmosphere &&
                    Data.current_observation.atmosphere.pressure}
                  %
                </div>
              </div>
            </div>

            <div className="footerItem">
              <div className="footerImg">
                <img
                  src={require('../../assets/icon_humidity_info.png')}
                  alt=""
                  className="footerImage"
                />
              </div>

              <div className="minMax">
                <div className="minMaxText">Humidity</div>
                <div className="minMaxDegree">
                  {Data &&
                    Data.current_observation &&
                    Data.current_observation.atmosphere &&
                    Data.current_observation.atmosphere.humidity}
                  %
                </div>
              </div>
            </div>

            <div className="footerItem">
              <div className="footerImg">
                <img
                  src={require('../../assets/icon_wind_info.png')}
                  alt=""
                  className="footerImage"
                />
              </div>

              <div className="minMax">
                <div className="minMaxText">Wind</div>
                <div className="minMaxDegree">
                  {' '}
                  {Data &&
                    Data.current_observation &&
                    Data.current_observation.wind &&
                    Data.current_observation.wind.speed}{' '}
                  mph
                </div>
              </div>
            </div>

            <div className="footerItem">
              <div className="footerImg">
                <img
                  src={require('../../assets/icon_visibility_info.png')}
                  alt=""
                  className="footerImage"
                />
              </div>

              <div className="minMax">
                <div className="minMaxText">Visibility</div>
                <div className="minMaxDegree">
                  {Data &&
                    Data.current_observation &&
                    Data.current_observation.atmosphere &&
                    Data.current_observation.atmosphere.visibility}{' '}
                  mph
                </div>
              </div>
            </div>
          </div>
        </>
      ) : JSON.stringify(term) === '[]' ? (
        <div className="defaultSearch">
          <div className="enterCity">Enter the city to search</div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default HomeTab
