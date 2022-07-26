import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface TI {
    placeholder: string;
    name: string;
    label?: string;
    rows: number;
}

export default function TextArea(props: TI) {

    const [field, meta] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props} />
            {
                meta.touched && meta.error ?
                    <Label basic color='red'>{meta.error}</Label>
                    : null
            }
        </Form.Field>
    )
}