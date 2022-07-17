import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityList() {

    const [delButtonId, setDelButtonId] = useState<string>('');
    const { activityStore } = useStore();
    const { deleteActivity, loading, activitiesByDate } = activityStore;

    function handleDelButtonClick(e: React.MouseEvent<HTMLButtonElement>, id: string) {
        setDelButtonId(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated="right" content="Просмотр" color="blue" />
                                <Button
                                    name={activity.id}
                                    loading={loading && delButtonId === activity.id}
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
})