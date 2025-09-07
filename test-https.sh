#!/bin/bash
# HTTPS Security Test Script for syris.studio
# Run this script to verify HTTPS implementation

echo "🔒 HTTPS Security Test for syris.studio"
echo "======================================"

# Test HTTPS redirect
echo "Testing HTTP to HTTPS redirect..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L http://syris.studio)
if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ HTTPS redirect working"
else
    echo "❌ HTTPS redirect failed (Status: $HTTP_STATUS)"
fi

# Test security headers
echo "Testing security headers..."
HEADERS=$(curl -s -I https://syris.studio)

if echo "$HEADERS" | grep -q "Strict-Transport-Security"; then
    echo "✅ HSTS header present"
else
    echo "❌ HSTS header missing"
fi

if echo "$HEADERS" | grep -q "X-Content-Type-Options"; then
    echo "✅ X-Content-Type-Options header present"
else
    echo "❌ X-Content-Type-Options header missing"
fi

if echo "$HEADERS" | grep -q "X-Frame-Options"; then
    echo "✅ X-Frame-Options header present"
else
    echo "❌ X-Frame-Options header missing"
fi

if echo "$HEADERS" | grep -q "Content-Security-Policy"; then
    echo "✅ CSP header present"
else
    echo "❌ CSP header missing"
fi

# Test SSL certificate
echo "Testing SSL certificate..."
SSL_INFO=$(echo | openssl s_client -servername syris.studio -connect syris.studio:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ SSL certificate valid"
    echo "Certificate details: $SSL_INFO"
else
    echo "❌ SSL certificate issue"
fi

echo ""
echo "🎯 Recommended next steps:"
echo "1. Test with SSL Labs: https://www.ssllabs.com/ssltest/"
echo "2. Check security headers: https://securityheaders.com/"
echo "3. Verify with Mozilla Observatory: https://observatory.mozilla.org/"
echo ""
echo "Test completed! 🚀"
