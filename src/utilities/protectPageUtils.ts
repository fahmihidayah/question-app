import { getMeUser } from "./getMeUser";

export default async function isPageCanBeAccessed(){
    const user = await getMeUser();

    return user.user !== null;
}