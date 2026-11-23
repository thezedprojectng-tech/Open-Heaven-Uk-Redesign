import { headers } from 'next/headers';

interface RateLimitStore {
  count: number;
  resetAt: number;
}

const ipStore = new Map<string, RateLimitStore>();

// Clean up stale IP records every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipStore.entries()) {
    if (now > data.resetAt) {
      ipStore.delete(ip);
    }
  }
}, 10 * 60 * 1000);

export async function checkRateLimit(
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000
): Promise<{ success: boolean; remaining: number }> {
  const headerList = await headers();
  const forwarded = headerList.get('x-forwarded-for');
  const realIp = headerList.get('x-real-ip');
  const clientIp = forwarded?.split(',')[0].trim() || realIp || '127.0.0.1';

  const now = Date.now();
  const existing = ipStore.get(clientIp);

  if (!existing || now > existing.resetAt) {
    ipStore.set(clientIp, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { success: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0 };
  }

  existing.count += 1;
  return { success: true, remaining: limit - existing.count };
}
