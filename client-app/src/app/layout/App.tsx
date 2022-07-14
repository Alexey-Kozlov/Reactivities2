import { useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

    const [activities, setActivity] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
    const [editModem, setEditMode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        agent.Activities.list().then(response => {
            response.map(activity => (
                activity.date = activity.date.split('T')[0]
            ));
            setActivity(response);
            setLoading(false);
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
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.edit(activity).then(() => {
                setActivity([...activities.filter(p => p.id !== activity.id), activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            });
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivity([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            });
        }

    }

    function handleDaleteActivity(id: string) {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivity([...activities.filter(p => p.id !== id)]);
            setSelectedActivity(undefined);
            setSubmitting(false);
        });
        
        setSelectedActivity(undefined);
    }

    if (loading) return <LoadingComponent content="Загрузка..."  />

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
                  submitting={submitting}
              />
          </Container>
    </>
  );
}

export default App;
