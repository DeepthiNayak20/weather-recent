import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { closeModal, showModal } from '../../redux/modalSlice'
import { weather } from '../../redux/weatherSlice'

import './favourite.css'

const Favourite = () => {
  const [fetchedData, setFetchedData] = useState<any>([])
  const [search, setSearch] = useState('')
  const [Searced, setSearced] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [fav, setFav] = useState(false)
  const navigate = useNavigate()
  const weatherData = useSelector((state: any) => state.weatherData)
  const recentSearchData = JSON.parse(localStorage.getItem('search') || '[]')
  const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${search}&format=json&u=f`

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '677dc0bde4msh0ae337e5d486c6bp128016jsnddd26fe7b271',
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
    },
  }
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setFetchedData(json))
      .catch((err) => console.error('error:' + err))
  }, [search])

  const dispatch = useDispatch()

  const favData = JSON.parse(localStorage.getItem('fav') || '[]')

  let icon = ''
  const removeItem = (location: any) => {
    // console.log('abvcxz', location.location.woeid)
    const favourites = JSON.parse(localStorage.getItem('fav') || '[]')
    // console.log('woeid', favourites)
    let remId = -1
    for (let i = 0; i < favourites.length; i++) {
      // console.log('id', favourites[i].location.woeid, location.location.woeid)
      if (
        (favourites[i] &&
          favourites[i].location &&
          favourites[i].location.woeid) ===
        (location && location.location && location.location.woeid)
      ) {
        remId = i
      }
    }
    console.log('remId', remId)
    favourites.splice(remId, 1)
    console.log('new remId', favourites)
    localStorage.setItem('fav', JSON.stringify(favourites))
    // window.location.reload()
  }
  useEffect(() => {
    Searced && dispatch(weather(fetchedData))
  }, [fetchedData])

  useEffect(() => {
    Searced && navigate('/')
  }, [weatherData])

  return (
    <div>
      <div className="favourites">
        {JSON.stringify(favData) === '[]' ? (
          <div className="nothing">
            <div className="nothingImg">
              <img
                src={require('../../assets/icon_nothing.png')}
                alt=""
                className="notImage"
              />
            </div>
            <div className="nothingText">No Favourites added</div>
          </div>
        ) : (
          <div className="favContainer">
            <div className="favHeadContainer">
              <div className="favleft">
                <div className="backBtn">
                  <img
                    src={require('../../assets/back.png')}
                    alt=""
                    className="backButtonImg"
                    onClick={() => navigate('/')}
                  />
                </div>
                <div className="favoriteHead">Favourite</div>
              </div>
              <div className="favright">
                <div className="search">
                  <img
                    src={require('../../assets/searchMobile.png')}
                    alt=""
                    className="searchMobileImg"
                    onClick={() => {
                      dispatch(showModal())
                      navigate('/')
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="favHead">
              <div className="cities">
                {favData.length} City added as favourite
              </div>
              <div
                className="removeAll"
                onClick={() => {
                  setDialog(true)
                }}
              >
                Remove All
              </div>
            </div>

            <div className="favColumnReverse">
              {favData.map((favPlace: any, i: any) => {
                switch (
                  favPlace &&
                  favPlace.current_observation &&
                  favPlace.current_observation.condition.text
                ) {
                  case 'Haze':
                    icon = 'icon_mostly_cloudy_small.png'
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
                    icon = 'icon_partly_cloudy_small.png'
                    break

                  case 'Thunderstorm':
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
                    icon = 'icon_partly_cloudy_small.png'
                    break
                }
                const favHandler = () => {
                  setSearch(
                    favPlace && favPlace.location && favPlace.location.city,
                  )
                  setSearced(true)
                }
                return (
                  <div className="favBodyContainer" key={i}>
                    <div className="favBody">
                      <div className="favrouriteMobile">
                        <div
                          className="state"
                          onClick={() => {
                            favHandler()
                          }}
                        >
                          {favPlace &&
                            favPlace.location &&
                            favPlace.location.city}
                          ,{' '}
                          {favPlace &&
                            favPlace.location &&
                            favPlace.location.country}
                        </div>
                        <div className="threeElements">
                          <div className="elementOne">
                            <img
                              src={require(`../../assets/${icon}`)}
                              alt=""
                              className="elementOneImg"
                            />
                          </div>
                          <div className="elementTwo">
                            {favPlace &&
                              favPlace.current_observation &&
                              favPlace.current_observation.condition
                                .temperature}
                            <span className="deg">&deg;F</span>
                          </div>
                          <div className="elementThree">
                            {favPlace &&
                              favPlace.current_observation &&
                              favPlace.current_observation.condition.text}
                          </div>
                        </div>
                      </div>
                      <div className="fillHeart">
                        <img
                          src={require('../../assets/icon_favourite_Active.png')}
                          alt=""
                          className="fillHeartImg"
                          onClick={() => removeItem(favPlace)}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      {dialog ? (
        <div>
          <div className="modalContainer">
            <div className="overlay">
              <div className="modalContent">
                <div className="infoModal">
                  Are you sure want to remove all the favourites?
                </div>
                <div className="modalButtons">
                  <form action="" className="modalForm">
                    <button className="btnNo" onClick={() => setDialog(false)}>
                      No
                    </button>
                    <button
                      className="btnNo"
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('fav')
                        setDialog(false)
                      }}
                    >
                      Yes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Favourite
