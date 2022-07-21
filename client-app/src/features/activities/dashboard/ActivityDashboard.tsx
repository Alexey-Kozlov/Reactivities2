import { observer } from "mobx-react-lite";
import { Grid} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useEffect } from "react";
import ActivityFilters from "./ActivityFilters";

export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, activityRegistry, loadingInitial } = activityStore;

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities]);

    if (loadingInitial) return <LoadingComponent content="Загрузка..." />

    return (
        <Grid>
            <Grid.Column width="10"> 
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})