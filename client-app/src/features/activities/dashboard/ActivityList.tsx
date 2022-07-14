import React, { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface ALInteface {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}


export default function ActivityList({ activities, selectActivity, deleteActivity, submitting }: ALInteface) {

    const [delButtonId, setDelButtonId] = useState<string>('');
    function handleDelButtonClick(e: React.MouseEvent<HTMLButtonElement>, id: string) {
        setDelButtonId(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.id)} floated="right" content="Просмотр" color="blue" />
                                <Button
                                    name={activity.id}
                                    loading={submitting && delButtonId === activity.id}
                                    onClick={(e) => handleDelButtonClick(e, activity.id)}
                                    floated="right"
                                    content="Удалить"
                                    color="red" />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                 ))}
            </Item.Group>
        </Segment>
    )
}