export interface ProjectTreeQuery {
    favoriteOnly: boolean | undefined;
    name: string | undefined;
}

export enum ProjectTreeSort {
    alphabeticalAsc,
    alphabeticalDesc,
    modifyDateAsc,
    modifyDateDesc,
}