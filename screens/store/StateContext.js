import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../components/AuthContext';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // user
  const { user } = useAuth();
  const coins = user ? user.coins : 0

  // items available (for upgrade they could be fetched from a db)
  const [items, setItems] = useState([
      {
          id: '1',
          title: 'Maxima 10%',
          description: 'Come to maxima for grocery shopping after your run',
          points: 50,
          image: 'https://www.maxima.lt/upl/media/762x/04/4034-maxima_ivairus-02.jpg?v=1-0',
          coordinate: {
            latitude: 37.3365,
            longitude: -122.0323,
          }
      },
      {
          id: '2',
          title: 'Caffeine 5%',
          description: 'Caffeine is the best place to have a brake during your run',
          points: 30,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBbj5UdbPZHDV0d6-e3IcPSCgIOWX2jTAVHQy8RTja0Q&s',
      },
      {
          id: '3',
          title: 'Dzeb Pub 15%',
          description: 'After your run come for karaoke',
          points: 70,
          image: 'https://visit.kaunas.lt/assets/Uploads/_resampled/FillWyIxMDUwIiwiNTI1Il0/dzem-706118336.jpg',
      }
  ])

  // items bought by the customer
  const [ownedItems, setOwnedItems] = useState([])

  // method to perform when the purchase button of an item (CardStore component) is pressed
  const buyItem = (numPoints, title, id) => {

    if(user){

      // if available points are more than cost of the item proceed with the purchase
      if(user.coins >= numPoints) {

          // update points
          user.coins = coins - numPoints

          // add item to the owned list
          const item = items.find((item) => item.id === id)
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
    <StateContext.Provider value={{ coins, items, ownedItems, buyItem }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => React.useContext(StateContext);