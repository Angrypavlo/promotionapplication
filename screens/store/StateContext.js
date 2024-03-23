import React, { createContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // points of the user
  const [points, setPoints] = useState(350)

  // items available (for upgrade they could be fetched from a db)
  const [items, setItems] = useState([
      {
          id: '1',
          title: 'Maxima 10%',
          description: 'Come to maxima for grocery shopping after your run',
          points: 50,
          image: 'https://www.maxima.lt/upl/media/762x/04/4034-maxima_ivairus-02.jpg?v=1-0',
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

      // if available points are more than cost of the item proceed with the purchase
      if(points >= numPoints) {

          // update points
          setPoints(points - numPoints)

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

  return (
    <StateContext.Provider value={{ points, items, ownedItems, buyItem }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => React.useContext(StateContext);