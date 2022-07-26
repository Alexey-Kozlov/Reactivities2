import { format } from "date-fns";
import { ru } from 'date-fns/locale'
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { IActivity } from "../../../app/models/activity";

    const activityImageStyle = {
        filter: 'brightness(30%)'
    };

    const activityImageTextStyle = {
        position: 'absolute',
        bottom: '5%',
        left: '5%',
        width: '100%',
        height: 'auto',
        color: 'white'
    };

    interface Props {
        activity: IActivity
    }

    export default observer(function ActivityDetailedHeader({ activity }: Props) {
        return (
            <Segment.Group>
                <Segment basic attached='top' style={{ padding: '0' }}>
                    <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                    <Segment style={activityImageTextStyle} basic>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Header
                                        size='huge'
                                        content={activity.title}
                                        style={{ color: 'white' }}
                                    />
                                    <p>{format(new Date(activity.date!),'dd.MM.yyyy HH:mm', { locale: ru })}</p>
                                    <p>
                                        Hosted by <strong>Bob</strong>
                                    </p>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Segment>
                <Segment clearing attached='bottom'>
                    <Button color='teal'>Присоединиться к действию</Button>
                    <Button>Отменить действие</Button>
                    <Button as={Link} to={`/editActivity/${activity.id}`} color='orange' floated='right'>
                        Управление событиями
                    </Button>
                </Segment>
            </Segment.Group>
        )
    })