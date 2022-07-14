import { Dimmer, Loader } from "semantic-ui-react";

interface LC {
    inverted?: boolean;
    content: string;
}

export default function LoadingComponent({ content = 'Загрузка...', inverted = true }: LC) {
    return (
        <Dimmer active={true} inverted={inverted} >
            <Loader content={content} />
        </Dimmer>
    )
}