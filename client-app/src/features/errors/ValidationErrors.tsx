import { Message } from "semantic-ui-react";

interface VE {
    errors: string[] | null; 
}

export default function ValidationErrors({ errors }: VE) {
    return (
        <Message error>
            {
                errors && (
                    <Message.List>
                        {
                            errors.map((err: any, i) => (
                                <Message.Item key={i}>
                                    {err}
                                </Message.Item>
                            ))
                        }
                    </Message.List>
                )
            }
        </Message>
    )
}