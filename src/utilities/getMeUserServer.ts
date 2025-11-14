'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decodeJwt } from "jose";
import type { User } from '../payload-types'
import { getPayload } from 'payload';
import config from "@payload-config"


export interface DecodedUserToken {
  id: string;
  collection: string;
  email: string | null;
  sid: string;
  iat: number;
  exp: number;
}


const getUserFromToken = async (token: string): Promise<DecodedUserToken | null> => {
  try {
    const decoded = decodeJwt(token) as DecodedUserToken;
    const nowInSeconds = Math.floor(Date.now() / 1000);

    if (!decoded.exp || decoded.exp < nowInSeconds) {

      return null;
    }

    if (!decoded.id) {

      return null;
    }

    return decoded;
  } catch (error) {

    return null;
  }
};

export const getMeUserServer = async (args?: {
  nullUserRedirect?: string
  validUserRedirect?: string,
}): Promise<{
  token: string
  user?: User
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {}
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  const decodeJwtResult : DecodedUserToken | null = await getUserFromToken(token || '');

  let errorMessage : string = 'Failed to fetch employee data.'
  if (!token || !decodeJwtResult) {
    if (nullUserRedirect) {
      redirect(nullUserRedirect)
    }
    return {
      token: "",
      user: undefined
    }
  }

  try {
    // const meUserReq = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/current-user`, {
    //   headers: {
    //     Authorization: `JWT ${token}`,
    //   },
    // })

    const payload = await getPayload({
      config
    });

    const user : User =  await payload.findByID({
      collection : "users",
      id : decodeJwtResult.id,
    })

    if (!user) {
      errorMessage = `Failed to fetch employee: ${decodeJwtResult.id} ${JSON.stringify(decodeJwtResult)}`;
      throw new Error(`Failed to fetch employee: ${decodeJwtResult.id} ${JSON.stringify(decodeJwtResult)}`)
    }

    if (validUserRedirect && user) {
      redirect(validUserRedirect)
    }

    if (nullUserRedirect && !user) {
      redirect(nullUserRedirect)
    }

    if(!user) {
      errorMessage = 'Employee is undefined after successful API call.';

      return {
        token : "",
        user: undefined
      }
    }
    return {
      token: token!,
      user: user ,
    }
  } catch (error) {

    if (nullUserRedirect) {
      redirect(nullUserRedirect)
    }
    return {
      token: "",
      user: undefined
    }
  }
}
