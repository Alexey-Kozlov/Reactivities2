import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder >
            <Header icon>
                <Icon name='search' />
                Страница не найдена... 
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>Вернуться к списку действий</Button>
            </Segment.Inline>
        </Segment>

    )
}