import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: request.nextUrl.pathname })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log(body)

    return NextResponse.json({ message: 'No revalidation needed' })
  } catch (err) {
    console.error(err)

    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
