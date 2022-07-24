import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store"

export default observer(function ServerErrors() {

    const { commonStore } = useStore();

    return (
        <Container>
            <Header as='h1' content='Ошибка сервера' />
            <Header subheader as='h5' color='red' content={commonStore.error?.message} />
            {
                commonStore.error?.details && (
                    <Segment>
                        <Header as='h4' content='Стек' color='teal' />
                        <code style={{ marginTop: '10px' }}>{commonStore.error.details}</code>
                    </Segment>
                )
            }
        </Container>
    )
})   