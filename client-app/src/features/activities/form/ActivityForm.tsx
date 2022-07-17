import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer (function ActivityForm() {
    const { activityStore } = useStore();
    const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        city: '',
        date: '',
        venue: ''
    };

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

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
                <Button onClick={() => closeForm()} floated="right" type="button" content="Отмена" />
            </Form>
        </Segment>
    )
})