import { Material } from "@/models/material.model";
import { Request as MaterialRequest } from "@/models/request.model";

export const POST = async (req) => {
  const { requestID } = await req.json();

  try {
    const materialRequest = await MaterialRequest.findOne({ _id: requestID });

    if (!materialRequest) {
      return NextResponse.json({ success: false, error: 'Request not found' });
    }

    materialRequest.status = 'ACCEPTED';
    await materialRequest.save();

    const { material } = materialRequest;
    const newMaterial = new Material(material);
    await newMaterial.save();

    return NextResponse.json({ success: true, data: materialRequest });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
