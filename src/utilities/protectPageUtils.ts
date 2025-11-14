import { getMeUser } from "./getMeUser";
import { getMeUserServer } from "./getMeUserServer";

export default async function isPageCanBeAccessed(){
    const user = await getMeUser();

    return user.user !== undefined;
}