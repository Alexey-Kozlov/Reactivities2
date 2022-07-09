import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';


function App() {

    const [activity, setActivity] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/getactivity').then(response => {
            console.log(response);
            setActivity(response.data);
        });
    }, []);

  return (
      <div>
          <Header as='h2' icon='users' content='Reactivities' />
          <List>
              
                  {
                  activity.map((activity: any) => (
                      <List.Item key={activity.id}>
                              {activity.title}
                      </List.Item>
                      ))
                  }
              </List>
    </div>
  );
}

export default App;
