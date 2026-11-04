export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const hostname = url.hostname; // ej: "calzadoslucas.qatuweb.com"

    // 1. Dejar pasar el dominio raíz o www directo al Hub Central
    if (hostname === "qatuweb.com" || hostname === "www.qatuweb.com") {
      return fetch(request);
    }

    const subdomain = hostname.replace(".qatuweb.com", "").toLowerCase();

    // 2. Consultar estado en el Edge Cache o en el Hub Central (/api/domain-status)
    const statusApiUrl = `https://qatuweb.com/api/domain-status?subdomain=${encodeURIComponent(subdomain)}`;
    const cache = caches.default;
    let statusResponse = await cache.match(statusApiUrl);

    if (!statusResponse) {
      statusResponse = await fetch(statusApiUrl, {
        headers: { "User-Agent": "Qatu-Cloudflare-Edge-Worker" },
      });
      if (statusResponse.ok) {
        ctx.waitUntil(cache.put(statusApiUrl, statusResponse.clone()));
      }
    }

    const statusData = await statusResponse.json().catch(() => ({ active: false }));

    // 3. KILL-SWITCH ACTIVO: Mostrar pantalla de Renovación Yape / Plin
    if (!statusData.active || !statusData.targetUrl) {
      return new Response(renderSuspendedPage(subdomain, statusData), {
        status: 503,
        headers: {
          "Content-Type": "text/html;charset=UTF-8",
          "Cache-Control": "no-store",
        },
      });
    }

    // 4. CLIENTE AL DÍA: Proxy transparente hacia el Vercel del cliente
    const targetOrigin = new URL(statusData.targetUrl);
    const proxyUrl = new URL(url.pathname + url.search, targetOrigin);

    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set("Host", targetOrigin.hostname);
    modifiedHeaders.set("x-qatu-proxy-secret", env.QATU_PROXY_SECRET || "qatu-edge-verified");
    modifiedHeaders.set("x-forwarded-host", hostname);

    const proxyRequest = new Request(proxyUrl.toString(), {
      method: request.method,
      headers: modifiedHeaders,
      body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null,
      redirect: "manual",
    });

    return fetch(proxyRequest);
  },
};

function renderSuspendedPage(subdomain, data) {
  const businessName = data.businessName || subdomain.toUpperCase();
  const amount = data.renewalAmount || 30;
  const whatsappMsg = encodeURIComponent(
    `Hola QatuWeb, deseo reactivar mi página ${subdomain}.qatuweb.com (Plan S/ ${amount})`
  );

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${businessName} - Servicio en Pausa | QatuWeb</title>
  <style>
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; box-sizing: border-box; }
    .card { max-width: 420px; width: 100%; background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 28px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
    .badge { display: inline-block; background: #fef3c7; color: #b45309; font-weight: 700; font-size: 12px; padding: 6px 12px; border-radius: 999px; margin-bottom: 16px; }
    h1 { font-size: 20px; margin: 0 0 10px; color: #ffffff; }
    p { font-size: 14px; color: #94a3b8; line-height: 1.5; margin-bottom: 24px; }
    .btn { display: block; width: 100%; padding: 14px; border-radius: 10px; font-weight: 700; font-size: 15px; text-decoration: none; margin-bottom: 12px; box-sizing: border-box; }
    .btn-primary { background: #10b981; color: #052e16; }
    .btn-secondary { background: #334155; color: #f8fafc; }
    .footer { font-size: 12px; color: #64748b; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">⚡ SUSCRIPCIÓN PENDIENTE DE RENOVACIÓN</span>
    <h1>${businessName}</h1>
    <p>Este catálogo o sistema web se encuentra temporalmente en pausa. Si eres el propietario del negocio, reactívalo al instante con Yape o Plin (S/ ${amount}.00).</p>
    <a class="btn btn-primary" href="https://qatuweb.com/dashboard/cliente">Subir Comprobante Yape / Plin</a>
    <a class="btn btn-secondary" href="https://wa.me/51966123456?text=${whatsappMsg}">Contactar Soporte por WhatsApp</a>
    <div class="footer">Infraestructura administrada por <strong>QatuWeb.com</strong> • Ayacucho</div>
  </div>
</body>
</html>`;
}
