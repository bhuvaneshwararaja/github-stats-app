import { fetchGitRepositories, getGitHubStatsData, getPageWiseRepository } from "@/app/helper/gitHelper";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { name: string,pageNumber:number };
}

const accessToken: string = process.env.PERSONAL_ACCESS_TOKEN as string;

export const GET = async (
  request: NextRequest,
  { params: { name, pageNumber } }: Props
) => {
  try {
    return NextResponse.json(
      ({
       data:await getPageWiseRepository(pageNumber,name)
      }),
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while processing your request." },
      { status: 500 }
    );
  }
};
