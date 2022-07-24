import React from "react";
import { BrowserHistory, Action, Location } from "history";
import { Router } from "react-router-dom";

interface CustomRouterProps {
    basename?: string;
    children?: React.ReactNode;
    history: BrowserHistory;
}

interface CustomRouterState {
    action: Action;
    location: Location;
}

export const CustomBrowserRouter: React.FC<CustomRouterProps> = (props: CustomRouterProps) => {
    const [state, setState] = React.useState<CustomRouterState>({
        action: props.history.action,
        location: props.history.location,
    });

    React.useLayoutEffect(() => props.history.listen(setState), [props.history]);

    return <Router
        basename={props.basename}
        children={props.children}
        location={state.location}
        navigationType={state.action}
        navigator={props.history}
    />;
};