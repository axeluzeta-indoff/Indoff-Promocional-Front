import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('cookies')
export class CookiesController {
  @Get('set')
  set(@Res({ passthrough: true }) res: Response) {
    // Opciones seguras por defecto
    const secure = process.env.NODE_ENV === 'production';
    res.cookie('test_cookie', 'hola', {
      httpOnly: true,
      sameSite: 'lax',
      secure,
      maxAge: 30 * 60 * 1000, // 30min
      path: '/',
      // domain: '.indoffpro.com', // en prod
    });
    return { set: true };
  }

  @Get('read')
  read(@Req() req: Request): { test_cookie: string | null } {
    // Narrowing para evitar any
    const raw: unknown = req.cookies?.['test_cookie'];
    const value = typeof raw === 'string' ? raw : null;
    return { test_cookie: value };
  }

  @Get('clear')
  clear(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('test_cookie', { path: '/' });
    return { cleared: true };
  }
}
