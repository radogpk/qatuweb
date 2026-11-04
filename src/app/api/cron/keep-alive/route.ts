import { NextRequest, NextResponse } from 'next/server';
import { qatuCentralService } from '@/lib/services/qatuCentral.service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Verificación de seguridad CRON_SECRET (Bearer Token o query param)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || 'qatu_cron_secret_keep_alive_2026';
  
  const token = authHeader?.replace('Bearer ', '') || request.nextUrl.searchParams.get('key');

  if (token !== cronSecret && process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'No autorizado para ejecutar el cron de mantenimiento' },
      { status: 401 }
    );
  }

  try {
    const result = await qatuCentralService.executeGlobalKeepAlive();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        tenantsChecked: result.total,
        successfulPings: result.successful,
        failedPings: result.failed,
      },
      message: 'Pings anti-pausa ejecutados con éxito en los proyectos Supabase Free de clientes.',
    });
  } catch (error) {
    console.error('Error en cron keep-alive:', error);
    return NextResponse.json(
      { success: false, error: 'Fallo al ejecutar keep-alive global' },
      { status: 500 }
    );
  }
}

// También soportamos GET para invocación directa desde Vercel Cron Jobs o UptimeRobot
export async function GET(request: NextRequest) {
  return POST(request);
}
