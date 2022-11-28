import { useEffect, useState } from 'react'
import './header.css'
import { useDispatch, useSelector } from 'react-redux'
import { weather } from '../../redux/weatherSlice'
import { NavLink } from 'react-router-dom'
import { closeModal, showModal } from '../../redux/modalSlice'

const Header = () => {
  const [fetchedData, setFetchedData] = useState<any>([])
  const [search, setSearch] = useState('')
  const [nav, setNav] = useState(false)
  const [autoSearch, setAutoSearch] = useState(false)

  const searchData = JSON.parse(localStorage.getItem('search') || '[]')
  // console.log('search', searchData)

  if (searchData === undefined) {
    localStorage.setItem('search', '[]')
  }
  const dispatch = useDispatch()

  useEffect(() => {
    const searchItem = JSON.parse(localStorage.getItem('searchTerm') || '[]')
    setSearch(searchItem)
  }, [])
  const searchValue = search
  const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${searchValue}&format=json&u=f`

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fd6b1ba7ddmsh4899d92a76be0d0p17b258jsn5bf69a08eb5a',
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
    },
  }
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setFetchedData(json))
      .catch((err) => console.error('error:' + err))
  }, [search])
  // console.log(JSON.stringify(fetchedData) !== '[]')
  const arr: any[] = []
  const recentSearchHandler = () => {
    if (JSON.stringify(fetchedData) !== '[]') {
      searchData.map((user: any) => {
        console.log(
          'fetchedData',
          (user && user.location && user.location.woeid) ===
            (fetchedData && fetchedData.location && fetchedData.location.woeid),
        )

        if (
          (user && user.location && user.location.woeid) ===
          (fetchedData && fetchedData.location && fetchedData.location.woeid)
        ) {
          // alert('exists')
          arr.push('exists')
        }
      })
      if (arr.includes('exists')) {
        //alert("already exists");
      } else {
        if (search !== '') {
          // var letters = /^[\w\-\s]+$/
          // if (search.match(letters)) {
          fetchedData && searchData.push(fetchedData)
          localStorage.setItem('search', JSON.stringify(searchData))
        } else {
          alert('Enter Valid cities')
        }
      }
    } else {
      // alert("enter search term");
    }
  }

  useEffect(() => {
    dispatch(weather(fetchedData))
    recentSearchHandler()
    console.log('fetchedData Data', fetchedData)
  }, [fetchedData])

  useEffect(() => {
    dispatch(closeModal())
  }, [])

  const modal = useSelector((state: any) => state.modalStatus)

  // console.log(modal.value)

  return (
    <div>
      <div className="headerContainer">
        <div className="logoImg">
          <img src={require('../../assets/logo_web.png')} alt="img" />
        </div>
        <div className="searchBar">
          <form
            action=""
            className="formContainer"
            onSubmit={(e: any) => {
              e.preventDefault()
              setSearch(e.target.searchIP.value)
              localStorage.setItem(
                'searchTerm',

                JSON.stringify(e.target.searchIP.value),
              )
            }}
          >
            <input
              type="text"
              className="searchField"
              placeholder="Search City"
              name="searchIP"
              autoComplete="off"
              onFocus={() => {
                setAutoSearch(true)
              }}
              // onBlur={() => {
              //   setAutoSearch(false)
              // }}
            />

            <img
              src={require('../../assets/icon_search_white.png')}
              alt=""
              className="searchIcon"
            />
          </form>
        </div>
      </div>
      <div className="mobileHeader">
        <div className="topHeaderMobile">
          {' '}
          <div
            className="burger"
            onClick={() => {
              setNav(true)
            }}
          >
            <img
              src={require('../../assets/icon_menu_white.png')}
              alt=""
              className="burgerMobile"
            />
          </div>
          <div className="logoMobile">
            <img src={require('../../assets/logo.png')} alt="" />
          </div>
        </div>
        <div className="searchMobile">
          <img
            src={require('../../assets/icon_search_white.png')}
            alt=""
            className="searchIconMobile"
            onClick={() => {
              dispatch(showModal())
            }}
          />
        </div>
      </div>

      {nav && (
        <div className="linkList">
          {' '}
          <NavLink
            to="/"
            onClick={() => {
              setNav(false)
            }}
            className="linkMobile"
          >
            Home
          </NavLink>
          <NavLink
            to="/fav"
            onClick={() => {
              setNav(false)
            }}
            className="linkMobile"
          >
            Favourite
          </NavLink>
          <NavLink
            to="/recent"
            onClick={() => {
              setNav(false)
            }}
            className="linkMobile"
          >
            Recent Search
          </NavLink>
          <div
            className="close"
            onClick={() => {
              setNav(false)
            }}
          ></div>
        </div>
      )}

      {modal.value === 'open' ? (
        <div>
          <div className="mobileSearchContainer">
            <div className="mobileSearchTop">
              <div className="backImg">
                <img
                  src={require('../../assets/back.png')}
                  alt=""
                  className="goBack"
                  onClick={() => {
                    dispatch(closeModal())
                  }}
                />
              </div>
              <div className="inputSearch">
                <form
                  onSubmit={(e: any) => {
                    e.preventDefault()
                    setSearch(e.target.searchIn.value)
                    localStorage.setItem(
                      'searchTerm',
                      JSON.stringify(e.target.searchIn.value),
                    )
                    dispatch(closeModal())
                  }}
                >
                  <input
                    type="text"
                    className="mobileSearchBar"
                    placeholder="Search for City"
                    name="searchIn"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {/* {autoSearch && (
        <div className="suggestionContainer">
          <div className="suggestItem">fetch</div>
        </div>
      )} */}
    </div>
  )
}

export default Header
