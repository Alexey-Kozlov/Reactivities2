import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";  
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityDetails() {

    const { activityStore } = useStore();
    const { selectedActivity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    if (loadingInitial || !selectedActivity) return <LoadingComponent content='Загрузка...' />;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{selectedActivity.title}</Card.Header>
                <Card.Meta><span>{selectedActivity.date}</span></Card.Meta>
                <Card.Description>{selectedActivity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths="2">
                    <Button as={Link} to={`/editActivity/${selectedActivity.id}`} basic color="blue" content="Редактирование" />
                    <Button as={Link} to="/activities" basic color="grey" content="Отмена" />
                </ButtonGroup>
            </Card.Content>
        </Card>            
    )
})