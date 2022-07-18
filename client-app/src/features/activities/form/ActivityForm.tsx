import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm() {
    const navigate = useNavigate();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    let { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        city: '',
        date: '',
        venue: ''
    });

    useEffect(() => { 
        if (!id) id = '';
        loadActivity(id).then(activity => setActivity(activity!));
        
    }, [id, loadActivity]);

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = { ...activity, id: uuid() }
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }

            
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    if (loadingInitial) return <LoadingComponent content="Загрузка ..." />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder="Наименование" value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder="Примечание" value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder="Категория" value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type="date" placeholder="Дата" value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder="Город" value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder="Значение" value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={loading} floated="right" positive type="submit" content="Подтвердить" />
                <Button as={Link} to="/activities" floated="right" type="button" content="Отмена" />
            </Form>
        </Segment>
    )
})