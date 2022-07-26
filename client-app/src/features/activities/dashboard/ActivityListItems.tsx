import { format } from "date-fns";
import { ru } from 'date-fns/locale'
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface ALI {
    activity: IActivity
}

export default function ActivityListItems({ activity }: ALI) {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>
                                Владелец Алекс
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />{format(new Date(activity.date!), 'dd.MM.yyyy HH:mm', { locale: ru })}
                    <Icon name='marker' />{activity.venue}
                </span>
            </Segment>
            <Segment secondary >
                Здесь участники
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} color='teal' floated='right' content='Просмотр' />
            </Segment>
        </Segment.Group>
    )
}