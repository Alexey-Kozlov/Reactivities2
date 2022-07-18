import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Container style={{ marginTop: '7em' }}>
            <h1>Домашняя страничка</h1>
            <h2>Перейти к <Link to="/activities">Активностям</Link></h2>
        </Container>
    )
}