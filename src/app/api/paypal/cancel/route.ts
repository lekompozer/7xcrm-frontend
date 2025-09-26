import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // Handle the return from PayPal (cancel case)
    return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>PayPal Cancelled</title>
            <script>
                // Send cancel message to parent window
                if (window.opener) {
                    window.opener.postMessage({
                        type: 'PAYPAL_CANCEL'
                    }, window.location.origin);
                    window.close();
                } else {
                    // Fallback redirect
                    window.location.href = '/app/setup-guide?paypal=cancel';
                }
            </script>
        </head>
        <body>
            <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                <h2>PayPal Connection Cancelled</h2>
                <p>Closing this window...</p>
            </div>
        </body>
        </html>
    `, {
        headers: { 'Content-Type': 'text/html' }
    });
}