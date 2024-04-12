import React, { useEffect, useState } from 'react'
import ProfileSidebar from '../Components/Profile/ProfileSidebar'
import SavedArticlesPage from '../Components/SavedArticlesPage'
import { useLocation } from 'react-router-dom'
import MyPosts from '../Components/Posts/MyPosts'

function Profile() {

  const location = useLocation()
  const [tab, setTab] = useState()
  useEffect(() => {
    // We use location.search to search for queries
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('tab')) {
      setTab(urlParams.get('tab'))
    }
  }, [location.search])

  // We use locaton.search in useEffect to render different components based on tabs

  return (
    <div className='flex flex-col lg:min-h-screen lg:flex-row'>
      <ProfileSidebar />
      <>
        {tab === "savedArticles" && < SavedArticlesPage />}
        {tab === "myPosts" && <MyPosts />}
      </>
    </div>
  )
}

export default Profile