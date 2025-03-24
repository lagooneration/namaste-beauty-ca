import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('latitude') ?? '49.219490';
    const lon = searchParams.get('longitude') ?? '-122.598780';

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0111291847mshed9a3d19a3a7c45p149b36jsne9301d45dab1',
        'X-RapidAPI-Host': 'freestaticmaps.p.rapidapi.com'
      }
    };

    const params = new URLSearchParams({
      center: `${lat},${lon}`,
      zoom: '15',
      size: '800x400',
      format: 'png',
      markers: `color:red|${lat},${lon}`,
      scale: '2'
    });

    const response = await fetch(
      `https://freestaticmaps.p.rapidapi.com/v1/static?${params}`,
      options
    );

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    // Convert the image response to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mapUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ mapUrl });
  } catch (error) {
    console.error('Error in getStaticMap:', error);
    return NextResponse.json(
      { error: 'Map service unavailable', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}