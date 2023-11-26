import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { name: string };
}
const accessToken:string = process.env.PERSONAL_ACCESS_TOKEN as string

export const GET = async (
  request: NextRequest,
  { params: { name } }: Props
) => {
  try {
    const getUser = await fetch(`https://api.github.com/users/${name}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    if (getUser.status === 404) {
      return NextResponse.json(
        { message: "Github user was not found!!" },
        { status: 404 }
      );
    } else {
      const userData = await getUser.json();
      return NextResponse.json(userData, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while processing your request." },
      { status: 500 }
    );
  }
};
