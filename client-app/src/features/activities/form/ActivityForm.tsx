import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import TextInput from "./controls/TextInput";
import TextArea from "./controls/TextArea";
import SelectInput from "./controls/SelectInput";
import { CategoryOptions } from "./controls/CategoryOptions";
import { IActivity } from "../../../app/models/activity";
import DatePickerInput from "./controls/DatePickerInput";

export default observer(function ActivityForm() {
    const navigate = useNavigate();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    let { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        city: '',
        date: null,
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('Необходимо указать наименование'),
        date: Yup.date().required('Необходимо указать дату действия').nullable(),
        category: Yup.string().required('Необходимо указать вид действия'),
        city: Yup.string().required('Необходимо указать город')        
    });

    useEffect(() => { 
        if (!id) id = '';
        loadActivity(id).then(activity => setActivity(activity!));
        
    }, [id, loadActivity]);

    function handleFormSubmit(activity: IActivity) {
        if (activity.id.length === 0) {
            let newActivity = { ...activity, id: uuid() }
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }   

    if (loadingInitial) return <LoadingComponent content="Загрузка ..." />

    return (
        <Segment clearing>
            <Header content='Подробно о событии' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
                        <TextInput name='title' placeholder='Наименование действия' />
                        <SelectInput options={CategoryOptions} placeholder="Категория" name='category' />
                        <DatePickerInput placeholderText="Дата" name='date'
                            showTimeSelect showMonthDropdown showYearDropdown todayButton="Сегодня" closeOnScroll={true}
                            timeCaption='time' locale='ru' dateFormat='dd.MM.yyyy HH:mm' timeIntervals={60}                     
                        />
                        <Header content='Место события' sub color='teal' />
                        <TextInput placeholder="Город" name='city' />
                        <Field placeholder="Значение" name='venue' />
                        <TextArea placeholder="Примечание" name='description' rows={4} />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated="right" positive type="submit" content="Подтвердить" />
                        <Button as={Link} to="/activities" floated="right" type="button" content="Отмена" />
                    </Form> 
                )}
            </Formik>

        </Segment>
    )
})