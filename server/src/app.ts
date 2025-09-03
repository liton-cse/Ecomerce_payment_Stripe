import cors from 'cors';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { handleStripeWebhook } from './app/modules/payment/create_session';
import router from './routes';
import { StatusCodes } from 'http-status-codes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { Morgan } from './shared/morgen';
import session from 'express-session';
import passport from './app/modules/auth/auth.password';
const app = express();

// --- CORS first ---
app.use(cors());

// --- Morgan ---
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

// --- Stripe Webhook (RAW BODY) ---
app.post(
  '/api/v1/products/webhook',
  bodyParser.raw({ type: 'application/json' }),
  handleStripeWebhook
);

// --- JSON & URL-encoded body parser for other routes ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Static files ---
app.use(express.static('uploads'));

// --- Router ---
app.use('/api/v1', router);

// --- Live response ---
app.get('/', (req: Request, res: Response) => {
  const date = new Date(Date.now());
  res.send(
    `<h1 style="text-align:center; color:#173616; font-family:Verdana;">Beep-beep! The server is alive and kicking.</h1>
    <p style="text-align:center; color:#173616; font-family:Verdana;">${date}</p>
    `
  );
});

// session middleware for passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// --- Global error handler ---
app.use(globalErrorHandler);

// --- 404 handler ---
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API DOESN'T EXIST",
      },
    ],
  });
});

export default app;
