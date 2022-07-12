import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface ALInteface {
    activity: IActivity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}


export default function ActivityDetails({ activity, cancelSelectActivity, openForm }: ALInteface) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta><span>{activity.date}</span></Card.Meta>
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths="2">
                    <Button onClick={() => openForm(activity.id)} basic color="blue" content="Редактирование" />
                    <Button onClick={() => cancelSelectActivity()} basic color="grey" content="Отмена" />
                </ButtonGroup>
            </Card.Content>
        </Card>            
    )
}