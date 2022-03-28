import {useTranslation} from "react-i18next";
import {UseFormRegister} from "react-hook-form";
import {ProjectCreateRequest} from "../../../../../api/generated";
import * as GS from "constants/globalStyles";
import {TextInput} from "../../../../../components/Form/Input/Text/TextInput";

export const CreateProjectForm = ({
                                      register
                                  }: { register: UseFormRegister<ProjectCreateRequest> }) => {
    const {t} = useTranslation(['auth', 'form', 'common']);

    return (<GS.GridRow columns={2}>
        <GS.GridItem>
            <GS.Card>
                <TextInput name={"name"} register={register} title={t("form:input.projectName")}/>
            </GS.Card>
        </GS.GridItem>
        <GS.GridItem>
            <GS.Card>
                 FILES
            </GS.Card>
        </GS.GridItem>
    </GS.GridRow>)
}