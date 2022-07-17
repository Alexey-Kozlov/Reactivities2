import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";  
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function ActivityDetails() {

    const { activityStore } = useStore();
    const { selectedActivity, openForm, cancelSelectedActivity } = activityStore;
    if (!selectedActivity) return <LoadingComponent content='Загрузка...' />;

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
                    <Button onClick={() => openForm(selectedActivity.id)} basic color="blue" content="Редактирование" />
                    <Button onClick={() => cancelSelectedActivity()} basic color="grey" content="Отмена" />
                </ButtonGroup>
            </Card.Content>
        </Card>            
    )
}