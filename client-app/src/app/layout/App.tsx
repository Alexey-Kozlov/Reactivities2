import {Container, Segment} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  return (
      <>
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/*' element={
                  <Segment>
                      <NavBar />
                      <Container style={{ marginTop: '7em' }}>
                          <Routes>
                            <Route path='/activities' element={<ActivityDashboard />} />
                            <Route path='/activities/:id' element={<ActivityDetails />} />
                            <Route path="/createActivity" element={<ActivityForm />} />
                            <Route path="/editActivity/:id" element={<ActivityForm />} />
                          </Routes>
                      </Container>
                  </Segment>
              } />
          </Routes>

    </>
  );
}

export default observer(App);
