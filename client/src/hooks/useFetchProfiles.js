/***
    useFetchProfies
        - Custom hook to fetch other user's profile data and manage loading state
        - Intended to use for fetching blocklist, recentprofiles, savedprofiles
    
    How to use:
        const {profilesData, isLoading, isError} = useFetchProfiles(url);

        Parameters:
            url to the api route
        
        Return value:
            1. profilesData will be an array of object containing users data
            2. isLoading true when data is being fetched, and false when data has been fetched
            3. isError will contain message if the request fails

***/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchProfiles = (url) => {
  const [profilesData, setProfilesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const token = localStorage.getItem('auth-token');

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(url, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(response);
        setProfilesData(response.data);
        setIsLoading(false);
      } catch (error) {
        // console.log('unable to fetch data');
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    profilesData,
    isLoading,
    setProfilesData,
    setIsLoading,
  };
};

export default useFetchProfiles;
