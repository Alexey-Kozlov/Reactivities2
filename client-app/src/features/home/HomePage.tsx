import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted >
                    <Image size='massive' src='/assets/logo.png' alt='Лого' style={{ marginBottom: 12 }} />
                    Действия
                </Header>
                <Header as='h2' inverted content='Добро пожаловать в действия' />
                <Button as={Link} to='/activities' content='Действия !' size='huge' inverted />
            </Container>
        </Segment>
    )
}