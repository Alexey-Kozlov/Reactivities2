import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ActivityFilters() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='Фильтры' />
                <Menu.Item content='Все действия' />
                <Menu.Item content='Я иду' />
                <Menu.Item content='Идут ко мне' />
            </Menu>
            <Header />
            <Calendar locale='ru' />
        </>
    )
}