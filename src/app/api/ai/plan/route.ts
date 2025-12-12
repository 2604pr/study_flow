import { NextRequest, NextResponse } from "next/server";
// import OpenAI, { OpenAIError } from "openai"; // or AI SDK / Groq

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { goal } = await req.json();

    if (!goal || typeof goal !== "string") {
      return NextResponse.json(
        { error: "goal is required" },
        { status: 400 }
      );
    }

    // TODO: call real AI provider. For assignment, you can mock:
    // const completion = await client.chat.completions.create({ ... });

    const mocked = [
      {
        title: `System Design Basics for ${goal}`,
        difficulty: "HARD",
        status: "TODO",
      },
      {
        title: `DSA Practice (Arrays & Strings)`,
        difficulty: "MEDIUM",
        status: "TODO",
      },
    ];

    return NextResponse.json({ data: mocked });
  } catch (err) {
    console.error("POST /api/ai/plan error:", err);
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    );
  }
}
