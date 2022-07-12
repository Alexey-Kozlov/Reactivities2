import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {

    const [activities, setActivity] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
    const [editModem, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/getactivity').then(response => {
            setActivity(response.data);
        });
    }, []);

    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find(p => p.id === id));
    }

    function handleCancelSelectedActivity() {
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?: string) {
        id ? handleSelectActivity(id) : handleCancelSelectedActivity();
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: IActivity) {
        activity.id ?
            setActivity([...activities.filter(p => p.id !== activity.id), activity])
            : setActivity([...activities, { ...activity, id: uuid() }]);
        setEditMode(false);
        setSelectedActivity(activity);
    }

    function handleDaleteActivity(id:string) {
        setActivity([...activities.filter(p => p.id !== id)]);
        setSelectedActivity(undefined);
    }

  return (
      <>
          <NavBar openForm={handleFormOpen} />
          <Container style={{ marginTop:'7em' }}>
              <ActivityDashboard
                  activities={activities}
                  selectedActivity={selectedActivity}
                  selectActivity={handleSelectActivity}
                  cancelSelectActivity={handleCancelSelectedActivity}
                  editMode={editModem}
                  openForm={handleFormOpen}
                  closeForm={handleFormClose}
                  createOrEdit={handleCreateOrEditActivity}
                  deleteActivity={handleDaleteActivity}
              />
          </Container>
    </>
  );
}

export default App;
