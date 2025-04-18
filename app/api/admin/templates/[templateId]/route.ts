import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ templateId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { templateId } = await params;
    const body = await request.json();
    const { name, description, content, categoryId } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const template = await prisma.documentTemplate.update({
      where: {
        id: templateId,
      },
      data: {
        name,
        description,
        content,
        categoryId,
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.log('[TEMPLATE_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ templateId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { templateId } = await params;

    const existingTemplate = await prisma.documentTemplate.findUnique({
      where: { id: templateId }
    });

    if (!existingTemplate) {
      return new NextResponse('Template not found', { status: 404 });
    }

    await prisma.documentTemplate.delete({
      where: { id: templateId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DELETE /api/admin/templates] Error:", error);
    return new NextResponse('Internal server error', { status: 500 });
  }
} 