import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('cookies')
export class CookiesController {
  @Get('set')
  set(@Res({ passthrough: true }) res: Response) {
    res.cookie('test_cookie', 'hola', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // en prod: true
      path: '/',
      // domain: '.indoffpro.com', // en prod
      maxAge: 1000 * 60 * 30, // 30 min
    });
    return { ok: true };
  }

  @Get('read')
  read(@Req() req: Request) {
    return { test_cookie: req.cookies?.['test_cookie'] ?? null };
  }

  @Get('clear')
  clear(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('test_cookie', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      // domain: '.indoffpro.com',
    });
    return { cleared: true };
  }
}
