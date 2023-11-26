import { fetchGitRepositories, getGitHubStatsData } from "@/app/helper/gitHelper";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { name: string };
}

const accessToken: string = process.env.PERSONAL_ACCESS_TOKEN as string;

export const GET = async (
  request: NextRequest,
  { params: { name } }: Props
) => {
  try {
    return NextResponse.json(
      (await getGitHubStatsData(name)),
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while processing your request." },
      { status: 500 }
    );
  }
};
