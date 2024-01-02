import Request from '@/models/Request';
import Material from '@/models/Material';

export const POST = async (req) => {
  const { requestID } = await req.json();

  try {
    const request = await Request.findOne({ _id: requestID });

    if (!request) {
      return NextResponse.json({ success: false, error: 'Request not found' });
    }

    request.status = 'ACCEPTED';
    await request.save();

    const { material } = request;
    const newMaterial = new Material(material);
    await newMaterial.save();

    return NextResponse.json({ success: true, data: request });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
