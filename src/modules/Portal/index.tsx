import {Navigation} from "./components/Navigation";
import {Main} from "./components/Main";
import {Aside} from "./components/Aside";
import {Row} from "constants/globalStyles";

export const Portal = () => {
    return (
        <>
            <Navigation/>
            <Row>
                <Aside/>
                <Main/>
            </Row>
        </>
    )
}

export default Portal;