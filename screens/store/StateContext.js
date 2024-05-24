import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../components/AuthContext';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // user
  const { user } = useAuth();
  const coins = user ? user.coins : 0

  // items available (for upgrade they could be fetched from a db)
  const discounts = [
      {
          id: 1,
          title: 'Maxima 10%',
          description: 'Come to maxima for grocery shopping after your run',
          points: 50,
          image: 'https://www.maxima.lt/upl/media/762x/04/4034-maxima_ivairus-02.jpg?v=1-0',
          coordinate: {
            latitude: 37.341,
            longitude: -122.038,
          }
      },
      {
          id: 2,
          title: 'Caffeine 5%',
          description: 'Caffeine is the best place to have a break during your run',
          points: 30,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBbj5UdbPZHDV0d6-e3IcPSCgIOWX2jTAVHQy8RTja0Q&s',
          coordinate: {
            latitude: 37.321,
            longitude: -122.012,
          }
      },
      {
          id: 3,
          title: 'Dzeb Pub 15%',
          description: 'After your run come for karaoke',
          points: 70,
          image: 'https://visit.kaunas.lt/assets/Uploads/_resampled/FillWyIxMDUwIiwiNTI1Il0/dzem-706118336.jpg',
          coordinate: {
            latitude: 37.301,
            longitude: -122.008,
          }
      }
  ]

  const icons = [
    {
      id: 10,
      name: 'Bat Icon',
      points: 5,
      image: 'bat',
    },
    {
      id: 11,
      name: 'Bird Icon',
      points: 5,
      image: 'bird',
    },
    {
      id: 12,
      name: 'Cow Icon',
      points: 10,
      image: 'cow',
    },
    {
      id: 13,
      name: 'Ilama Icon',
      points: 5,
      image: 'ilama',
    },
    {
      id: 14,
      name: 'Panda Icon',
      points: 10,
      image: 'panda',
    },
  ]

  // items bought by the customer
  const [ownedItems, setOwnedItems] = useState([])

  // method to perform when the purchase button of an item (CardStore component) is pressed
  const buyItem = (numPoints, title, id) => {

    if(user){

      // if available points are more than cost of the item proceed with the purchase
      if(user.coins >= numPoints) {

          const allItems = [...discounts, ...icons]

          // update points
          user.coins = coins - numPoints

          // add item to the owned list
          const item = allItems.find((item) => item.id === id)
          if (item) {
              if(ownedItems.length > 0){
                  setOwnedItems([...ownedItems, item])
              }
              else{
                  setOwnedItems([item])
              }
          }
      }
      // if available points are less than cost of the item display an allert
      else {
          Alert.alert("You don't own enough points to buy " + title)
      }
    }
    else{
        Alert.alert("Login to be able to buy stuff")
    }
  }

  return (
    <StateContext.Provider value={{ coins, items: discounts, ownedItems, buyItem, icons }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => React.useContext(StateContext);